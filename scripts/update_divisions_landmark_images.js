const fs = require('fs');
const path = require('path');

const ID_MAP = {
  // Dhaka
  'Lalbagh Fort': 'lalbagh_fort',
  'Ahsan Manzil': 'ahsan_manzil',
  'National Martyrs Memorial': 'martyrs_memorial',
  'Padma Multipurpose Bridge': 'padma_bridge',
  'Panam Nagar': 'panam_nagar',
  'Tara Masjid (Star Mosque)': 'star_mosque',
  'Curzon Hall': 'curzon_hall',
  'Baitul Mukarram National Mosque': 'baitul_mukarram',

  // Chattogram
  'Chittagong Commonwealth War Cemetery': 'chittagong_war_cemetery',
  'Buddha Dhatu Jadi (Golden Temple)': 'buddha_dhatu_jadi',
  'Bangabandhu Sheikh Mujibur Rahman Tunnel': 'karnaphuli_tunnel',
  'Chandanpura Mosque (Taj Masjid)': 'chandanpura_mosque',
  'Kaptai Lake & Hanging Bridge': 'kaptai_lake',
  "Cox's Bazar Sea Beach": 'coxs_bazar_beach',
  "St. Martin's Island (Narikel Jinjira)": 'st_martins_island',
  'Alutila Mysterious Cave': 'alutila_cave',

  // Rajshahi
  'Somapura Mahavihara': 'somapura_mahavihara',
  'Varendra Research Museum': 'varendra_museum',
  'Puthia Royal Temple Complex': 'puthia_temple_complex',
  'Kantajew Temple (Kantaji)': 'kantajew_temple',
  'Mahasthangarh Citadel': 'mahasthangarh',
  'Bagha Shahi Mosque': 'bagha_mosque',
  'Hardinge Bridge': 'hardinge_bridge',
  'Choto Sona Mosque': 'choto_sona_mosque',

  // Khulna
  'Sixty Dome Mosque': 'sixty_dome_mosque',
  'Mazar of Khan Jahan Ali': 'khan_jahan_ali_mazar',
  'Kotka Wildlife Sanctuary': 'kotka_sundarbans',
  'Michael Madhusudan Dutta Birthplace': 'michael_madhusudan_birthplace',
  'Historic Mujibnagar Memorial': 'mujibnagar_memorial',
  'Fakir Lalon Shah Akhra': 'lalon_shah_akhra',
  'Jessore Collectorate Building': 'jessore_collectorate',
  'Khan Jahan Ali Bridge (Rupsha)': 'rupsha_bridge',

  // Barishal
  'Oxford Mission Epiphany Church': 'oxford_mission_church',
  'Baitul Aman Guthia Mosque': 'guthia_mosque',
  'Durga Sagar Dighi': 'durga_sagar',
  'Tantunir Bari Heritage Mansion': 'tantunir_bari',
  'Kuakata Sunset & Sunrise Beach': 'kuakata_beach',
  'Floating Guava Market (Bhimruli)': 'floating_guava_market',
  'Monpura Island': 'monpura_island',
  'Kirtankhola Riverfront & Launch Fleet': 'kirtankhola_river',

  // Sylhet
  'Hazrat Shah Jalal (R.) Dargah': 'shah_jalal_dargah',
  'Keane Bridge': 'keane_bridge',
  "Ali Amjad's Clock Tower": 'ali_amjad_clock',
  'Malnicherra Tea Estate': 'malnicherra_tea_estate',
  'Bholaganj Sada Pathor': 'bholaganj_sada_pathor',
  'Jaflong & Dawki Riverway': 'jaflong_sylhet',
  'Ratargul Freshwater Swamp Forest': 'ratargul_swamp_forest',
  'Madhabkunda Natural Waterfall': 'madhabkunda_waterfall',

  // Rangpur
  'Tajhat Palace (Rajbari)': 'tajhat_palace',
  'Carmichael College Architecture': 'carmichael_college',
  'Dimla Rajbari': 'dimla_rajbari',
  'Ramsagar National Heritage Dighi': 'ramsagar_dighi',
  'Teesta Barrage (Dooani)': 'teesta_barrage',
  'Tin Bigha Corridor': 'tin_bigha_corridor',
  'Nayabad Historic Mosque': 'nayabad_mosque',
  'Harano Masjid (Ancient Sahaba Mosque)': 'harano_masjid',

  // Mymensingh
  'Shashi Lodge (Mymensingh Rajbari)': 'shashi_lodge',
  'Alexander Castle (Lohar Kuthi)': 'alexander_castle',
  'Birisiri Ceramic White Clay Hills': 'birisiri_white_clay',
  'Muktagacha Sixteen Zamindar Rajbari': 'muktagacha_rajbari',
  'Ananda Mohan College Historic Campus': 'ananda_mohan_college',
  'Shambhuganj Brahmaputra Bridge': 'shambhuganj_bridge',
  'Garo Hills & Border Foothills': 'garo_hills',
  'Mymensingh Museum & Zamindar Relics': 'mymensingh_museum'
};

const filePaths = [
  path.resolve('client/src/data/divisions.json'),
  path.resolve('server/data/divisions.json')
];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;
  data.forEach(d => {
    (d.landmarks || []).forEach(l => {
      const id = ID_MAP[l.name];
      if (id) {
        l.image = `/heritage/${id}.jpg`;
        updatedCount++;
      } else {
        console.warn(`Unmapped landmark in ${d.name}: "${l.name}"`);
      }
    });
  });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${updatedCount} landmarks in ${filePath}`);
});
