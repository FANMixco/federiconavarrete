const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT = path.resolve(__dirname, "..", "..");
const I18N_DIR = path.join(ROOT, "js", "i18n");
const START_PORT = Number(process.env.PORT || process.env.I18N_PORT || 4173);

function send(res, status, body, contentType = "application/json") {
    res.writeHead(status, {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
    });
    res.end(typeof body === "string" ? body : JSON.stringify(body));
}

function fail(res, status, message) {
    send(res, status, { error: message });
}

function safeName(value, label) {
    if (!/^[a-zA-Z0-9_-]+$/.test(value || "")) {
        throw new Error(`${label} can only contain letters, numbers, hyphens, and underscores.`);
    }

    return value;
}

function languagePath(language) {
    return path.join(I18N_DIR, safeName(language, "Language"));
}

function filePath(language, file) {
    const normalized = safeName(file.replace(/\.json$/i, ""), "File");
    return path.join(languagePath(language), `${normalized}.json`);
}

function minFilePath(language, file) {
    const normalized = safeName(file.replace(/\.json$/i, ""), "File");
    return path.join(languagePath(language), "min", `${normalized}.json`);
}

function readJson(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function listLanguages() {
    if (!fs.existsSync(I18N_DIR)) {
        return [];
    }

    return fs
        .readdirSync(I18N_DIR, { withFileTypes: true })
        .filter((item) => item.isDirectory() && item.name !== "min")
        .map((item) => item.name)
        .sort((a, b) => a.localeCompare(b));
}

function listFiles(language) {
    const dir = languagePath(language);
    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((item) => item.isFile() && item.name.endsWith(".json"))
        .map((item) => item.name)
        .sort((a, b) => a.localeCompare(b));
}

function minifyFile(language, file) {
    const source = filePath(language, file);
    const target = minFilePath(language, file);

    if (!fs.existsSync(source)) {
        throw new Error(`Missing source file: ${path.relative(ROOT, source)}`);
    }

    const data = readJson(source);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, JSON.stringify(data), "utf8");

    return path.relative(ROOT, target);
}

function minifyLanguage(language) {
    return listFiles(language).map((file) => minifyFile(language, file));
}

function minifyAll() {
    return listLanguages().flatMap((language) => minifyLanguage(language));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
            if (body.length > 10 * 1024 * 1024) {
                reject(new Error("Request body is too large."));
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error("Request body is not valid JSON."));
            }
        });
        req.on("error", reject);
    });
}

