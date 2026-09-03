module.exports = {
  id: 'barishal',
  name: 'Barishal',
  nameBn: '??????',
  tagline: 'The Venice of Bengal — Floating Guava Markets, River Estuaries & Kuakata Beach',
  taglineBn: '?????? ????? — ?????? ??????? ?????, ???????? ????? ? ????????',
  description: 'Crisscrossed by a labyrinth of mighty rivers and tidal canals, Barishal is world-famous for floating guava markets in Bhimruli, sweet Amra, Balam rice, and Kuakatas panoramic sunrise and sunset beach.',
  dayImage: '/panoramas/barishal_day.png',
  nightImage: '/panoramas/barishal_day.png',
  themeColor: '#0ea5e9',
  bgGradient: 'from-cyan-950 via-slate-900 to-sky-950',
  stats: {
    districts: 6,
    upazilas: '42+',
    landmarks: '75+',
    area: '13,225 km²',
    population: '9.3 Million',
    majorRiver: 'Kirtankhola, Meghna, Tetulia, Arial Khan',
    literacyRate: '75.9%'
  },
  districts: ['barishal', 'bhola', 'patuakhali', 'pirojpur', 'barguna', 'jhalokati'],
  majorCities: [
    { name: 'Barishal City', pop: '0.6M+', role: 'Divisional HQ & Kirtankhola River Port' },
    { name: 'Patuakhali', pop: '0.4M+', role: 'Kuakata Daughter of Sea Tourism Gateway' },
    { name: 'Bhola', pop: '0.5M+', role: 'Largest Offshore Island of Bangladesh & Natural Gas Hub' },
    { name: 'Pirojpur', pop: '0.3M+', role: 'Floating Guava Markets & Baleshwar River' },
    { name: 'Jhalokati', pop: '0.2M+', role: 'Floating Timber & Hogla Craft Capital' }
  ],
  highlights: [
    { title: 'Venice of Bengal', desc: 'Countless riverways, launch journeys & tidal canal networks' },
    { title: 'Kuakata Daughter of Sea', desc: 'Only sea beach in South Asia offering both sunrise & sunset over Bay of Bengal' },
    { title: 'Floating Guava Market (Bhimruli)', desc: 'Asias largest 200-year-old floating fruit bazaar' },
    { title: 'Granary of Bengal (Dhan-Nodi-Khaal)', desc: 'Rich fertile delta producing fragrant Balam rice & freshwater Hilsa' }
  ],
  iconicDelicacy: {
    name: 'Barishal Ilish, Sandesh & Sweet Amra',
    nameBn: '???????? ?????? ????, ??????? ?????? ? ????',
    desc: 'Fresh Meghna/Padma river mouth Hilsa, juicy sweet hog plums (Amra), and Gournadi milk curd sweets.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'kirtankhola_river',
      title: 'Kirtankhola Riverfront & Launch Terminal',
      titleBn: '?????????? ??? ? ?????? ???????????',
      category: 'River Life & Transit',
      icon: 'ship',
      x: 48,
      y: 31,
      est: 'Lifeline',
      builtBy: 'Nature & BIWTA',
      details: 'The pulsing heart of Barishal, famous for luxury multi-deck river passenger launches connecting Dhaka and coastal islands.',
      image: '/panoramas/barishal_day.png'
    },
    {
      id: 'kuakata_sea_beach',
      title: 'Kuakata Sea Beach (Sagor Kannya)',
      titleBn: '????????? ?????? ???? (?????????)',
      category: 'Coast & Sunset Point',
      icon: 'beach',
      x: 18,
      y: 42,
      est: 'Natural',
      builtBy: 'Bay of Bengal',
      details: 'A unique 18 km continuous sandy beach where travellers can witness both the sunrise and sunset over the sparkling water of the Bay of Bengal.',
      image: '/panoramas/barishal_day.png'
    },
    {
      id: 'bhimruli_floating_market',
      title: 'Bhimruli Floating Guava Market',
      titleBn: '??????? ?????? ?????? ?????',
      category: 'Cultural Agri-Bazaar',
      icon: 'leaf',
      x: 40,
      y: 44,
      est: 'Over 200 Years',
      builtBy: 'Local Farmers of Kirtipasha Canal',
      details: 'Asias largest floating market where hundreds of wooden paddle boats assemble daily laden with fresh emerald-green guavas and local produce.',
      image: '/panoramas/barishal_day.png'
    },
    {
      id: 'barishal_shaheed_minar',
      title: 'Barishal Central Shaheed Minar & Bells Park',
      titleBn: '?????? ????????? ???? ????? ? ???? ????',
      category: 'Heritage & Independence',
      icon: 'monument',
      x: 57,
      y: 43,
      est: '1972',
      builtBy: 'City Corporation',
      details: 'A monument honoring the martyrs of the 1952 Language Movement, situated near the lush greenery of historic Bells Park (Bangabandhu Udyan).',
      image: '/panoramas/barishal_day.png'
    },
    {
      id: 'kirtankhola_bridge',
      title: 'Abdur Rab Serniabat Bridge (Dapdapia Bridge)',
      titleBn: '???? ?????? ?? ??????????? ???? (??????? ????)',
      category: 'Engineering & Highway',
      icon: 'bridge',
      x: 72,
      y: 21,
      est: '2011',
      builtBy: 'Government of Bangladesh',
      details: 'A vital 1.4 km concrete girder bridge over the Kirtankhola river providing seamless highway access towards Patuakhali and Kuakata.',
      image: '/panoramas/barishal_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'kuakata_sea_beach', name: 'Kuakata Sea Beach', nameBn: '????????? ????', type: 'Sunrise & Sunset Beach', est: 'Natural' },
    { id: 'bhimruli_floating_market', name: 'Bhimruli Floating Market', nameBn: '?????? ?????? ?????', type: '200-yr Water Market', est: 'Heritage' },
    { id: 'kirtankhola_river', name: 'Kirtankhola Riverfront', nameBn: '?????????? ???????????', type: 'Venice of Bengal Lifeline', est: 'Natural' },
    { id: 'kirtankhola_bridge', name: 'Kirtankhola Bridge', nameBn: '??????? ????', type: 'Major Roadway Setu', est: '2011' },
    { id: 'barishal_shaheed_minar', name: 'Barishal Shaheed Minar', nameBn: '?????? ???? ?????', type: 'Historic Monument', est: '1972' }
  ]
};
