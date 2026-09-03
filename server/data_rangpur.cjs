module.exports = {
  id: 'rangpur',
  name: 'Rangpur',
  nameBn: '?????',
  tagline: 'Land of Heritage & Tobacco — Palaces, Terracotta & Northern Breezes',
  taglineBn: '??????????? ?????? ? ?????? — ?????? ??????? ? ???????? ??????',
  description: 'Northern frontier division rich in agrarian abundance (Haribhanga mangoes, tobacco, potatoes), royal palaces like Tajhat Rajbari, and ancient terracotta masterpieces.',
  dayImage: '/panoramas/rangpur_day.png',
  nightImage: '/panoramas/rangpur_night.png',
  themeColor: '#8b5cf6',
  bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
  stats: {
    districts: 8,
    upazilas: '58+',
    landmarks: '100+',
    area: '16,185 km²',
    population: '17.6 Million',
    majorRiver: 'Teesta, Brahmaputra, Dharla, Karatoya',
    literacyRate: '68.5%'
  },
  districts: ['rangpur', 'dinajpur', 'kurigram', 'lalmonirhat', 'nilphamari', 'thakurgaon', 'panchagarh', 'gaibandha'],
  majorCities: [
    { name: 'Rangpur City', pop: '1.1M+', role: 'Divisional HQ & Education Hub' },
    { name: 'Dinajpur', pop: '0.6M+', role: 'Historic Kantaji Temple, Litchi & Rice Capital' },
    { name: 'Panchagarh', pop: '0.4M+', role: 'Himalayan Kanchenjunga Viewpoint & Plainland Tea' },
    { name: 'Kurigram', pop: '0.4M+', role: 'Brahmaputra Charlands & Border Trade' },
    { name: 'Lalmonirhat', pop: '0.3M+', role: 'Mogolhat & Historic Railway Junction' }
  ],
  highlights: [
    { title: 'Tajhat Palace (Rangpur)', desc: 'Stunning early 20th-century palace built by Maharaja Jagadindra Roy' },
    { title: 'Kantaji Temple (Dinajpur)', desc: 'Finest terracotta Hindu temple in Bangladesh built in 1752' },
    { title: 'Haribhanga Mango & Dinajpur Bedana Litchi', desc: 'World-famous fiberless sweet fruit varieties' },
    { title: 'Panchagarh Kanchenjunga View', desc: 'View snow-clad Himalayan peaks directly from Bangladesh soil' }
  ],
  iconicDelicacy: {
    name: 'Haribhanga Mango & Dinajpur Litchi',
    nameBn: '??????? ??????? ?????????? ?? ? ?????????? ?????? ????',
    desc: 'Extremely sweet, juicy, fiberless Haribhanga mango and renowned fragrant Bedana/Madraji litchis.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'tajhat_palace',
      title: 'Tajhat Palace (Rangpur Museum)',
      titleBn: '?????? ???????',
      category: 'Royal Palace & Museum',
      icon: 'palace',
      x: 69,
      y: 19,
      est: '1926',
      builtBy: 'Maharaja Jagadindra Roy',
      details: 'A crown jewel of northern architecture, built in neoclassical style with marble stairs, grand dome, and surrounding ornamental gardens.',
      image: '/panoramas/rangpur_day.png'
    },
    {
      id: 'rangpur_city_hall',
      title: 'Rangpur City Hall & Administrative Hub',
      titleBn: '????? ??? ??? ? ???? ??',
      category: 'Civic Architecture',
      icon: 'building',
      x: 48,
      y: 33,
      est: '1891',
      builtBy: 'District Board',
      details: 'The historic municipal town hall and public assembly center, hosting pivotal cultural movements and language movement gatherings in northern Bengal.',
      image: '/panoramas/rangpur_day.png'
    },
    {
      id: 'rangpur_zoo',
      title: 'Rangpur Zoo & Eco Park',
      titleBn: '????? ???????????? ? ?????',
      category: 'Wildlife & Nature',
      icon: 'tree',
      x: 23,
      y: 55,
      est: '1989',
      builtBy: 'Ministry of Fisheries & Livestock',
      details: 'The second largest recreational zoo in Bangladesh spanning 21 acres, housing Royal Bengal Tigers, lions, hippos, and migratory bird sanctuaries.',
      image: '/panoramas/rangpur_day.png'
    },
    {
      id: 'rangpur_medical_college',
      title: 'Rangpur Medical College & Hospital',
      titleBn: '????? ??????? ???? ? ????????',
      category: 'Education & Health',
      icon: 'education',
      x: 43,
      y: 18,
      est: '1970',
      builtBy: 'Government of Bangladesh',
      details: 'The premier government medical training and healthcare facility serving 20 million residents across the northern Rangpur division.',
      image: '/panoramas/rangpur_day.png'
    },
    {
      id: 'teesta_barrage',
      title: 'Teesta Barrage (Dalia, Nilphamari)',
      titleBn: '?????? ??????? (??????)',
      category: 'Water Engineering',
      icon: 'bridge',
      x: 72,
      y: 38,
      est: '1990',
      builtBy: 'Bangladesh Water Development Board',
      details: 'The largest irrigation barrage in Bangladesh, controlling water flow across 44 radial gates on the mighty Teesta River.',
      image: '/panoramas/rangpur_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'tajhat_palace', name: 'Tajhat Palace', nameBn: '?????? ???????', type: 'Royal Palace Museum', est: '1926' },
    { id: 'rangpur_city_hall', name: 'Rangpur Town Hall', nameBn: '????? ???? ??', type: 'Historic Civic Landmark', est: '1891' },
    { id: 'teesta_barrage', name: 'Teesta Barrage', nameBn: '?????? ???????', type: 'Largest River Barrage', est: '1990' },
    { id: 'rangpur_zoo', name: 'Rangpur Zoo', nameBn: '????? ??????????', type: '21-Acre Wildlife Park', est: '1989' }
  ]
};