function routeApi(req, res, url) {
    const segments = url.pathname.split("/").filter(Boolean);

    return readBody(req)
        .then((body) => {
            if (req.method === "GET" && url.pathname === "/api/state") {
                const languages = listLanguages();
                send(res, 200, {
                    languages,
                    filesByLanguage: Object.fromEntries(languages.map((language) => [language, listFiles(language)])),
                });
                return;
            }

            if (req.method === "GET" && segments[1] === "json") {
                const language = safeName(segments[2], "Language");
                const file = safeName((segments[3] || "").replace(/\.json$/i, ""), "File");
                const source = filePath(language, file);

                if (!fs.existsSync(source)) {
                    fail(res, 404, "JSON file was not found.");
                    return;
                }

                send(res, 200, {
                    content: fs.readFileSync(source, "utf8"),
                    minified: fs.existsSync(minFilePath(language, file)),
                });
                return;
            }

            if (req.method === "POST" && url.pathname === "/api/languages") {
                const language = safeName(body.language, "Language");
                const dir = languagePath(language);

                if (fs.existsSync(dir)) {
                    fail(res, 409, "Language already exists.");
                    return;
                }

                fs.mkdirSync(path.join(dir, "min"), { recursive: true });
                send(res, 201, { language });
                return;
            }

            if (req.method === "POST" && segments[1] === "files") {
                const language = safeName(segments[2], "Language");
                const file = safeName((body.file || "").replace(/\.json$/i, ""), "File");
                const target = filePath(language, file);

                if (!fs.existsSync(languagePath(language))) {
                    fail(res, 404, "Language was not found.");
                    return;
                }

                if (fs.existsSync(target)) {
                    fail(res, 409, "File already exists.");
                    return;
                }

                fs.writeFileSync(target, `${JSON.stringify({}, null, "\t")}\n`, "utf8");
                minifyFile(language, file);
                send(res, 201, { file: `${file}.json` });
                return;
            }

            if (req.method === "PUT" && segments[1] === "json") {
                const language = safeName(segments[2], "Language");
                const file = safeName((segments[3] || "").replace(/\.json$/i, ""), "File");
                const data = JSON.parse(body.content);
                const source = filePath(language, file);

                if (!fs.existsSync(languagePath(language))) {
                    fail(res, 404, "Language was not found.");
                    return;
                }

                fs.writeFileSync(source, `${JSON.stringify(data, null, "\t")}\n`, "utf8");
                const minified = body.generateMin === false ? [] : [minifyFile(language, file)];
                send(res, 200, { saved: path.relative(ROOT, source), minified });
                return;
            }

            if (req.method === "POST" && url.pathname === "/api/minify") {
                const minified = body.language ? minifyLanguage(safeName(body.language, "Language")) : minifyAll();
                send(res, 200, { minified });
                return;
            }

            fail(res, 404, "Route was not found.");
        })
        .catch((error) => fail(res, 400, error.message));
}

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>i18n Manager</title>
<style>
:root {
    color-scheme: light;
    --bg: #f5f7fb;
    --panel: #ffffff;
    --line: #d8dee9;
    --text: #17202a;
    --muted: #667085;
    --accent: #0f766e;
    --accent-dark: #115e59;
    --danger: #b42318;
    --focus: #f59e0b;
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
button, input, textarea, select { font: inherit; }
button {
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #fff;
    color: var(--text);
    min-height: 36px;
    padding: 0 12px;
    cursor: pointer;
}
button:hover { border-color: var(--accent); color: var(--accent-dark); }
button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
button.primary:hover { background: var(--accent-dark); color: #fff; }
button.icon { width: 36px; padding: 0; }
button:disabled { cursor: not-allowed; opacity: .55; }
input {
    width: 100%;
    min-height: 36px;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 0 10px;
}
select {
    min-height: 36px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #fff;
    padding: 0 10px;
}
.app {
    display: grid;
    grid-template-columns: minmax(220px, 280px) 1fr;
    min-height: 100vh;
}
.sidebar {
    border-right: 1px solid var(--line);
    background: var(--panel);
    padding: 18px;
    overflow: auto;
}
.brand { margin-bottom: 18px; }
.brand h1 { margin: 0; font-size: 20px; line-height: 1.2; letter-spacing: 0; }
.brand p { margin: 6px 0 0; color: var(--muted); }
.section { margin-top: 18px; }
.section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}
.list {
    display: grid;
    gap: 6px;
}
.list button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: left;
}
.list button.active {
    border-color: var(--accent);
    background: #e8f5f2;
    color: var(--accent-dark);
}
.count { color: var(--muted); font-size: 12px; }
.create-row {
    display: grid;
    grid-template-columns: 1fr 36px;
    gap: 8px;
    margin-top: 8px;
}
.main {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-width: 0;
}
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 1px solid var(--line);
    background: var(--panel);
    padding: 14px 18px;
}
.current h2 { margin: 0; font-size: 18px; letter-spacing: 0; }
.current p { margin: 3px 0 0; color: var(--muted); }
.actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}
.editor-wrap {
    min-height: 0;
    padding: 18px;
    overflow: auto;
}
.form-editor {
    display: grid;
    gap: 12px;
    max-width: 1180px;
}
.json-node {
    border-left: 2px solid var(--line);
    padding-left: 12px;
}
.json-node.root {
    border-left: 0;
    padding-left: 0;
}
.node-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 4px 0 8px;
}
.node-title h3 {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0;
}
.node-title small,
.field-path {
    color: var(--muted);
    font-size: 12px;
}
.fields {
    display: grid;
    gap: 10px;
}
details {
    border-bottom: 1px solid #edf0f5;
    padding: 10px 0;
}
summary {
    cursor: pointer;
    font-weight: 700;
    margin-bottom: 8px;
}
.field {
    display: grid;
    grid-template-columns: minmax(170px, 260px) minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    border-bottom: 1px solid #edf0f5;
    padding: 10px 0;
}
.field label {
    display: grid;
    gap: 4px;
    font-weight: 700;
}
.field textarea,
.field input,
.field select {
    width: 100%;
}
.field textarea {
    min-height: 42px;
    resize: vertical;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #fff;
    color: var(--text);
    padding: 9px 10px;
    font: inherit;
}
.raw-editor {
    display: block;
    width: 100%;
    min-height: calc(100vh - 158px);
    resize: none;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #101828;
    color: #f8fafc;
    padding: 16px;
    font: 13px/1.55 Consolas, "SFMono-Regular", Menlo, monospace;
    tab-size: 4;
}
.raw-editor.invalid,
.field .invalid { border-color: var(--danger); outline-color: var(--danger); }
.empty-action {
    margin-top: 12px;
}
.status {
    min-height: 44px;
    border-top: 1px solid var(--line);
    background: var(--panel);
    padding: 12px 18px;
    color: var(--muted);
}
.status.error { color: var(--danger); }
.status.ok { color: var(--accent-dark); }
.empty {
    display: grid;
    place-items: center;
    min-height: calc(100vh - 90px);
    color: var(--muted);
    text-align: center;
    padding: 24px;
}
@media (max-width: 820px) {
    .app { grid-template-columns: 1fr; }
    .sidebar { border-right: 0; border-bottom: 1px solid var(--line); }
    .toolbar { align-items: flex-start; flex-direction: column; }
    .actions { width: 100%; }
    .actions button { flex: 1 1 140px; }
    .raw-editor { min-height: 58vh; }
    .field { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<div class="app">
    <aside class="sidebar">
        <div class="brand">
            <h1>i18n Manager</h1>
            <p>Edit source JSON and generate minified files.</p>
        </div>

        <div class="section">
            <div class="section-title">
                <span>Languages</span>
                <button class="icon" id="refresh" title="Refresh">R</button>
            </div>
            <div class="list" id="languages"></div>
            <div class="create-row">
                <input id="newLanguage" placeholder="new language">
                <button class="icon" id="addLanguage" title="Add language">+</button>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <span>Files</span>
                <span class="count" id="fileCount"></span>
            </div>
            <div class="list" id="files"></div>
            <div class="create-row">
                <input id="newFile" placeholder="new file">
                <button class="icon" id="addFile" title="Add file">+</button>
            </div>
        </div>
    </aside>

    <main class="main">
        <div class="toolbar">
            <div class="current">
                <h2 id="title">Select a JSON file</h2>
                <p id="subtitle">Choose a language and file to begin.</p>
            </div>
            <div class="actions">
                <button id="rawToggle" disabled>Raw JSON</button>
                <button id="validate" disabled>Validate</button>
                <button id="minifyLanguage" disabled>Minify language</button>
                <button id="minifyAll">Minify all</button>
                <button class="primary" id="save" disabled>Save</button>
            </div>
        </div>
        <div class="editor-wrap" id="editorWrap">
            <div class="empty" id="empty">
                <div>
                    <div>No file selected.</div>
                    <button class="empty-action" id="pickFirst">Open first JSON</button>
                </div>
            </div>
            <div class="form-editor" id="formEditor" hidden></div>
            <textarea class="raw-editor" id="rawEditor" spellcheck="false" hidden></textarea>
        </div>
        <div class="status" id="status">Ready.</div>
    </main>
</div>

<script>
const state = {
    languages: [],
    filesByLanguage: {},
    language: "",
    file: "",
    data: null,
    rawMode: false,
    dirty: false,
};

const el = {
    languages: document.getElementById("languages"),
    files: document.getElementById("files"),
    fileCount: document.getElementById("fileCount"),
    title: document.getElementById("title"),
    subtitle: document.getElementById("subtitle"),
    status: document.getElementById("status"),
    formEditor: document.getElementById("formEditor"),
    rawEditor: document.getElementById("rawEditor"),
    empty: document.getElementById("empty"),
    save: document.getElementById("save"),
    rawToggle: document.getElementById("rawToggle"),
    validate: document.getElementById("validate"),
    minifyLanguage: document.getElementById("minifyLanguage"),
    minifyAll: document.getElementById("minifyAll"),
    refresh: document.getElementById("refresh"),
    newLanguage: document.getElementById("newLanguage"),
    addLanguage: document.getElementById("addLanguage"),
    newFile: document.getElementById("newFile"),
    addFile: document.getElementById("addFile"),
    pickFirst: document.getElementById("pickFirst"),
};

function setStatus(message, type = "") {
    el.status.className = "status " + type;
    el.status.textContent = message;
}

async function api(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Request failed.");
    }

    return data;
}

function selectedPath() {
    return state.language && state.file ? "js/i18n/" + state.language + "/" + state.file : "";
}

function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
}

