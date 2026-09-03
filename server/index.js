import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load data files synchronously
const dataDir = path.join(__dirname, 'data');
const loadJSON = (file) => {
  const filePath = path.join(dataDir, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const divisions = loadJSON('divisions.json');
const districts = loadJSON('districts.json');
const delicacies = loadJSON('delicacies.json');
const quizData = loadJSON('quizData.json');
const nationalData = loadJSON('national.json');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Amar Desh 360 API Engine',
    version: '1.0.0'
  });
});

// Divisions API
app.get('/api/divisions', (req, res) => {
  res.json(divisions);
});

app.get('/api/divisions/:id', (req, res) => {
  const { id } = req.params;
  const division = divisions.find(d => d.id.toLowerCase() === id.toLowerCase());
  if (!division) {
    return res.status(404).json({ error: 'Division not found' });
  }
  res.json(division);
});

// Districts API
app.get('/api/districts', (req, res) => {
  const { division } = req.query;
  if (division) {
    const filtered = districts.filter(d => d.divisionId.toLowerCase() === division.toLowerCase());
    return res.json(filtered);
  }
  res.json(districts);
});

app.get('/api/districts/:id', (req, res) => {
  const { id } = req.params;
  const district = districts.find(d => d.id.toLowerCase() === id.toLowerCase());
  if (!district) {
    return res.status(404).json({ error: 'District not found' });
  }
  res.json(district);
});

// Delicacies & Traditional Sweets API
app.get('/api/delicacies', (req, res) => {
  const { category, district } = req.query;
  let results = delicacies;
  if (category) {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }
  if (district) {
    results = results.filter(d => d.district.toLowerCase() === district.toLowerCase());
  }
  res.json(results);
});

// National Symbols & Data API
app.get('/api/national', (req, res) => {
  res.json(nationalData);
});

// Heritage Quiz API
app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

// Global Search API
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) {
    return res.json({ divisions: [], districts: [], delicacies: [] });
  }

  const matchedDivisions = divisions.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.nameBn.includes(q) ||
    d.tagline.toLowerCase().includes(q)
  );

  const matchedDistricts = districts.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.nameBn.includes(q) ||
    d.delicacy.toLowerCase().includes(q) ||
    d.landmarks.some(l => l.toLowerCase().includes(q))
  );

  const matchedDelicacies = delicacies.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.district.toLowerCase().includes(q) ||
    d.desc.toLowerCase().includes(q)
  );

  res.json({
    query: q,
    divisions: matchedDivisions,
    districts: matchedDistricts,
    delicacies: matchedDelicacies
  });
});

// Smart Itinerary Trip Generator Endpoint
app.post('/api/itinerary', (req, res) => {
  const { selectedDistricts = [], days = 3 } = req.body;
  const chosenDistricts = districts.filter(d => selectedDistricts.includes(d.id));

  const plan = chosenDistricts.map((dist, idx) => ({
    day: (idx % days) + 1,
    district: dist.name,
    districtBn: dist.nameBn,
    morning: `Explore iconic sites: ${dist.landmarks.slice(0, 2).join(', ')}`,
    afternoon: `Experience local culture and taste famous ${dist.delicacy}`,
    evening: `Sunset views along the ${dist.rivers[0] || 'river'} and artisan bazaars`,
    tips: dist.touristTips
  }));

  res.json({
    totalDays: days,
    districtsCovered: chosenDistricts.length,
    plan
  });
});


// Serve static client build
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Amar Desh 360 Express Server running on http://localhost:${PORT}`);
});

