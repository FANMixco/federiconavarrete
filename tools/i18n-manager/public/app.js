const state = {
    languages: [],
    filesByLanguage: {},
    language: "",
    file: "",
    data: null,
    rawMode: false,
    dirty: false,
    arrayIndexes: {},
    focusPath: null,
    searchTimer: null,
    searchCache: {},
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
    syncMissing: document.getElementById("syncMissing"),
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
    searchInput: document.getElementById("searchInput"),
    searchAllFiles: document.getElementById("searchAllFiles"),
    searchResults: document.getElementById("searchResults"),
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

function pathKey(path) {
    return path.join(".");
}

function pathMatches(path, focusPath) {
    return focusPath && path.length <= focusPath.length && path.every((part, index) => part === focusPath[index]);
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

function moveArrayItem(arrayPath, fromIndex, toIndex) {
    const target = getAtPath(arrayPath);
    if (!Array.isArray(target) || fromIndex === toIndex) {
        return;
    }

    const finalIndex = Math.max(0, Math.min(target.length - 1, toIndex));
    const item = target.splice(fromIndex, 1)[0];
    target.splice(finalIndex, 0, item);
    state.arrayIndexes[pathKey(arrayPath)] = finalIndex;
    markDirty();
    renderForm();
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

function emptyFromSample(value) {
    if (Array.isArray(value)) {
        return [];
    }

    if (isObject(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, childValue]) => [key, emptyFromSample(childValue)]));
    }

    if (typeof value === "boolean") {
        return false;
    }

    if (typeof value === "number") {
        return 0;
    }

    return "";
}

function cloneMissingStructure(source, target) {
    if (Array.isArray(source)) {
        const output = Array.isArray(target) ? target.slice() : [];
        let changed = !Array.isArray(target);

        source.forEach((sourceItem, index) => {
            if (index >= output.length) {
                output.push(emptyFromSample(sourceItem));
                changed = true;
                return;
            }

            const merged = cloneMissingStructure(sourceItem, output[index]);
            output[index] = merged.value;
            changed = changed || merged.changed;
        });

        return { changed, value: output };
    }

    if (isObject(source)) {
        const output = isObject(target) ? { ...target } : {};
        let changed = !isObject(target);

        Object.entries(source).forEach(([key, sourceValue]) => {
            if (!Object.prototype.hasOwnProperty.call(output, key)) {
                output[key] = emptyFromSample(sourceValue);
                changed = true;
                return;
            }

            const merged = cloneMissingStructure(sourceValue, output[key]);
            output[key] = merged.value;
            changed = changed || merged.changed;
        });

        return { changed, value: output };
    }

    return { changed: false, value: target };
}

function addArrayItem(path) {
    const target = getAtPath(path);
    if (!Array.isArray(target)) {
        return;
    }

    const sample = target.find((item) => item !== null && item !== undefined);
    target.push(sample === undefined ? "" : emptyFromSample(sample));
    state.arrayIndexes[pathKey(path)] = target.length - 1;
    markDirty();
    renderForm();
}

function getItemLabel(value, fallback) {
    if (isObject(value)) {
        return value.title || value.name || value.id || fallback;
    }

    return fallback;
}

function humanizeKey(key) {
    if (typeof key === "number" || /^\d+$/.test(String(key))) {
        return "item";
    }

    return String(key)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .toLowerCase();
}

function singularLabel(key) {
    const label = humanizeKey(key);
    return label.endsWith("s") ? label.slice(0, -1) : label;
}

function addReorderControls(summary, arrayPath, index, total) {
    const controls = document.createElement("span");
    controls.className = "reorder-controls";

    [
        ["Top", 0],
        ["Up", index - 1],
        ["Down", index + 1],
        ["Bottom", total - 1],
    ].forEach(([label, targetIndex]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.disabled = targetIndex === index || targetIndex < 0 || targetIndex >= total;
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            moveArrayItem(arrayPath, index, targetIndex);
        });
        controls.appendChild(button);
    });

    summary.appendChild(controls);
}

