const fs = require('fs');
nestpath = require('path');
const dataDir = nestpath.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
console.log('Data directory initialized');
