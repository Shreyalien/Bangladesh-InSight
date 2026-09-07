const fs = require('fs');
const path = require('path');

const DELICACIES_MAP = {
  // Dhaka
  'Dhakai Bakorkhani': '/delicacies/dhakai_bakarkhani.jpg',
  'Kacchi Biryani of Old Dhaka': '/delicacies/kacchi_biryani.jpg',
  'Porabarir Chamcham': '/delicacies/porabarir_chamcham.jpg',
  'Shahi Jilapi of Chawkbazar': '/delicacies/shahi_jilapi.jpg',
  'Nanna Biryani Morog Polao': '/delicacies/nanna_biryani_polao.jpg',
  'Bhorta-Khichuri of Old Dhaka': '/delicacies/bhorta_khichuri.jpg',
  'Manikganjer Khejur Gur': '/delicacies/manikganjer_gur.jpg',
  'Comillar Matri Bhandar Rosomalai': '/delicacies/comilla_rosomalai.jpg',

  // Chattogram
  'Mezbani Gosht': '/delicacies/mezbani_gosht.jpg',
  'Chittagong Kala Bhuna': '/delicacies/chittagong_kala_bhuna.jpg',
  'Loitta Fry & Shutki Bhorta': '/delicacies/loitta_fry_shutki.jpg',
  'Durus Kura of Cox\'s Bazar': '/delicacies/durus_kura.jpg',
  'Maheshkhali Rupchanda Dry Curry': '/delicacies/rupchanda_dry_curry.jpg',
  'Paharer Chander Hash': '/delicacies/paharer_chander_hash.jpg',
  'Burmese Spicy Pickles': '/delicacies/burmese_spicy_pickles.jpg',
  'Rangamati Bamboo Shoot Curry': '/delicacies/bamboo_shoot_curry.jpg',

  // Rajshahi
  'Bogurar Doi (Red Yogurt)': '/delicacies/bogra_doi.jpg',
  'Natarer Kanchagolla': '/delicacies/natore_kanchagolla.jpg',
  'Rajshahi Fazli & Khirsapat': '/delicacies/rajshahi_mango.jpg',
  'Kalai Ruti & Begun Bhorta': '/delicacies/kalai_ruti.jpg',
  'Shibganjer Chamcham': '/delicacies/shibganj_chamcham.jpg',
  'Sirajganjer Pera Sandesh': '/delicacies/sirajganj_pera_sandesh.jpg',
  'Puthia Rasgulla': '/delicacies/puthia_rasgulla.jpg',
  'Naogaoner Chhana-Murki': '/delicacies/naogaon_chhana_murki.jpg',

  // Khulna
  'Chui Jhal Gosht of Khulna': '/delicacies/chui_jhal_gosht.jpg',
  'Sundarban Pure Wild Honey': '/delicacies/sundarban_honey.jpg',
  'Satkhirar Sandesh': '/delicacies/satkhira_sandesh.jpg',
  'Bagerhat Galda Chingri Malai Curry': '/delicacies/galda_chingri_malai_curry.jpg',
  'Jashorer Jamtala Sweet': '/delicacies/jashore_jamtala_sweet.jpg',
  'Meherpurer Sabitri Sweet': '/delicacies/meherpur_sabitri.jpg',
  'Kushtiar Tilkathi & Khaja': '/delicacies/kushtia_tilkathi.jpg',
  'Kopotakkho Ilish Paturi': '/delicacies/kopotakkho_ilish_paturi.jpg',

  // Barishal
  'Barishaler Ilish Bhapa': '/delicacies/barishal_ilish_bhapa.jpg',
  'Bhola Mahish Raw Milk Doi': '/delicacies/bhola_mahish_doi.jpg',
  'Jhalokatir Amra & Guava': '/delicacies/jhalokati_amra_guava.jpg',
  'Pirojpurer Balam Rice Payesh': '/delicacies/balam_rice_payesh.jpg',
  'Barishali Chital Machher Muitha': '/delicacies/chital_machher_muitha.jpg',
  'Patuakhali Hilsha Paturi': '/delicacies/patuakhali_hilsha_paturi.jpg',
  'Amtali Soft Chhana Sweet': '/delicacies/amtali_chhana_sweet.jpg',
  'Narkel Naru & Moa': '/delicacies/narkel_naru.jpg',

  // Sylhet
  'Shatkora Beef Curry': '/delicacies/shatkora_beef.jpg',
  'Seven-Layer Colored Tea': '/delicacies/seven_layer_tea.jpg',
  'Sylheti Bakarkhani': '/delicacies/sylheti_bakarkhani.jpg',
  'Chunga Pitha': '/delicacies/chunga_pitha.jpg',
  'Tanguar Haor Boal & Baim': '/delicacies/haor_boal_fish.jpg',
  'Akhni Polao of Sylhet': '/delicacies/akhni_polao.jpg',
  'Jaldubi Honey Pineapples': '/delicacies/jaldubi_pineapple.jpg',
  'Hakaluki Fresh Prawn Curry': '/delicacies/hakaluki_prawn.jpg',

  // Rangpur
  'Haribhanga Mango': '/delicacies/haribhanga_mango.jpg',
  'Gaibandhar Roshomunjuri': '/delicacies/gaibandha_roshomunjuri.jpg',
  'Dinajpurer Kataribhog Rice': '/delicacies/kataribhog_rice.jpg',
  'Teesta River Boal Curry': '/delicacies/teesta_boal_curry.jpg',
  'Kurigram Shol Machher Jhol': '/delicacies/kurigram_shol_machh.jpg',
  'Panchagarh Plainland Green Tea': '/delicacies/panchagarh_tea.jpg',
  'Nilphamari Chhana Sandesh': '/delicacies/nilphamari_sandesh.jpg',
  'Lalmonirhat Special Dal-Puri': '/delicacies/lalmonirhat_dal_puri.jpg',

  // Mymensingh
  'Muktagachar Monda': '/delicacies/muktagacha_monda.jpg',
  'Netrokonar Balish Mishti': '/delicacies/netrokona_balish_mishti.jpg',
  'Brahmaputra Bain & Chital Curry': '/delicacies/brahmaputra_chital_curry.jpg',
  'Sherpurer Chhanar Payesh': '/delicacies/sherpur_chhanar_payesh.jpg',
  'Muktagacha Petha & Doi': '/delicacies/muktagacha_petha.jpg',
  'Birisiri Garo Traditional Delicacies': '/delicacies/birisiri_garo_delicacies.jpg',
  'Jamalpur Kalo Jam': '/delicacies/jamalpur_kalo_jam.jpg',
  'Mymensingh Pitha Mela Bhapa': '/delicacies/mymensingh_bhapa_pitha.jpg'
};