function titleFromPath(path) {
    return path.length ? path.join(".") : state.file || "JSON";
}

function encodePath(path) {
    return encodeURIComponent(JSON.stringify(path));
}

function decodePath(value) {
    return JSON.parse(decodeURIComponent(value));
}

function getAtPath(path) {
    return path.reduce((current, key) => current[key], state.data);
}

function setAtPath(path, value) {
    const parent = path.slice(0, -1).reduce((current, key) => current[key], state.data);
    parent[path[path.length - 1]] = value;
}

function removeAtPath(path) {
    const parent = path.slice(0, -1).reduce((current, key) => current[key], state.data);
    const key = path[path.length - 1];

    if (Array.isArray(parent)) {
        parent.splice(key, 1);
    } else {
        delete parent[key];
    }
}

function markDirty() {
    state.dirty = true;
    renderSelection();
}

function dataToJson() {
    if (state.rawMode) {
        state.data = JSON.parse(el.rawEditor.value);
        el.rawEditor.classList.remove("invalid");
    }

    return state.data;
}

function getEmptyValue(type) {
    if (type === "array") {
        return [];
    }
    if (type === "object") {
        return {};
    }
    if (type === "number") {
        return 0;
    }
    if (type === "boolean") {
        return false;
    }
    return "";
}

