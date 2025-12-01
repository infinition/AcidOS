const { useState, useEffect, useRef, useMemo } = React;

// --- ICONES (Remplacement de lucide-react pour éviter les erreurs d'import) ---
const Icons = {
    Settings: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
    Plus: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    XIcon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Grid: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    Edit3: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    Download: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Upload: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    Monitor: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    Trash2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>,
    Check: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>,
    Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Undo: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>,
    Redo: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 3.7" /></svg>,
    Resize: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 3h6v6" /><path d="M14 10l6.1-6.1" /><path d="M9 21H3v-6" /><path d="M10 14l-6.1 6.1" /></svg>
};

const { Settings, Plus, XIcon, Grid, Edit3, Download, Upload, Monitor, Trash2, Check, Search, Undo, Redo, Resize } = Icons;

// --- WALLPAPERS ---
const WALLPAPERS = [
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2070&q=80', // Mountains
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=2070&q=80', // Dark Mountains
    'https://images.unsplash.com/photo-1519681393798-38e43269d877?auto=format&fit=crop&w=2070&q=80', // Starry Sky
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2070&q=80', // Cyberpunk City
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=2070&q=80', // Nature
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2070&q=80', // Earth
];

// --- THEMES ---
const THEMES = {
    dark: { name: 'Dark', bg: 'bg-slate-900', text: 'text-white', accent: 'bg-blue-600', dock: 'bg-white/20', folder: 'bg-slate-800/90' },
    light: { name: 'Light', bg: 'bg-gray-100', text: 'text-slate-900', accent: 'bg-blue-500', dock: 'bg-black/10', folder: 'bg-white/90' },
    cyberpunk: { name: 'Cyberpunk', bg: 'bg-black', text: 'text-yellow-400', accent: 'bg-pink-600', dock: 'bg-purple-900/50', folder: 'bg-slate-900/90' },
    forest: { name: 'Forest', bg: 'bg-green-900', text: 'text-green-100', accent: 'bg-green-600', dock: 'bg-black/20', folder: 'bg-green-800/90' }
};