function setArrayIndex(path, index) {
    state.arrayIndexes[pathKey(path)] = index;
    renderForm();
}

function deleteArrayItem(path, index) {
    const target = getAtPath(path);
    if (!Array.isArray(target) || !target.length) {
        return;
    }

    target.splice(index, 1);
    state.arrayIndexes[pathKey(path)] = Math.max(0, Math.min(index, target.length - 1));
    markDirty();
    renderForm();
}

function renderArrayPager(container, value, path) {
    if (!value.length) {
        return;
    }

    const key = pathKey(path);
    const index = Math.max(0, Math.min(state.arrayIndexes[key] || 0, value.length - 1));
    state.arrayIndexes[key] = index;

    const pager = document.createElement("div");
    pager.className = "array-pager";

    const previous = document.createElement("button");
    previous.type = "button";
    previous.textContent = "Previous";
    previous.disabled = index === 0;
    previous.addEventListener("click", () => setArrayIndex(path, index - 1));

    const selector = document.createElement("select");
    value.forEach((item, itemIndex) => {
        const option = document.createElement("option");
        option.value = itemIndex;
        option.textContent = String(itemIndex + 1) + ". " + getItemLabel(item, "Item " + (itemIndex + 1));
        option.selected = itemIndex === index;
        selector.appendChild(option);
    });
    selector.addEventListener("change", () => setArrayIndex(path, Number(selector.value)));

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next";
    next.disabled = index === value.length - 1;
    next.addEventListener("click", () => setArrayIndex(path, index + 1));

    const count = document.createElement("span");
    count.className = "array-count";
    count.textContent = String(index + 1) + " / " + value.length;

    pager.appendChild(previous);
    pager.appendChild(selector);
    pager.appendChild(next);
    pager.appendChild(count);
    container.appendChild(pager);
}

function renderPrimitive(container, path, key, value) {
    const field = document.createElement("div");
    field.className = "field";
    if (state.focusPath && pathKey(path) === pathKey(state.focusPath)) {
        field.classList.add("focused-field");
    }

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
        input.rows = input.value.length > 120 || input.value.includes("\n") ? 4 : 2;
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
    if (pathMatches(path, state.focusPath)) {
        node.classList.add("focused-node");
    }

    const title = document.createElement("div");
    title.className = "node-title";

    const heading = document.createElement("h3");
    heading.textContent = String(key);

    const meta = document.createElement("small");
    const entries = Array.isArray(value) ? value.length : Object.keys(value).length;
    meta.textContent = (Array.isArray(value) ? "Array" : "Object") + " - " + entries + " item" + (entries === 1 ? "" : "s");

    const actions = document.createElement("div");
    actions.className = "node-actions";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = Array.isArray(value) ? "Add " + singularLabel(key) : "Add field";
    addButton.addEventListener("click", () => {
        if (Array.isArray(value)) {
            addArrayItem(path);
        } else {
            addObjectField(path);
        }
    });
    actions.appendChild(addButton);

    if (Array.isArray(value) && value.length) {
        const selectedIndex = Math.max(0, Math.min(state.arrayIndexes[pathKey(path)] || 0, value.length - 1));
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete " + singularLabel(key);
        deleteButton.addEventListener("click", () => deleteArrayItem(path, selectedIndex));
        actions.appendChild(deleteButton);
    }

    title.appendChild(heading);
    title.appendChild(meta);
    title.appendChild(actions);
    node.appendChild(title);

    const fields = document.createElement("div");
    fields.className = "fields";

    if (Array.isArray(value)) {
        renderArrayPager(fields, value, path);
        if (value.length) {
            const selectedIndex = state.arrayIndexes[pathKey(path)] || 0;
            const childPath = path.concat(selectedIndex);
            renderNode(fields, value[selectedIndex], childPath, selectedIndex);
        }
        node.appendChild(fields);
        container.appendChild(node);
        return;
    }

    const keys = Array.isArray(value) ? value.map((_, index) => index) : Object.keys(value);
    keys.forEach((childKey) => {
        const childPath = path.concat(childKey);
        const childValue = value[childKey];

        if (Array.isArray(childValue) || isObject(childValue)) {
            const details = document.createElement("details");
            details.open = path.length < 2;
            const summary = document.createElement("summary");
            if (Array.isArray(value)) {
                summary.className = "array-item-summary";
                const itemLabel = document.createElement("span");
                itemLabel.textContent = String(Number(childKey) + 1) + ". " + getItemLabel(childValue, "Item " + (Number(childKey) + 1));
                summary.appendChild(itemLabel);
                addReorderControls(summary, path, Number(childKey), value.length);
            } else {
                summary.textContent = String(childKey);
            }
            details.appendChild(summary);
            renderNode(details, childValue, childPath, childKey);
            fields.appendChild(details);
        } else {
            renderPrimitive(fields, childPath, childKey, childValue);
        }
    });

    const parent = path.length ? getAtPath(path.slice(0, -1)) : null;
    if (path.length && !Array.isArray(parent)) {
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
        if (state.focusPath) {
            const focused = el.formEditor.querySelector(".focused-field textarea, .focused-field input, .focused-field select");
            if (focused) {
                focused.scrollIntoView({ behavior: "smooth", block: "center" });
                focused.focus();
            }
            state.focusPath = null;
        }
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
    el.syncMissing.disabled = !hasFile;
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
    queueSearch();
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
    state.arrayIndexes = {};
    state.focusPath = null;
    el.rawEditor.value = "";
    el.formEditor.innerHTML = "";
    renderSelection();
    queueSearch();
}

function collectSearchResults(data, path = [], results = []) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => collectSearchResults(item, path.concat(index), results));
        return results;
    }

    if (isObject(data)) {
        Object.entries(data).forEach(([key, value]) => collectSearchResults(value, path.concat(key), results));
        return results;
    }

    results.push({
        path,
        key: path[path.length - 1],
        value: data === null || data === undefined ? "" : String(data),
    });
    return results;
}

