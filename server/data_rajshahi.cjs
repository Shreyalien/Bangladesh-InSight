module.exports = {
  id: 'rajshahi',
  name: 'Rajshahi',
  nameBn: '???????',
  tagline: 'The Silk City — Mango Orchards, Ancient Universities & Heritage',
  taglineBn: '???? ? ?????????? ???? — ??????? ?????? ? ?????? ??????',
  description: 'Renowned as the educational hub and Silk City of Bangladesh, situated along the Padma River. Famous for sweet Langra and Fazli mangoes, Varendra research antiquity, and terracotta palaces.',
  dayImage: '/panoramas/rajshahi_day.png',
  nightImage: '/panoramas/rajshahi_night.png',
  themeColor: '#d97706',
  bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
  stats: {
    districts: 8,
    upazilas: '67+',
    landmarks: '120+',
    area: '18,174 km²',
    population: '20.4 Million',
    majorRiver: 'Padma, Mahananda, Jamuna, Karatoya',
    literacyRate: '72.1%'
  },
  districts: ['rajshahi', 'bogura', 'pabna', 'sirajganj', 'natore', 'naogaon', 'chapai_nawabganj', 'joypurhat'],
  majorCities: [
    { name: 'Rajshahi City', pop: '0.9M+', role: 'Divisional HQ & Clean Green City' },
    { name: 'Bogura', pop: '0.8M+', role: 'Commercial Gateway & Ancient Mahasthangarh' },
    { name: 'Pabna', pop: '0.6M+', role: 'Hilsa, Mental Health Institute & Hardinge Bridge' },
    { name: 'Natore', pop: '0.4M+', role: 'Kachagolla Sweet & Rani Bhabani Rajbari' },
    { name: 'Chapai Nawabganj', pop: '0.5M+', role: 'Mango Capital of Bangladesh & Choto Sona Mosque' }
  ],
  highlights: [
    { title: 'Mango Capital of Bangladesh', desc: 'Himsagar, Langra, Gopalbhog, Fazli, Amrapali' },
    { title: 'UNESCO World Heritage', desc: 'Somapura Mahavihara at Paharpur (Naogaon)' },
    { title: 'Varendra Research Museum', desc: 'Oldest museum in Bangladesh established 1910' },
    { title: 'Puthia Temple Complex', desc: 'Largest collection of historic Hindu terracotta temples' }
  ],
  iconicDelicacy: {
    name: 'Natore Kachagolla & Bogra Curd (Doi)',
    nameBn: '??????? ??????????? ? ?????? ?????????? ??',
    desc: 'Famous authentic clay-pot sweetened curd and purest reduced milk chhana sweets.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'varendra_museum',
      title: 'Varendra Research Museum',
      titleBn: '???????? ?????? ??????',
      category: 'Museum & Antiquity',
      icon: 'museum',
      x: 35,
      y: 19,
      est: '1910',
      builtBy: 'Kumar Sarat Kumar Ray & Rajshahi University',
      details: 'The premier research museum in Bangladesh housing over 10,000 ancient sculptures, stone inscriptions, copper plates, and Buddhist relics from ancient Bengal.',
      image: '/panoramas/rajshahi_day.png'
    },
    {
      id: 'puthia_rajbari',
      title: 'Puthia Rajbari & Terracotta Temples',
      titleBn: '?????? ??????? ? ?????? ?????',
      category: 'Royal Heritage',
      icon: 'palace',
      x: 59,
      y: 18,
      est: '1895',
      builtBy: 'Puthia Royal Estate (Panchani Zamindar)',
      details: 'A magnificent Indo-Saracenic palace surrounded by moats, Govinda Temple, Shiva Temple, and unmatched terracotta relief artwork.',
      image: '/panoramas/rajshahi_day.png'
    },
    {
      id: 'bagha_mosque',
      title: 'Bagha Mosque (Terracotta Architecture)',
      titleBn: '???? ???? ?????',
      category: 'Islamic Heritage',
      icon: 'mosque',
      x: 31,
      y: 55,
      est: '1523',
      builtBy: 'Sultan Nusrat Shah of Bengal',
      details: 'A 16th-century historic mosque built during the Hussain Shahi dynasty, famed for exquisite floral terracotta plaques adorning its exterior walls.',
      image: '/panoramas/rajshahi_day.png'
    },
    {
      id: 'rajshahi_university',
      title: 'University of Rajshahi (Paris Road)',
      titleBn: '??????? ?????????????? (??????? ???)',
      category: 'Education & Green Campus',
      icon: 'education',
      x: 25,
      y: 38,
      est: '1953',
      builtBy: 'Government of East Bengal',
      details: 'The second oldest university in the country, world-famous for its majestic canopy of mahogany trees known as Paris Road and Shahid Smrity Sangrahashala.',
      image: '/panoramas/rajshahi_day.png'
    },
    {
      id: 'padma_riverbank',
      title: 'Padma Riverbank & T-Groin',
      titleBn: '????? ???? ??? ? ??-????',
      category: 'Nature & Sunset Point',
      icon: 'water',
      x: 75,
      y: 22,
      est: 'Modern Promenade',
      builtBy: 'Water Development Board & City Corp',
      details: 'The beloved cultural evening hub of Rajshahi citizens overlooking the mighty Padma, fresh river air, and serene sunset boat rides.',
      image: '/panoramas/rajshahi_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'varendra_museum', name: 'Varendra Research Museum', nameBn: '???????? ?????? ??????', type: 'Oldest Museum (Est. 1910)', est: '1910' },
    { id: 'puthia_rajbari', name: 'Puthia Rajbari', nameBn: '?????? ???????', type: 'Terracotta Palace Complex', est: '1895' },
    { id: 'bagha_mosque', name: 'Bagha Mosque', nameBn: '???? ???? ?????', type: '1523 Sultanate Mosque', est: '1523' },
    { id: 'rajshahi_university', name: 'Rajshahi University', nameBn: '??????? ?????????????', type: 'Historic Paris Road', est: '1953' },
    { id: 'padma_riverbank', name: 'Padma Riverside', nameBn: '????? ???????????', type: 'Lifeline of North Bengal', est: 'Natural' }
  ]
};