// --- WIDGET TEMPLATES ---
const WIDGET_TEMPLATES = [
    // --- ORIGINAUX ---
    {
        type: 'widget', title: 'Horloge', cols: 2, rows: 1, bgColor: '#334155',
        html: `<div id="clock" class="flex flex-col items-center justify-center h-full text-white font-mono">
            <div class="text-4xl font-bold" id="time">00:00</div>
            <div class="text-sm opacity-70" id="date">...</div>
        </div>`,
        css: `#clock { font-family: 'Courier New', monospace; }`,
        js: `const update = () => {
            const now = new Date();
            container.querySelector('#time').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            container.querySelector('#date').innerText = now.toLocaleDateString();
        };
        update();
        const interval = setInterval(update, 1000);
        container._cleanup = () => clearInterval(interval);`
    },
    {
        type: 'widget', title: 'Note', cols: 2, rows: 2, bgColor: '#fef08a',
        html: `<textarea class="w-full h-full bg-transparent resize-none p-2 outline-none text-slate-800 font-hand" placeholder="Écrire une note..."></textarea>`,
        css: `.font-hand { font-family: 'Comic Sans MS', cursive; }`,
        js: `const ta = container.querySelector('textarea');
        const saved = localStorage.getItem('w-note-temp');
        if(saved) ta.value = saved;
        ta.addEventListener('input', () => localStorage.setItem('w-note-temp', ta.value));`
    },
    {
        type: 'widget', title: 'Météo', cols: 2, rows: 1, bgColor: 'glass',
        html: `<div class="flex items-center justify-between px-4 h-full text-white">
            <div class="flex flex-col">
                <span class="text-2xl font-bold">22°C</span>
                <span class="text-xs opacity-80">Paris</span>
            </div>
            <div class="text-4xl">⛅</div>
        </div>`,
        css: ``,
        js: ``
    },
    {
        type: 'widget', title: 'Calendrier', cols: 2, rows: 2, bgColor: '#ffffff',
        html: `<div class="h-full flex flex-col p-2 text-slate-800">
            <div class="text-center font-bold text-red-500 uppercase text-xs mb-1" id="month">Month</div>
            <div class="text-center text-4xl font-bold flex-1 flex items-center justify-center" id="day">1</div>
            <div class="text-center text-xs opacity-50" id="weekday">Day</div>
        </div>`,
        css: ``,
        js: `const now = new Date();
        container.querySelector('#month').innerText = now.toLocaleString('default', { month: 'long' });
        container.querySelector('#day').innerText = now.getDate();
        container.querySelector('#weekday').innerText = now.toLocaleString('default', { weekday: 'long' });`
    },

    // --- LES DEMANDES PRECEDENTES (PORTÉES) ---
    {
        type: 'widget', title: 'Calculatrice', cols: 2, rows: 2, bgColor: '#1f2937',
        html: `<div class="grid grid-cols-4 gap-1 h-full p-1">
            <div id="disp" class="col-span-4 bg-gray-900 text-white flex items-center justify-end px-2 rounded mb-1 text-xl">0</div>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('7')">7</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('8')">8</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('9')">9</button>
            <button class="bg-orange-500 text-white rounded" onclick="app('+')">+</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('4')">4</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('5')">5</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('6')">6</button>
            <button class="bg-orange-500 text-white rounded" onclick="app('-')">-</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('1')">1</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('2')">2</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600" onclick="app('3')">3</button>
            <button class="bg-blue-500 text-white rounded row-span-2" onclick="calc()">=</button>
            <button class="bg-gray-700 text-white rounded hover:bg-gray-600 col-span-2" onclick="app('0')">0</button>
            <button class="bg-red-500 text-white rounded" onclick="clr()">C</button>
        </div>`,
        css: `button { transition: background 0.1s; } button:active { transform: scale(0.95); }`,
        js: `const d = container.querySelector('#disp');
        let c = '';
        container.querySelectorAll('button').forEach(b => {
            const t = b.innerText;
            if(t === '=') b.onclick = () => { try { c = eval(c); d.innerText = c; } catch { d.innerText = 'Err'; c=''; } };
            else if(t === 'C') b.onclick = () => { c = ''; d.innerText = '0'; };
            else b.onclick = () => { c += t; d.innerText = c; };
        });`
    },
    {
        type: 'widget', title: 'YouTube', cols: 2, rows: 2, bgColor: '#000000',
        html: `<iframe class="w-full h-full pointer-events-auto" src="https://www.youtube.com/embed/5qap5aO4i9A?controls=0&autoplay=1&mute=1" title="LoFi Girl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        css: ``,
        js: ``
    },
    {
        type: 'widget', title: 'Plex', cols: 2, rows: 1, bgColor: '#282a2d',
        html: `<div class="flex items-center justify-between h-full px-3 text-gray-200">
            <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e5a00d" d="M11.64,2.69L10.36,1.41C10,1.05 9.4,1.05 9.04,1.41L2.69,7.76C2.33,8.12 2.33,8.72 2.69,9.08L14.91,21.31C15.27,21.67 15.87,21.67 16.23,21.31L17.51,20.03C17.87,19.67 17.87,19.07 17.51,18.71L6.6,7.8L11.64,2.69Z" /></svg>
            <div class="flex flex-col mx-2">
                <span class="font-bold text-white text-sm">Plex Server</span>
                <span class="text-xs text-[#e5a00d] font-bold">ONLINE</span>
            </div>
            <button class="bg-[#e5a00d] text-black text-xs font-bold px-3 py-1 rounded-full hover:bg-yellow-500 transition">GO</button>
        </div>`,
        css: ``,
        js: `container.querySelector('button').onclick = () => window.open('https://app.plex.tv', '_blank');`
    },
    {
        type: 'widget', title: 'To-Do', cols: 2, rows: 2, bgColor: '#ffffff',
        html: `<div class="flex flex-col h-full p-2 text-slate-800">
            <div class="flex gap-2 mb-2">
                <input type="text" class="flex-1 border rounded px-1 text-sm outline-none focus:border-blue-500" placeholder="Tâche...">
                <button class="bg-blue-500 text-white rounded w-6 flex items-center justify-center">+</button>
            </div>
            <ul class="flex-1 overflow-y-auto text-sm space-y-1 custom-scroll"></ul>
        </div>`,
        css: `.done { text-decoration: line-through; opacity: 0.5; } .custom-scroll::-webkit-scrollbar { width: 4px; } .custom-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }`,
        js: `const inp = container.querySelector('input');
        const list = container.querySelector('ul');
        const render = () => {
            const tasks = JSON.parse(localStorage.getItem('w-todo') || '[]');
            list.innerHTML = tasks.map((t,i) => \`<li class="flex items-center cursor-pointer \${t.d?'done':''}" data-i="\${i}"><span>\${t.t}</span><span class="ml-auto text-red-500 font-bold px-1 hover:bg-red-100 rounded">×</span></li>\`).join('');
            container.querySelectorAll('li').forEach(li => {
                li.onclick = (e) => {
                    const i = li.dataset.i;
                    if(e.target.innerText === '×') tasks.splice(i,1);
                    else tasks[i].d = !tasks[i].d;
                    localStorage.setItem('w-todo', JSON.stringify(tasks));
                    render();
                };
            });
        };
        container.querySelector('button').onclick = () => { if(inp.value) { const t = JSON.parse(localStorage.getItem('w-todo') || '[]'); t.push({t:inp.value, d:false}); localStorage.setItem('w-todo', JSON.stringify(t)); inp.value=''; render(); }};
        render();`
    },
    {
        type: 'widget', title: 'Pomodoro', cols: 2, rows: 2, bgColor: '#e11d48',
        html: `<div class="flex flex-col items-center justify-center h-full text-white">
            <div class="text-4xl font-mono font-bold mb-2" id="timer">25:00</div>
            <div class="flex gap-2">
                <button id="start" class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-red-600 transition">▶</button>
                <button id="reset" class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-red-600 transition">↺</button>
            </div>
        </div>`,
        css: ``,
        js: `let time = 1500; let int = null;
        const disp = container.querySelector('#timer');
        const update = () => disp.innerText = \`\${Math.floor(time/60).toString().padStart(2,'0')}:\${(time%60).toString().padStart(2,'0')}\`;
        container.querySelector('#start').onclick = () => {
            if(int) { clearInterval(int); int=null; }
            else { int = setInterval(() => { if(time>0) { time--; update(); } else { clearInterval(int); alert('Fini!'); } }, 1000); }
        };
        container.querySelector('#reset').onclick = () => { clearInterval(int); int=null; time=1500; update(); };
        container._cleanup = () => clearInterval(int);`
    },
    {
        type: 'widget', title: 'Bitcoin', cols: 2, rows: 1, bgColor: '#111827',
        html: `<div class="flex items-center justify-between px-4 h-full text-white">
            <div class="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">₿</div>
            <div class="text-right">
                <div class="text-xs opacity-60">BTC/USD</div>
                <div class="text-xl font-mono font-bold" id="price">$96,432</div>
                <div class="text-xs text-green-400">+2.4%</div>
            </div>
        </div>`,
        css: ``,
        js: `const p = container.querySelector('#price');
        // Fake live update
        const tick = setInterval(() => {
            const base = 96000;
            const rand = Math.floor(Math.random() * 500);
            p.innerText = '$' + (base + rand).toLocaleString();
        }, 3000);
        container._cleanup = () => clearInterval(tick);`
    },

    // --- LES 10 NOUVEAUX WIDGETS ---

    // 1. Hydratation Tracker
    {
        type: 'widget', title: 'Eau', cols: 1, rows: 2, bgColor: '#3b82f6',
        html: `<div class="flex flex-col items-center justify-center h-full text-white">
            <div class="text-3xl mb-2 animate-bounce">💧</div>
            <div class="text-2xl font-bold mb-2"><span id="count">0</span>/8</div>
            <div class="flex gap-1">
                <button class="w-6 h-6 bg-white/30 rounded-full hover:bg-white/50" id="minus">-</button>
                <button class="w-6 h-6 bg-white/30 rounded-full hover:bg-white/50" id="plus">+</button>
            </div>
        </div>`,
        css: ``,
        js: `const c = container.querySelector('#count');
        let val = parseInt(localStorage.getItem('w-water')||'0');
        const up = () => { c.innerText = val; localStorage.setItem('w-water', val); };
        container.querySelector('#plus').onclick = () => { if(val<8) val++; up(); };
        container.querySelector('#minus').onclick = () => { if(val>0) val--; up(); };
        up();`
    },
    // 2. Tic-Tac-Toe (Morpion rapide)
    {
        type: 'widget', title: 'Morpion', cols: 2, rows: 2, bgColor: '#475569',
        html: `<div class="grid grid-cols-3 gap-1 h-full p-2" id="grid">
             <!-- Cells added via JS -->
        </div>`,
        css: `.cell { background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.5em; font-weight: bold; color: white; cursor: pointer; border-radius: 4px; } .cell:hover { background: rgba(255,255,255,0.2); }`,
        js: `const g = container.querySelector('#grid');
        let turn = 'X';
        for(let i=0; i<9; i++) {
            const d = document.createElement('div');
            d.className = 'cell';
            d.onclick = () => { if(!d.innerText) { d.innerText = turn; turn = turn==='X'?'O':'X'; } else { d.innerText = ''; } };
            g.appendChild(d);
        }`
    },
    // 3. Respiration (Relaxation)
    {
        type: 'widget', title: 'Respire', cols: 2, rows: 2, bgColor: '#8b5cf6',
        html: `<div class="flex flex-col items-center justify-center h-full text-white relative overflow-hidden">
            <div class="circle absolute bg-white/20 rounded-full"></div>
            <div class="text-lg font-bold z-10 animate-pulse">Inhale... Exhale</div>
        </div>`,
        css: `.circle { width: 50px; height: 50px; animation: breathe 4s infinite ease-in-out; } 
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(3); } }`,
        js: ``
    },
    // 4. Citation du jour
    {
        type: 'widget', title: 'Inspiration', cols: 2, rows: 1, bgColor: '#f43f5e',
        html: `<div class="h-full flex items-center justify-center p-4 text-center text-white italic font-serif text-sm">
            "La seule façon de faire du bon travail est d'aimer ce que vous faites."
        </div>`,
        css: ``,
        js: `const quotes = [
            "L'avenir appartient à ceux qui croient à la beauté de leurs rêves.",
            "Il n'est jamais trop tard pour être ce que vous auriez pu être.",
            "La créativité, c'est l'intelligence qui s'amuse."
        ];
        container.querySelector('div').innerText = '"' + quotes[Math.floor(Math.random() * quotes.length)] + '"';
        container.onclick = () => container.querySelector('div').innerText = '"' + quotes[Math.floor(Math.random() * quotes.length)] + '"';`
    },
    // 5. Chronomètre
    {
        type: 'widget', title: 'Chrono', cols: 2, rows: 1, bgColor: '#059669',
        html: `<div class="flex items-center justify-between px-4 h-full text-white">
            <div class="text-2xl font-mono" id="val">0.0s</div>
            <button class="bg-white/20 px-3 py-1 rounded hover:bg-white/40 font-bold text-xs">START</button>
        </div>`,
        css: ``,
        js: `let start = 0; let run = false; let raf;
        const d = container.querySelector('#val');
        const b = container.querySelector('button');
        const tick = () => { 
            if(run) { 
                d.innerText = ((Date.now() - start)/1000).toFixed(1) + 's'; 
                requestAnimationFrame(tick); 
            } 
        };
        b.onclick = () => {
            if(!run) { run=true; start=Date.now(); tick(); b.innerText='STOP'; }
            else { run=false; b.innerText='RST'; }
        };`
    },
    // 6. System Monitor (Fake)
    {
        type: 'widget', title: 'Système', cols: 2, rows: 2, bgColor: '#1e1e1e',
        html: `<div class="flex flex-col justify-center h-full p-3 gap-3 text-xs text-green-500 font-mono">
            <div>
                <div class="flex justify-between mb-1"><span>CPU</span><span id="cpu-txt">12%</span></div>
                <div class="w-full bg-gray-700 h-2 rounded"><div id="cpu-bar" class="bg-green-500 h-full rounded" style="width: 12%"></div></div>
            </div>
            <div>
                <div class="flex justify-between mb-1"><span>RAM</span><span id="ram-txt">45%</span></div>
                <div class="w-full bg-gray-700 h-2 rounded"><div id="ram-bar" class="bg-green-500 h-full rounded" style="width: 45%"></div></div>
            </div>
        </div>`,
        css: ``,
        js: `const r = () => Math.floor(Math.random()*100);
        const inv = setInterval(() => {
            const c = r(); const m = r();
            container.querySelector('#cpu-bar').style.width = c+'%'; container.querySelector('#cpu-txt').innerText = c+'%';
            container.querySelector('#ram-bar').style.width = m+'%'; container.querySelector('#ram-txt').innerText = m+'%';
        }, 2000);
        container._cleanup = () => clearInterval(inv);`
    },
    // 7. Lanceur de Dés
    {
        type: 'widget', title: 'Dés', cols: 1, rows: 1, bgColor: '#ffffff',
        html: `<div class="flex items-center justify-center h-full text-6xl text-slate-800 cursor-pointer select-none">🎲</div>`,
        css: ``,
        js: `const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
        container.onclick = () => {
            const d = container.querySelector('div');
            d.style.transform = 'rotate(360deg)';
            d.style.transition = '0.5s';
            setTimeout(() => {
                d.innerText = faces[Math.floor(Math.random()*6)];
                d.style.transform = 'rotate(0deg)';
                d.style.transition = '0s';
            }, 500);
        };`
    },
    // 8. Raccourcis Sociaux
    {
        type: 'widget', title: 'Social', cols: 2, rows: 1, bgColor: '#0ea5e9',
        html: `<div class="grid grid-cols-4 h-full items-center justify-items-center text-white text-2xl">
            <div class="cursor-pointer hover:scale-110 transition" title="Mail">✉️</div>
            <div class="cursor-pointer hover:scale-110 transition" title="Maps">🗺️</div>
            <div class="cursor-pointer hover:scale-110 transition" title="Photos">🖼️</div>
            <div class="cursor-pointer hover:scale-110 transition" title="Music">🎵</div>
        </div>`,
        css: ``,
        js: ``
    },
    // 9. Switch (Interrupteur Lumière)
    {
        type: 'widget', title: 'Lumière', cols: 1, rows: 1, bgColor: '#fbbf24',
        html: `<div class="flex flex-col items-center justify-center h-full">
            <div class="toggle w-12 h-6 bg-black/20 rounded-full p-1 cursor-pointer transition-colors duration-300">
                <div class="dot w-4 h-4 bg-white rounded-full shadow-md transform duration-300"></div>
            </div>
            <span class="text-xs font-bold text-white mt-2 uppercase">ON</span>
        </div>`,
        css: ``,
        js: `let on = true;
        const t = container.querySelector('.toggle');
        const d = container.querySelector('.dot');
        const s = container.querySelector('span');
        t.onclick = () => {
            on = !on;
            d.style.transform = on ? 'translateX(0)' : 'translateX(24px)';
            s.innerText = on ? 'ON' : 'OFF';
            t.style.background = on ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)';
            // Simulate Hue API call here
        };`
    },
    // 10. Compte à rebours (Nouvel an ou Event)
    {
        type: 'widget', title: 'Event', cols: 2, rows: 1, bgColor: '#6366f1',
        html: `<div class="flex flex-col items-center justify-center h-full text-white">
            <div class="text-xs uppercase opacity-70 mb-1">Vacances</div>
            <div class="flex gap-2 font-mono text-xl font-bold">
                <div>04<span class="text-xs font-sans font-normal opacity-50">j</span></div>
                <div>12<span class="text-xs font-sans font-normal opacity-50">h</span></div>
                <div>30<span class="text-xs font-sans font-normal opacity-50">m</span></div>
            </div>
        </div>`,
        css: ``,
        js: ``
    }
];

// --- DATA ---
const DEFAULT_ITEMS = [
    { id: '1', pageIndex: 0, dockOrder: 0, type: 'app', title: 'Finder', icon: '😊', cols: 1, rows: 1, x: 1, y: 1, bgColor: '#3b82f6' },
    { id: '2', pageIndex: 0, dockOrder: 1, type: 'app', title: 'Safari', url: 'https://google.com', icon: '🧭', cols: 1, rows: 1, x: 2, y: 1, bgColor: '#ffffff' },
    { id: '3', pageIndex: 0, dockOrder: 2, type: 'app', title: 'YouTube', url: 'https://youtube.com', icon: '▶️', cols: 1, rows: 1, x: 3, y: 1, bgColor: '#dc2626' },
    {
        id: '4', pageIndex: 0, dockOrder: 3, type: 'folder', title: 'Travail', children: [
            { id: '4-1', pageIndex: 0, type: 'app', title: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', cols: 1, rows: 1, bgColor: '#1d4ed8' },
        ], icon: '📁', cols: 1, rows: 1, x: 4, y: 1, bgColor: '#334155'
    },
    {
        id: '6', pageIndex: 0, type: 'widget', title: 'Calculatrice',
        html: `<div class="calc-grid">
      <div id="display">0</div>
      <button onclick="append('1')">1</button><button onclick="append('2')">2</button><button onclick="append('3')">3</button>
      <button onclick="append('+')" class="op">+</button>
      <button onclick="append('4')">4</button><button onclick="append('5')">5</button><button onclick="append('6')">6</button>
      <button onclick="append('-')" class="op">-</button>
      <button onclick="solve()" class="span-2 bg-blue">EQ</button>
      <button onclick="clearDisplay()" class="bg-red">C</button>
    </div>`,
        css: `.calc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; height: 100%; padding: 5px; }
          button { background: #333; color: white; border: none; border-radius: 5px; font-size: 1.2em; cursor: pointer; }
          button:active { background: #555; }
          .op { background: orange; }
          .bg-blue { background: #3b82f6; } .bg-red { background: #ef4444; }
          .span-2 { grid-column: span 2; }
          #display { grid-column: span 4; background: #222; color: white; display: flex; align-items: center; justify-content: flex-end; padding: 10px; font-size: 1.5em; border-radius: 5px; }`,
        js: `const display = container.querySelector('#display'); let c = ''; window.append = (v) => { c += v; display.innerText = c; }; window.solve = () => { try { c = eval(c); display.innerText = c; } catch(e) { display.innerText = 'Err'; } }; window.clearDisplay = () => { c = ''; display.innerText = '0'; };`,
        cols: 2, rows: 2, x: 1, y: 2, bgColor: '#1f2937'
    }
];

// --- WIDGET RUNNER ---
const WidgetRunner = ({ id, html, css, js, isEditing }) => {
    const containerRef = useRef(null);
    const styleRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (styleRef.current) styleRef.current.remove();
        const scopeId = `widget-${id}`;
        containerRef.current.innerHTML = html || '';
        containerRef.current.classList.add(scopeId);
        if (css) {
            const style = document.createElement('style');
            const scopedCss = css.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g, `.${scopeId} $1$2`);
            style.innerHTML = scopedCss;
            document.head.appendChild(style);
            styleRef.current = style;
        }
        if (js) {
            try { new Function('container', js)(containerRef.current); } catch (e) { }
        }
        return () => { if (styleRef.current) styleRef.current.remove(); };
    }, [html, css, js, id]);

    return (
        <div className="w-full h-full relative">
            <div ref={containerRef} className="w-full h-full overflow-hidden"
                onPointerDown={(e) => !isEditing && e.stopPropagation()}
                onTouchStart={(e) => !isEditing && e.stopPropagation()} />
            {isEditing && <div className="absolute inset-0 z-10 bg-transparent cursor-move" />}
        </div>
    );
};