function applyFocusPath(path) {
    state.focusPath = path;
    for (let index = 0; index < path.length; index++) {
        if (typeof path[index] === "number") {
            state.arrayIndexes[pathKey(path.slice(0, index))] = path[index];
        }
    }
}

async function searchFile(language, file, query) {
    const cacheKey = language + "/" + file;
    if (!state.searchCache[cacheKey]) {
        const response = await api("/api/json/" + encodeURIComponent(language) + "/" + encodeURIComponent(file.replace(/\.json$/i, "")));
        state.searchCache[cacheKey] = JSON.parse(response.content);
    }

    const lowerQuery = query.toLowerCase();
    return collectSearchResults(state.searchCache[cacheKey])
        .filter((item) => titleFromSearchPath(item.path).toLowerCase().includes(lowerQuery) || item.value.toLowerCase().includes(lowerQuery))
        .map((item) => ({ ...item, language, file }));
}

function titleFromSearchPath(path) {
    return path.map((part) => typeof part === "number" ? "[" + part + "]" : part).join(".");
}

function renderSearchResults(results) {
    el.searchResults.innerHTML = "";
    el.searchResults.hidden = !results.length;

    results.slice(0, 40).forEach((result) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "search-result";

        const file = document.createElement("strong");
        file.className = "result-file";
        file.textContent = result.language + "/" + result.file;

        const title = document.createElement("strong");
        title.className = "result-path";
        title.textContent = titleFromSearchPath(result.path);

        const meta = document.createElement("span");
        meta.className = "result-value";
        meta.textContent = result.value;

        button.appendChild(file);
        button.appendChild(title);
        button.appendChild(meta);
        button.addEventListener("click", () => loadFile(result.language, result.file, result.path));
        el.searchResults.appendChild(button);
    });
}

async function runSearch() {
    const query = el.searchInput.value.trim();
    if (!query) {
        renderSearchResults([]);
        return;
    }

    const filesToSearch = el.searchAllFiles.checked
        ? state.languages.flatMap((language) => (state.filesByLanguage[language] || []).map((file) => ({ language, file })))
        : (state.filesByLanguage[state.language] || []).map((file) => ({ language: state.language, file }));

    const batches = await Promise.all(filesToSearch.map(({ language, file }) => searchFile(language, file, query)));
    renderSearchResults(batches.flat());
}

