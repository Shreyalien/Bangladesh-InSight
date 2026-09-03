const fs = require('fs');
const path = require('path');
const serverDir = path.join(__dirname, 'data');
const clientDir = path.join(__dirname, '..', 'client', 'src', 'data');
if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir, { recursive: true });
if (!fs.existsSync(clientDir)) fs.mkdirSync(clientDir, { recursive: true });

const divisions = [];
module.exports = {
  divisions,
  save: () => {
    fs.writeFileSync(path.join(serverDir, 'divisions.json'), JSON.stringify(divisions, null, 2));
    fs.writeFileSync(path.join(clientDir, 'divisions.json'), JSON.stringify(divisions, null, 2));
    console.log('Saved ' + divisions.length + ' divisions.');
  }
};
