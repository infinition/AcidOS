
# WebOS Ultimate V6 🖥️

A fully functional desktop operating system simulator running entirely in the browser.
**No installation, no build tools, no Node.js required.**

<img width="1534" height="1105" alt="image" src="https://github.com/user-attachments/assets/830a4f18-ea85-4616-ad8e-734d19d2c902" />

Built with **React 18**, **Tailwind CSS**, and **Babel** (Standalone).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![React](https://img.shields.io/badge/React-CDN-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-Play-38bdf8)

## ✨ Features

* **Zero-Build Architecture:** Just open `index.html`.
* **Window Manager:** Drag, resize, minimize, maximize windows.
* **Widgets:** Custom Widgets (HTML CSS JS) + Already created Kanban Board, Mini IDE, Cryptocurrency Tracker, Breathing Exercise, Water Tracker..
* **Persistence:** Auto-saves layout and data to `localStorage`.
* **Theming:** Dark/Light/Cyberpunk modes via Tailwind configuration.
* **Fluid Animations:** Custom animations defined in `tailwind.config.js`.
  
<img width="935" height="925" alt="image" src="https://github.com/user-attachments/assets/5c3a066d-d876-4c52-b02c-c9fa69fe7f1e" />

<img width="708" height="906" alt="image" src="https://github.com/user-attachments/assets/a7888349-9409-451e-8773-3d3ff63ff575" />

## 📂 Project Structure

Ensure your folder looks exactly like this for the paths to work:

```text
/project-root
│
├── index.html              # Entry point (Load scripts & DOM root)
├── css/
│   └── style.css           # Custom scrollbars & body styles
└── js/
    ├── app.jsx             # MAIN LOGIC (Paste the React code here)
    └── tailwind.config.js  # Animation & Theme configuration
````

## 🚀 How to Run

### Method 1: Direct Open (Simple)

Simply double-click **`index.html`** to open it in your web browser.
*(Note: Some browsers might block ES6 modules or specific storage features on `file://` protocol. If so, use Method 2).*

### Method 2: Local Server (Recommended)

If you have VS Code, install the "Live Server" extension.

1.  Right-click `index.html`.
2.  Select **"Open with Live Server"**.

## 📝 Configuration

### 1\. The Logic (`js/app.jsx`)

This file contains the entire OS logic (Window manager, Widgets, State).

  * *Note:* The script tag in HTML is `<script type="text/babel" ...>` to allow the browser to compile JSX on the fly.

### 2\. Styling (`js/tailwind.config.js`)

Tailwind is loaded via CDN. The config file extends the theme to add custom animations like the "jiggle" effect (Edit mode).

```javascript
// Example from js/tailwind.config.js
tailwind.config = {
    theme: {
        extend: {
            animation: {
                jiggle: 'jiggle 0.3s infinite alternate',
            }
        }
    }
}
```

## 🛠️ Tech Details

  * **React & ReactDOM:** Loaded via Unpkg (UMD).
  * **Babel:** Used to transpile JSX inside the browser (`@babel/standalone`).
  * **Tailwind:** Used via the CDN script, processing classes at runtime.

## ⚠️ Notes

  * **Performance:** Since Babel compiles JSX in the browser on every load, this setup is perfect for prototyping or personal tools but not recommended for heavy production sites.
  * **Data:** Clearing your browser cache/local storage will reset the desktop.

## 📄 License

Open Source. Feel free to modify and distribute.