function queueSearch() {
    clearTimeout(state.searchTimer);
    state.searchTimer = setTimeout(() => {
        runSearch().catch((error) => setStatus(error.message, "error"));
    }, 200);
}

async function loadFile(language, file, focusPath = null) {
    if (!assertCleanChange()) {
        return;
    }

    const data = await api("/api/json/" + encodeURIComponent(language) + "/" + encodeURIComponent(file.replace(/\.json$/i, "")));
    state.language = language;
    state.file = file;
    state.data = JSON.parse(data.content);
    state.arrayIndexes = {};
    if (focusPath) {
        applyFocusPath(focusPath);
    }
    state.rawMode = false;
    state.dirty = false;
    el.rawEditor.value = JSON.stringify(state.data, null, "\t") + "\n";
    el.rawEditor.classList.remove("invalid");
    renderForm();
    renderSelection();
    setStatus("Loaded " + selectedPath() + ".", "ok");
}

async function saveFile() {
    try {
        const content = JSON.stringify(validateJson(), null, "\t") + "\n";
        const data = await api("/api/json/" + encodeURIComponent(state.language) + "/" + encodeURIComponent(state.file.replace(/\.json$/i, "")), {
            method: "PUT",
            body: JSON.stringify({ content, generateMin: true }),
        });
        delete state.searchCache[state.language + "/" + state.file];
        state.dirty = false;
        await loadFile(state.language, state.file);
        setStatus("Saved " + data.saved + " and generated " + data.minified.join(", ") + ".", "ok");
    } catch (error) {
        el.rawEditor.classList.add("invalid");
        setStatus(error.message, "error");
    }
}

async function syncMissingStructure() {
    if (!state.language || !state.file || !state.data) {
        return;
    }

    try {
        const sourceData = validateJson();
        const updates = [];
        const targetLanguages = state.languages.filter((language) => language !== state.language);

        for (const language of targetLanguages) {
            if (!(state.filesByLanguage[language] || []).includes(state.file)) {
                updates.push(language + ": missing file");
                continue;
            }

            const response = await api("/api/json/" + encodeURIComponent(language) + "/" + encodeURIComponent(state.file.replace(/\.json$/i, "")));
            const targetData = JSON.parse(response.content);
            const merged = cloneMissingStructure(sourceData, targetData);

            if (!merged.changed) {
                updates.push(language + ": already complete");
                continue;
            }

            const content = JSON.stringify(merged.value, null, "\t") + "\n";
            await api("/api/json/" + encodeURIComponent(language) + "/" + encodeURIComponent(state.file.replace(/\.json$/i, "")), {
                method: "PUT",
                body: JSON.stringify({ content, generateMin: true }),
            });
            delete state.searchCache[language + "/" + state.file];
            updates.push(language + ": updated");
        }

        setStatus("Synced missing structure from " + state.language + "/" + state.file + ". " + updates.join("; "), "ok");
    } catch (error) {
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
el.syncMissing.addEventListener("click", syncMissingStructure);
el.rawToggle.addEventListener("click", () => {
    try {
        if (state.rawMode) {
            state.data = JSON.parse(el.rawEditor.value);
            renderForm();
            state.rawMode = false;
        } else {
            el.rawEditor.value = JSON.stringify(state.data, null, "\t") + "\n";
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
el.searchInput.addEventListener("input", queueSearch);
el.searchAllFiles.addEventListener("change", queueSearch);
el.pickFirst.addEventListener("click", () => {
    const first = (state.filesByLanguage[state.language] || [])[0];
    if (first) {
        loadFile(state.language, first);
    }
});
el.newLanguage.addEventListener("keydown", (event) => event.key === "Enter" && addLanguage());
el.newFile.addEventListener("keydown", (event) => event.key === "Enter" && addFile());

loadState().catch((error) => setStatus(error.message, "error"));