const RIVERS_MAP = {
  // Dhaka
  'Buriganga River': '/rivers/buriganga_river.jpg',
  'Padma River': '/rivers/padma_river.jpg',
  'Shitalakshya River': '/rivers/shitalakshya_river.jpg',
  'Dhaleshwari River': '/rivers/dhaleshwari_river.jpg',
  'Meghna River': '/rivers/meghna_river.jpg',

  // Chattogram
  'Karnaphuli River': '/rivers/karnaphuli_river.jpg',
  'Sangu River': '/rivers/sangu_river.jpg',
  'Halda River': '/rivers/halda_river.jpg',
  'Matamuhuri River': '/rivers/matamuhuri_river.jpg',
  'Naf River': '/rivers/naf_river.jpg',

  // Rajshahi
  'Padma River (Upper Reach)': '/rivers/padma_river.jpg',
  'Mahananda River': '/rivers/mahananda_river.jpg',
  'Karatoya River': '/rivers/karatoya_river.jpg',
  'Atrai River': '/rivers/atrai_river.jpg',
  'Jamuna River (West Bank)': '/rivers/jamuna_river.jpg',

  // Khulna
  'Rupsha River': '/rivers/rupsha_river.jpg',
  'Pashur River': '/rivers/pashur_river.jpg',
  'Kopotakkho River': '/rivers/kopotakkho_river.jpg',
  'Bhairab River': '/rivers/bhairab_river.jpg',
  'Madhumati River': '/rivers/madhumati_river.jpg',

  // Barishal
  'Kirtankhola River': '/rivers/kirtankhola_river.jpg',
  'Meghna Lower Estuary': '/rivers/meghna_river.jpg',
  'Tetulia River': '/rivers/tetulia_river.jpg',
  'Payra River': '/rivers/payra_river.jpg',
  'Arial Khan River': '/rivers/arial_khan_river.jpg',

  // Sylhet
  'Surma River': '/rivers/surma_river.jpg',
  'Kushiyara River': '/rivers/kushiyara_river.jpg',
  'Piyain River': '/rivers/piyain_river.jpg',
  'Dholai River': '/rivers/dholai_river.jpg',
  'Khowai River': '/rivers/khowai_river.jpg',

  // Rangpur
  'Teesta River': '/rivers/teesta_river.jpg',
  'Brahmaputra River (Entry Point)': '/rivers/old_brahmaputra_river.jpg',
  'Dharla River': '/rivers/dharla_river.jpg',
  'Ghaghat River': '/rivers/ghaghat_river.jpg',
  'Karatoya (Upper Reach)': '/rivers/karatoya_river.jpg',

  // Mymensingh
  'Old Brahmaputra River': '/rivers/old_brahmaputra_river.jpg',
  'Shomeshwari River': '/rivers/shomeshwari_river.jpg',
  'Kangsha River': '/rivers/kangsha_river.jpg',
  'Bhogai River': '/rivers/bhogai_river.jpg',
  'Nitai River': '/rivers/nitai_river.jpg'
};

