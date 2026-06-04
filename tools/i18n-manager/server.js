const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT = path.resolve(__dirname, "..", "..");
const I18N_DIR = path.join(ROOT, "js", "i18n");
const PUBLIC_DIR = path.join(__dirname, "public");
const START_PORT = Number(process.env.PORT || process.env.I18N_PORT || 4173);

const MIME_TYPES = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
};

function send(res, status, body, contentType = "application/json") {
    res.writeHead(status, {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
    });
    res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
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

function routeStatic(req, res, url) {
    if (req.method !== "GET") {
        fail(res, 405, "Method is not allowed.");
        return;
    }

    const requestPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const target = path.normalize(path.join(PUBLIC_DIR, requestPath));

    if (!target.startsWith(PUBLIC_DIR) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
        fail(res, 404, "Page was not found.");
        return;
    }

    send(res, 200, fs.readFileSync(target), MIME_TYPES[path.extname(target)] || "application/octet-stream");
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith("/api/")) {
        routeApi(req, res, url);
        return;
    }

    routeStatic(req, res, url);
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
