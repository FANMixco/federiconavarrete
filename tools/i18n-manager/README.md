# i18n Manager

Local UI for editing the JSON files in `js/i18n` and generating the matching minified files in each language's `min` folder.

From the repository root, run this command:

```bash
npm run i18n:manager
```

Or run it directly with Node:

```bash
node tools/i18n-manager/server.js
```

Then open:

```text
http://localhost:4173
```

If that port is already in use, the manager automatically tries the next available port and prints the final URL in the terminal.
