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
// Load data files dynamically
const dataDir = path.join(__dirname, 'data');
const loadJSON = (file) => {
  const filePath = path.join(dataDir, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const loadDivisions = () => loadJSON('divisions.json');
const loadDistricts = () => loadJSON('districts.json');
const loadDelicacies = () => loadJSON('delicacies.json');
const loadNational = () => loadJSON('national.json');
const loadQuiz = () => loadJSON('quizData.json');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Amar Desh 360 API Engine',
    version: '1.0.0'
  });
});

// Divisions API (always serves latest data from disk)
app.get('/api/divisions', (req, res) => {
  try {
    res.json(loadDivisions());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load divisions' });
  }
});

app.get('/api/divisions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const allDivs = loadDivisions();
    const division = allDivs.find(d => d.id.toLowerCase() === id.toLowerCase());
    if (!division) {
      return res.status(404).json({ error: 'Division not found' });
    }
    res.json(division);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load division' });
  }
});

// Districts API
app.get('/api/districts', (req, res) => {
  try {
    const { division } = req.query;
    const allDists = loadDistricts();
    if (division) {
      const filtered = allDists.filter(d => d.divisionId.toLowerCase() === division.toLowerCase());
      return res.json(filtered);
    }
    res.json(allDists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load districts' });
  }
});

app.get('/api/districts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const districts = loadDistricts();
    const district = districts.find(d => d.id.toLowerCase() === id.toLowerCase());
    if (!district) {
      return res.status(404).json({ error: 'District not found' });
    }
    res.json(district);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load district' });
  }
});

// Delicacies & Traditional Sweets API
app.get('/api/delicacies', (req, res) => {
  try {
    const { category, district } = req.query;
    let results = loadDelicacies();
    if (category) {
      results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }
    if (district) {
      results = results.filter(d => d.district.toLowerCase() === district.toLowerCase());
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load delicacies' });
  }
});

// National Symbols & Data API
app.get('/api/national', (req, res) => {
  try {
    res.json(loadNational());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load national data' });
  }
});

// Heritage Quiz API
app.get('/api/quiz', (req, res) => {
  try {
    res.json(loadQuiz());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load quiz data' });
  }
});

// Global Search API
app.get('/api/search', (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q) {
      return res.json({ divisions: [], districts: [], delicacies: [] });
    }

    const divisions = loadDivisions();
    const districts = loadDistricts();
    const delicacies = loadDelicacies();

    const matchedDivisions = divisions.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.nameBn.includes(q) ||
      d.tagline.toLowerCase().includes(q)
    );

    const matchedDistricts = districts.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.nameBn.includes(q) ||
      (d.delicacy && d.delicacy.toLowerCase().includes(q)) ||
      (d.landmarks && d.landmarks.some(l => l.toLowerCase().includes(q)))
    );

    const matchedDelicacies = delicacies.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.district.toLowerCase().includes(q) ||
      (d.desc && d.desc.toLowerCase().includes(q))
    );

    res.json({
      query: q,
      divisions: matchedDivisions,
      districts: matchedDistricts,
      delicacies: matchedDelicacies
    });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Smart Itinerary Trip Generator Endpoint
app.post('/api/itinerary', (req, res) => {
  try {
    const { selectedDistricts = [], days = 3 } = req.body;
    const districts = loadDistricts();
    const chosenDistricts = districts.filter(d => selectedDistricts.includes(d.id));

    const plan = chosenDistricts.map((dist, idx) => ({
      day: (idx % days) + 1,
      district: dist.name,
      districtBn: dist.nameBn,
      morning: `Explore iconic sites: ${(dist.landmarks || []).slice(0, 2).join(', ')}`,
      afternoon: `Experience local culture and taste famous ${dist.delicacy || 'sweets'}`,
      evening: `Sunset views along the ${(dist.rivers && dist.rivers[0]) || 'river'} and artisan bazaars`,
      tips: dist.touristTips
    }));

    res.json({
      totalDays: days,
      districtsCovered: chosenDistricts.length,
      plan
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
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

