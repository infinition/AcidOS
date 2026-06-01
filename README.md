# AcidOS

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) [![Release](https://img.shields.io/github/v/release/infinition/AcidOS?style=flat)](https://github.com/infinition/AcidOS/releases) [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/infinition)

A desktop operating system simulator running entirely in the browser. No installation, no build tools, no Node.js required. Open `index.html` and it works.

<img width="1534" height="1105" alt="AcidOS desktop" src="https://github.com/user-attachments/assets/830a4f18-ea85-4616-ad8e-734d19d2c902" />

Built with React 18 (via CDN), Tailwind CSS, and Babel Standalone so JSX compiles in the browser at load time.

---

## Features

- Window manager with drag, resize, minimize, and maximize.
- Built-in widgets: Kanban board, mini IDE, cryptocurrency tracker, breathing exercise, water tracker.
- Custom widget support: drop in any HTML/CSS/JS block.
- Layout and data auto-saved to localStorage.
- Dark, Light, and Cyberpunk themes.

<img width="935" height="925" alt="AcidOS widgets" src="https://github.com/user-attachments/assets/5c3a066d-d876-4c52-b02c-c9fa69fe7f1e" />

<img width="708" height="906" alt="AcidOS theme" src="https://github.com/user-attachments/assets/a7888349-9409-451e-8773-3d3ff63ff575" />

---

## Running

**Direct open** - double-click `index.html`. Works in Chrome and Edge. Firefox may block some storage APIs on `file://`.

**Local server (recommended)**

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Or use the Live Server extension in VS Code.

---

## File layout

```
index.html              # Entry point
css/
  style.css             # Scrollbars and base styles
js/
  app.jsx               # Full OS logic (window manager, widgets, state)
  tailwind.config.js    # Theme and animation configuration
```

---

## Notes

- Babel compiles JSX in the browser on every load. Fine for personal use, not suited for high-traffic production.
- Clearing browser localStorage resets the desktop to defaults.

---

## Star History

<a href="https://www.star-history.com/?repos=infinition%2FAcidOS&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=infinition/AcidOS&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=infinition/AcidOS&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=infinition/AcidOS&type=date&legend=top-left" />
 </picture>
</a>

---

## License

MIT. See [LICENSE](LICENSE).
