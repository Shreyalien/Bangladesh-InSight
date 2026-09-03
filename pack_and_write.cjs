const fs = require('fs');
const path = require('path');

function save(rel, content) {
  const p = path.join(__dirname, 'client', 'src', rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Successfully wrote ' + rel);
}

module.exports = { save };