function addObjectField(path) {
    const key = prompt("Field name");
    if (!key) {
        return;
    }

    const target = getAtPath(path);
    if (!isObject(target)) {
        return;
    }

    if (Object.prototype.hasOwnProperty.call(target, key)) {
        setStatus("Field already exists: " + key, "error");
        return;
    }

    target[key] = "";
    markDirty();
    renderForm();
}

function addArrayItem(path) {
    const target = getAtPath(path);
    if (!Array.isArray(target)) {
        return;
    }

    const sample = target.find((item) => item !== null && item !== undefined);
    target.push(Array.isArray(sample) ? [] : isObject(sample) ? {} : "");
    markDirty();
    renderForm();
}

function renderPrimitive(container, path, key, value) {
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.textContent = String(key);

    const pathText = document.createElement("span");
    pathText.className = "field-path";
    pathText.textContent = titleFromPath(path);
    label.appendChild(pathText);

    let input;
    if (typeof value === "boolean") {
        input = document.createElement("select");
        ["true", "false"].forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            option.selected = String(value) === optionValue;
            input.appendChild(option);
        });
        input.addEventListener("change", () => {
            setAtPath(path, input.value === "true");
            markDirty();
        });
    } else if (typeof value === "number") {
        input = document.createElement("input");
        input.type = "number";
        input.value = value;
        input.addEventListener("input", () => {
            setAtPath(path, Number(input.value));
            markDirty();
        });
    } else if (value === null) {
        input = document.createElement("input");
        input.value = "null";
        input.disabled = true;
    } else {
        input = document.createElement("textarea");
        input.value = value === undefined ? "" : String(value);
        input.rows = input.value.length > 120 || input.value.includes("\\n") ? 4 : 2;
        input.addEventListener("input", () => {
            setAtPath(path, input.value);
            markDirty();
        });
    }

    field.appendChild(label);
    field.appendChild(input);
    container.appendChild(field);
}

function renderNode(container, value, path = [], key = "Root") {
    if (!Array.isArray(value) && !isObject(value)) {
        renderPrimitive(container, path, key, value);
        return;
    }

    const node = document.createElement("section");
    node.className = "json-node" + (path.length ? "" : " root");

    const title = document.createElement("div");
    title.className = "node-title";

    const heading = document.createElement("h3");
    heading.textContent = String(key);

    const meta = document.createElement("small");
    const entries = Array.isArray(value) ? value.length : Object.keys(value).length;
    meta.textContent = (Array.isArray(value) ? "Array" : "Object") + " - " + entries + " item" + (entries === 1 ? "" : "s");

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = Array.isArray(value) ? "Add item" : "Add field";
    addButton.addEventListener("click", () => {
        if (Array.isArray(value)) {
            addArrayItem(path);
        } else {
            addObjectField(path);
        }
    });

    title.appendChild(heading);
    title.appendChild(meta);
    title.appendChild(addButton);
    node.appendChild(title);

    const fields = document.createElement("div");
    fields.className = "fields";

    const keys = Array.isArray(value) ? value.map((_, index) => index) : Object.keys(value);
    keys.forEach((childKey) => {
        const childPath = path.concat(childKey);
        const childValue = value[childKey];

        if (Array.isArray(childValue) || isObject(childValue)) {
            const details = document.createElement("details");
            details.open = path.length < 2;
            const summary = document.createElement("summary");
            summary.textContent = String(childKey);
            details.appendChild(summary);
            renderNode(details, childValue, childPath, childKey);
            fields.appendChild(details);
        } else {
            renderPrimitive(fields, childPath, childKey, childValue);
        }
    });

    if (path.length) {
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove " + String(key);
        removeButton.addEventListener("click", () => {
            removeAtPath(path);
            markDirty();
            renderForm();
        });
        fields.appendChild(removeButton);
    }

    node.appendChild(fields);
    container.appendChild(node);
}

