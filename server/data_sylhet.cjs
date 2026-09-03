module.exports = {
  id: 'sylhet',
  name: 'Sylhet',
  nameBn: '?????',
  tagline: 'Land of Two Leaves and a Bud — Tea Gardens, Sacred Shrines & Waterfalls',
  taglineBn: '???? ???? ???? ?????? ??? — ????????? ????? ? ?????? ????????',
  description: 'Surrounded by rolling green tea estates, crystal mountain streams, lush wetland haors, and revered Sufi shrines of Hazrat Shah Jalal (R.) and Hazrat Shah Paran (R.).',
  dayImage: '/panoramas/sylhet_day.png',
  nightImage: '/panoramas/sylhet_night.png',
  themeColor: '#10b981',
  bgGradient: 'from-emerald-950 via-slate-900 to-green-950',
  stats: {
    districts: 4,
    upazilas: '41+',
    landmarks: '95+',
    area: '12,596 km²',
    population: '12.1 Million',
    majorRiver: 'Surma, Kushiyara, Piyain, Sari',
    literacyRate: '70.8%'
  },
  districts: ['sylhet', 'moulvibazar', 'habiganj', 'sunamganj'],
  majorCities: [
    { name: 'Sylhet City', pop: '0.9M+', role: 'Spiritual City & Surma River Hub' },
    { name: 'Sreemangal', pop: '0.4M+', role: 'Tea Capital of Bangladesh' },
    { name: 'Sunamganj', pop: '0.5M+', role: 'Haor Capital & Tanguar Haor Ramsar Site' },
    { name: 'Moulvibazar', pop: '0.4M+', role: 'Lawachara National Park & Madhabkunda Falls' }
  ],
  highlights: [
    { title: 'Tea Capital of Bangladesh', desc: 'Over 135+ emerald green tea gardens and Seven Layer Tea' },
    { title: 'Spiritual Heritage', desc: 'Dargah Sharif of Hazrat Shah Jalal (R.) and Hazrat Shah Paran (R.)' },
    { title: 'Natural Freshwater Swamp', desc: 'Ratargul Swamp Forest & Bichanakandi Waterfalls' },
    { title: 'Tanguar Haor Ramsar Site', desc: 'Biodiversity wetland paradise and migratory bird haven' }
  ],
  iconicDelicacy: {
    name: 'Sylheti Shatkora Beef & Seven Layer Tea',
    nameBn: '??????? ?????? ???? ???? ? ????????? ??? ???? ??',
    desc: 'Tender beef simmered in tangy wild citrus shatkora and world-renowned multi-layered tea brew.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'shah_jalal_dargah',
      title: 'Hazrat Shah Jalal (R.) Dargah Sharif',
      titleBn: '???? ???????? (??.) ????? ????',
      category: 'Spiritual Sanctuary',
      icon: 'mosque',
      x: 44,
      y: 19,
      est: '1346',
      builtBy: 'Followers of Hazrat Shah Jalal',
      details: 'The revered resting place of 14th-century Sufi saint Hazrat Shah Jalal (R.), renowned for sacred Mahseer fish ponds, historic brass chandeliers, and spiritual peace.',
      image: '/panoramas/sylhet_day.png'
    },
    {
      id: 'tea_gardens_sreemangal',
      title: 'Sreemangal & Seven Layer Tea Garden',
      titleBn: '????????? ?? ????? ? ??????? ?? ?????',
      category: 'Nature & Tea Heritage',
      icon: 'leaf',
      x: 69,
      y: 20,
      est: '1857',
      builtBy: 'Tea Planters',
      details: 'Sprawling carpet of green tea estates in Sreemangal producing premium quality Ceylon black tea, green tea, and famous 7-layer colorful tea.',
      image: '/panoramas/sylhet_day.png'
    },
    {
      id: 'ratargul_swamp_forest',
      title: 'Ratargul Freshwater Swamp Forest',
      titleBn: '???????? ???????? ??????',
      category: 'Biodiversity Forest',
      icon: 'tree',
      x: 25,
      y: 20,
      est: 'Protected Reserve',
      builtBy: 'Nature',
      details: 'The only freshwater swamp forest in Bangladesh, submerged under 20-30 feet of freshwater during monsoons, navigated by silent wooden country boats.',
      image: '/panoramas/sylhet_day.png'
    },
    {
      id: 'keane_bridge',
      title: 'Keane Bridge (Surma River)',
      titleBn: '????? ????? (????? ???)',
      category: 'Historic Bridge',
      icon: 'bridge',
      x: 24,
      y: 38,
      est: '1936',
      builtBy: 'Sir Michael Keane (Assam Governor)',
      details: 'An iconic 1,150 feet bowstring steel arch bridge spanning the Surma River in Sylhet city, known as the gateway to Sylhet.',
      image: '/panoramas/sylhet_day.png'
    },
    {
      id: 'jaflong_piyain',
      title: 'Jaflong & Piyain River Stone Stream',
      titleBn: '????? ? ?????? ???',
      category: 'Nature & Mountain River',
      icon: 'water',
      x: 22,
      y: 52,
      est: 'Natural',
      builtBy: 'Nature / Meghalaya Foothills',
      details: 'Nestled at the foothills of Indian Meghalaya hills, Jaflong is famous for crystal clear mountain rivers, rolling round stones, and Khasia indigenous villages.',
      image: '/panoramas/sylhet_day.png'
    },
    {
      id: 'bholaganj_sada_pathor',
      title: 'Bholaganj Sada Pathor (White Stones)',
      titleBn: '???????? ???? ????',
      category: 'Natural Spring Wonder',
      icon: 'mountain',
      x: 69,
      y: 48,
      est: 'Natural',
      builtBy: 'Dhalai River Valley',
      details: 'Known as the Swargobhumi or heaven of white stones, where icy turquoise mountain water rushes over gleaming white riverbed boulders.',
      image: '/panoramas/sylhet_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'shah_jalal_dargah', name: 'Shah Jalal Mazar Sharif', nameBn: '???????? ????? ????', type: 'Sacred Sufi Shrine', est: '1346' },
    { id: 'tea_gardens_sreemangal', name: 'Sreemangal Tea Gardens', nameBn: '????????? ?? ?????', type: 'Tea Capital of Bangladesh', est: '1857' },
    { id: 'ratargul_swamp_forest', name: 'Ratargul Swamp Forest', nameBn: '???????? ??', type: 'Freshwater Swamp Forest', est: 'Protected' },
    { id: 'bholaganj_sada_pathor', name: 'Bholaganj Sada Pathor', nameBn: '???? ????', type: 'Turquoise Mountain Springs', est: 'Natural' },
    { id: 'keane_bridge', name: 'Keane Bridge', nameBn: '????? ?????', type: 'Surma River Historic Bridge', est: '1936' }
  ]
};