const FESTIVALS_MAP = {
  'Shakrain Kite Carnival': '/culture/shakrain_carnival.jpg',
  'Mangal Shobhajatra': '/culture/mangal_shobhajatra.jpg',
  'Amar Ekushey Boi Mela': '/culture/boimela.jpg',
  'Boli Khela (Jabbar er Boli Khela)': '/culture/boli_khela.jpg',
  'Biju & Boishabi Festival': '/culture/biju_festival.jpg',
  'Gambhira Folk Theater': '/culture/gambhira.jpg',
  'Puthia Temple Rath Yatra': '/culture/rath_yatra.jpg',
  'Rash Mela at Dublar Char': '/culture/rash_mela.jpg',
  'Lalon Smoronothsob (Kushtia)': '/culture/lalon_festival.jpg',
  'Floating Guava Market Carnival': '/delicacies/jhalokati_amra_guava.jpg',
  'Traditional Nouka Baich (Boat Race)': '/culture/nouka_baich.jpg',
  'Manipuri Raas Leela Festival': '/culture/raas_leela.jpg',
  'Urs Sharif of Hazrat Shah Jalal': '/heritage/shah_jalal_dargah.jpg',
  'Kantajew Temple Rash Mela (Dinajpur)': '/heritage/kantajew_temple.jpg',
  'Bhawaiya Folk Music Festival': '/culture/gambhira.jpg',
  'Mymensingh Geetika & Pala Gaan': '/culture/lalon_festival.jpg',
  'Garo Wangala Festival (Birishiri)': '/culture/wangala.jpg'
};

const EXPANDED_GALLERIES = {
  dhaka: [
    '/panoramas/Dhaka_Day.jpg',
    '/panoramas/Dhaka_Evening.jpg',
    '/panoramas/dhaka_night.jpg'
  ],
  chattogram: [
    '/panoramas/chattogram_day.jpg',
    '/panoramas/Chittagong_Evening.jpg',
    '/panoramas/chattogram_cinematic_ultra.jpg',
    '/panoramas/chattogram_night.jpg'
  ],
  rajshahi: [
    '/panoramas/Rajshahi_Day.jpg',
    '/panoramas/Rajshahi_Evening.jpg',
    '/panoramas/rajshahi_night.jpg'
  ],
  khulna: [
    '/panoramas/Khulna_Day.jpg',
    '/panoramas/Khulna_Evening.jpg',
    '/panoramas/khulna_day_alt.jpg',
    '/panoramas/khulna_night.jpg'
  ],
  barishal: [
    '/panoramas/Barishal_Day.jpg',
    '/panoramas/Barishal_Evening.jpg',
    '/panoramas/barishal_night.jpg'
  ],
  sylhet: [
    '/panoramas/Sylhet_Day.jpg',
    '/panoramas/Sylhet_Evening.jpg',
    '/panoramas/sylhet_night_alt.jpg',
    '/panoramas/sylhet_night.jpg'
  ],
  rangpur: [
    '/panoramas/Rangpur_Day.jpg',
    '/panoramas/Rangpur_Evening.jpg',
    '/panoramas/rangpur_night.jpg'
  ],
  mymensingh: [
    '/panoramas/Mymensingh_Day.jpg',
    '/panoramas/Mymensingh_Evening.jpg',
    '/panoramas/mymensingh_day_alt.jpg',
    '/panoramas/mymensingh_night.jpg'
  ]
};

const filePaths = [
  path.resolve('client/src/data/divisions.json'),
  path.resolve('server/data/divisions.json')
];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.forEach(div => {
    // 1. Expand gallery
    if (EXPANDED_GALLERIES[div.id]) {
      div.gallery = EXPANDED_GALLERIES[div.id];
    }

    // 2. Delicacies
    (div.delicacies || []).forEach(d => {
      if (DELICACIES_MAP[d.name]) {
        d.image = DELICACIES_MAP[d.name];
      }
    });

    // 3. Rivers
    (div.majorRiversDetailed || []).forEach(r => {
      if (RIVERS_MAP[r.name]) {
        r.image = RIVERS_MAP[r.name];
      }
    });

    // 4. Festivals
    (div.festivals || []).forEach(f => {
      if (FESTIVALS_MAP[f.name]) {
        f.image = FESTIVALS_MAP[f.name];
      }
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated all expanded assets in ${filePath}`);
});
