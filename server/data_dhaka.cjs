module.exports = {
  id: 'dhaka',
  name: 'Dhaka',
  nameBn: '????',
  tagline: 'The Heart of Bangladesh — Culture, Innovation & Heritage',
  taglineBn: '?????????? ???????????? — ????????, ?????? ? ????????',
  description: 'The political, economic, and cultural nerve center of Bangladesh. Located along the Buriganga river, Dhaka division combines Mughal splendour, colonial architecture, bustling riverways, and ultra-modern metropolises.',
  dayImage: '/panoramas/dhaka_day.png',
  nightImage: '/panoramas/dhaka_night.png',
  themeColor: '#e11d48',
  bgGradient: 'from-rose-950 via-slate-900 to-slate-950',
  stats: {
    districts: 13,
    upazilas: '93+',
    landmarks: '150+',
    area: '20,593 km²',
    population: '44.2 Million',
    majorRiver: 'Padma, Meghna, Buriganga, Jamuna',
    literacyRate: '75.2%'
  },
  districts: ['dhaka', 'gazipur', 'narayanganj', 'tangail', 'munshiganj', 'narsingdi', 'manikganj', 'faridpur', 'gopalganj', 'madaripur', 'rajbari', 'shariatpur', 'kishoreganj'],
  majorCities: [
    { name: 'Dhaka City', pop: '21.0M+', role: 'National Capital' },
    { name: 'Gazipur', pop: '2.8M+', role: 'Industrial & High-Tech Hub' },
    { name: 'Narayanganj', pop: '1.6M+', role: 'River Port & RMG Pioneer' },
    { name: 'Tangail', pop: '1.2M+', role: 'Handloom & Sweet Capital' },
    { name: 'Munshiganj', pop: '0.8M+', role: 'Ancient Bikrampur & Agricultural Powerhouse' }
  ],
  highlights: [
    { title: 'Historic Landmarks', desc: 'Lalbagh Fort, Ahsan Manzil, Tara Masjid' },
    { title: 'National Monuments', desc: 'Jatiya Smriti Soudho (Savar), Jatiya Sangsad Bhaban' },
    { title: 'Mega Engineering', desc: 'Padma Multipurpose Bridge, Dhaka Metro Rail, Elevated Expressway' },
    { title: 'Economic Heartbeat', desc: 'Garments export capital, stock exchanges & IT centers' }
  ],
  iconicDelicacy: {
    name: 'Dhakaiya Biryani & Bakarkhani',
    nameBn: '??????? ???????? ? ????????',
    desc: 'Old Dhaka heritage cuisines spiced with saffron, pure ghee, and slow-cooked mutton.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'padma_bridge',
      title: 'Padma Bridge (Mawa)',
      titleBn: '????? ???? (?????)',
      category: 'Transport & Engineering',
      icon: 'bridge',
      x: 46,
      y: 22,
      est: '2022',
      builtBy: 'Bangladesh Government',
      details: 'The Padma Multipurpose Bridge is a landmark 6.15 km dual-deck bridge connecting 21 south-western districts with Dhaka, symbolizing engineering pride and economic transformation.',
      image: '/panoramas/dhaka_day.png'
    },
    {
      id: 'national_martyrs_memorial',
      title: 'National Martyrs Memorial (Savar)',
      titleBn: '????? ????????? (?????)',
      category: 'Heritage & Monument',
      icon: 'landmark',
      x: 62,
      y: 48,
      est: '1982',
      builtBy: 'Architect Syed Mainul Hossain',
      details: 'Jatiya Smriti Soudho stands 150 feet high with seven pairs of triangular wall planes, honoring millions who sacrificed their lives in the 1971 Liberation War.',
      image: '/panoramas/dhaka_day.png'
    },
    {
      id: 'ahsan_manzil',
      title: 'Ahsan Manzil (The Pink Palace)',
      titleBn: '????? ??????',
      category: 'Historic Palace',
      icon: 'palace',
      x: 27,
      y: 52,
      est: '1872',
      builtBy: 'Nawab Abdul Ghani',
      details: 'The official residential palace and seat of the Nawab of Dhaka along the Buriganga river, featuring grand Indo-Saracenic Revival architecture and museum galleries.',
      image: '/panoramas/dhaka_day.png'
    },
    {
      id: 'lalbagh_fort',
      title: 'Lalbagh Fort (Fort Aurangabad)',
      titleBn: '?????? ??????',
      category: 'Historic Fort',
      icon: 'fort',
      x: 45,
      y: 56,
      est: '1678',
      builtBy: 'Mughal Prince Muhammad Azam & Shaista Khan',
      details: 'A 17th-century Mughal fort complex with the Tomb of Pari Bibi, Diwan-i-Aam, and ancient water fountains reflecting classic Mughal architecture.',
      image: '/panoramas/dhaka_day.png'
    },
    {
      id: 'hatirjheel',
      title: 'Hatirjheel Lakefront & Overpasses',
      titleBn: '????????',
      category: 'Urban Nature',
      icon: 'water',
      x: 70,
      y: 22,
      est: '2013',
      builtBy: 'Bangladesh Army & RAJUK',
      details: 'A modern urban revitalisation project featuring expansive lake walkways, express water-taxis, vibrant nighttime lightings, and modern overpasses.',
      image: '/panoramas/dhaka_day.png'
    },
    {
      id: 'baitul_mukarram',
      title: 'Baitul Mukarram National Mosque',
      titleBn: '?????? ??????? ????? ?????',
      category: 'Religious & Culture',
      icon: 'mosque',
      x: 72,
      y: 78,
      est: '1968',
      builtBy: 'Architect Abdulhusein M. Thariani',
      details: 'The national mosque of Bangladesh, modeled after the holy Kaaba in Mecca with an expansive capacity for over 40,000 worshippers.',
      image: '/panoramas/dhaka_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'national_martyrs_memorial', name: 'National Martyrs Memorial', nameBn: '????? ?????????', type: 'Symbol of Independence', est: '1982' },
    { id: 'ahsan_manzil', name: 'Ahsan Manzil', nameBn: '????? ??????', type: 'Royal Palace Museum', est: '1872' },
    { id: 'lalbagh_fort', name: 'Lalbagh Fort', nameBn: '?????? ??????', type: '17th-century Mughal Fort', est: '1678' },
    { id: 'padma_bridge', name: 'Padma Bridge', nameBn: '????? ????', type: 'Engineering Marvel (6.15 km)', est: '2022' },
    { id: 'hatirjheel', name: 'Hatirjheel', nameBn: '????????', type: 'Modern Urban Waterfront', est: '2013' },
    { id: 'baitul_mukarram', name: 'Baitul Mukarram', nameBn: '?????? ???????', type: 'National Mosque', est: '1968' }
  ]
};
