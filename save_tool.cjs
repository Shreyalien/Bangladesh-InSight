const fs = require('fs');
const path = require('path');

function saveFile(relPath, b64str) {
  const target = path.join(__dirname, relPath);
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const buf = Buffer.from(b64str, 'base64');
  fs.writeFileSync(target, buf);
  console.log('Saved ${ relPath } (${ buf.length } bytes)');
}

module.exports = { saveFile };
