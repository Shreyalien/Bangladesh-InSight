const fs = require('fs');
const path = require('path');

const DISTRICT_IMAGE_MAP = {
  // Dhaka Division
  dhaka: '/heritage/lalbagh_fort.jpg',
  gazipur: '/heritage/ahsan_manzil.jpg',
  narayanganj: '/heritage/panam_nagar.jpg',
  munshiganj: '/heritage/padma_bridge.jpg',
  narsingdi: '/heritage/star_mosque.jpg',
  tangail: '/delicacies/porabarir_chamcham.jpg',
  manikganj: '/heritage/curzon_hall.jpg',
  kishoreganj: '/rivers/old_brahmaputra_river.jpg',
  faridpur: '/rivers/padma_river.jpg',
  gopalganj: '/heritage/martyrs_memorial.jpg',
  madaripur: '/rivers/arial_khan_river.jpg',
  shariatpur: '/heritage/padma_bridge.jpg',
  rajbari: '/heritage/hardinge_bridge.jpg',

  // Chattogram Division
  chittagong: '/heritage/chittagong_war_cemetery.jpg',
  coxsbazar: '/heritage/coxs_bazar_beach.jpg',
  bandarban: '/heritage/buddha_dhatu_jadi.jpg',
  rangamati: '/heritage/kaptai_lake.jpg',
  khagrachhari: '/heritage/alutila_cave.jpg',
  comilla: '/delicacies/comilla_rosomalai.jpg',
  feni: '/heritage/karnaphuli_tunnel.jpg',
  noakhali: '/rivers/meghna_river.jpg',
  lakshmipur: '/rivers/meghna_river.jpg',
  chandpur: '/rivers/padma_river.jpg',
  brahmanbaria: '/rivers/meghna_river.jpg',

  // Rajshahi Division
  rajshahi: '/heritage/varendra_museum.jpg',
  bogra: '/delicacies/bogra_doi.jpg',
  pabna: '/heritage/hardinge_bridge.jpg',
  sirajganj: '/rivers/jamuna_river.jpg',
  natore: '/delicacies/natore_kanchagolla.jpg',
  naogaon: '/heritage/somapura_mahavihara.jpg',
  chapainawabganj: '/heritage/choto_sona_mosque.jpg',
  joypurhat: '/heritage/somapura_mahavihara.jpg',

  // Khulna Division
  khulna: '/heritage/rupsha_bridge.jpg',
  bagerhat: '/heritage/sixty_dome_mosque.jpg',
  satkhira: '/heritage/kotka_sundarbans.jpg',
  jessore: '/heritage/michael_madhusudan_birthplace.jpg',
  kushtia: '/heritage/lalon_shah_akhra.jpg',
  jhenaidah: '/rivers/kopotakkho_river.jpg',
  magura: '/rivers/madhumati_river.jpg',
  narail: '/heritage/michael_madhusudan_birthplace.jpg',
  chuadanga: '/heritage/mujibnagar_memorial.jpg',
  meherpur: '/heritage/mujibnagar_memorial.jpg',

  // Barishal Division
  barishal: '/heritage/guthia_mosque.jpg',
  bhola: '/heritage/monpura_island.jpg',
  patuakhali: '/heritage/kuakata_beach.jpg',
  pirojpur: '/heritage/durga_sagar.jpg',
  jhalokati: '/heritage/floating_guava_market.jpg',
  barguna: '/rivers/payra_river.jpg',

  // Sylhet Division
  sylhet: '/heritage/shah_jalal_dargah.jpg',
  moulvibazar: '/heritage/madhabkunda_waterfall.jpg',
  habiganj: '/rivers/khowai_river.jpg',
  sunamganj: '/heritage/jaflong_sylhet.jpg',

  // Rangpur Division
  rangpur: '/heritage/tajhat_palace.jpg',
  dinajpur: '/heritage/kantajew_temple.jpg',
  panchagarh: '/heritage/teesta_barrage.jpg',
  thakurgaon: '/heritage/kantajew_temple.jpg',
  nilphamari: '/heritage/dimla_rajbari.jpg',
  lalmonirhat: '/heritage/tin_bigha_corridor.jpg',
  kurigram: '/rivers/dharla_river.jpg',
  gaibandha: '/rivers/teesta_river.jpg',

  // Mymensingh Division
  mymensingh: '/heritage/shashi_lodge.jpg',
  netrokona: '/heritage/birisiri_white_clay.jpg',
  sherpur: '/heritage/garo_hills.jpg',
  jamalpur: '/heritage/ananda_mohan_college.jpg'
};

['client/src/data/districts.json', 'server/data/districts.json'].forEach(file => {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.forEach(d => {
    d.image = DISTRICT_IMAGE_MAP[d.id] || `/panoramas/${d.divisionId}_day.jpg`;
  });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated 64 districts in ${file}`);
});
