const fs = require('fs');
const path = require('path');

const serverData = path.join(__dirname, 'data');
const clientData = path.join(__dirname, '..', 'client', 'src', 'data');
if (!fs.existsSync(serverData)) fs.mkdirSync(serverData, { recursive: true });
if (!fs.existsSync(clientData)) fs.mkdirSync(clientData, { recursive: true });

function writePair(filename, obj) {
  const s = JSON.stringify(obj, null, 2);
  fs.writeFileSync(path.join(serverData, filename), s);
  fs.writeFileSync(path.join(clientData, filename), s);
  console.log('Successfully wrote: ' + filename);
}

// 1. Divisions
const dhaka = require('./data_dhaka.cjs');
const chattogram = require('./data_chattogram.cjs');
const rajshahi = require('./data_rajshahi.cjs');
const khulna = require('./data_khulna.cjs');
const sylhet = require('./data_sylhet.cjs');
const barishal = require('./data_barishal.cjs');
const rangpur = require('./data_rangpur.cjs');
const mymensingh = require('./data_mymensingh.cjs');

const divisions = [dhaka, chattogram, rajshahi, khulna, sylhet, barishal, rangpur, mymensingh];
writePair('divisions.json', divisions);

// 2. Districts (64 Districts)
const p1 = require('./districts_part1.cjs');
const p2 = require('./districts_part2.cjs');
const p3 = require('./districts_part3.cjs');
const districts = [...p1, ...p2, ...p3];
writePair('districts.json', districts);
console.log('Total districts assembled: ' + districts.length);

// 3. Delicacies
const delicacies = require('./data_delicacies.cjs');
writePair('delicacies.json', delicacies);

// 4. Quiz Data
const quizData = require('./data_quiz.cjs');
writePair('quizData.json', quizData);

// 5. National Data
const national = require('./data_national.cjs');
writePair('national.json', national);

console.log('All datasets successfully compiled and synchronized!');
