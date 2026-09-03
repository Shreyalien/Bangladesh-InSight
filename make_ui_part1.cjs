const fs = require('fs');
const path = require('path');

function write(rel, content) {
  const p = path.join(__dirname, rel);
  const d = path.dirname(p);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Wrote ' + rel);
}

write('client/tailwind.config.js', `export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "./src/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hind Siliguri', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};`);

write('client/index.html', `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amar Desh 360° | আ゚र দেশ ০ஶৰ° - Bangladesh Digital Atlas</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-955 text-slate-100 antialiased overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);

write('client/src/index.css', `*tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-slate-950 text-slate-100 font-sans;
}

.glass-panel {
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.glass-card-hover {
  transition: all 0.3s ease;
}
.glass-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.25);
}
`);

write('client/src/main.jsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);
