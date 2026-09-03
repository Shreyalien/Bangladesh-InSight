module.exports = {
  id: 'chattogram',
  name: 'Chattogram',
  nameBn: '?????????',
  tagline: 'Gateway to the Bay — Mountains, Ports & Endless Coastlines',
  taglineBn: '???????????? ????????? — ?????, ?????? ? ???????? ???????',
  description: 'The commercial capital and premier maritime hub of Bangladesh, blessed with the majestic Chittagong Hill Tracts, lush valleys, tea gardens, and the worlds longest natural sandy sea beach in Coxs Bazar.',
  dayImage: '/panoramas/chattogram_day.png',
  nightImage: '/panoramas/chattogram_night.png',
  themeColor: '#0284c7',
  bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
  stats: {
    districts: 11,
    upazilas: '103+',
    landmarks: '180+',
    area: '33,909 km²',
    population: '33.2 Million',
    majorRiver: 'Karnaphuli, Feni, Sangu, Halda',
    literacyRate: '73.8%'
  },
  districts: ['chattogram', 'coxsbazar', 'rangamati', 'bandarban', 'khagrachhari', 'cumilla', 'feni', 'brahmanbaria', 'noakhali', 'lakshmipur', 'chandpur'],
  majorCities: [
    { name: 'Chattogram City', pop: '5.2M+', role: 'Commercial Capital & Deep Sea Port' },
    { name: 'Coxs Bazar', pop: '0.8M+', role: 'Worlds Longest Sea Beach Tourism Hub' },
    { name: 'Cumilla', pop: '1.4M+', role: 'Historic Mainamati & Rasmalai Capital' },
    { name: 'Rangamati', pop: '0.6M+', role: 'Lake City & Indigenous Culture Hub' },
    { name: 'Bandarban', pop: '0.4M+', role: 'High Peak Treks (Tahjindong, Keokradong)' }
  ],
  highlights: [
    { title: 'Worlds Longest Sea Beach', desc: '120 km continuous sandy beach in Coxs Bazar' },
    { title: 'Chattogram Port & Maritime Hub', desc: 'Handles 90%+ of country international sea trade' },
    { title: 'Chittagong Hill Tracts', desc: 'Kaptai Lake, Sajek Valley, Nilgiri, Rich Indigenous Culture' },
    { title: 'Karnaphuli Tunnel', desc: 'First underwater expressway tunnel in South Asia' }
  ],
  iconicDelicacy: {
    name: 'Chittagong Mezban Beef & Kala Bhuna',
    nameBn: '??????????? ?????????? ??????? ???? ? ????????',
    desc: 'Spicy black roasted beef cooked with secret indigenous whole spices and mustard oil.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'chattogram_port',
      title: 'Chattogram Port & Karnaphuli Estuary',
      titleBn: '????????? ????? ? ???????? ?????',
      category: 'Trade & Port',
      icon: 'ship',
      x: 67,
      y: 20,
      est: '1887',
      builtBy: 'Port Authority',
      details: 'The premier international seaport of Bangladesh processing over 3.2 million TEUs annually, standing as the economic backbone of South Asian trade.',
      image: '/panoramas/chattogram_day.png'
    },
    {
      id: 'coxs_bazar',
      title: 'Coxs Bazar Sea Beach & Marine Drive',
      titleBn: '????????? ?????? ???? ? ????? ??????',
      category: 'Nature & Beach',
      icon: 'beach',
      x: 68,
      y: 50,
      est: 'Natural',
      builtBy: 'Nature / Named after Capt. Hiram Cox',
      details: 'The worlds longest unbroken natural sandy beach (120 km), featuring the stunning 80 km Marine Drive bordering green hills and roaring blue waves.',
      image: '/panoramas/chattogram_day.png'
    },
    {
      id: 'foys_lake',
      title: 'Foys Lake & Batali Hill',
      titleBn: '????? ??? ? ?????? ???',
      category: 'Nature & Theme Park',
      icon: 'water',
      x: 25,
      y: 48,
      est: '1924',
      builtBy: 'Assam Bengal Railway engineer Mr. Foy',
      details: 'A picturesque man-made lake nestled in rolling green hills with amusement parks, water boat rides, and panoramic city vistas.',
      image: '/panoramas/chattogram_day.png'
    },
    {
      id: 'rangamati_kaptai',
      title: 'Rangamati Lake & Hanging Bridge',
      titleBn: '?????????? ??????? ??? ? ?????? ????',
      category: 'Hill City & Lake',
      icon: 'mountain',
      x: 25,
      y: 19,
      est: '1960',
      builtBy: 'Hydroelectric Project',
      details: 'Surrounded by emerald green hills, Kaptai Lake is the largest artificial lake in South Asia, famed for Chakma indigenous culture and floating markets.',
      image: '/panoramas/chattogram_day.png'
    },
    {
      id: 'khagrachhari_sajek',
      title: 'Sajek Valley & Khagrachhari',
      titleBn: '????? ?????? ? ????????',
      category: 'Cloud Valley',
      icon: 'cloud',
      x: 39,
      y: 18,
      est: 'Tourism Pioneer',
      builtBy: 'Indigenous Communities & Tourism Board',
      details: 'The Queen of Hills situated 1,800 feet above sea level, where white clouds float across lush green mountain peaks all year round.',
      image: '/panoramas/chattogram_day.png'
    },
    {
      id: 'bandarban_peaks',
      title: 'Bandarban & Nilgiri Hills',
      titleBn: '????????? ? ???????',
      category: 'High Mountain Trek',
      icon: 'mountain',
      x: 75,
      y: 78,
      est: 'Natural',
      builtBy: 'Nature',
      details: 'Home to the highest mountain peaks in Bangladesh (Saka Haphong, Tahjindong, Keokradong), Golden Temple, and breathtaking cloud viewpoints.',
      image: '/panoramas/chattogram_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'chattogram_port', name: 'Chattogram Port', nameBn: '????????? ?????', type: 'Primary Seaport', est: '1887' },
    { id: 'coxs_bazar', name: 'Coxs Bazar Beach', nameBn: '????????? ????', type: 'Worlds Longest Beach (120km)', est: 'Natural' },
    { id: 'rangamati_kaptai', name: 'Kaptai Lake', nameBn: '??????? ???', type: 'Scenic Lake City', est: '1960' },
    { id: 'foys_lake', name: 'Foys Lake', nameBn: '????? ???', type: 'Historic Hill Lake', est: '1924' },
    { id: 'bandarban_peaks', name: 'Bandarban Nilgiri', nameBn: '??????? ???????', type: 'Cloud Paradise', est: 'Natural' }
  ]
};
