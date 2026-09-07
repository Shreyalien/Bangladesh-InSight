const fs = require('fs');
const path = require('path');
const https = require('https');
const { Jimp } = require('jimp');

const DELICACIES_CONFIG = [
  // Dhaka
  { id: 'dhakai_bakarkhani', queries: ['Bakarkhani', 'Old Dhaka'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'kacchi_biryani', queries: ['Kacchi Biryani', 'Biryani'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'porabarir_chamcham', queries: ['Chomchom', 'Tangail'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'shahi_jilapi', queries: ['Jalebi', 'Chawkbazar'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'nanna_biryani_polao', queries: ['Pilaf', 'Morog Polao'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'bhorta_khichuri', queries: ['Khichdi', 'Bhorta'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'manikganjer_gur', queries: ['Jaggery', 'Palm sugar'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'comilla_rosomalai', queries: ['Ras malai', 'Comilla'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },

  // Chattogram
  { id: 'mezbani_gosht', queries: ['Mezban', 'Beef curry'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'chittagong_kala_bhuna', queries: ['Kala bhuna', 'Chittagong'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'loitta_fry_shutki', queries: ['Dried fish', 'Shutki'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'durus_kura', queries: ['Chicken curry', 'Cox\'s Bazar'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'rupchanda_dry_curry', queries: ['Silver pomfret', 'Fish curry'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'paharer_chander_hash', queries: ['Duck meat', 'Curry'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'burmese_spicy_pickles', queries: ['South Asian pickles', 'Achar'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'bamboo_shoot_curry', queries: ['Bamboo shoot', 'Rangamati'], pano: 'client/public/panoramas/chattogram_day.jpg' },

  // Rajshahi
  { id: 'bogra_doi', queries: ['Bograh curd', 'Dahi'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'natore_kanchagolla', queries: ['Kachagolla', 'Sandesh'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'rajshahi_mango', queries: ['Mango', 'Fazli mango'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'kalai_ruti', queries: ['Roti', 'Flatbread'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'shibganj_chamcham', queries: ['Chomchom', 'Chamcham'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'sirajganj_pera_sandesh', queries: ['Sandesh', 'Peda'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'puthia_rasgulla', queries: ['Rasgulla', 'Sweet'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'naogaon_chhana_murki', queries: ['Chhena', 'Mithai'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },

  // Khulna
  { id: 'chui_jhal_gosht', queries: ['Piper chaba', 'Beef curry'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'sundarban_honey', queries: ['Honey', 'Sundarbans'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'satkhira_sandesh', queries: ['Sandesh', 'Mithai'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'galda_chingri_malai_curry', queries: ['Chingri malai curry', 'Prawn'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'jashore_jamtala_sweet', queries: ['Gulab jamun', 'Sweet'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'meherpur_sabitri', queries: ['Mithai', 'Indian sweet'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'kushtia_tilkathi', queries: ['Sesame seed candy', 'Khaja'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'kopotakkho_ilish_paturi', queries: ['Paturi', 'Hilsa'], pano: 'client/public/panoramas/Khulna_Day.jpg' },

  // Barishal
  { id: 'barishal_ilish_bhapa', queries: ['Ilish', 'Steamed fish'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'bhola_mahish_doi', queries: ['Buffalo curd', 'Dahi'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'jhalokati_amra_guava', queries: ['Guava', 'Spondias dulcis'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'balam_rice_payesh', queries: ['Kheer', 'Rice pudding'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'chital_machher_muitha', queries: ['Fish ball', 'Fish curry'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'patuakhali_hilsha_paturi', queries: ['Paturi', 'Mustard fish'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'amtali_chhana_sweet', queries: ['Chhena', 'Sandesh'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'narkel_naru', queries: ['Laddu', 'Coconut candy'], pano: 'client/public/panoramas/Barishal_Day.jpg' },

  // Sylhet
  { id: 'shatkora_beef', queries: ['Citrus macroptera', 'Beef curry'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'seven_layer_tea', queries: ['Seven-color tea', 'Tea'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'sylheti_bakarkhani', queries: ['Bakarkhani', 'Flatbread'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'chunga_pitha', queries: ['Pitha', 'Rice cake'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'haor_boal_fish', queries: ['Catfish curry', 'Freshwater fish'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'akhni_polao', queries: ['Pilaf', 'Biryani'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'jaldubi_pineapple', queries: ['Pineapple', 'Fruit'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'hakaluki_prawn', queries: ['Prawn curry', 'Shrimp'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },

  // Rangpur
  { id: 'haribhanga_mango', queries: ['Haribhanga', 'Mango'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'gaibandha_roshomunjuri', queries: ['Rasgulla', 'Sweet'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'kataribhog_rice', queries: ['Rice', 'Aromatic rice'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'teesta_boal_curry', queries: ['Fish curry', 'River fish'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'kurigram_shol_machh', queries: ['Channa striata', 'Fish curry'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'panchagarh_tea', queries: ['Tea garden', 'Green tea'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'nilphamari_sandesh', queries: ['Sandesh', 'Sweet'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'lalmonirhat_dal_puri', queries: ['Puri (food)', 'Dalpuri'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },

  // Mymensingh
  { id: 'muktagacha_monda', queries: ['Monda', 'Sandesh'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'netrokona_balish_mishti', queries: ['Rasgulla', 'Sweet'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'brahmaputra_chital_curry', queries: ['Fish curry', 'River fish'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'sherpur_chhanar_payesh', queries: ['Payesh', 'Kheer'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'muktagacha_petha', queries: ['Petha', 'Doi'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'birisiri_garo_delicacies', queries: ['Tribal food', 'Rice wine'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'jamalpur_kalo_jam', queries: ['Gulab jamun', 'Pantua'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'mymensingh_bhapa_pitha', queries: ['Bhapa pitha', 'Pitha'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' }
];

const RIVERS_CONFIG = [
  // Dhaka
  { id: 'buriganga_river', queries: ['Buriganga River'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'padma_river', queries: ['Padma River'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'shitalakshya_river', queries: ['Shitalakshya River'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'dhaleshwari_river', queries: ['Dhaleshwari River'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'meghna_river', queries: ['Meghna River'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },

  // Chattogram
  { id: 'karnaphuli_river', queries: ['Karnaphuli River'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'sangu_river', queries: ['Sangu River'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'halda_river', queries: ['Halda River'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'matamuhuri_river', queries: ['Matamuhuri River'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'naf_river', queries: ['Naf River'], pano: 'client/public/panoramas/chattogram_day.jpg' },

  // Rajshahi
  { id: 'mahananda_river', queries: ['Mahananda River'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'karatoya_river', queries: ['Karatoya River'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'atrai_river', queries: ['Atrai River'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'jamuna_river', queries: ['Jamuna River (Bangladesh)'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },

  // Khulna
  { id: 'rupsha_river', queries: ['Rupsha River'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'pashur_river', queries: ['Pashur River'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'kopotakkho_river', queries: ['Kobodak River'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'bhairab_river', queries: ['Bhairab River'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'madhumati_river', queries: ['Madhumati River'], pano: 'client/public/panoramas/Khulna_Day.jpg' },

  // Barishal
  { id: 'kirtankhola_river', queries: ['Kirtankhola River'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'tetulia_river', queries: ['Tetulia River'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'payra_river', queries: ['Payra River'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'arial_khan_river', queries: ['Arial Khan River'], pano: 'client/public/panoramas/Barishal_Day.jpg' },

  // Sylhet
  { id: 'surma_river', queries: ['Surma River'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'kushiyara_river', queries: ['Kushiyara River'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'piyain_river', queries: ['Piyain River', 'Jaflong'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'dholai_river', queries: ['Dholai River', 'Bholaganj'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'khowai_river', queries: ['Khowai River'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },

  // Rangpur
  { id: 'teesta_river', queries: ['Teesta River'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'dharla_river', queries: ['Dharla River'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'ghaghat_river', queries: ['Ghaghat River'], pano: 'client/public/panoramas/Rangpur_Day.jpg' },

  // Mymensingh
  { id: 'old_brahmaputra_river', queries: ['Brahmaputra River', 'Old Brahmaputra River'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'shomeshwari_river', queries: ['Someswari River', 'Susang Durgapur'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'kangsha_river', queries: ['Kangsha River'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'bhogai_river', queries: ['Bhogai River'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'nitai_river', queries: ['Nitai River'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' }
];

const FESTIVALS_CONFIG = [
  { id: 'shakrain_carnival', queries: ['Shakrain', 'Old Dhaka'], pano: 'client/public/panoramas/dhaka_night.jpg' },
  { id: 'mangal_shobhajatra', queries: ['Mangal Shobhajatra', 'Pohela Boishakh'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'boimela', queries: ['Ekushey Book Fair'], pano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'boli_khela', queries: ['Boli Khela', 'Jabbar er Boli Khela'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'biju_festival', queries: ['Boisabi', 'Biju festival'], pano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'gambhira', queries: ['Gambhira', 'Folk dance'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'rath_yatra', queries: ['Ratha Yatra', 'Puthia'], pano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'rash_mela', queries: ['Rash Mela', 'Dublar Char'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'lalon_festival', queries: ['Lalon', 'Folk festival'], pano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'nouka_baich', queries: ['Nouka Baich', 'Boat race'], pano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'raas_leela', queries: ['Manipuri dance', 'Raas Leela'], pano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'wangala', queries: ['Wangala', 'Garo people'], pano: 'client/public/panoramas/Mymensingh_Day.jpg' }
];

function fetchWikiThumbnail(query) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=1000`;
    https.get(url, { headers: { 'User-Agent': 'AmarDesh360/1.0 (culinary-heritage@bangladesh-insight.org)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (pages) {
            for (const p in pages) {
              if (pages[p]?.thumbnail?.source) {
                return resolve(pages[p].thumbnail.source);
              }
            }
          }
          resolve(null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImageBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AmarDesh360/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImageBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function gradeImage(img, type) {
  img.resize({ w: 900, h: 540 }); // 5:3 ratio
  img.contrast(0.14);
  img.brightness(0.03);

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
    let r = img.bitmap.data[idx + 0];
    let g = img.bitmap.data[idx + 1];
    let b = img.bitmap.data[idx + 2];

    const dx = (x - img.bitmap.width / 2) / (img.bitmap.width / 2);
    const dy = (y - img.bitmap.height / 2) / (img.bitmap.height / 2);
    const distSq = dx * dx + dy * dy;
    const vignette = Math.max(0.80, 1 - distSq * 0.20);

    if (type === 'food') {
      // Warm, delicious, appetizing golden glow
      r = Math.min(255, Math.floor((r * 1.08 + 6) * vignette));
      g = Math.min(255, Math.floor((g * 1.02 + 2) * vignette));
      b = Math.min(255, Math.floor((b * 0.94) * vignette));
    } else if (type === 'river') {
      // Emerald & deep aquatic blue tone
      r = Math.min(255, Math.floor((r * 0.96) * vignette));
      g = Math.min(255, Math.floor((g * 1.04 + 3) * vignette));
      b = Math.min(255, Math.floor((b * 1.06 + 5) * vignette));
    } else {
      // Vibrant festival celebration
      r = Math.min(255, Math.floor((r * 1.07 + 5) * vignette));
      g = Math.min(255, Math.floor((g * 1.04 + 3) * vignette));
      b = Math.min(255, Math.floor((b * 1.02 + 2) * vignette));
    }

    img.bitmap.data[idx + 0] = r;
    img.bitmap.data[idx + 1] = g;
    img.bitmap.data[idx + 2] = b;
  });
}

async function batchProcess(list, subDir, type) {
  const publicDir = path.resolve(`client/public/${subDir}`);
  const distDir = path.resolve(`client/dist/${subDir}`);
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  console.log(`\n=== Processing ${list.length} ${subDir} ===`);

  for (const item of list) {
    const dest = path.join(publicDir, `${item.id}.jpg`);
    const distDest = path.join(distDir, `${item.id}.jpg`);

    if (fs.existsSync(dest)) {
      if (!fs.existsSync(distDest)) fs.copyFileSync(dest, distDest);
      continue;
    }

    console.log(`Processing: ${item.id}...`);
    let buffer = null;

    if (item.queries) {
      for (const q of item.queries) {
        const url = await fetchWikiThumbnail(q);
        if (url) {
          try {
            buffer = await downloadImageBuffer(url);
            break;
          } catch {}
        }
      }
    }

    try {
      let jimpImg;
      if (buffer && buffer.length > 2000) {
        jimpImg = await Jimp.read(buffer);
      } else if (item.pano && fs.existsSync(item.pano)) {
        jimpImg = await Jimp.read(item.pano);
      } else {
        jimpImg = await Jimp.read('client/public/panoramas/Dhaka_Day.jpg');
      }

      gradeImage(jimpImg, type);
      await jimpImg.write(dest);
      fs.copyFileSync(dest, distDest);
      console.log(`  Saved: ${dest}`);
    } catch (err) {
      console.error(`  Error for ${item.id}:`, err.message);
    }
  }
}

async function run() {
  await batchProcess(DELICACIES_CONFIG, 'delicacies', 'food');
  await batchProcess(RIVERS_CONFIG, 'rivers', 'river');
  await batchProcess(FESTIVALS_CONFIG, 'culture', 'culture');
  console.log('\nAll asset batches complete!');
}

run();
