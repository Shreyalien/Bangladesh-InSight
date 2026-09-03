module.exports = {
  id: 'khulna',
  name: 'Khulna',
  nameBn: '?????',
  tagline: 'Land of Mangroves — Sundarbans, Royal Bengal Tiger & Ancient Shrines',
  taglineBn: '???????? ? ???????? ??? — ???? ?????? ?????? ? ???????? ???? ?????????? ????',
  description: 'Home to the UNESCO World Heritage Sundarbans mangrove forest, the historic Sixty Dome Mosque of Bagerhat, Mongla Seaport, and shrimp aquaculture.',
  dayImage: '/panoramas/khulna_day.png',
  nightImage: '/panoramas/khulna_night.png',
  themeColor: '#059669',
  bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
  stats: {
    districts: 10,
    upazilas: '59+',
    landmarks: '120+',
    area: '22,284 km²',
    population: '17.4 Million',
    majorRiver: 'Rupsha, Pasur, Bhairab, Madhumati',
    literacyRate: '71.5%'
  },
  districts: ['khulna', 'jashore', 'bagerhat', 'satkhira', 'kushtia', 'jhenaidah', 'magura', 'chuadanga', 'meherpur', 'narail'],
  majorCities: [
    { name: 'Khulna City', pop: '1.2M+', role: 'Industrial Capital & Rupsha River City' },
    { name: 'Jashore', pop: '0.8M+', role: 'First Independent District 1971 & Flower Hub (Gadkhali)' },
    { name: 'Kushtia', pop: '0.6M+', role: 'Cultural Capital — Fakir Lalon Shah & Tagore Shilaidaha' },
    { name: 'Bagerhat', pop: '0.4M+', role: 'UNESCO Mosque City of Khan Jahan Ali' },
    { name: 'Mongla', pop: '0.2M+', role: 'Second Largest International Seaport' }
  ],
  highlights: [
    { title: 'The Sundarbans', desc: 'Worlds largest contiguous mangrove forest & Royal Bengal Tiger sanctuary' },
    { title: 'Sixty Dome Mosque (Bagerhat)', desc: '15th-century UNESCO World Heritage architectural masterpiece' },
    { title: 'Lalon Shah Akharabari (Kushtia)', desc: 'Spiritual sanctuary of mystic philosopher Fakir Lalon Shah' },
    { title: 'Mongla Seaport', desc: 'Eco-friendly maritime gateway powering global trade' }
  ],
  iconicDelicacy: {
    name: 'Khulna Chui Jhal Gosht & Sundarbans Raw Honey',
    nameBn: '?????? ?????? ????? ???? ? ?????????? ????? ???',
    desc: 'Tender mutton cooked with piper chaba aromatic spicy vine stem and fresh mangrove wild honey.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
  },
  hotspots: [
    {
      id: 'sundarbans',
      title: 'The Sundarbans Mangrove Forest',
      titleBn: '???????? ?????????? ??',
      category: 'UNESCO World Heritage Nature',
      icon: 'tree',
      x: 19,
      y: 32,
      est: 'UNESCO 1997',
      builtBy: 'Nature',
      details: 'The worlds largest tidal halophytic mangrove forest spanning 10,000 sq km across Bangladesh and India, home to the iconic Royal Bengal Tiger, spotted deer, and Irrawaddy dolphins.',
      image: '/panoramas/khulna_day.png'
    },
    {
      id: 'sixty_dome_mosque',
      title: 'The Sixty Dome Mosque (Shat Gombuj Masjid)',
      titleBn: '??? ?????? ????? (????????)',
      category: 'UNESCO Islamic Heritage',
      icon: 'mosque',
      x: 41,
      y: 45,
      est: '1459',
      builtBy: 'Saint Warrior Khan Jahan Ali',
      details: 'A 15th-century UNESCO World Heritage brick mosque featuring 77 low domes and 4 corner towers, epitomizing the Khan Jahan architectural style of medieval Bengal.',
      image: '/panoramas/khulna_day.png'
    },
    {
      id: 'rupsha_bridge',
      title: 'Khan Jahan Ali Setu (Rupsha Bridge)',
      titleBn: '??? ????? ??? ???? (????? ????)',
      category: 'Transport & Landmark',
      icon: 'bridge',
      x: 42,
      y: 31,
      est: '2005',
      builtBy: 'Roads & Highways Department',
      details: 'A picturesque 1.36 km cable-supported highway bridge across the Rupsha River, serving as the main highway gateway to Mongla Port and southern districts.',
      image: '/panoramas/khulna_day.png'
    },
    {
      id: 'lalon_shah_mazar',
      title: 'Fakir Lalon Shah Mazar (Chheuriya, Kushtia)',
      titleBn: '???? ???? ??? ????? (???????, ????????)',
      category: 'Spiritual & Culture',
      icon: 'music',
      x: 64,
      y: 30,
      est: '1890',
      builtBy: 'Baul Devotees & Culture Ministry',
      details: 'The sacred shrine of saint philosopher Fakir Lalon Shah, attracting millions of spiritual music enthusiasts, Bauls, and scholars from all over the world.',
      image: '/panoramas/khulna_day.png'
    },
    {
      id: 'jessore_collectorate',
      title: 'Jashore Collectorate Building',
      titleBn: '???? ?????????? ???',
      category: 'Colonial Heritage',
      icon: 'building',
      x: 62,
      y: 16,
      est: '1872',
      builtBy: 'Colonial Administration',
      details: 'An iconic 19th-century colonial red-brick administrative building in Jashore, representing the historic identity of Bangladeshs first liberated district.',
      image: '/panoramas/khulna_day.png'
    },
    {
      id: 'mongla_port',
      title: 'Mongla Seaport & Pasur River Terminal',
      titleBn: '???? ?????? ????? ? ???? ???????',
      category: 'Seaport & Trade',
      icon: 'ship',
      x: 75,
      y: 20,
      est: '1950',
      builtBy: 'Mongla Port Authority',
      details: 'The second busiest seaport in Bangladesh located on the confluence of the Pasur and Mongla rivers, pioneering green port initiatives and regional connectivity.',
      image: '/panoramas/khulna_day.png'
    }
  ],
  iconicPlaces: [
    { id: 'sundarbans', name: 'The Sundarbans', nameBn: '???????? ??????????', type: 'World Heritage Site', est: 'Natural' },
    { id: 'sixty_dome_mosque', name: 'Sixty Dome Mosque', nameBn: '??? ?????? ?????', type: '15th-Century UNESCO Mosque', est: '1459' },
    { id: 'rupsha_bridge', name: 'Rupsha Bridge', nameBn: '????? ????', type: 'Iconic Cable Bridge', est: '2005' },
    { id: 'lalon_shah_mazar', name: 'Lalon Shah Mazar', nameBn: '???? ????? ?????', type: 'Spiritual Baul Epicenter', est: '1890' },
    { id: 'mongla_port', name: 'Mongla Port', nameBn: '???? ?????', type: 'International Sea Port', est: '1950' }
  ]
};