function renderForm() {
    el.formEditor.innerHTML = "";
    if (state.data !== null) {
        renderNode(el.formEditor, state.data);
    }
}

function validateJson() {
    const data = dataToJson();
    JSON.stringify(data);
    return data;
}

function renderLanguages() {
    el.languages.innerHTML = "";
    state.languages.forEach((language) => {
        const button = document.createElement("button");
        button.className = language === state.language ? "active" : "";
        button.innerHTML = "<span>" + language + "</span><span class='count'>" + (state.filesByLanguage[language] || []).length + "</span>";
        button.addEventListener("click", () => selectLanguage(language));
        el.languages.appendChild(button);
    });
}

function renderFiles() {
    const files = state.filesByLanguage[state.language] || [];
    el.files.innerHTML = "";
    el.fileCount.textContent = files.length ? files.length + " JSON" : "";

    files.forEach((file) => {
        const button = document.createElement("button");
        button.className = file === state.file ? "active" : "";
        button.textContent = file;
        button.addEventListener("click", () => loadFile(state.language, file));
        el.files.appendChild(button);
    });
}

function renderSelection() {
    renderLanguages();
    renderFiles();

    const hasFile = Boolean(state.language && state.file);
    el.title.textContent = hasFile ? state.file : "Select a JSON file";
    el.subtitle.textContent = hasFile ? selectedPath() : state.language ? "Choose a file in " + state.language + "." : "Choose a language and file to begin.";
    el.formEditor.hidden = !hasFile || state.rawMode;
    el.rawEditor.hidden = !hasFile || !state.rawMode;
    el.empty.hidden = hasFile;
    el.save.disabled = !hasFile || !state.dirty;
    el.rawToggle.disabled = !hasFile;
    el.rawToggle.textContent = state.rawMode ? "Form fields" : "Raw JSON";
    el.validate.disabled = !hasFile;
    el.minifyLanguage.disabled = !state.language;
}

function assertCleanChange() {
    if (state.dirty) {
        return confirm("Discard unsaved changes?");
    }

    return true;
}

async function loadState() {
    const data = await api("/api/state");
    state.languages = data.languages;
    state.filesByLanguage = data.filesByLanguage;

    if (!state.language && state.languages.length) {
        state.language = state.languages[0];
    }

    if (state.language && !state.languages.includes(state.language)) {
        state.language = state.languages[0] || "";
        state.file = "";
    }

    if (state.file && !(state.filesByLanguage[state.language] || []).includes(state.file)) {
        state.file = "";
    }

    renderSelection();
}

async function selectLanguage(language) {
    if (!assertCleanChange()) {
        return;
    }

    state.language = language;
    state.file = "";
    state.data = null;
    state.rawMode = false;
    state.dirty = false;
    el.rawEditor.value = "";
    el.formEditor.innerHTML = "";
    renderSelection();
}

async function loadFile(language, file) {
    if (!assertCleanChange()) {
        return;
    }

    const data = await api("/api/json/" + encodeURIComponent(language) + "/" + encodeURIComponent(file.replace(/\\.json$/i, "")));
    state.language = language;
    state.file = file;
    state.data = JSON.parse(data.content);
    state.rawMode = false;
    state.dirty = false;
    el.rawEditor.value = JSON.stringify(state.data, null, "\\t") + "\\n";
    el.rawEditor.classList.remove("invalid");
    renderForm();
    renderSelection();
    setStatus("Loaded " + selectedPath() + ".", "ok");
}

