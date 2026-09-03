module.exports = {
  id: 'mymensingh',
  name: 'Mymensingh',
  nameBn: '????????',
  tagline: 'The Cultural Heart of Brahmaputra — Shashi Lodge, Folk Lore & Green Horizons',
  taglineBn: '????????????? ???????? ?????? — ??? ??, ??????? ? ??????????? ?????????',
  description: 'Situated alongside the calm Old Brahmaputra river, Mymensingh is famed for Maimansingha Gitika folk ballads, Shashi Lodge, Bangladesh Agricultural University (BAU), and Garo hill borders in Netrokona and Sherpur.',
  dayImage: '/panoramas/mymensingh_day.png',
  nightImage: '/panoramas/mymensingh_night.png',
  themeColor: '#14b8a6',
  bgGradient: 'from-teal-950 via-slate-900 to-cyan-950',
  stats: {
    districts: 4,
    upazilas: '35+',
    landmarks: '70+',
    area: '10,584 km²',
    population: '13.1 Million',
    majorRiver: 'Old Brahmaputra, Kangsha, Someshwari, Shitalakshya',
    literacyRate: '67.8%'
  },
  districts: ['mymensingh', 'jamalpur', 'netrokona', 'sherpur'],
  majorCities: [
    { name: 'Mymensingh City', pop: '0.8M+', role: 'Divisional HQ & Education Center' },
    { name: 'Jamalpur', pop: '0.4M+', role: 'Handicrafts & Nakshi Kantha Capital' },
    { name: 'Netrokona', pop: '0.3M+', role: 'Birishiri White Clay & Someshwari River' },
    { name: 'Sherpur', pop: '0.3M+', role: 'Garo Hills & Gazni Leisure Park' }
  ],
  highlights: [
    { title: 'Shashi Lodge (Mymensingh Rajbari)', desc: 'Victorian era palace with marble Venus statue and musical staircase' },
    { title: 'Bangladesh Agricultural University (BAU)', desc: 'Pioneering agricultural research university in South Asia' },
    { title: 'Birishiri & White Clay Lake', desc: 'Turquoise mineral lake nestled in Netrokona Garo hills' },
    { title: 'Nakshi Kantha of Jamalpur', desc: 'Renowned embroidered traditional handloom quilts' }
  ],
  iconicDelicacy: {
    name: 'Muktagacha Monda & Malaikari',
    nameBn: '??????????? ??????? ????? ? ???????',
    desc: '200-year-old secret recipe soft milk chhana sweet invented by Ram Gopal Modak in 1824.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'shashi_lodge',
      title: 'Shashi Lodge (Mymensingh Rajbari)',
      titleBn: '??? ?? (?????????? ???????)',
      category: 'Royal Victorian Heritage',
      icon: 'palace',
      x: 25,
      y: 35,
      est: '1905',
      builtBy: 'Maharaja Shashikanta Acharya',
      details: 'A breathtaking Victorian mansion adorned with Corinthian columns, a central Paris-imported marble statue of Venus, and ballroom music chambers.',
      image: '/panoramas/mymensingh_day.png'
    },
    {
      id: 'brahmaputra_riverbank',
      title: 'Old Brahmaputra Riverfront & Park',
      titleBn: '?????? ??????????? ?? ? ????? ??????',
      category: 'River & Cultural Park',
      icon: 'water',
      x: 74,
      y: 33,
      est: 'Historic Riverbank',
      builtBy: 'Nature & Zainul Abedin Art Gallery',
      details: 'A serene riverfront walkway alongside the historic river painted by Shilpacharya Zainul Abedin, featuring lush green gardens and sunset boating.',
      image: '/panoramas/mymensingh_day.png'
    },
    {
      id: 'mymensingh_zilla_museum',
      title: 'Mymensingh Museum & Town Hall',
      titleBn: '???????? ?????? ? ???? ??',
      category: 'Museum & History',
      icon: 'museum',
      x: 26,
      y: 17,
      est: '1969',
      builtBy: 'Department of Archaeology',
      details: 'Preserving rare artefacts, zamindari swords, musical instruments, and sculptures from the Muktagacha and Gouripur aristocratic estates.',
      image: '/panoramas/mymensingh_day.png'
    },
    {
      id: 'kazi_nazrul_university',
      title: 'Jatiya Kabi Kazi Nazrul Islam University (Trishal)',
      titleBn: '?????? ??? ???? ????? ????? ?????????????? (???????)',
      category: 'National Cultural University',
      icon: 'education',
      x: 66,
      y: 17,
      est: '2006',
      builtBy: 'Government of Bangladesh',
      details: 'Established in Trishal where National Poet Kazi Nazrul Islam spent his youth, dedicating higher research to literature, music, and dramatic arts.',
      image: '/panoramas/mymensingh_day.png'
    },
    {
      id: 'ananda_mohan_college',
      title: 'Ananda Mohan College',
      titleBn: '????? ???? ????',
      category: 'Historic Education',
      icon: 'education',
      x: 29,
      y: 52,
      est: '1908',
      builtBy: 'Barrister Ananda Mohan Bose',
      details: 'One of the oldest premier colleges in Bengal, producing leading intellectuals, scientists, and national leaders across over a century.',
      image: '/panoramas/mymensingh_day.png'
    },
    {
      id: 'charpara_jame_mosque',
      title: 'Charpara Jame Mosque & Central Minar',
      titleBn: '??????? ???? ?????',
      category: 'Religious Architecture',
      icon: 'mosque',
      x: 67,
      y: 53,
      est: '1955',
      builtBy: 'Local Community & Endowment',
      details: 'A prominent multi-domed central mosque in Mymensingh, serving thousands of worshippers daily with intricate white minarets.',
      image: '/panoramas/mymensingh_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'shashi_lodge', name: 'Shashi Lodge', nameBn: '??? ??', type: 'Victorian Palace (1905)', est: '1905' },
    { id: 'brahmaputra_riverbank', name: 'Brahmaputra Riverfront', nameBn: '??????????? ???????????', type: 'Zainul Abedin Walkway', est: 'Natural' },
    { id: 'ananda_mohan_college', name: 'Ananda Mohan College', nameBn: '????? ???? ????', type: 'Century-Old Heritage College', est: '1908' },
    { id: 'kazi_nazrul_university', name: 'Nazrul University', nameBn: '????? ??????????????', type: 'Cultural University', est: '2006' },
    { id: 'mymensingh_zilla_museum', name: 'Mymensingh Museum', nameBn: '???????? ??????', type: 'Zamindari Artefacts', est: '1969' }
  ]
};
