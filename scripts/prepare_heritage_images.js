const fs = require('fs');
const path = require('path');
const https = require('https');
const { Jimp } = require('jimp');

const LANDMARKS_CONFIG = [
  // --- DHAKA ---
  { id: 'lalbagh_fort', queries: ['Lalbagh Fort'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'ahsan_manzil', existing: true },
  { id: 'martyrs_memorial', queries: ["National Martyrs' Memorial", "Jatiyo Smriti Soudho"], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'padma_bridge', queries: ['Padma Bridge'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'panam_nagar', queries: ['Panam City', 'Sonargaon'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'star_mosque', queries: ['Tara Masjid', 'Star Mosque'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'curzon_hall', queries: ['Curzon Hall', 'University of Dhaka'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },
  { id: 'baitul_mukarram', queries: ['Baitul Mukarram National Mosque'], division: 'dhaka', altPano: 'client/public/panoramas/Dhaka_Day.jpg' },

  // --- CHATTOGRAM ---
  { id: 'chittagong_war_cemetery', queries: ['Chittagong War Cemetery'], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'buddha_dhatu_jadi', existing: true },
  { id: 'karnaphuli_tunnel', queries: ['Karnaphuli Tunnel', 'Bangabandhu Tunnel'], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'chandanpura_mosque', queries: ['Chandanpura Mosque'], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'kaptai_lake', queries: ['Kaptai Lake'], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'coxs_bazar_beach', queries: ["Cox's Bazar Beach", "Cox's Bazar"], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'st_martins_island', queries: ["St. Martin's Island"], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },
  { id: 'alutila_cave', queries: ['Alutila Cave'], division: 'chattogram', altPano: 'client/public/panoramas/chattogram_day.jpg' },

  // --- RAJSHAHI ---
  { id: 'somapura_mahavihara', existing: true },
  { id: 'varendra_museum', queries: ['Varendra Research Museum'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'puthia_temple_complex', queries: ['Puthia Temple Complex', 'Puthia Rajbari'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'kantajew_temple', queries: ['Kantajew Temple', 'Kantaji Temple'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'mahasthangarh', queries: ['Mahasthangarh'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'bagha_mosque', queries: ['Bagha Mosque'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'hardinge_bridge', queries: ['Hardinge Bridge'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },
  { id: 'choto_sona_mosque', queries: ['Choto Sona Mosque'], division: 'rajshahi', altPano: 'client/public/panoramas/Rajshahi_Day.jpg' },

  // --- KHULNA ---
  { id: 'sixty_dome_mosque', existing: true },
  { id: 'khan_jahan_ali_mazar', queries: ['Tomb of Khan Jahan Ali', 'Khan Jahan Ali'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'kotka_sundarbans', queries: ['Sundarbans', 'Kotka Beach'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'michael_madhusudan_birthplace', queries: ['Michael Madhusudan Dutt', 'Sagordari'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'mujibnagar_memorial', queries: ['Mujibnagar Memorial', 'Mujibnagar'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'lalon_shah_akhra', queries: ['Lalon', 'Kushtia District'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'jessore_collectorate', queries: ['Jessore District', 'Jessore Collectorate Building'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },
  { id: 'rupsha_bridge', queries: ['Khan Jahan Ali Bridge', 'Rupsha River'], division: 'khulna', altPano: 'client/public/panoramas/Khulna_Day.jpg' },

  // --- BARISHAL ---
  { id: 'oxford_mission_church', queries: ['Oxford Mission Church', 'Epiphany Church, Barisal'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'guthia_mosque', existing: true },
  { id: 'durga_sagar', queries: ['Durga Sagar', 'Durgasagar'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'tantunir_bari', queries: ['Barisal Division', 'Barisal'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Evening.jpg' },
  { id: 'kuakata_beach', queries: ['Kuakata', 'Kuakata Beach'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'floating_guava_market', queries: ['Floating guava market', 'Bhimruli'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'monpura_island', queries: ['Manpura Upazila', 'Monpura Island'], division: 'barishal', altPano: 'client/public/panoramas/Barishal_Day.jpg' },
  { id: 'kirtankhola_river', queries: ['Kirtankhola River', 'Kirtankhola'], division: 'barishal', altPano: 'client/public/panoramas/barishal_night.jpg' },

  // --- SYLHET ---
  { id: 'shah_jalal_dargah', queries: ['Shah Jalal Dargah', 'Shah Jalal'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'keane_bridge', queries: ['Keane Bridge'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'ali_amjad_clock', queries: ["Ali Amjad's Clock"], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'malnicherra_tea_estate', queries: ['Malnicherra Tea Estate'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'bholaganj_sada_pathor', queries: ['Bholaganj', 'Bholaganj Sada Pathor'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'jaflong_sylhet', existing: true },
  { id: 'ratargul_swamp_forest', queries: ['Ratargul Swamp Forest'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },
  { id: 'madhabkunda_waterfall', queries: ['Madhabkunda waterfall', 'Madhabkunda'], division: 'sylhet', altPano: 'client/public/panoramas/Sylhet_Day.jpg' },

  // --- RANGPUR ---
  { id: 'tajhat_palace', existing: true },
  { id: 'carmichael_college', queries: ['Carmichael College, Rangpur', 'Carmichael College'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'dimla_rajbari', queries: ['Dimla Upazila', 'Rangpur Division'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Evening.jpg' },
  { id: 'ramsagar_dighi', queries: ['Ramsagar', 'Ramsagar National Park'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'teesta_barrage', queries: ['Teesta Barrage', 'Teesta River'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'tin_bigha_corridor', queries: ['Tin Bigha Corridor'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'nayabad_mosque', queries: ['Nayabad Mosque'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },
  { id: 'harano_masjid', queries: ['Ancient mosques in Bangladesh', 'Rangpur Division'], division: 'rangpur', altPano: 'client/public/panoramas/Rangpur_Day.jpg' },

  // --- MYMENSINGH ---
  { id: 'shashi_lodge', queries: ['Shashi Lodge'], division: 'mymensingh', altPano: 'client/public/panoramas/mymensingh_day_alt.jpg' },
  { id: 'alexander_castle', queries: ['Alexander Castle', 'Lohar Kuthi'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'birisiri_white_clay', queries: ['Susang Durgapur', 'Birisiri', 'Netrokona District'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'muktagacha_rajbari', queries: ['Muktagacha Rajbari', 'Muktagacha Upazila'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'ananda_mohan_college', queries: ['Ananda Mohan College'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'shambhuganj_bridge', queries: ['Brahmaputra River', 'Mymensingh'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'garo_hills', queries: ['Garo Hills'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
  { id: 'mymensingh_museum', queries: ['Mymensingh Museum'], division: 'mymensingh', altPano: 'client/public/panoramas/Mymensingh_Day.jpg' },
];

function fetchWikiThumbnail(query) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=1400`;
    https.get(url, { headers: { 'User-Agent': 'AmarDesh360/1.0 (historical-heritage@bangladesh-insight.org)' } }, (res) => {
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

// Cinematic color grading in the vibe of division panorama artworks
function gradeCinematicVibe(img) {
  // Resize to 1200x675 (16:9)
  img.resize({ w: 1200, h: 675 });
  
  // Enhance contrast & brightness
  img.contrast(0.12);
  img.brightness(0.04);

  // Scan and apply atmospheric warmth (golden-hour ambient & rich skies)
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
    let r = img.bitmap.data[idx + 0];
    let g = img.bitmap.data[idx + 1];
    let b = img.bitmap.data[idx + 2];

    // Distance from center for subtle cinematic vignette
    const dx = (x - img.bitmap.width / 2) / (img.bitmap.width / 2);
    const dy = (y - img.bitmap.height / 2) / (img.bitmap.height / 2);
    const distSq = dx * dx + dy * dy;
    const vignette = Math.max(0.78, 1 - distSq * 0.22);

    // Warm golden color grading
    r = Math.min(255, Math.floor((r * 1.06 + 4) * vignette));
    g = Math.min(255, Math.floor((g * 1.03 + 2) * vignette));
    b = Math.min(255, Math.floor((b * 0.98) * vignette));

    img.bitmap.data[idx + 0] = r;
    img.bitmap.data[idx + 1] = g;
    img.bitmap.data[idx + 2] = b;
  });
}

async function processAllLandmarks() {
  const outputDir = path.resolve('client/public/heritage');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log(`Starting processing of ${LANDMARKS_CONFIG.length} landmarks...`);

  for (const item of LANDMARKS_CONFIG) {
    const targetFile = path.join(outputDir, `${item.id}.jpg`);

    // If existing and already on disk, skip downloading
    if (item.existing && fs.existsSync(targetFile)) {
      console.log(`[EXISTING PRESERVED] ${item.id} -> ${targetFile}`);
      continue;
    }

    console.log(`\nProcessing: ${item.id}...`);
    let imageBuffer = null;

    if (item.queries && item.queries.length > 0) {
      for (const q of item.queries) {
        console.log(`  Searching Wikipedia for: "${q}"...`);
        const thumbUrl = await fetchWikiThumbnail(q);
        if (thumbUrl) {
          console.log(`  Found URL: ${thumbUrl}`);
          try {
            imageBuffer = await downloadImageBuffer(thumbUrl);
            console.log(`  Downloaded ${imageBuffer.length} bytes.`);
            break;
          } catch (err) {
            console.warn(`  Download failed: ${err.message}`);
          }
        }
      }
    }

    try {
      let jimpImg;
      if (imageBuffer && imageBuffer.length > 1000) {
        jimpImg = await Jimp.read(imageBuffer);
      } else if (item.altPano && fs.existsSync(item.altPano)) {
        console.log(`  Falling back to division panoramic composite: ${item.altPano}`);
        jimpImg = await Jimp.read(item.altPano);
      } else {
        console.warn(`  No source image found for ${item.id}, skipping.`);
        continue;
      }

      gradeCinematicVibe(jimpImg);
      await jimpImg.write(targetFile);
      console.log(`  Saved styled artwork: ${targetFile}`);
    } catch (err) {
      console.error(`  Error processing ${item.id}:`, err.message);
    }
  }

  // Copy all files to client/dist/heritage/
  const distHeritageDir = path.resolve('client/dist/heritage');
  if (!fs.existsSync(distHeritageDir)) fs.mkdirSync(distHeritageDir, { recursive: true });
  const files = fs.readdirSync(outputDir);
  for (const f of files) {
    fs.copyFileSync(path.join(outputDir, f), path.join(distHeritageDir, f));
  }
  console.log(`\nCopied ${files.length} images to ${distHeritageDir}`);
}

processAllLandmarks();