async function saveFile() {
    try {
        const content = JSON.stringify(validateJson(), null, "\\t") + "\\n";
        const data = await api("/api/json/" + encodeURIComponent(state.language) + "/" + encodeURIComponent(state.file.replace(/\\.json$/i, "")), {
            method: "PUT",
            body: JSON.stringify({ content, generateMin: true }),
        });
        state.dirty = false;
        await loadFile(state.language, state.file);
        setStatus("Saved " + data.saved + " and generated " + data.minified.join(", ") + ".", "ok");
    } catch (error) {
        el.rawEditor.classList.add("invalid");
        setStatus(error.message, "error");
    }
}

async function addLanguage() {
    const language = el.newLanguage.value.trim();
    if (!language) {
        return;
    }

    try {
        await api("/api/languages", { method: "POST", body: JSON.stringify({ language }) });
        el.newLanguage.value = "";
        state.language = language;
        state.file = "";
        await loadState();
        setStatus("Created language " + language + ".", "ok");
    } catch (error) {
        setStatus(error.message, "error");
    }
}

async function addFile() {
    const file = el.newFile.value.trim();
    if (!state.language || !file) {
        return;
    }

    try {
        const data = await api("/api/files/" + encodeURIComponent(state.language), {
            method: "POST",
            body: JSON.stringify({ file }),
        });
        el.newFile.value = "";
        await loadState();
        await loadFile(state.language, data.file);
        setStatus("Created " + state.language + "/" + data.file + ".", "ok");
    } catch (error) {
        setStatus(error.message, "error");
    }
}

el.rawEditor.addEventListener("input", () => {
    state.dirty = true;
    el.rawEditor.classList.remove("invalid");
    renderSelection();
});
el.save.addEventListener("click", saveFile);
el.rawToggle.addEventListener("click", () => {
    try {
        if (state.rawMode) {
            state.data = JSON.parse(el.rawEditor.value);
            renderForm();
            state.rawMode = false;
        } else {
            el.rawEditor.value = JSON.stringify(state.data, null, "\\t") + "\\n";
            state.rawMode = true;
        }
        renderSelection();
        setStatus(state.rawMode ? "Raw JSON editor enabled." : "Form editor enabled.", "ok");
    } catch (error) {
        el.rawEditor.classList.add("invalid");
        setStatus(error.message, "error");
    }
});
el.validate.addEventListener("click", () => {
    try {
        validateJson();
        setStatus("Current data is valid JSON.", "ok");
    } catch (error) {
        el.rawEditor.classList.add("invalid");
        setStatus(error.message, "error");
    }
});
el.minifyLanguage.addEventListener("click", async () => {
    try {
        const data = await api("/api/minify", { method: "POST", body: JSON.stringify({ language: state.language }) });
        setStatus("Generated " + data.minified.length + " minified files for " + state.language + ".", "ok");
    } catch (error) {
        setStatus(error.message, "error");
    }
});
el.minifyAll.addEventListener("click", async () => {
    try {
        const data = await api("/api/minify", { method: "POST", body: JSON.stringify({}) });
        setStatus("Generated " + data.minified.length + " minified files.", "ok");
    } catch (error) {
        setStatus(error.message, "error");
    }
});
el.refresh.addEventListener("click", loadState);
el.addLanguage.addEventListener("click", addLanguage);
el.addFile.addEventListener("click", addFile);
el.pickFirst.addEventListener("click", () => {
    const first = (state.filesByLanguage[state.language] || [])[0];
    if (first) {
        loadFile(state.language, first);
    }
});
el.newLanguage.addEventListener("keydown", (event) => event.key === "Enter" && addLanguage());
el.newFile.addEventListener("keydown", (event) => event.key === "Enter" && addFile());

loadState().catch((error) => setStatus(error.message, "error"));
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith("/api/")) {
        routeApi(req, res, url);
        return;
    }

    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
        send(res, 200, page, "text/html; charset=utf-8");
        return;
    }

    fail(res, 404, "Page was not found.");
});

function listen(port, attemptsLeft = 20) {
    server.once("error", (error) => {
        if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
            listen(port + 1, attemptsLeft - 1);
            return;
        }

        throw error;
    });

    server.listen(port, () => {
        console.log(`i18n manager running at http://localhost:${port}`);
    });
}

listen(START_PORT);
