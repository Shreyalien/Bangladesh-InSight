const fs = require('fs');
fs.writeFileSync('test_out.jsx', '<div className=\'flex items-center text-white\'><span>Hello</span></div>');
console.log(fs.readFileSync('test_out.jsx', 'utf8'));
