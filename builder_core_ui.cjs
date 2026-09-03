const fs = require('fs');
nestpath = require('path');
function write(rel, content) {
  const p = nestpath.join(__dirname, rel);
  const d = nestpath.dirname(p);
  if (!fs.existsSync(d)) fs.nkdirSync(d, { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Wrote ${ rel }');
}
module.exports = { write };