// --- WINDOW FRAME ---
const WindowFrame = ({ window: win, onClose, onMinimize, onMaximize, onFocus, onUpdate }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

    const handleMouseDown = (e) => {
        if (win.isMaximized) return;
        onFocus(win.id);
        setIsDragging(true);
        setDragOffset({ x: e.clientX - win.x, y: e.clientY - win.y });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                onUpdate(win.id, { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
            } else if (isResizing) {
                onUpdate(win.id, {
                    w: Math.max(300, resizeStart.w + (e.clientX - resizeStart.x)),
                    h: Math.max(200, resizeStart.h + (e.clientY - resizeStart.y))
                });
            }
        };
        const handleMouseUp = () => { setIsDragging(false); setIsResizing(false); };
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, resizeStart, win.id, onUpdate]);

    if (win.isMinimized) return null;

    return (
        <div
            className={`absolute flex flex-col overflow-hidden rounded-lg shadow-2xl border border-white/20 backdrop-blur-xl transition-all duration-200 ${win.isMaximized ? 'inset-0 rounded-none' : ''}`}
            style={{
                left: win.isMaximized ? 0 : win.x,
                top: win.isMaximized ? 0 : win.y,
                width: win.isMaximized ? '100%' : win.w,
                height: win.isMaximized ? '100%' : win.h,
                zIndex: win.zIndex,
                backgroundColor: win.isMaximized ? '#0f172a' : 'rgba(15, 23, 42, 0.8)'
            }}
            onMouseDown={() => onFocus(win.id)}
        >
            {/* Title Bar */}
            <div className="h-8 bg-white/10 flex items-center justify-between px-2 select-none cursor-default"
                onMouseDown={handleMouseDown}
                onDoubleClick={() => onMaximize(win.id)}
            >
                <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); onClose(win.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
                    <button onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
                    <button onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
                </div>
                <div className="text-xs font-bold text-white/80">{win.title}</div>
                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 relative bg-white">
                {win.url ? (
                    <iframe src={win.url} className="w-full h-full border-none" title={win.title} />
                ) : (
                    <div className="w-full h-full p-4 text-slate-900">
                        {win.content || <div className="flex items-center justify-center h-full text-slate-400">Contenu non disponible</div>}
                    </div>
                )}
                {/* Overlay to capture clicks when dragging (prevents iframe interference) */}
                {(isDragging || isResizing) && <div className="absolute inset-0 z-50 bg-transparent" />}
            </div>

            {/* Resize Handle */}
            {!win.isMaximized && (
                <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeStart({ x: e.clientX, y: e.clientY, w: win.w, h: win.h });
                    }}
                />
            )}
        </div>
    );
};

// --- APP ---
function WebOSUltimateV6() {
    const [items, setItems] = useState(DEFAULT_ITEMS);
    const [config, setConfig] = useState({
        barPosition: 'bottom', wallpaper: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2070&q=80', viewMode: 'grid',
        theme: 'dark'
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [folderPath, setFolderPath] = useState([]); // Stack of folder IDs
    const currentFolderId = folderPath.length > 0 ? folderPath[folderPath.length - 1] : null;

    const [editItem, setEditItem] = useState(null);

    // --- RECURSIVE HELPERS ---
    const findItem = (items, id) => {
        for (const item of items) {
            if (item.id === id) return { item, parent: null, parentList: items };
            if (item.children) {
                const found = findItem(item.children, id);
                if (found) return { item: found.item, parent: item, parentList: item.children };
            }
        }
        return null;
    };

    const updateItemDeep = (items, id, updates) => {
        return items.map(item => {
            if (item.id === id) return { ...item, ...updates };
            if (item.children) return { ...item, children: updateItemDeep(item.children, id, updates) };
            return item;
        });
    };

    const deleteItemDeep = (items, id) => {
        return items.filter(i => i.id !== id).map(item => {
            if (item.children) return { ...item, children: deleteItemDeep(item.children, id) };
            return item;
        });
    };

    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetGallery, setShowWidgetGallery] = useState(false);

    // Window Manager State
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const zIndexCounter = useRef(100);

    // Drag Preview State
    const [dragPlaceholder, setDragPlaceholder] = useState(null);
    const [gridRowHeight, setGridRowHeight] = useState(100);
    const [gridCols, setGridCols] = useState(8); // Default to mobile cols

    // Undo/Redo State
    const [history, setHistory] = useState({ past: [], future: [] });

    // Widget Templates State
    const [widgetTemplates, setWidgetTemplates] = useState(WIDGET_TEMPLATES);

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Drag State
    const [draggingId, setDraggingId] = useState(null);
    const [dragSource, setDragSource] = useState('grid');
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const dragItemRef = useRef(null);

    // Resize State
    const [resizeHandle, setResizeHandle] = useState(null); // { id, startX, startY, startCols, startRows }

    const longPressTimer = useRef(null);
    const pageFlipTimer = useRef(null); // NEW: Timer pour changement de page
    const pointerDownPos = useRef(null);
    const touchStartRef = useRef(null);
    const doubleClickTimer = useRef(null);

    // Hide loading
    useEffect(() => {
        const l = document.getElementById('loading');
        if (l) l.style.display = 'none';
    }, []);

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('webos-v6');
        if (saved) {
            try { const p = JSON.parse(saved); setItems(p.items); setConfig(p.config); } catch (e) { }
        }
        const savedWidgets = localStorage.getItem('webos-widgets');
        if (savedWidgets) {
            try { setWidgetTemplates(JSON.parse(savedWidgets)); } catch (e) { }
        }
    }, []);

    const save = (newItems, newConfig = config, recordHistory = true) => {
        if (recordHistory) {
            setHistory(prev => {
                const newPast = [...prev.past, items];
                if (newPast.length > 20) newPast.shift();
                return { past: newPast, future: [] };
            });
        }
        setItems(newItems); setConfig(newConfig);
        localStorage.setItem('webos-v6', JSON.stringify({ items: newItems, config: newConfig }));
    };

    const undo = () => {
        if (history.past.length === 0) return;
        const previous = history.past[history.past.length - 1];
        const newPast = history.past.slice(0, -1);
        setHistory({ past: newPast, future: [items, ...history.future] });
        save(previous, config, false);
    };

    const redo = () => {
        if (history.future.length === 0) return;
        const next = history.future[0];
        const newFuture = history.future.slice(1);
        setHistory({ past: [...history.past, items], future: newFuture });
        save(next, config, false);
    };

    const wheelTimeout = useRef(null);

    // Important: Inclure currentPage pour afficher les pages vides en cours de création
    const maxPage = Math.max(...items.map(i => i.pageIndex), currentPage, 0);

    // Keyboard Shortcuts & Wheel Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
            // Undo/Redo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (e.shiftKey) redo();
                else undo();
            }
            // Page Navigation (Arrows)
            if (!isSearchOpen && !isEditing && !showSettings && !currentFolderId) {
                if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(p + 1, maxPage));
                if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(p - 1, 0));
            }
        };

        const handleWheel = (e) => {
            if (isSearchOpen || showSettings || currentFolderId || showWidgetGallery) return;
            if (wheelTimeout.current) return;

            if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
                if (e.deltaY > 0 || e.deltaX > 0) {
                    setCurrentPage(p => Math.min(p + 1, maxPage));
                } else {
                    setCurrentPage(p => Math.max(p - 1, 0));
                }
                wheelTimeout.current = setTimeout(() => {
                    wheelTimeout.current = null;
                }, 500); // Debounce 500ms
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('resize', updateGridMetrics);
        // Initial call
        setTimeout(updateGridMetrics, 100);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', updateGridMetrics);
        };
    }, [history, items, isSearchOpen, isEditing, showSettings, currentFolderId, maxPage, showWidgetGallery]);

    const updateGridMetrics = () => {
        const container = document.querySelector('.grid-container-active');
        if (!container) return;
        const { cols } = getGridMetrics();
        setGridCols(cols);
        const gap = 16; // gap-x-4
        const rect = container.getBoundingClientRect();
        // Calculate column width subtracting gaps
        // totalGap = gap * (cols - 1)
        // colWidth = (width - totalGap) / cols
        const colWidth = (rect.width - (gap * (cols - 1))) / cols;
        setGridRowHeight(colWidth);
    };



    // Custom Grid Span Logic
    // --- GRID HELPERS ---
    const getGridMetrics = () => {
        const width = window.innerWidth;
        let cols = 8; // Was 4
        if (width >= 768) cols = 12; // Was 6
        if (width >= 1024) cols = 16; // Was 8
        return { cols };
    };

    const pixelsToGrid = (x, y, containerRect) => {
        const { cols } = getGridMetrics();
        // Recalculate colWidth to be precise
        const gap = 16;
        const colWidth = (containerRect.width - (gap * (cols - 1))) / cols;
        const rowHeight = gridRowHeight; // Use dynamic height

        // We need to account for gaps in grid calculation
        // x = (colWidth + gap) * (col - 1)
        // col = x / (colWidth + gap) + 1

        const gridX = Math.floor((x - containerRect.left) / (colWidth + gap)) + 1;
        const gridY = Math.floor((y - containerRect.top) / (rowHeight + 24)) + 1; // gap-y-6 is 24px

        return { x: Math.max(1, Math.min(gridX, cols)), y: Math.max(1, gridY) };
    };

    // Custom Grid Span Logic
    const getItemStyle = (item, isDockItem, inFolder) => {
        if (isDockItem || inFolder) return {};
        // If item has no x/y (legacy), we might want to default or let it flow?
        // But for free placement, we need x/y.
        // If no x/y, we can return empty to let it flow, but better to enforce.
        // For now, if no x/y, let it flow (grid-auto-flow will handle it if we didn't disable it).
        // But we want to enforce x/y.

        const style = {
            gridColumnEnd: `span ${item.cols || 1}`,
            gridRowEnd: `span ${item.rows || 1}`,
        };

        if (item.x && item.y) {
            style.gridColumnStart = item.x;
            style.gridRowStart = item.y;
        }

        return style;
    };

    // --- INTERACTION ---

    const handlePointerDown = (e, item, source) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY };

        // Double Click Logic
        const now = Date.now();
        if (doubleClickTimer.current && doubleClickTimer.current.id === item.id && (now - doubleClickTimer.current.time) < 300) {
            setEditItem(item);
            doubleClickTimer.current = null;
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
            return;
        }
        doubleClickTimer.current = { id: item.id, time: now };

        if (!isEditing) {
            longPressTimer.current = setTimeout(() => {
                setIsEditing(true);
                if (navigator.vibrate) navigator.vibrate(50);
                startDrag(e, item, source);
            }, 600);
            return;
        }
        e.preventDefault(); e.stopPropagation();
        startDrag(e, item, source);
    };

    const startDrag = (e, item, source) => {
        let el = document.getElementById(source === 'folder' ? `folder-item-${item.id}` : item.id);
        if (!el && source === 'dock') el = document.getElementById(`dock-${item.id}`);

        if (!el) return;
        const rect = el.getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setDragPos({ x: e.clientX, y: e.clientY });
        dragItemRef.current = item;
        setDraggingId(item.id);
        setDragSource(source);
        if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (pointerDownPos.current && !draggingId && !resizeHandle) {
            const dist = Math.hypot(e.clientX - pointerDownPos.current.x, e.clientY - pointerDownPos.current.y);
            if (dist > 10 && longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
        }

        // Resizing Logic
        if (resizeHandle) {
            e.preventDefault();
            const diffX = e.clientX - resizeHandle.startX;
            const diffY = e.clientY - resizeHandle.startY;

            // Grid cell size approx 100px + gap
            const colDiff = Math.round(diffX / 100);
            const rowDiff = Math.round(diffY / 100);

            const newCols = Math.max(1, Math.min(10, resizeHandle.startCols + colDiff));
            const newRows = Math.max(1, Math.min(10, resizeHandle.startRows + rowDiff));

            if (newCols !== resizeHandle.currentCols || newRows !== resizeHandle.currentRows) {
                // Update local state for smooth preview (optional, or update item directly)
                // Here we update the item directly for simplicity, but in a real app we might want a preview state
                // To avoid flooding history, we don't save to history on every move, only on mouse up
                const newItems = items.map(i => i.id === resizeHandle.id ? { ...i, cols: newCols, rows: newRows } : i);
                setItems(newItems);
                setResizeHandle(prev => ({ ...prev, currentCols: newCols, currentRows: newRows }));
            }
            return;
        }

        if (!draggingId || !dragItemRef.current) return;
        e.preventDefault();
        setDragPos({ x: e.clientX, y: e.clientY });

        // Swipe Down for Search
        if (touchStartRef.current && !draggingId && !isEditing) {
            const diffY = e.clientY - touchStartRef.current.y;
            const diffX = e.clientX - touchStartRef.current.x;
            if (diffY > 50 && Math.abs(diffX) < 30) {
                setIsSearchOpen(true);
                touchStartRef.current = null; // Reset to prevent multiple triggers
            }
        }

        // Edge Detection for Page Switching (NEW)
        const screenW = window.innerWidth;
        const edgeThreshold = 50;

        if (e.clientX > screenW - edgeThreshold) {
            if (!pageFlipTimer.current) {
                pageFlipTimer.current = setTimeout(() => {
                    setCurrentPage(p => p + 1); // Go to next page (creates it if needed thanks to maxPage logic)
                }, 800);
            }
        } else if (e.clientX < edgeThreshold) {
            if (!pageFlipTimer.current) {
                pageFlipTimer.current = setTimeout(() => {
                    setCurrentPage(p => Math.max(p - 1, 0));
                }, 800);
            }
        } else {
            if (pageFlipTimer.current) {
                clearTimeout(pageFlipTimer.current);
                pageFlipTimer.current = null;
            }
        }

        if (config.viewMode === 'desktop' && dragSource === 'dock') {
            const elUnder = document.elementFromPoint(e.clientX, e.clientY);
            const dockItem = elUnder?.closest('[data-dock-id]');
            if (dockItem) {
                const targetId = dockItem.getAttribute('data-dock-id');
                if (targetId && targetId !== draggingId) swapDockOrder(draggingId, targetId);
            }
        }

        // Calculate grid preview
        if (dragItemRef.current && !dragItemRef.current.isDockItem) {
            const container = document.querySelector('.grid-container-active');
            if (container) {
                const rect = container.getBoundingClientRect();
                // Use top-left of the dragged item for snapping
                const itemX = e.clientX - dragOffset.x;
                const itemY = e.clientY - dragOffset.y;

                const { x, y } = pixelsToGrid(itemX, itemY, rect);

                setDragPlaceholder({
                    x,
                    y,
                    w: dragItemRef.current.cols || 1,
                    h: dragItemRef.current.rows || 1
                });
            }
        }
    };

    const handlePointerUp = (e) => {
        if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
        if (pageFlipTimer.current) { clearTimeout(pageFlipTimer.current); pageFlipTimer.current = null; }

        if (resizeHandle) {
            // Commit resize to history
            const item = items.find(i => i.id === resizeHandle.id);
            if (item) {
                // We need to manually trigger a save with history because we only updated state during drag
                // But since we updated state directly, we just need to push to history now.
                // However, our save function expects new items.
                // Let's just call save with current items to trigger persistence and history.
                save(items);
            }
            setResizeHandle(null);
            return;
        }

        if (!draggingId && pointerDownPos.current) {
            const dist = Math.hypot(e.clientX - pointerDownPos.current.x, e.clientY - pointerDownPos.current.y);
            if (dist < 10) {
                let targetEl = e.target.closest('[data-id]');
                if (!targetEl) targetEl = e.target.closest('[data-dock-id]');

                if (targetEl) {
                    const id = targetEl.getAttribute('data-id') || targetEl.getAttribute('data-dock-id');
                    if (id) {
                        if (id) {
                            const found = findItem(items, id);
                            if (found) launchItem(found.item);
                        }
                    }
                }
            }
        }
        pointerDownPos.current = null;

        if (draggingId && dragItemRef.current) {
            const els = document.elementsFromPoint(e.clientX, e.clientY);

            // Trash Bin Logic
            if (els.some(el => el.id === 'trash-bin')) {
                const newItems = deleteItemDeep(items, draggingId);
                save(newItems);
                setDraggingId(null);
                setDragPlaceholder(null);
                dragItemRef.current = null;
                return;
            }

            if (dragSource === 'folder') {
                const folderModal = els.find(el => el.id === 'folder-modal-content');
                // Allow dropping on breadcrumb (to be implemented in UI, but logic here handles exit)
                if (!folderModal) {
                    // Dragged out of folder modal -> Move to current page grid
                    // Calculate drop position
                    const container = document.querySelector('.grid-container-active'); // We need to tag the active grid
                    if (container) {
                        const rect = container.getBoundingClientRect();
                        const { x, y } = pixelsToGrid(e.clientX, e.clientY, rect);
                        moveItemFromFolderToGrid(currentFolderId, draggingId, x, y);
                    } else {
                        // Fallback if no container found (shouldn't happen)
                        moveItemFromFolderToGrid(currentFolderId, draggingId, 1, 1);
                    }
                }
            }
            else if (dragSource === 'grid') {
                const folderEl = els.find(el => el.getAttribute('data-type') === 'folder' && el.id !== draggingId);
                if (folderEl) {
                    moveItemToFolder(draggingId, folderEl.id);
                }
                else {
                    // Free Grid Placement
                    const container = document.querySelector('.grid-container-active');
                    if (container) {
                        const rect = container.getBoundingClientRect();
                        // Use top-left of the dragged item for snapping
                        const itemX = e.clientX - dragOffset.x;
                        const itemY = e.clientY - dragOffset.y;
                        const { x, y } = pixelsToGrid(itemX, itemY, rect);

                        // Check collision
                        const collidingItem = items.find(i =>
                            i.pageIndex === currentPage &&
                            i.id !== draggingId &&
                            i.x === x && i.y === y
                        );

                        if (collidingItem) {
                            // Swap
                            const draggedItem = items.find(i => i.id === draggingId);
                            if (draggedItem) {
                                updateItem(draggingId, { x, y, pageIndex: currentPage });
                                updateItem(collidingItem.id, { x: draggedItem.x, y: draggedItem.y });
                            }
                        } else {
                            // Move
                            updateItem(draggingId, { x, y, pageIndex: currentPage });
                        }
                    } else {
                        updateItem(draggingId, { pageIndex: currentPage });
                    }
                }
            }
        }

        setDraggingId(null);
        setDragPlaceholder(null);
        dragItemRef.current = null;
    };

    // --- WINDOW FUNCTIONS ---
    const openWindow = (item) => {
        const existingWindow = windows.find(w => w.itemId === item.id);
        if (existingWindow) {
            focusWindow(existingWindow.id);
            if (existingWindow.isMinimized) minimizeWindow(existingWindow.id); // Toggle back
            return;
        }

        const newWindow = {
            id: Date.now().toString(),
            itemId: item.id,
            title: item.title,
            url: item.url,
            content: null, // Can be extended for component rendering
            x: 100 + (windows.length * 20),
            y: 100 + (windows.length * 20),
            w: 800,
            h: 600,
            zIndex: zIndexCounter.current++,
            isMinimized: false,
            isMaximized: false
        };
        setWindows([...windows, newWindow]);
        setActiveWindowId(newWindow.id);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const focusWindow = (id) => {
        if (activeWindowId === id) return;
        zIndexCounter.current++;
        setWindows(windows.map(w => w.id === id ? { ...w, zIndex: zIndexCounter.current } : w));
        setActiveWindowId(id);
    };

    const minimizeWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
    };

    const maximizeWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    };

    const updateWindow = (id, updates) => {
        setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w));
    };

    // --- LOGIC FUNCTIONS ---

    const launchItem = (item) => {
        if (isEditing) { setEditItem(item); }
        else {
            if (item.type === 'folder') setFolderPath([...folderPath, item.id]);
            else if (item.url || item.type === 'app') {
                if (item.external) {
                    window.open(item.url, '_blank');
                } else {
                    openWindow(item);
                }
            }
        }
    };

    const swapDockOrder = (idA, idB) => {
        const idxA = items.findIndex(i => i.id === idA);
        const idxB = items.findIndex(i => i.id === idB);
        if (idxA === -1 || idxB === -1) return;
        const newItems = [...items];
        const orderA = newItems[idxA].dockOrder ?? idxA;
        const orderB = newItems[idxB].dockOrder ?? idxB;
        newItems[idxA].dockOrder = orderB;
        newItems[idxB].dockOrder = orderA;
        setItems(newItems);
    };

    const moveItemToFolder = (itemId, folderId) => {
        const foundItem = findItem(items, itemId);
        if (!foundItem) return;

        // Remove item from its current location
        let newItems = deleteItemDeep(items, itemId);

        // Add to target folder
        newItems = updateItemDeep(newItems, folderId, {
            children: [...(findItem(newItems, folderId)?.item.children || []), foundItem.item]
        });

        save(newItems);
    };

    const moveItemFromFolderToGrid = (folderId, itemId, x = 1, y = 1) => {
        const found = findItem(items, itemId);
        if (!found) return;

        // Remove from folder
        let newItems = deleteItemDeep(items, itemId);

        // Add to grid (root)
        const newItem = { ...found.item, pageIndex: currentPage, dockOrder: items.length, x, y };
        newItems.push(newItem);

        save(newItems);
    };

    const updateItem = (id, updates) => {
        save(updateItemDeep(items, id, updates));
    };

    const findFreeSlot = (cols, rows) => {
        const { cols: gridCols } = getGridMetrics();
        // Simple search for free slot
        // This is a naive implementation, checking every cell
        // Ideally we check if the rectangle [x, y, w, h] overlaps with any item

        for (let y = 1; y <= 10; y++) {
            for (let x = 1; x <= gridCols - cols + 1; x++) {
                const overlaps = items.some(i =>
                    i.pageIndex === currentPage &&
                    !(i.x + (i.cols || 1) <= x || x + cols <= i.x || i.y + (i.rows || 1) <= y || y + rows <= i.y)
                );
                if (!overlaps) return { x, y };
            }
        }
        return { x: 1, y: 1 }; // Fallback
    };

    const addWidget = (template) => {
        const id = Date.now().toString();
        const { x, y } = findFreeSlot(template.cols, template.rows);
        const newItem = { ...template, id, pageIndex: currentPage, x, y };
        save([...items, newItem]);
        setShowWidgetGallery(false);
    };

    const handleTouchStart = (e) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e) => {
        if (isEditing || !touchStartRef.current) return;
        // Only handle horizontal swipe if it wasn't a vertical swipe (Search)
        const diffX = touchStartRef.current.x - e.changedTouches[0].clientX;
        const diffY = touchStartRef.current.y - e.changedTouches[0].clientY;

        if (Math.abs(diffX) > 50 && Math.abs(diffY) < 30) {
            setCurrentPage(p => diffX > 0 ? Math.min(p + 1, maxPage) : Math.max(p - 1, 0));
        }
        touchStartRef.current = null;
    };

    // --- RENDERING ---

    const dockItems = items
        .filter(i => i.type !== 'widget')
        .sort((a, b) => (a.dockOrder ?? 0) - (b.dockOrder ?? 0));

    const SearchOverlay = () => {
        if (!isSearchOpen) return null;
        const inputRef = useRef(null);
        const [selectedIdx, setSelectedIdx] = useState(0);

        useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

        const results = useMemo(() => {
            if (!searchQuery) return [];
            const q = searchQuery.toLowerCase();
            let res = [];

            // 1. Apps & Widgets
            const traverse = (list, parent = null) => {
                list.forEach(item => {
                    if (item.title?.toLowerCase().includes(q)) {
                        res.push({ type: 'item', data: item, parent, id: item.id });
                    }
                    if (item.children) traverse(item.children, item);
                });
            };
            traverse(items);

            // 2. Windows
            windows.forEach(win => {
                if (win.title?.toLowerCase().includes(q)) {
                    res.push({ type: 'window', data: win, id: 'win-' + win.id });
                }
            });

            // 3. Settings
            if ('grid'.includes(q) || 'grille'.includes(q)) res.push({ type: 'setting', action: () => setConfig({ ...config, viewMode: 'grid' }), title: 'Passer en mode Grille', icon: <Grid />, id: 'set-grid' });
            if ('bureau'.includes(q) || 'desktop'.includes(q)) res.push({ type: 'setting', action: () => setConfig({ ...config, viewMode: 'desktop' }), title: 'Passer en mode Bureau', icon: <Monitor />, id: 'set-desk' });
            Object.entries(THEMES).forEach(([key, theme]) => {
                if (theme.name.toLowerCase().includes(q) || 'theme'.includes(q)) {
                    res.push({ type: 'setting', action: () => setConfig({ ...config, theme: key }), title: `Thème : ${theme.name}`, icon: <Settings />, id: 'set-theme-' + key, previewColor: theme.bg });
                }
            });

            return res;
        }, [searchQuery, items, windows, config]);

        const handleSelect = (res) => {
            if (res.type === 'item') launchItem(res.data);
            if (res.type === 'window') { focusWindow(res.data.id); if (res.data.isMinimized) minimizeWindow(res.data.id); }
            if (res.type === 'setting') res.action();
            setIsSearchOpen(false);
        };

        const selected = results[selectedIdx] || results[0];

        return (
            <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md flex flex-col items-center pt-20 animate-in fade-in duration-200" onClick={() => setIsSearchOpen(false)}>
                <div className="w-full max-w-3xl px-4 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition" size={24} />
                        <input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={e => { setSearchQuery(e.target.value); setSelectedIdx(0); }}
                            onKeyDown={e => {
                                if (e.key === 'ArrowDown') setSelectedIdx(i => Math.min(i + 1, results.length - 1));
                                if (e.key === 'ArrowUp') setSelectedIdx(i => Math.max(i - 1, 0));
                                if (e.key === 'Enter' && selected) handleSelect(selected);
                                if (e.key === 'Escape') setIsSearchOpen(false);
                            }}
                            placeholder="Recherche globale (Apps, Fenêtres, Paramètres...)"
                            className="w-full bg-slate-800/80 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800 transition shadow-2xl"
                        />
                    </div>

                    {/* Results Area */}
                    {results.length > 0 && (
                        <div className="flex bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                            {/* Left List */}
                            <div className="w-1/2 border-r border-white/10 overflow-y-auto p-2">
                                <div className="text-xs font-bold text-slate-500 uppercase px-3 py-2">Résultats ({results.length})</div>
                                {results.map((res, idx) => (
                                    <div key={res.id} onClick={() => handleSelect(res)} onMouseEnter={() => setSelectedIdx(idx)}
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${idx === selectedIdx ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-300'}`}>
                                        <div className="text-xl">
                                            {res.type === 'item' ? res.data.icon : (res.type === 'setting' ? res.icon : '🪟')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold truncate">{res.type === 'item' ? res.data.title : (res.type === 'window' ? res.data.title : res.title)}</div>
                                            <div className="text-xs opacity-60 truncate">
                                                {res.type === 'item' ? (res.parent ? `Dans ${res.parent.title}` : 'Application') : (res.type === 'window' ? 'Fenêtre ouverte' : 'Paramètre')}
                                            </div>
                                        </div>
                                        {idx === selectedIdx && <div className="text-xs opacity-50">↵</div>}
                                    </div>
                                ))}
                            </div>

                            {/* Right Preview */}
                            <div className="w-1/2 bg-slate-950/50 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                {selected ? (
                                    <>
                                        {/* Background Blur Effect */}
                                        <div className="absolute inset-0 opacity-20 blur-3xl" style={{ backgroundColor: selected.type === 'item' ? selected.data.bgColor : (selected.previewColor || '#3b82f6') }} />

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="text-6xl mb-4 shadow-xl rounded-2xl p-4 bg-white/5 border border-white/10">
                                                {selected.type === 'item' ? (
                                                    (selected.data.icon?.startsWith('http') || selected.data.icon?.startsWith('data:image')) ?
                                                        <img src={selected.data.icon} className="w-16 h-16 object-contain" /> : selected.data.icon
                                                ) : (selected.type === 'setting' ? selected.icon : '🪟')}
                                            </div>
                                            <h2 className="text-2xl font-bold mb-2">{selected.type === 'item' ? selected.data.title : (selected.type === 'window' ? selected.data.title : selected.title)}</h2>

                                            <div className="space-y-2 text-sm text-slate-400 max-w-[80%]">
                                                {selected.type === 'item' && (
                                                    <>
                                                        <p>Type: <span className="text-white capitalize">{selected.data.type}</span></p>
                                                        {selected.data.url && <p className="truncate text-blue-400">{selected.data.url}</p>}
                                                        {selected.data.cols && <p>Taille: {selected.data.cols}x{selected.data.rows}</p>}
                                                    </>
                                                )}
                                                {selected.type === 'window' && <p>Fenêtre active (ID: {selected.data.id})</p>}
                                                {selected.type === 'setting' && <p>Action système rapide</p>}
                                            </div>

                                            <button onClick={() => handleSelect(selected)} className="mt-8 bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition">
                                                Ouvrir
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-slate-500">Sélectionnez un élément pour voir l'aperçu</div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="text-center text-xs text-slate-500 mt-2">
                        Utilisez les flèches pour naviguer • Entrée pour ouvrir • Echap pour fermer
                    </div>
                </div>
            </div>
        );
    };

    const EditModal = () => {
        if (!editItem) return null;
        const isNew = !items.find(i => i.id === editItem.id) && !items.some(f => f.children?.some(c => c.id === editItem.id));
        const [form, setForm] = useState({ cols: 1, rows: 1, bgColor: '#334155', ...editItem });

        const handleSave = () => {
            if (isNew) {
                save([...items, { ...form, pageIndex: currentPage, dockOrder: items.length }]);
            } else {
                if (items.some(i => i.id === form.id)) {
                    updateItem(form.id, form);
                } else {
                    const newItems = items.map(i => {
                        if (i.children?.some(c => c.id === form.id)) {
                            return { ...i, children: i.children.map(c => c.id === form.id ? form : c) };
                        }
                        return i;
                    });
                    save(newItems);
                }
            }
            setEditItem(null);
        };

        const handleDelete = () => {
            if (items.some(i => i.id === form.id)) {
                save(items.filter(i => i.id !== form.id));
            } else {
                const newItems = items.map(i => ({ ...i, children: i.children?.filter(c => c.id !== form.id) }));
                save(newItems);
            }
            setEditItem(null);
        };

        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-slate-900 text-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-xl font-bold mb-4">{isNew ? 'Ajouter' : 'Modifier'}</h3>
                    <div className="space-y-4">
                        {isNew && <div className="flex gap-2 bg-slate-800 p-1 rounded">{(['app', 'folder', 'widget']).map(t => <button key={t} onClick={() => setForm({ ...form, type: t })} className={`flex-1 capitalize py-1 rounded ${form.type === t ? 'bg-blue-600' : ''}`}>{t}</button>)}</div>}

                        <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-800 p-2 rounded border border-white/10" placeholder="Nom" />

                        {form.type === 'app' && (
                            <div className="space-y-2">
                                <input value={form.url || ''} onChange={e => setForm({ ...form, url: e.target.value })} className="w-full bg-slate-800 p-2 rounded border border-white/10" placeholder="URL" />
                                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                    <input type="checkbox" checked={form.external || false} onChange={e => setForm({ ...form, external: e.target.checked })} className="rounded bg-slate-800 border-white/10" />
                                    Ouvrir dans un nouvel onglet (externe)
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                    <input type="checkbox" checked={form.fullSize || false} onChange={e => setForm({ ...form, fullSize: e.target.checked })} className="rounded bg-slate-800 border-white/10" />
                                    Icône pleine taille (sans fond)
                                </label>
                            </div>
                        )}

                        {form.type === 'widget' && (
                            <>
                                <textarea value={form.html || ''} onChange={e => setForm({ ...form, html: e.target.value })} className="w-full bg-slate-800 p-2 font-mono text-xs rounded border border-white/10" rows={3} placeholder="HTML" />
                                <textarea value={form.css || ''} onChange={e => setForm({ ...form, css: e.target.value })} className="w-full bg-slate-800 p-2 font-mono text-xs rounded border border-white/10" rows={3} placeholder="CSS" />
                                <textarea value={form.js || ''} onChange={e => setForm({ ...form, js: e.target.value })} className="w-full bg-slate-800 p-2 font-mono text-xs rounded border border-white/10" rows={3} placeholder="JS (container)" />
                            </>
                        )}

                        {/* Custom Size Logic */}
                        <div className="flex gap-4 items-center">
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Cols (Largeur)</label>
                                <input type="number" min="1" max="10" value={form.cols} onChange={e => setForm({ ...form, cols: parseInt(e.target.value) })} className="w-full bg-slate-800 p-2 rounded border border-white/10" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Rows (Hauteur)</label>
                                <input type="number" min="1" max="10" value={form.rows} onChange={e => setForm({ ...form, rows: parseInt(e.target.value) })} className="w-full bg-slate-800 p-2 rounded border border-white/10" />
                            </div>
                            <div className="w-16">
                                <label className="text-[10px] text-slate-400 uppercase block">Icon</label>
                                <div className="flex flex-col gap-1">
                                    <input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full bg-slate-800 p-2 rounded text-center border border-white/10" placeholder="😊" />
                                    {form.type === 'app' && (
                                        <button onClick={() => {
                                            if (!form.url) return;
                                            try {
                                                const urlObj = new URL(form.url.startsWith('http') ? form.url : `https://${form.url}`);
                                                const iconUrl = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
                                                setForm({ ...form, icon: iconUrl });
                                            } catch (e) { alert('URL invalide'); }
                                        }} className="text-[10px] bg-white/10 hover:bg-white/20 py-1 rounded">
                                            Fetch
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div>
                            <label className="text-[10px] text-slate-400 uppercase">Couleur de fond</label>
                            <div className="flex gap-2 items-center mt-1">
                                <input type="color" value={form.bgColor && !form.bgColor.startsWith('glass') ? form.bgColor : '#334155'} onChange={e => setForm({ ...form, bgColor: e.target.value })} className="h-10 w-full rounded cursor-pointer bg-transparent" />
                                <button onClick={() => setForm({ ...form, bgColor: 'glass' })} className={`px-4 py-2 rounded text-xs border ${form.bgColor === 'glass' ? 'bg-white/20 border-white' : 'border-white/20'}`}>Glass</button>
                            </div>
                        </div>

                        <button onClick={handleSave} className="w-full bg-blue-600 py-2 rounded-lg font-bold mt-2">Sauvegarder</button>
                        {form.type === 'widget' && (
                            <button onClick={() => {
                                const newTemplate = {
                                    type: 'widget',
                                    title: form.title,
                                    cols: form.cols,
                                    rows: form.rows,
                                    bgColor: form.bgColor,
                                    html: form.html,
                                    css: form.css,
                                    js: form.js
                                };
                                const newTemplates = [...widgetTemplates, newTemplate];
                                setWidgetTemplates(newTemplates);
                                localStorage.setItem('webos-widgets', JSON.stringify(newTemplates));
                                alert('Widget ajouté à la bibliothèque !');
                            }} className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-bold mt-2">
                                Ajouter à la bibliothèque
                            </button>
                        )}
                        {!isNew && <button onClick={handleDelete} className="w-full text-red-400 py-1 text-sm"><Trash2 size={14} className="inline" /> Supprimer</button>}
                    </div>
                </div>
            </div>
        );
    };

    const WidgetGallery = () => {
        if (!showWidgetGallery) return null;
        return (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowWidgetGallery(false)}>
                <div className="bg-slate-900 text-white w-full max-w-4xl p-6 rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Galerie de Widgets</h3>
                        <button onClick={() => setShowWidgetGallery(false)} className="p-2 hover:bg-white/10 rounded-full"><XIcon /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {widgetTemplates.map((template, idx) => (
                            <div key={idx} className="bg-slate-800 rounded-xl p-4 border border-white/5 hover:border-blue-500/50 transition group">
                                <div className="h-32 mb-4 rounded-lg overflow-hidden relative bg-slate-900/50 flex items-center justify-center">
                                    {/* Preview (simplified) */}
                                    <div className="scale-50 origin-center w-[200%] h-[200%] flex items-center justify-center pointer-events-none"
                                        style={{ backgroundColor: template.bgColor === 'glass' ? 'transparent' : template.bgColor }}
                                        dangerouslySetInnerHTML={{ __html: template.html }}
                                    />
                                    {template.bgColor === 'glass' && <div className="absolute inset-0 bg-white/10 backdrop-blur-md -z-10" />}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold">{template.title}</div>
                                        <div className="text-xs text-slate-400">{template.cols}x{template.rows}</div>
                                    </div>
                                    <button onClick={() => addWidget(template)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Ajouter</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const SettingsModal = () => {
        if (!showSettings) return null;
        const currentTheme = THEMES[config.theme || 'dark'];

        return (
            <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowSettings(false)}>
                <div className="bg-slate-900 text-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <h3 className="text-xl font-bold mb-6">Paramètres</h3>

                    {/* View Mode */}
                    <div className="mb-6">
                        <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Mode d'affichage</label>
                        <div className="flex bg-slate-800 p-1 rounded-lg">
                            <button onClick={() => setConfig({ ...config, viewMode: 'grid' })} className={`flex-1 py-2 rounded-md text-sm font-bold transition ${config.viewMode === 'grid' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}>Grille</button>
                            <button onClick={() => setConfig({ ...config, viewMode: 'desktop' })} className={`flex-1 py-2 rounded-md text-sm font-bold transition ${config.viewMode === 'desktop' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}>Bureau</button>
                        </div>
                    </div>

                    {/* Bar Position */}
                    <div className="mb-6">
                        <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Position de la barre</label>
                        <div className="grid grid-cols-4 gap-2">
                            {['top', 'bottom', 'left', 'right'].map(pos => (
                                <button key={pos} onClick={() => setConfig({ ...config, barPosition: pos })}
                                    className={`py-2 rounded-lg border capitalize text-sm ${config.barPosition === pos ? 'bg-blue-600 border-blue-500' : 'border-white/10 hover:bg-white/5'}`}>
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Themes */}
                    <div className="mb-6">
                        <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Thème</label>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(THEMES).map(([key, theme]) => (
                                <button key={key} onClick={() => setConfig({ ...config, theme: key })}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition text-left ${config.theme === key ? 'border-blue-500 bg-white/5' : 'border-white/10 hover:bg-white/5'}`}>
                                    <div className={`w-8 h-8 rounded-full shadow-lg ${theme.bg} border border-white/20 relative overflow-hidden`}>
                                        <div className={`absolute bottom-0 left-0 right-0 h-1/2 ${theme.accent} opacity-50`} />
                                    </div>
                                    <span className="font-medium">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Wallpaper */}
                    <div className="mb-6">
                        <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Fond d'écran</label>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {WALLPAPERS.map((url, idx) => (
                                <button key={idx} onClick={() => setConfig({ ...config, wallpaper: url })}
                                    className={`aspect-video rounded-lg bg-cover bg-center border-2 transition ${config.wallpaper === url ? 'border-blue-500 scale-105' : 'border-transparent hover:border-white/50'}`}
                                    style={{ backgroundImage: `url(${url})` }}
                                />
                            ))}
                        </div>
                        <input value={config.wallpaper} onChange={e => setConfig({ ...config, wallpaper: e.target.value })} className="w-full bg-slate-800 p-3 rounded-xl border border-white/10 text-sm focus:border-blue-500 outline-none" placeholder="Custom URL..." />
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button onClick={() => { const a = document.createElement('a'); a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ items, config })); a.download = "webos.json"; a.click() }} className="flex-1 bg-green-600 hover:bg-green-500 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition"><Download size={14} /> Export Config</button>
                        <label className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition"><Upload size={14} /> Import Config<input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => { try { const data = JSON.parse(ev.target?.result); if (data.items) setItems(data.items); if (data.config) setConfig(data.config); } catch (e) { alert('Invalid JSON'); } }; r.readAsText(f) } }} /></label>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={() => setShowSettings(false)} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold">Fermer</button>
                    </div>
                </div>
            </div>
        );
    };

    const RenderItem = ({ item, isDockItem = false, inFolder = false }) => (
        <div
            key={item.id} id={inFolder ? `folder-item-${item.id}` : (isDockItem ? `dock-${item.id}` : item.id)}
            data-id={item.id} data-dock-id={isDockItem ? item.id : undefined} data-type={item.type}
            onPointerDown={(e) => handlePointerDown(e, item, inFolder ? 'folder' : (isDockItem ? 'dock' : 'grid'))}
            onDoubleClick={(e) => { if (isEditing) { e.stopPropagation(); setEditItem(item); } }}
            // Fix: Stop propagation of touch events to prevent the desktop swipe logic from triggering
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className={`
 relative group transition-transform duration-200 select-none touch-none
 ${isEditing ? 'cursor-move animate-jiggle' : (item.type === 'widget' ? '' : 'cursor-pointer active:scale-95 hover:scale-105')}
 ${draggingId === item.id ? 'opacity-0' : 'opacity-100'}
 ${isDockItem ? 'flex-shrink-0' : ''}
`}
            style={getItemStyle(item, isDockItem, inFolder)}
        >
            <div className={`
  rounded-2xl shadow-lg flex flex-col items-center justify-center overflow-hidden
  ${isDockItem ? 'w-12 h-12 md:w-14 md:h-14' : 'w-full h-full'}
  ${item.bgColor === 'glass' ? 'bg-white/20 backdrop-blur-md border border-white/20' : ''}
  ${isEditing ? 'border-2 border-white/20' : ''}
`}
                style={item.bgColor !== 'glass' ? { backgroundColor: item.fullSize ? 'transparent' : item.bgColor } : {}}
            >
                {item.type === 'widget' && !isDockItem && !inFolder ? (
                    <WidgetRunner id={item.id} html={item.html} css={item.css} js={item.js} isEditing={isEditing} />
                ) : (
                    <>
                        <div className={`${isDockItem ? 'text-2xl' : 'text-4xl'} mb-1 filter drop-shadow-md w-full h-full flex items-center justify-center`}>
                            {(item.icon?.startsWith('http') || item.icon?.startsWith('data:image')) ? (
                                <img src={item.icon} alt={item.title} className={`${item.fullSize ? 'w-full h-full object-cover' : 'w-2/3 h-2/3 object-contain'} pointer-events-none`} />
                            ) : (
                                item.icon
                            )}
                        </div>
                        {!isDockItem && (item.rows || 1) > 1 && <div className="text-xs font-bold text-white px-2 text-center pointer-events-none">{item.title}</div>}
                        {item.type === 'folder' && (
                            <div className="absolute bottom-1 md:bottom-2 flex gap-0.5 opacity-50 pointer-events-none">
                                {item.children?.slice(0, 3).map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
                            </div>
                        )}
                        {/* Notification Badge */}
                        {item.notifications > 0 && (
                            <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-black/20">
                                {item.notifications > 99 ? '99+' : item.notifications}
                            </div>
                        )}
                    </>
                )}
            </div>

            {!isDockItem && item.cols === 1 && item.rows === 1 && item.type !== 'widget' && (
                <div className="text-[10px] md:text-xs font-medium text-white text-center mt-1 truncate shadow-black drop-shadow-md w-full pointer-events-none">{item.title}</div>
            )}

            {isEditing && item.type === 'widget' && (
                <div
                    className="absolute bottom-0 right-0 p-1 cursor-se-resize z-30 opacity-50 hover:opacity-100 bg-black/50 rounded-tl-lg"
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault(); // Prevent scrolling on touch
                        setResizeHandle({
                            id: item.id,
                            startX: e.clientX,
                            startY: e.clientY,
                            startCols: item.cols || 1,
                            startRows: item.rows || 1,
                            currentCols: item.cols || 1,
                            currentRows: item.rows || 1
                        });
                    }}
                >
                    <Resize size={12} className="text-white rotate-90" />
                </div>
            )}

            {isEditing && (
                <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setEditItem(item); }}
                    className="absolute -top-3 -right-3 bg-blue-600 border-2 border-white text-white rounded-full p-1.5 z-20 shadow-lg hover:bg-blue-500 scale-100 hover:scale-110 transition">
                    <Edit3 size={14} />
                </button>
            )}
        </div>
    );

    const currentTheme = THEMES[config.theme || 'dark'];

    return (
        <div
            className={`relative w-full h-screen overflow-hidden select-none font-sans ${currentTheme.text}`}
            style={{ backgroundImage: `url(${config.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
            onContextMenu={e => e.preventDefault()}
        >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[0px]" />

            {/* --- GRID CONTAINER --- */}
            <div className={`absolute inset-0 flex transition-transform duration-500`}
                style={{ transform: `translateX(-${currentPage * 100}%)`, transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}>

                {Array.from({ length: maxPage + 1 }).map((_, pageIdx) => {
                    // Lazy Loading: Only render current page and adjacent pages
                    if (Math.abs(pageIdx - currentPage) > 1) {
                        return <div key={pageIdx} className="w-full h-full flex-shrink-0" />;
                    }

                    return (
                        <div key={pageIdx} className={`w-full h-full flex-shrink-0 relative overflow-y-auto
       ${config.barPosition === 'top' ? 'pt-14 pb-4' : config.barPosition === 'bottom' ? 'pt-4 pb-24' : config.barPosition === 'left' ? 'pl-20 pr-4 py-4' : 'pr-20 pl-4 py-4'}
    `}>
                            <div className={`grid gap-x-4 gap-y-6 max-w-7xl mx-auto ${currentPage === pageIdx ? 'grid-container-active' : ''}`}
                                style={{
                                    gridAutoRows: `${gridRowHeight}px`,
                                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
                                }}>
                                {items.filter(i => {
                                    if (config.viewMode === 'desktop') return i.pageIndex === pageIdx && i.type === 'widget';
                                    return i.pageIndex === pageIdx;
                                }).map(item => <RenderItem key={item.id} item={item} />)
                                }

                                {/* Drag Placeholder */}
                                {dragPlaceholder && currentPage === pageIdx && (
                                    <div className="rounded-2xl bg-white/20 border-2 border-white/50 border-dashed transition-all duration-100"
                                        style={{
                                            gridColumnStart: dragPlaceholder.x,
                                            gridColumnEnd: `span ${dragPlaceholder.w}`,
                                            gridRowStart: dragPlaceholder.y,
                                            gridRowEnd: `span ${dragPlaceholder.h}`,
                                            zIndex: 0
                                        }}
                                    />
                                )}

                                {(isEditing && currentPage === pageIdx) && (
                                    <div className="flex gap-2" style={{ height: gridRowHeight }}>
                                        <div onClick={() => setShowWidgetGallery(true)}
                                            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:bg-white/10 opacity-70 transition hover:scale-105 hover:opacity-100 hover:border-white/50">
                                            <Plus size={24} color="white" />
                                            <span className="text-[10px] font-bold mt-1 text-white/70">Widget</span>
                                        </div>
                                        <div onClick={() => setEditItem({ id: Date.now().toString(), type: 'app', title: 'Nouvelle App', icon: '🌐', cols: 1, rows: 1, bgColor: '#334155' })}
                                            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:bg-white/10 opacity-70 transition hover:scale-105 hover:opacity-100 hover:border-white/50">
                                            <Monitor size={24} color="white" />
                                            <span className="text-[10px] font-bold mt-1 text-white/70">App / URL</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- DOTS --- */}
            < div className={`absolute left-0 right-0 flex justify-center gap-2 pointer-events-none z-30 ${config.barPosition === 'bottom' ? 'bottom-24' : 'bottom-4'}`}>
                {
                    Array.from({ length: maxPage + 1 }).map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${currentPage === idx ? 'bg-white opacity-100' : 'bg-white opacity-40'}`} />
                    ))
                }
            </div >

            {/* --- WINDOWS --- */}
            {
                windows.map(win => (
                    <WindowFrame
                        key={win.id}
                        window={win}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onMaximize={maximizeWindow}
                        onFocus={focusWindow}
                        onUpdate={updateWindow}
                    />
                ))
            }

            {/* --- DOCK --- */}
            {/* --- DOCK --- */}
            {
                config.viewMode === 'desktop' && (
                    <div className={`absolute left-1/2 -translate-x-1/2 max-w-[95%] w-auto z-40
     ${config.barPosition === 'bottom' ? 'bottom-16' : 'bottom-4'}
 `}>
                        <div className={`backdrop-blur-xl border border-white/20 px-4 py-3 rounded-3xl flex items-end gap-3 shadow-2xl overflow-x-auto no-scrollbar ${currentTheme.dock}`}>
                            {dockItems.map(item => (
                                <div key={item.id} className="relative group">
                                    <RenderItem item={item} isDockItem />
                                    {windows.some(w => w.itemId === item.id) && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" />
                                    )}
                                </div>
                            ))}
                            {/* Show open windows that are NOT in the dock */}
                            {windows.filter(w => !dockItems.find(di => di.id === w.itemId)).map(win => {
                                const item = findItem(items, win.itemId)?.item || { id: win.itemId, icon: '🪟', title: win.title, bgColor: '#334155' };
                                return (
                                    <div key={win.id} className="relative group" onClick={() => { focusWindow(win.id); if (win.isMinimized) minimizeWindow(win.id); }}>
                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-lg flex items-center justify-center text-2xl cursor-pointer transition hover:scale-110 active:scale-95 ${win.isMinimized ? 'opacity-50 grayscale' : ''}`}
                                            style={{ backgroundColor: item.bgColor || '#334155' }}>
                                            {item.icon}
                                        </div>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" />
                                    </div>
                                );
                            })}
                            <div className="w-[1px] h-10 bg-white/30 mx-1 flex-shrink-0"></div>
                            <button onClick={() => setConfig({ ...config, viewMode: 'grid' })} className="w-12 h-12 flex-shrink-0 bg-black/20 rounded-xl flex items-center justify-center text-white hover:bg-black/40">
                                <Grid size={20} />
                            </button>
                        </div>
                    </div>
                )
            }

            {/* --- SYSTEM BAR --- */}
            <div className={`fixed z-50 backdrop-blur-md border-white/10 shadow-xl flex items-center justify-between px-4 gap-4 ${currentTheme.bg.replace('bg-', 'bg-')}/80
  ${config.barPosition === 'top' ? 'top-0 left-0 right-0 h-12 border-b' : ''}
  ${config.barPosition === 'bottom' ? 'bottom-0 left-0 right-0 h-12 border-t' : ''}
  ${config.barPosition === 'left' ? 'top-0 left-0 bottom-0 w-16 flex-col py-4 border-r' : ''}
  ${config.barPosition === 'right' ? 'top-0 right-0 bottom-0 w-16 flex-col py-4 border-l' : ''}
`}>
                <div className={`flex gap-4 ${['left', 'right'].includes(config.barPosition) ? 'flex-col' : ''}`}>
                    <button onClick={() => setConfig({ ...config, viewMode: config.viewMode === 'desktop' ? 'grid' : 'desktop' })} className="p-2 hover:bg-white/20 rounded-lg">{config.viewMode === 'desktop' ? <Grid /> : <Monitor />}</button>

                    {/* Undo/Redo Buttons */}
                    <div className="flex gap-1">
                        <button onClick={undo} disabled={history.past.length === 0} className={`p-2 rounded-lg transition ${history.past.length === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}><Undo size={20} /></button>
                        <button onClick={redo} disabled={history.future.length === 0} className={`p-2 rounded-lg transition ${history.future.length === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}><Redo size={20} /></button>
                    </div>
                </div>

                {/* Edit Mode OK Button */}
                {isEditing && (
                    <button onClick={() => setIsEditing(false)} className={`bg-blue-600 hover:bg-blue-500 text-white px-6 py-1 rounded-full font-bold flex items-center gap-2 animate-pulse ${['left', 'right'].includes(config.barPosition) ? 'vertical-text py-4' : ''}`}>
                        <Check size={16} /> {['left', 'right'].includes(config.barPosition) ? '' : 'OK'}
                    </button>
                )}

                <div className={`flex items-center gap-4 ${['left', 'right'].includes(config.barPosition) ? 'flex-col-reverse' : ''}`}>
                    <span className="font-bold text-sm whitespace-nowrap">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-white/20 rounded-lg" title="Recherche (Ctrl+K)">
                        <Search size={20} />
                    </button>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white/20 rounded-lg" title="Mode Édition">
                            <Edit3 size={20} />
                        </button>
                    )}
                    <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-white/20 rounded-lg"><Settings size={20} /></button>
                </div>
            </div>

            {/* --- GHOST DRAG --- */}
            {
                draggingId && dragItemRef.current && (
                    <div className="fixed z-[100] pointer-events-none opacity-80 shadow-2xl rounded-2xl overflow-hidden scale-110" style={{ left: dragPos.x - dragOffset.x, top: dragPos.y - dragOffset.y, width: 80, height: 80 }}>
                        <div className="w-full h-full flex items-center justify-center text-4xl text-white" style={{ backgroundColor: dragItemRef.current.bgColor || '#334155' }}>
                            {dragItemRef.current.icon}
                        </div>
                    </div>
                )
            }

            {/* --- FOLDER MODAL --- */}
            {/* --- FOLDER MODAL --- */}
            {
                currentFolderId && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-md p-6" onClick={() => setFolderPath([])}>
                        <div id="folder-modal-content" className="bg-slate-800/90 w-full max-w-xl p-8 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-200 border border-white/10 min-h-[300px]" onClick={e => e.stopPropagation()}>

                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
                                <button onClick={() => setFolderPath([])} className="text-white/50 hover:text-white font-bold text-lg transition">Home</button>
                                {folderPath.map((id, index) => {
                                    const folderItem = findItem(items, id)?.item;
                                    return (
                                        <React.Fragment key={id}>
                                            <span className="text-white/30">/</span>
                                            <button
                                                onClick={() => setFolderPath(folderPath.slice(0, index + 1))}
                                                className={`font-bold text-lg transition whitespace-nowrap ${index === folderPath.length - 1 ? 'text-white' : 'text-white/50 hover:text-white'}`}
                                            >
                                                {folderItem?.title || 'Folder'}
                                            </button>
                                        </React.Fragment>
                                    );
                                })}
                                <div className="flex-1" />
                                <button onClick={() => setFolderPath([])} className="p-2 bg-white/10 rounded-full text-white"><XIcon /></button>
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                                {findItem(items, currentFolderId)?.item?.children?.map(child => (
                                    <RenderItem key={child.id} item={child} inFolder />
                                ))}
                            </div>
                            {isEditing && <div className="mt-8 text-center text-white/30 text-sm border-2 border-dashed border-white/10 rounded-xl p-4">Glissez une app hors du cadre pour la sortir du dossier</div>}
                        </div>
                    </div>
                )
            }



            {/* --- TRASH BIN (Edit Mode) --- */}
            {isEditing && (
                <div id="trash-bin" className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-md transition-all hover:scale-110 hover:bg-red-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <Trash2 size={24} />
                    <span className="font-bold">Glisser ici pour supprimer</span>
                </div>
            )}

            {/* --- MODALS --- */}
            <EditModal />
            <SearchOverlay />
            <SettingsModal />
            <WidgetGallery />
        </div >
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WebOSUltimateV6 />);