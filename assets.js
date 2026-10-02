const ROOMS = [
  { name: '客廳 🛋️', id: 'living' },
  { name: '活動室 🎡', id: 'play' },
  { name: '露天庭院 🌿', id: 'garden' }
];
let currentRoomIndex = 0;

const SPECIES = {
  golden: { name: '金絲熊', cost: 0, body: '#e8a86b', belly: '#fffdfa', ear: '#f4b7a1' },
  silver: { name: '銀狐鼠', cost: 100, body: '#e9ecef', belly: '#ffffff', ear: '#adb5bd' },
  bear: { name: '黑熊鼠', cost: 150, body: '#495057', belly: '#ced4da', ear: '#343a40' },
  pudding: { name: '布丁鼠', cost: 180, body: '#ffd166', belly: '#fff3b0', ear: '#f4a261' },
  violet: { name: '紫倉鼠', cost: 220, body: '#c8b6ff', belly: '#f8f7ff', ear: '#b8c0ff' },
  maple: { name: '三線楓葉鼠', cost: 240, body: '#b08968', belly: '#ede0d4', ear: '#7f5539', stripe: '#4a3b32' },
  cow: { name: '奶牛花斑鼠', cost: 260, body: '#fdfbf7', belly: '#ffffff', ear: '#4a3b32', spots: true }
};

function generateHamsterSVG(speciesKey, isCheekFull = false) {
  const s = SPECIES[speciesKey] || SPECIES.golden;
  let extraDetails = '';
  if (s.stripe) extraDetails += `<path d="M50 34 L50 72" stroke="${s.stripe}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (s.spots) extraDetails += `<ellipse cx="38" cy="54" rx="12" ry="8" fill="#333" /><ellipse cx="64" cy="62" rx="9" ry="7" fill="#333" />`;

  const rx = isCheekFull ? 43 : 36;
  const cheekL = isCheekFull ? `<circle cx="24" cy="56" r="10" fill="${s.body}" /><circle cx="24" cy="56" r="6" fill="#f79d84" opacity="0.6"/>` : `<circle cx="32" cy="54" r="5" fill="#f79d84" opacity="0.6" />`;
  const cheekR = isCheekFull ? `<circle cx="76" cy="56" r="10" fill="${s.body}" /><circle cx="76" cy="56" r="6" fill="#f79d84" opacity="0.6"/>` : `<circle cx="70" cy="54" r="5" fill="#f79d84" opacity="0.6" />`;

  return `<svg class="hamster-svg" viewBox="0 0 100 100" width="76" height="76">
    <circle cx="15" cy="65" r="7" fill="${s.ear}" />
    <ellipse cx="50" cy="60" rx="${rx}" ry="32" fill="${s.body}" />
    ${extraDetails}
    <ellipse cx="52" cy="68" rx="24" ry="20" fill="${s.belly}" />
    <circle cx="30" cy="28" r="10" fill="${s.body}" />
    <circle cx="30" cy="28" r="6" fill="${s.ear}" />
    <circle cx="70" cy="28" r="10" fill="${s.body}" />
    <circle cx="70" cy="28" r="6" fill="${s.ear}" />
    <circle cx="40" cy="46" r="4.5" fill="#2d2013" />
    <circle cx="38.5" cy="44.5" r="1.5" fill="#fff" />
    <circle cx="62" cy="46" r="4.5" fill="#2d2013" />
    <circle cx="60.5" cy="44.5" r="1.5" fill="#fff" />
    ${cheekL}
    ${cheekR}
    <polygon points="51,52 48,49 54,49" fill="#df7a6b" />
    <path d="M47 55 Q51 58 55 55" stroke="#4a3b32" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <ellipse cx="40" cy="64" rx="4.5" ry="6" fill="${s.belly}" />
    <ellipse cx="62" cy="64" rx="4.5" ry="6" fill="${s.belly}" />
  </svg>`;
}

const ASSETS = {
  hats: {
    straw_hat: { name: '夏日草帽', cost: 30, svg: `<svg viewBox="0 0 60 40" width="46" height="30"><path d="M5 28 Q30 22 55 28 Q30 34 5 28" fill="#e9c46a" stroke="#d4a373" stroke-width="2"/><ellipse cx="30" cy="20" rx="16" ry="12" fill="#f4a261"/><rect x="14" y="20" width="32" height="4" fill="#e76f51"/></svg>` },
    pink_bow: { name: '粉櫻蝴蝶結', cost: 45, svg: `<svg viewBox="0 0 50 35" width="40" height="28"><polygon points="25,18 10,8 10,28" fill="#f4a5ae"/><polygon points="25,18 40,8 40,28" fill="#f4a5ae"/><ellipse cx="25" cy="18" rx="5" ry="5" fill="#e56b81"/></svg>` },
    grad_cap: { name: '學士帽', cost: 70, svg: `<svg viewBox="0 0 60 40" width="46" height="30"><polygon points="30,8 54,18 30,28 6,18" fill="#2b2d42"/><rect x="22" y="24" width="16" height="8" fill="#1d1e2c"/><path d="M48 20 L48 30" stroke="#f4a261" stroke-width="2"/><circle cx="48" cy="31" r="2" fill="#f4a261"/></svg>` },
    crown: { name: '國王金皇冠', cost: 110, svg: `<svg viewBox="0 0 50 35" width="42" height="30"><polygon points="8,26 12,12 25,18 38,12 42,26" fill="#ffd166" stroke="#f4a261" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#e76f51"/><circle cx="25" cy="18" r="3" fill="#2a9d8f"/><circle cx="38" cy="12" r="3" fill="#e76f51"/></svg>` },
    detective_hat: { name: '偵探格紋帽', cost: 85, svg: `<svg viewBox="0 0 60 40" width="46" height="30"><path d="M10 26 Q30 8 50 26 Z" fill="#7f5539"/><ellipse cx="30" cy="26" rx="26" ry="6" fill="#9c6644"/><rect x="26" y="10" width="8" height="4" fill="#582f0e"/></svg>` },
    daisy_clip: { name: '小雛菊髮夾', cost: 40, svg: `<svg viewBox="0 0 40 40" width="34" height="34"><circle cx="20" cy="20" r="6" fill="#ffd166"/><circle cx="20" cy="10" r="4" fill="#ffffff"/><circle cx="28" cy="15" r="4" fill="#ffffff"/><circle cx="28" cy="25" r="4" fill="#ffffff"/><circle cx="20" cy="30" r="4" fill="#ffffff"/><circle cx="12" cy="25" r="4" fill="#ffffff"/><circle cx="12" cy="15" r="4" fill="#ffffff"/></svg>` }
  },
  furniture: {
    wheel: {
      name: '巨無霸跑輪', cost: 60, w: 140, h: 140,
      svg: `<svg viewBox="0 0 100 100" width="140" height="140"><g id="wheel-rotor"><circle cx="50" cy="50" r="44" fill="none" stroke="#d4a373" stroke-width="6"/><circle cx="50" cy="50" r="8" fill="#8c6239"/><line x1="50" y1="6" x2="50" y2="94" stroke="#d4a373" stroke-width="4"/><line x1="6" y1="50" x2="94" y2="50" stroke="#d4a373" stroke-width="4"/></g><path d="M25 94 L50 50 L75 94" stroke="#8c6239" stroke-width="7" fill="none"/></svg>`
    },
    mushroom_house: {
      name: '原木雙層小木屋', cost: 80, w: 130, h: 130,
      svg: `<svg viewBox="0 0 100 100" width="130" height="130"><rect x="25" y="48" width="50" height="48" rx="10" fill="#f5ebe0"/><path d="M8 50 Q50 6 92 50 Z" fill="#e76f51"/><circle cx="32" cy="30" r="6" fill="#fff"/><circle cx="68" cy="25" r="7" fill="#fff"/><circle cx="50" cy="40" r="5" fill="#fff"/><path d="M38 96 A12 12 0 0 1 62 96 Z" fill="#582f0e"/></svg>`
    },
    strawberry_house: {
      name: '草莓陶瓷避暑窩', cost: 85, w: 120, h: 120,
      svg: `<svg viewBox="0 0 100 100" width="120" height="120"><path d="M15 45 C15 15 85 15 85 45 C85 85 50 95 50 95 C50 95 15 85 15 45 Z" fill="#e63946"/><polygon points="45,15 50,5 55,15 65,12 55,20 60,30 50,22 40,30 45,20 35,12" fill="#52b788"/><circle cx="32" cy="35" r="3" fill="#fff"/><circle cx="68" cy="35" r="3" fill="#fff"/><circle cx="50" cy="50" r="3.5" fill="#fff"/><path d="M38 95 A12 12 0 0 1 62 95 Z" fill="#333"/></svg>`
    },
    sand_bath: {
      name: '透明砂浴沐浴盆', cost: 70, w: 120, h: 80,
      svg: `<svg viewBox="0 0 120 80" width="120" height="80"><rect x="10" y="25" width="100" height="50" rx="14" fill="#edf2f4" stroke="#8d99ae" stroke-width="3"/><ellipse cx="60" cy="52" rx="44" ry="16" fill="#faedcd"/><circle cx="40" cy="50" r="2" fill="#d4a373"/><circle cx="75" cy="54" r="2.5" fill="#d4a373"/></svg>`
    },
    wood_tunnel: {
      name: '原木啃木拱橋', cost: 65, w: 125, h: 80,
      svg: `<svg viewBox="0 0 125 80" width="125" height="80"><path d="M15 70 C15 25 110 25 110 70 Z" fill="#d4a373" stroke="#8c6239" stroke-width="5"/><path d="M30 70 C30 40 95 40 95 70 Z" fill="#582f0e"/></svg>`
    },
    cool_plate: {
      name: '涼感散熱鋁板', cost: 45, w: 100, h: 50,
      svg: `<svg viewBox="0 0 100 50" width="100" height="50"><rect x="5" y="10" width="90" height="30" rx="4" fill="#e0e1dd" stroke="#778da9" stroke-width="2"/><line x1="15" y1="15" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/></svg>`
    },
    water_bottle: {
      name: '滾珠防漏水樽', cost: 40, w: 60, h: 100,
      svg: `<svg viewBox="0 0 60 100" width="60" height="100"><rect x="18" y="10" width="24" height="60" rx="8" fill="#caf0f8" stroke="#48cae4" stroke-width="3"/><rect x="22" y="70" width="16" height="8" fill="#adb5bd"/><line x1="30" y1="78" x2="16" y2="94" stroke="#6c757d" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="96" r="3" fill="#00b4d8"/></svg>`
    },
    food_bowl: {
      name: '向日葵防翻陶瓷盆', cost: 45, w: 80, h: 60,
      svg: `<svg viewBox="0 0 80 60" width="80" height="60"><ellipse cx="40" cy="35" rx="36" ry="18" fill="#f4a261" stroke="#e76f51" stroke-width="3"/><circle cx="32" cy="33" r="5" fill="#5a4b3d"/><circle cx="48" cy="35" r="5" fill="#5a4b3d"/><circle cx="40" cy="30" r="5" fill="#5a4b3d"/></svg>`
    },
    apple_sticks: {
      name: '磨牙蘋果枝捆', cost: 35, w: 85, h: 50,
      svg: `<svg viewBox="0 0 85 50" width="85" height="50"><rect x="10" y="15" width="65" height="8" rx="4" fill="#8c6239"/><rect x="15" y="26" width="60" height="8" rx="4" fill="#7f5539"/><rect x="8" y="37" width="68" height="7" rx="3.5" fill="#9c6644"/></svg>`
    },
    dandelion_bush: {
      name: '野生蒲公英花草', cost: 50, w: 90, h: 80,
      svg: `<svg viewBox="0 0 90 80" width="90" height="80"><path d="M10 70 Q30 30 45 65 Q60 20 80 70 Z" fill="#52b788"/><circle cx="45" cy="30" r="12" fill="#ffd166"/><circle cx="65" cy="40" r="10" fill="#ffd166"/></svg>`
    },
    garden_sunflower: {
      name: '向日葵挺拔花壇', cost: 60, w: 90, h: 110,
      svg: `<svg viewBox="0 0 90 110" width="90" height="110"><rect x="42" y="45" width="6" height="60" fill="#2d6a4f"/><circle cx="45" cy="40" r="16" fill="#5a4b3d"/><circle cx="45" cy="20" r="6" fill="#ffb703"/><circle cx="65" cy="40" r="6" fill="#ffb703"/><circle cx="45" cy="60" r="6" fill="#ffb703"/><circle cx="25" cy="40" r="6" fill="#ffb703"/></svg>`
    },
    garden_log: {
      name: '天然棲木樹樁', cost: 55, w: 100, h: 70,
      svg: `<svg viewBox="0 0 100 70" width="100" height="70"><path d="M15 30 L85 30 L80 65 L20 65 Z" fill="#7f5539"/><ellipse cx="50" cy="30" rx="35" ry="12" fill="#ddb892" stroke="#8c6239" stroke-width="3"/></svg>`
    }
  },
  postcards: {
    shrine: { title: '京都神社之櫻', desc: '在千本鳥居旁散步，偶遇了微風吹落的春櫻花瓣。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#fceade"/><polygon points="20,70 20,35 60,35 60,70" fill="none" stroke="#d90429" stroke-width="6"/><line x1="12" y1="35" x2="68" y2="35" stroke="#d90429" stroke-width="8"/><circle cx="60" cy="20" r="4" fill="#ffb4a2"/><circle cx="45" cy="15" r="3" fill="#ffb4a2"/></svg>` },
    field: { title: '陽光向日葵田', desc: '置身在向日葵海裡，摘了幾顆新鮮飽滿的葵花子！', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#e9f5db"/><circle cx="40" cy="38" r="16" fill="#603808"/><circle cx="40" cy="20" r="6" fill="#ffb703"/><circle cx="56" cy="30" r="6" fill="#ffb703"/><circle cx="56" cy="46" r="6" fill="#ffb703"/></svg>` },
    beach: { title: '黃金海岸浪花', desc: '在細緻的金黃沙灘邊追浪，拾獲了五彩繽紛的貝殼。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#caf0f8"/><ellipse cx="40" cy="65" rx="35" ry="12" fill="#ffd166"/><circle cx="65" cy="22" r="8" fill="#f77f00"/></svg>` },
    fuji: { title: '富士山雪見溫泉', desc: '遠眺積雪的聖岳富士山，在暖呼呼的湯池邊打瞌睡。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#e2eafc"/><polygon points="40,15 15,65 65,65" fill="#4361ee"/><polygon points="40,15 30,35 50,35" fill="#ffffff"/><circle cx="68" cy="22" r="7" fill="#ef233c"/></svg>` },
    bigben: { title: '倫敦鐘樓散步', desc: '在泰晤士河畔聽大笨鐘報時，撿到了亮晶晶的英鎊硬幣。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#f0efeb"/><rect x="30" y="20" width="20" height="50" fill="#adb5bd"/><polygon points="30,20 40,8 50,20" fill="#6c757d"/><circle cx="40" cy="32" r="5" fill="#ffd166"/></svg>` },
    aurora: { title: '極光雪地小冰屋', desc: '抬頭看見曼妙舞動的翠綠極光，在溫暖冰屋裡喝熱可可。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#0b090a"/><path d="M10 25 Q40 5 70 30" stroke="#52b788" stroke-width="8" fill="none" opacity="0.8"/><ellipse cx="40" cy="60" rx="25" ry="15" fill="#e9ecef"/></svg>` }
  }
};

const LOCAL_KEY = 'pocket_hamster_save_v19';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}'); } catch(e) { saved = {}; }

const state = {
  coins: saved.coins ?? 200,
  feedStock: saved.feedStock ?? 30,
  lastActiveTime: saved.lastActiveTime ?? Date.now(),
  hamsters: saved.hamsters || [
    { id: 'h_1', name: '泡泡', gender: '♂', species: 'golden', feedCount: 22, cheekPouch: 0, equippedHat: 'straw_hat', room: 'living', x: 80, y: window.innerHeight * 0.70 }
  ],
  inventory: saved.inventory || ['straw_hat'],
  furnitureWarehouse: saved.furnitureWarehouse || [],
  furniturePlaced: saved.furniturePlaced || [
    { instanceId: 'fp_1', type: 'wheel', room: 'living', x: 20, y: window.innerHeight * 0.54, flip: 1 },
    { instanceId: 'fp_2', type: 'mushroom_house', room: 'living', x: 230, y: window.innerHeight * 0.56, flip: 1 },
    { instanceId: 'fp_3', type: 'water_bottle', room: 'living', x: 160, y: window.innerHeight * 0.55, flip: 1 }
  ],
  poopList: saved.poopList || [],
  postcards: saved.postcards || [],
  isBuilding: false,
  selectedFurniId: null,
  travelingIds: [],
  wardrobeTargetId: null,
  furnitureOccupant: {},
  isDraggingHamster: false,
  isCollectingPoop: false
};

// 專屬 Toast 提示 (絕不暫停音樂)
window.showToast = function(msg) {
  const box = document.getElementById('toastBox');
  if (!box) return;
  box.textContent = msg;
  box.classList.add('show');
  setTimeout(() => box.classList.remove('show'), 2200);
};

window.saveGame = function() {
  state.lastActiveTime = Date.now();
  localStorage.setItem(LOCAL_KEY, JSON.stringify({
    coins: state.coins,
    feedStock: state.feedStock,
    lastActiveTime: state.lastActiveTime,
    hamsters: state.hamsters,
    inventory: state.inventory,
    furnitureWarehouse: state.furnitureWarehouse,
    furniturePlaced: state.furniturePlaced,
    poopList: state.poopList,
    postcards: state.postcards
  }));
  if (window.saveGameCloud) window.saveGameCloud();
};

window.processOfflineEarnings = function() {
  const now = Date.now();
  if (!state.lastActiveTime) {
    state.lastActiveTime = now;
    return;
  }

  const diffSec = Math.floor((now - state.lastActiveTime) / 1000);
  if (diffSec < 15) {
    state.lastActiveTime = now;
    return;
  }

  const cappedSec = Math.min(diffSec, 12 * 3600);
  const minutes = Math.max(1, Math.floor(cappedSec / 60));
  const earnedCoins = minutes * 5;

  let msg = `⏰ 離開了 ${minutes} 分鐘，小鼠玩跑輪賺了 🪙 ${earnedCoins} 金幣！`;

  if (minutes >= 1 && state.hamsters.length >= 2) {
    const hasMale = state.hamsters.some(h => h.gender === '♂');
    const hasFemale = state.hamsters.some(h => h.gender === '♀');

    if (hasMale && hasFemale && Math.random() < 0.8) {
      const babyGender = Math.random() < 0.5 ? '♂' : '♀';
      const spKeys = Object.keys(SPECIES);
      const babySpecies = spKeys[Math.floor(Math.random() * spKeys.length)];
      const babyName = `小${SPECIES[babySpecies].name[0]}`;

      state.hamsters.push({
        id: `h_${Date.now()}`,
        name: babyName,
        gender: babyGender,
        species: babySpecies,
        feedCount: 0,
        cheekPouch: 0,
        equippedHat: null,
        room: 'living',
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight * 0.70
      });
      msg += ` 並且誕生了新寶寶【${babyName} (${babyGender})】！`;
    }
  }

  state.coins += earnedCoins;
  state.lastActiveTime = now;
  saveGame();
  renderHUD();
  renderHamsters();

  setTimeout(() => showToast(msg), 400);
};

function changeRoom(direction) {
  currentRoomIndex = (currentRoomIndex + direction + ROOMS.length) % ROOMS.length;
  document.getElementById('world-slider').style.transform = `translateX(-${currentRoomIndex * 100}vw)`;
  document.getElementById('roomIndicatorText').textContent = ROOMS[currentRoomIndex].name;
  deselectBuildingFurni();
  renderHamsters();
  renderFurniture();
  renderPoops();
  if (state.isBuilding) renderBuildWarehouse();
}

function hamsterRunToRoom(h, targetRoomId) {
  const wrap = document.getElementById(`entity-${h.id}`);
  if (!wrap) { h.room = targetRoomId; return; }
  const curRoomIdx = ROOMS.findIndex(r => r.id === h.room);
  const targetRoomIdx = ROOMS.findIndex(r => r.id === targetRoomId);
  const goingRight = targetRoomIdx > curRoomIdx;
  const exitX = goingRight ? window.innerWidth + 20 : -80;

  walkTo(h, wrap, exitX, h.y, () => {
    h.room = targetRoomId;
    h.x = goingRight ? -60 : window.innerWidth + 20;
    if (ROOMS[currentRoomIndex].id === targetRoomId) {
      renderHamsters();
      const newWrap = document.getElementById(`entity-${h.id}`);
      if (newWrap) walkTo(h, newWrap, goingRight ? 60 : window.innerWidth - 120, h.y);
    } else {
      renderHamsters();
    }
  });
}

const hamsterLayer = document.getElementById('hamster-layer');
function renderHamsters() {
  hamsterLayer.innerHTML = '';
  const curRoom = ROOMS[currentRoomIndex].id;

  state.hamsters.forEach(h => {
    if (state.travelingIds.includes(h.id)) return;
    if (h.room !== curRoom) return;

    const wrap = document.createElement('div');
    wrap.className = 'hamster-entity';
    wrap.id = `entity-${h.id}`;
    wrap.style.left = `${h.x}px`;
    wrap.style.top = `${h.y}px`;

    const scale = h.feedCount < 10 ? 0.75 : (h.feedCount < 20 ? 0.95 : 1.22);
    wrap.style.transform = `scale(${scale})`;

    const hatSlot = document.createElement('div');
    hatSlot.className = 'hamster-hat-slot';
    if (h.equippedHat && ASSETS.hats[h.equippedHat]) {
      hatSlot.innerHTML = ASSETS.hats[h.equippedHat].svg;
    }
    wrap.appendChild(hatSlot);
    wrap.insertAdjacentHTML('beforeend', generateHamsterSVG(h.species, (h.cheekPouch || 0) > 0));

    const genderBadge = document.createElement('div');
    genderBadge.className = `gender-badge ${h.gender === '♂' ? 'badge-male' : 'badge-female'}`;
    genderBadge.textContent = `${h.name} ${h.gender}`;
    wrap.appendChild(genderBadge);

    let isHeld = false, dOffset = { x: 0, y: 0 };
    wrap.addEventListener('pointerdown', (e) => {
      if (state.isBuilding) return;
      e.stopPropagation();
      state.isDraggingHamster = true;
      isHeld = true;
      wrap.classList.add('held');
      dOffset.x = e.clientX - h.x;
      dOffset.y = e.clientY - h.y;
      wrap.setPointerCapture(e.pointerId);
    });
    wrap.addEventListener('pointermove', (e) => {
      if (!isHeld) return;
      e.stopPropagation();
      h.x = Math.max(15, Math.min(window.innerWidth - 95, e.clientX - dOffset.x));
      h.y = Math.max(window.innerHeight * 0.56, Math.min(window.innerHeight * 0.78, e.clientY - dOffset.y));
      wrap.style.left = `${h.x}px`;
      wrap.style.top = `${h.y}px`;
    });
    wrap.addEventListener('pointerup', (e) => {
      if (!isHeld) return;
      e.stopPropagation();
      isHeld = false;
      wrap.classList.remove('held');
      h.y = window.innerHeight * 0.70;
      wrap.style.top = `${h.y}px`;
      setTimeout(() => { state.isDraggingHamster = false; }, 80);
      saveGame();
    });

    hamsterLayer.appendChild(wrap);
  });
}

function renderFurniture() {
  ['living', 'play', 'garden'].forEach(roomId => {
    const con = document.getElementById(`furniture-${roomId}`);
    if (!con) return;
    con.innerHTML = '';

    state.furniturePlaced.forEach(f => {
      if (f.room !== roomId) return;
      const t = ASSETS.furniture[f.type];
      if (!t) return;

      const isSelected = state.isBuilding && state.selectedFurniId === f.instanceId;
      const el = document.createElement('div');
      el.className = `placed-furniture ${state.isBuilding ? 'in-building' : ''} ${isSelected ? 'is-selected' : ''}`;
      el.id = `furni-${f.instanceId}`;
      el.style.left = `${f.x}px`;
      el.style.top = `${f.y}px`;

      const svgWrap = document.createElement('div');
      svgWrap.className = 'furni-svg-wrap';
      svgWrap.innerHTML = t.svg;
      svgWrap.style.transform = `scaleX(${f.flip || 1})`;
      svgWrap.style.transformOrigin = 'center center';
      el.appendChild(svgWrap);

      if (state.isBuilding) {
        if (isSelected) {
          const ctrlBox = document.createElement('div');
          ctrlBox.className = 'furni-ctrl-bubble';
          ctrlBox.innerHTML = `
            <button class="ctrl-btn-bubble" onclick="flipSelectedFurni(event, '${f.instanceId}')">🔄 翻轉</button>
            <button class="ctrl-btn-bubble" style="background:#e63946; color:#fff;" onclick="retractSelectedFurni(event, '${f.instanceId}')">📦 收回</button>
          `;
          el.appendChild(ctrlBox);
        }

        let fDrag = false, fOffset = { x: 0, y: 0 };
        el.addEventListener('pointerdown', (e) => {
          if (e.target.closest('.furni-ctrl-bubble')) return;
          e.stopPropagation();

          if (state.selectedFurniId !== f.instanceId) {
            state.selectedFurniId = f.instanceId;
            renderFurniture();
          }

          fDrag = true;
          fOffset.x = e.clientX - f.x;
          fOffset.y = e.clientY - f.y;
          el.setPointerCapture(e.pointerId);
        });
        el.addEventListener('pointermove', (e) => {
          if (!fDrag) return;
          f.x = e.clientX - fOffset.x;
          f.y = Math.max(window.innerHeight * 0.45, Math.min(window.innerHeight * 0.78, e.clientY - fOffset.y));
          el.style.left = `${f.x}px`;
          el.style.top = `${f.y}px`;
        });
        el.addEventListener('pointerup', () => {
          if (fDrag) {
            fDrag = false;
            saveGame();
          }
        });
      }
      con.appendChild(el);
    });
  });
}

function deselectBuildingFurni() {
  state.selectedFurniId = null;
  renderFurniture();
}

window.flipSelectedFurni = function(e, instanceId) {
  e.stopPropagation();
  const f = state.furniturePlaced.find(item => item.instanceId === instanceId);
  if (!f) return;
  f.flip = (f.flip || 1) * -1;
  saveGame();
  renderFurniture();
};

window.retractSelectedFurni = function(e, instanceId) {
  e.stopPropagation();
  const idx = state.furniturePlaced.findIndex(item => item.instanceId === instanceId);
  if (idx === -1) return;

  const f = state.furniturePlaced[idx];
  state.furniturePlaced.splice(idx, 1);
  state.furnitureWarehouse.push({ id: `w_${Date.now()}`, type: f.type });
  state.selectedFurniId = null;

  saveGame();
  renderFurniture();
  renderBuildWarehouse();
  showToast('家具已收回倉庫');
};

function renderBuildWarehouse() {
  const panel = document.getElementById('buildWarehousePanel');
  const list = document.getElementById('buildWarehouseList');
  if (!panel || !list) return;

  list.innerHTML = '';
  if (state.furnitureWarehouse.length === 0) {
    list.innerHTML = `<div style="font-size:12px; color:#888; padding:16px 10px;">倉庫空空如也，去雜貨鋪買點家具吧！</div>`;
    return;
  }

  const counts = {};
  state.furnitureWarehouse.forEach(item => {
    counts[item.type] = (counts[item.type] || 0) + 1;
  });

  Object.keys(counts).forEach(typeId => {
    const t = ASSETS.furniture[typeId];
    if (!t) return;

    const card = document.createElement('div');
    card.className = 'warehouse-item-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div style="width:38px; height:38px; display:flex; align-items:center; justify-content:center; pointer-events:none;">${t.svg}</div>
      <b style="font-size:11px; margin-top:2px; pointer-events:none;">${t.name}</b>
      <span style="font-size:10px; color:#666; pointer-events:none;">剩餘 x${counts[typeId]}</span>
      <div style="background:var(--accent); color:#fff; border-radius:8px; padding:2px 8px; font-size:10px; font-weight:bold; margin-top:4px; pointer-events:none;">點擊擺出</div>
    `;

    card.onpointerdown = (e) => {
      e.stopPropagation();
      placeFurniFromWarehouse(typeId);
    };

    list.appendChild(card);
  });
}

window.placeFurniFromWarehouse = function(typeId) {
  const wIdx = state.furnitureWarehouse.findIndex(item => item.type === typeId);
  if (wIdx === -1) return;

  state.furnitureWarehouse.splice(wIdx, 1);
  const newPlaced = {
    instanceId: `fp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type: typeId,
    room: ROOMS[currentRoomIndex].id,
    x: window.innerWidth / 2 - 40,
    y: window.innerHeight * 0.60,
    flip: 1
  };
  state.furniturePlaced.push(newPlaced);
  state.selectedFurniId = newPlaced.instanceId;

  saveGame();
  renderFurniture();
  renderBuildWarehouse();
  showToast('已擺放到目前房間！');
};

function toggleBuildMode() {
  state.isBuilding = !state.isBuilding;
  document.getElementById('buildBanner').style.display = state.isBuilding ? 'block' : 'none';
  document.getElementById('buildWarehousePanel').style.display = state.isBuilding ? 'flex' : 'none';
  document.getElementById('buildBtnText').textContent = state.isBuilding ? '完成佈置' : '建造模式';

  if (!state.isBuilding) {
    state.selectedFurniId = null;
    saveGame();
  } else {
    renderBuildWarehouse();
  }
  renderFurniture();
}

function renderPoops() {
  ['living', 'play', 'garden'].forEach(roomId => {
    const con = document.getElementById(`poop-${roomId}`);
    if (!con) return;
    con.innerHTML = '';

    state.poopList.forEach(poop => {
      if (poop.room !== roomId) return;

      const el = document.createElement('div');
      el.className = 'poop-pellet';
      el.id = `poop-${poop.id}`;
      el.style.left = `${poop.x}px`;
      el.style.top = `${poop.y}px`;
      el.title = '點擊清掃！';
      
      // 雙重防禦：pointerdown 立即攔截，保證不穿透到底板產生瓜子
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        state.isCollectingPoop = true;
        collectPoop(poop.id);
        setTimeout(() => { state.isCollectingPoop = false; }, 300);
      });

      con.appendChild(el);
    });
  });
}

function collectPoop(poopId) {
  const idx = state.poopList.findIndex(p => p.id === poopId);
  if (idx === -1) return;

  const p = state.poopList[idx];
  state.poopList.splice(idx, 1);

  const earn = 8;
  state.coins += earn;
  spawnBubble(`🪙 +${earn}`, p.x, p.y - 15);

  saveGame();
  renderHUD();
  renderPoops();
}

// 一鍵清掃當前房間的所有便便 (清掃神器)
window.cleanAllPoopInRoom = function() {
  const curRoom = ROOMS[currentRoomIndex].id;
  const targetPoops = state.poopList.filter(p => p.room === curRoom);
  if (targetPoops.length === 0) {
    showToast('房間乾乾淨淨，沒有便便喔！');
    return;
  }

  const earnTotal = targetPoops.length * 8;
  state.poopList = state.poopList.filter(p => p.room !== curRoom);
  state.coins += earnTotal;

  saveGame();
  renderHUD();
  renderPoops();
  showToast(`🧹 大掃除完成！清理了 ${targetPoops.length} 顆便便，獲得 🪙 ${earnTotal} 金幣！`);
};


function spawnPoopPellet(x, y, room) {
  const roomPoopCount = state.poopList.filter(p => p.room === room).length;
  if (roomPoopCount >= 8) return;

  const newPoop = {
    id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    x: Math.max(30, Math.min(window.innerWidth - 50, x)),
    y: Math.max(window.innerHeight * 0.58, Math.min(window.innerHeight * 0.78, y)),
    room: room
  };
  state.poopList.push(newPoop);
  saveGame();
  renderPoops();
}

setInterval(() => {
  if (state.isBuilding || state.isDraggingHamster) return;

  state.hamsters.forEach(h => {
    if (state.travelingIds.includes(h.id)) return;

    if ((h.cheekPouch || 0) >= 2) {
      const house = state.furniturePlaced.find(f => (f.type === 'mushroom_house' || f.type === 'strawberry_house') && f.room === h.room);
      if (house) {
        const wrap = document.getElementById(`entity-${h.id}`);
        if (!wrap) return;
        walkTo(h, wrap, house.x + 30, house.y + 40, () => {
          h.cheekPouch = 0;
          spawnBubble('🌾 吐糧囤積', h.x + 20, h.y - 15);
          saveGame();
          renderHamsters();
        });
        return;
      }
    }

    // 大幅降低排便頻率 (從 16% 降至 4.5%)，更符合真實規律
    if (Math.random() < 0.045) spawnPoopPellet(h.x + (Math.random()*30-15), h.y + 25, h.room);

    if (Math.random() < 0.15) {
      const otherRooms = ROOMS.map(r => r.id).filter(id => id !== h.room);
      hamsterRunToRoom(h, otherRooms[Math.floor(Math.random() * otherRooms.length)]);
      return;
    }

    const wrap = document.getElementById(`entity-${h.id}`);
    if (!wrap || wrap.classList.contains('held') || wrap.classList.contains('fighting')) return;

    const curRoomFurnis = state.furniturePlaced.filter(f => f.room === h.room);
    if (curRoomFurnis.length > 0 && Math.random() < 0.7) {
      const targetFurni = curRoomFurnis[Math.floor(Math.random() * curRoomFurnis.length)];

      walkTo(h, wrap, targetFurni.x + 20, targetFurni.y + 20, () => {
        state.furnitureOccupant[targetFurni.instanceId] = h.id;
        useFurniture(targetFurni, h);
      });
    } else {
      const destX = Math.random() * (window.innerWidth - 120) + 40;
      walkTo(h, wrap, destX, window.innerHeight * 0.70);
    }
  });
}, 6500);

function useFurniture(furniItem, h) {
  const wrap = document.getElementById(`entity-${h.id}`);
  if (!wrap) return;

  if (furniItem.type === 'sand_bath') {
    wrap.classList.add('sand-bathing');
    spawnBubble('✨ 滾沙洗澡', h.x + 20, h.y - 15);
    setTimeout(() => {
      wrap.classList.remove('sand-bathing');
      delete state.furnitureOccupant[furniItem.instanceId];
    }, 3600);
  } else if (furniItem.type === 'wheel') {
    const rotor = document.querySelector(`#furni-${furniItem.instanceId} #wheel-rotor`);
    if (rotor) rotor.classList.add('spinning-wheel');
    spawnBubble('⚡ 跑跑跑', h.x + 25, h.y - 15);
    state.coins += 2;
    renderHUD();
    setTimeout(() => {
      if (rotor) rotor.classList.remove('spinning-wheel');
      delete state.furnitureOccupant[furniItem.instanceId];
    }, 3800);
  } else if (furniItem.type === 'mushroom_house' || furniItem.type === 'strawberry_house') {
    wrap.classList.add('sleeping');
    spawnBubble('💤 呼嚕大睡', h.x + 20, h.y - 15);
    setTimeout(() => {
      wrap.classList.remove('sleeping');
      delete state.furnitureOccupant[furniItem.instanceId];
    }, 4500);
  } else {
    spawnBubble('✨', h.x + 25, h.y - 15);
    setTimeout(() => { delete state.furnitureOccupant[furniItem.instanceId]; }, 3000);
  }
}

function walkTo(h, el, targetX, targetY, onArrival) {
  if (!el) return;
  el.classList.add('walking');
  const startX = h.x;
  const startY = h.y;
  let p = 0;
  const step = () => {
    if (el.classList.contains('held') || state.isBuilding) {
      el.classList.remove('walking');
      return;
    }
    p += 0.025;
    h.x = startX + (targetX - startX) * p;
    h.y = startY + (targetY - startY) * p;
    el.style.left = `${h.x}px`;
    el.style.top = `${h.y}px`;
    if (p < 1) requestAnimationFrame(step);
    else {
      el.classList.remove('walking');
      if (onArrival) onArrival();
    }
  };
  requestAnimationFrame(step);
}

document.getElementById('viewport').addEventListener('pointerdown', (e) => {
  if (state.isBuilding) {
    if (!e.target.closest('.placed-furniture') && !e.target.closest('#buildWarehousePanel')) {
      deselectBuildingFurni();
    }
    return;
  }
  if (state.isDraggingHamster || state.isCollectingPoop) return;
  if (e.clientY < 110 || e.clientY > window.innerHeight - 85) return;
  if (e.target.closest('.dock-wrapper') || e.target.closest('.room-nav-btn') || e.target.closest('.poop-pellet') || e.target.closest('.top-bar')) return;

  if (state.feedStock <= 0) {
    showToast('🪣 飼料罐空了！去雜貨鋪補充');
    return;
  }

  state.feedStock--;
  renderHUD();
  saveGame();
  dropSeed(e.clientX - 8, e.clientY - 12);
});

function dropSeed(x, y) {
  const seed = document.createElement('div');
  seed.className = 'sunflower-seed';
  seed.style.left = `${x}px`;
  seed.style.top = `${y}px`;
  document.getElementById('viewport').appendChild(seed);

  const expireTimer = setTimeout(() => {
    seed.style.opacity = '0';
    setTimeout(() => seed.remove(), 400);
  }, 5000);

  const curRoom = ROOMS[currentRoomIndex].id;
  let closest = null, minDist = Infinity;
  state.hamsters.forEach(h => {
    if (state.travelingIds.includes(h.id) || h.room !== curRoom) return;
    const d = Math.hypot(h.x - x, h.y - y);
    if (d < minDist) { minDist = d; closest = h; }
  });
  if (!closest) return;

  const wrap = document.getElementById(`entity-${closest.id}`);
  if (!wrap) return;
  walkTo(closest, wrap, x - 35, y - 10, () => {
    clearTimeout(expireTimer);
    seed.remove();
    closest.feedCount++;
    closest.cheekPouch = (closest.cheekPouch || 0) + 1;
    saveGame();
    renderHamsters();
    spawnBubble('🐹 塞進腮幫', closest.x + 20, closest.y);
  });
}

function spawnBubble(emoji, x, y) {
  const b = document.createElement('div');
  b.className = 'action-bubble';
  b.textContent = emoji;
  b.style.left = `${x}px`;
  b.style.top = `${y}px`;
  document.getElementById('viewport').appendChild(b);
  setTimeout(() => b.remove(), 900);
}

function openAdoptCenter() {
  document.getElementById('adoptCoinVal').textContent = state.coins;
  const grid = document.getElementById('adoptGrid');
  grid.innerHTML = '';
  Object.keys(SPECIES).forEach(key => {
    const sp = SPECIES[key];
    const card = document.createElement('div');
    card.className = 'card-item';
    card.innerHTML = `
      <div class="preview-box">${generateHamsterSVG(key)}</div>
      <b>${sp.name}</b>
      <span>🪙 ${sp.cost === 0 ? '免費' : sp.cost + ' 幣'}</span>
    `;
    const btn = document.createElement('button');
    btn.className = 'btn-action';
    btn.style.cssText = 'padding:6px; margin-top:4px;';
    btn.textContent = '領養';
    btn.onclick = () => {
      if (state.coins < sp.cost) return showToast('金幣不夠了！');
      const n = prompt(`為【${sp.name}】取個名字：`, sp.name);
      if (!n || !n.trim()) return;
      state.coins -= sp.cost;
      const assignedGender = Math.random() < 0.5 ? '♂' : '♀';
      state.hamsters.push({
        id: `h_${Date.now()}`,
        name: n.trim(),
        gender: assignedGender,
        species: key,
        feedCount: 0,
        cheekPouch: 0,
        equippedHat: null,
        room: ROOMS[currentRoomIndex].id,
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight * 0.70
      });
      saveGame();
      renderHamsters();
      renderHUD();
      closeModal('adoptModal');
      showToast(`領養成功！這是一隻 ${assignedGender === '♂' ? '小男生 ♂' : '小女生 ♀'}！`);
    };
    card.appendChild(btn);
    grid.appendChild(card);
  });
  document.getElementById('adoptModal').style.display = 'flex';
}

function openProfile() {
  const list = document.getElementById('hamsterCardList');
  list.innerHTML = '';
  state.hamsters.forEach(h => {
    const sp = SPECIES[h.species] || SPECIES.golden;
    const stage = h.feedCount < 10 ? '幼鼠期 🌱' : (h.feedCount < 20 ? '亞成體 🌾' : '成熟可繁育 🌻');
    const roomName = ROOMS.find(r => r.id === h.room)?.name || '客廳';
    const box = document.createElement('div');
    box.style.cssText = 'background:#fff; border:1px solid var(--border-color); border-radius:14px; padding:10px; margin-bottom:8px; font-size:12px; line-height:1.6; display:flex; align-items:center; gap:10px;';
    box.innerHTML = `
      <div style="flex-shrink:0;">${generateHamsterSVG(h.species, (h.cheekPouch||0)>0)}</div>
      <div style="flex-grow:1;">
        <div>
          <b>${h.name}</b> 
          <span style="font-weight:bold; color:${h.gender==='♂'?'#3a86ff':'#ff006e'};">${h.gender}</span>
          <button onclick="renameHamster('${h.id}')" style="margin-left:6px; border:none; background:none; color:var(--accent); font-weight:bold; cursor:pointer;">[改名]</button>
        </div>
        <div>品種：${sp.name}｜位置：${roomName}</div>
        <div>狀態：${stage} (嗑瓜子 ${h.feedCount} 顆)</div>
      </div>
    `;
    list.appendChild(box);
  });
  document.getElementById('profileModal').style.display = 'flex';
}

function renameHamster(id) {
  const h = state.hamsters.find(item => item.id === id);
  if (!h) return;
  const newName = prompt(`想幫【${h.name}】改成什麼新名字？`, h.name);
  if (newName && newName.trim()) {
    h.name = newName.trim();
    saveGame();
    openProfile();
    renderHamsters();
    showToast('名字已更新！');
  }
}

function openWardrobeSelect() {
  const list = document.getElementById('wardrobeSelectList');
  list.innerHTML = '';
  state.hamsters.forEach(h => {
    const btn = document.createElement('button');
    btn.className = 'btn-action';
    btn.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; background:#fff; color:var(--main-text); border:1px solid var(--border-color); font-size:12px; padding:8px 12px;';
    btn.innerHTML = `<span>${h.name} (${h.gender})</span> <span>戴著：${h.equippedHat ? ASSETS.hats[h.equippedHat].name : '無'} 👒</span>`;
    btn.onclick = () => {
      state.wardrobeTargetId = h.id;
      closeModal('wardrobeSelectModal');
      openFittingRoom(h);
    };
    list.appendChild(btn);
  });
  document.getElementById('wardrobeSelectModal').style.display = 'flex';
}

function openFittingRoom(hamster) {
  document.getElementById('stageHamsterName').textContent = `${hamster.name} (${hamster.gender})`;
  updateFittingStage(hamster);

  const grid = document.getElementById('fittingHatGrid');
  grid.innerHTML = '';

  const hatIds = state.inventory.filter(id => ASSETS.hats[id]);
  hatIds.forEach(id => {
    const item = ASSETS.hats[id];
    const isEquipped = hamster.equippedHat === id;
    const card = document.createElement('div');
    card.className = 'card-item';
    card.innerHTML = `
      <div class="preview-box">${item.svg}</div>
      <b>${item.name}</b>
      <button class="btn-action" style="padding:6px; margin-top:4px;" onclick="tryHatOnStage('${id}')">
        ${isEquipped ? '卸下' : '試穿'}
      </button>
    `;
    grid.appendChild(card);
  });

  document.getElementById('fittingRoomModal').style.display = 'flex';
}

function updateFittingStage(hamster) {
  const preview = document.getElementById('fittingHamsterPreview');
  const hatSlot = document.getElementById('fittingHatSlot');
  preview.innerHTML = generateHamsterSVG(hamster.species, false);
  hatSlot.innerHTML = hamster.equippedHat && ASSETS.hats[hamster.equippedHat] ? ASSETS.hats[hamster.equippedHat].svg : '';
}

function tryHatOnStage(hatId) {
  const h = state.hamsters.find(item => item.id === state.wardrobeTargetId);
  if (!h) return;
  h.equippedHat = (h.equippedHat === hatId) ? null : hatId;
  saveGame();
  renderHamsters();
  openFittingRoom(h);
}

function openTravelSelect() {
  const sel = document.getElementById('selectTraveler');
  sel.innerHTML = '';
  state.hamsters.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h.id;
    opt.textContent = `${h.name} (${h.gender}) - ${SPECIES[h.species].name}`;
    sel.appendChild(opt);
  });
  renderPostcardList();
  document.getElementById('postcardModal').style.display = 'flex';
}

function sendSelectedPetToTravel() {
  const sel = document.getElementById('selectTraveler');
  const targetId = sel.value;
  const traveler = state.hamsters.find(h => h.id === targetId);
  if (!traveler) return;
  if (state.travelingIds.includes(targetId)) return showToast('牠已經在散步路上囉！');

  state.travelingIds.push(targetId);
  closeModal('postcardModal');
  renderHamsters();
  showToast(`${traveler.name} 出發探險了！8 秒後寄明信片～`);

  setTimeout(() => {
    state.travelingIds = state.travelingIds.filter(id => id !== targetId);
    renderHamsters();

    const keys = Object.keys(ASSETS.postcards);
    const cardData = ASSETS.postcards[keys[Math.floor(Math.random() * keys.length)]];
    if (!state.postcards.some(p => p.title === cardData.title)) {
      state.postcards.push(cardData);
    }
    state.coins += 50;
    saveGame();
    renderHUD();
    showToast(`🌸 ${traveler.name} 寄回了【${cardData.title}】，賺了 50 金幣！`);
  }, 8000);
}

function renderPostcardList() {
  const list = document.getElementById('postcardList');
  const empty = document.getElementById('postcardEmpty');
  const countEl = document.getElementById('postcardCount');
  list.innerHTML = '';
  countEl.textContent = state.postcards.length;

  if (state.postcards.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    state.postcards.forEach(card => {
      const row = document.createElement('div');
      row.style.cssText = 'background:#fff; border:1px solid var(--border-color); border-radius:14px; padding:8px; margin-bottom:6px; display:flex; gap:10px; align-items:center;';
      row.innerHTML = `
        <div style="width:60px; height:60px; flex-shrink:0; background:#faf4ed; border-radius:10px; display:flex; align-items:center; justify-content:center;">${card.svg}</div>
        <div style="font-size:11px; color:var(--main-text);"><b style="font-size:12px;">${card.title}</b><p style="margin-top:2px;">${card.desc}</p></div>
      `;
      list.appendChild(row);
    });
  }
}

let currentShopTab = 'furniture';
function openShop() {
  document.getElementById('shopCoinText').textContent = state.coins;
  switchShopTab(currentShopTab);
  document.getElementById('shopModal').style.display = 'flex';
}

function switchShopTab(tab) {
  currentShopTab = tab;
  document.getElementById('tabShopFurni').style.background = tab === 'furniture' ? 'var(--accent)' : '#fff';
  document.getElementById('tabShopFurni').style.color = tab === 'furniture' ? '#fff' : 'var(--main-text)';
  document.getElementById('tabShopHat').style.background = tab === 'hats' ? 'var(--accent)' : '#fff';
  document.getElementById('tabShopHat').style.color = tab === 'hats' ? '#fff' : 'var(--main-text)';

  const grid = document.getElementById('shopGrid');
  grid.innerHTML = '';

  if (tab === 'furniture') {
    const feedCard = document.createElement('div');
    feedCard.className = 'card-item';
    feedCard.style.border = '2px solid var(--accent)';
    feedCard.innerHTML = `
      <div style="font-size:32px;">🌻</div>
      <b>特級葵花子袋 (+50顆)</b>
      <span>🪙 15 幣</span>
      <button class="btn-action" style="padding:6px; margin-top:4px; background:var(--accent);" onclick="buyFeedStock(50, 15)">購買飼料</button>
    `;
    grid.appendChild(feedCard);

    Object.keys(ASSETS.furniture).forEach(id => {
      const item = ASSETS.furniture[id];
      renderShopCard(grid, item, () => buyFurnitureItem(id, item.cost));
    });
  } else {
    Object.keys(ASSETS.hats).forEach(id => {
      if (!state.inventory.includes(id)) {
        const item = ASSETS.hats[id];
        renderShopCard(grid, item, () => buyHatItem(id, item.cost));
      }
    });
  }
}

window.buyFeedStock = function(count, cost) {
  if (state.coins < cost) return showToast('金幣不夠了！');
  state.coins -= cost;
  state.feedStock += count;
  saveGame();
  renderHUD();
  showToast(`加滿 ${count} 顆特級葵花子！`);
  openShop();
};

function renderShopCard(con, item, onBuy) {
  const card = document.createElement('div');
  card.className = 'card-item';
  card.innerHTML = `<div class="preview-box">${item.svg}</div><b>${item.name}</b><span>🪙 ${item.cost} 幣</span>`;
  const btn = document.createElement('button');
  btn.className = 'btn-action';
  btn.style.cssText = 'padding:6px; margin-top:4px;';
  btn.textContent = '購買';
  btn.onclick = onBuy;
  card.appendChild(btn);
  con.appendChild(card);
}

function buyFurnitureItem(typeId, cost) {
  if (state.coins < cost) return showToast('金幣不夠了！');
  state.coins -= cost;
  state.furnitureWarehouse.push({
    id: `w_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type: typeId
  });
  saveGame();
  renderHUD();
  showToast('成功買下家具！已存入倉庫！');
  openShop();
}

function buyHatItem(hatId, cost) {
  if (state.coins < cost) return showToast('金幣不夠了！');
  state.coins -= cost;
  state.inventory.push(hatId);
  saveGame();
  renderHUD();
  showToast('成功買下飾品！已放入試衣間！');
  openShop();
}

function showMiniGameIntro() { document.getElementById('rulesModal').style.display = 'flex'; }
const gameScreen = document.getElementById('minigame-screen');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let loopId, timerId, gScore = 0, gTime = 20;
let basket = { x: 0, y: 0, w: 60, h: 50 }, drops = [];

function reallyStartMiniGame() {
  closeModal('rulesModal');
  gameScreen.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  basket.x = canvas.width / 2 - 30;
  basket.y = canvas.height - 110;
  gScore = 0; gTime = 20; drops = [];
  document.getElementById('gameScore').textContent = gScore;
  document.getElementById('gameTimer').textContent = gTime;

  canvas.ontouchmove = (e) => { basket.x = e.touches[0].clientX - basket.w / 2; };
  canvas.onmousemove = (e) => { basket.x = e.clientX - basket.w / 2; };

  timerId = setInterval(() => {
    gTime--;
    document.getElementById('gameTimer').textContent = gTime;
    if (gTime <= 0) finishMiniGame();
  }, 1000);
  runGame();
}

function runGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.08) {
    drops.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: -20,
      speed: 3 + Math.random() * 3,
      isCoin: Math.random() < 0.45,
      isRock: Math.random() < 0.2
    });
  }
  ctx.fillStyle = '#e8a86b';
  ctx.beginPath();
  ctx.arc(basket.x + 30, basket.y + 25, 24, 0, Math.PI * 2);
  ctx.fill();

  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.y += d.speed;
    if (d.isRock) {
      ctx.fillStyle = '#6c757d'; ctx.beginPath(); ctx.arc(d.x, d.y, 11, 0, Math.PI * 2); ctx.fill();
    } else if (d.isCoin) {
      ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(d.x, d.y, 10, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#5a4b3d'; ctx.beginPath(); ctx.ellipse(d.x, d.y, 6, 10, 0, 0, Math.PI * 2); ctx.fill();
    }
    if (d.y > basket.y && d.y < basket.y + basket.h && d.x > basket.x && d.x < basket.x + basket.w) {
      if (d.isRock) gScore = Math.max(0, gScore - 10);
      else if (d.isCoin) gScore += 15;
      else gScore += 5;
      document.getElementById('gameScore').textContent = gScore;
      drops.splice(i, 1);
      continue;
    }
    if (d.y > canvas.height) drops.splice(i, 1);
  }
  loopId = requestAnimationFrame(runGame);
}

function finishMiniGame() {
  cancelAnimationFrame(loopId);
  clearInterval(timerId);
  gameScreen.style.display = 'none';
  const earned = Math.floor(gScore / 2);
  state.coins += earned;
  saveGame();
  renderHUD();
  showToast(`挑戰結束！折算獲得 🪙 ${earned} 金幣！`);
}

function toggleDock() {
  const d = document.getElementById('mainDock');
  const b = document.getElementById('dockToggleBtn');
  if (d.classList.contains('collapsed')) {
    d.classList.remove('collapsed');
    b.classList.remove('is-collapsed');
  } else {
    d.classList.add('collapsed');
    b.classList.add('is-collapsed');
  }
}

function openAuthModal() { document.getElementById('authModal').style.display = 'flex'; }
window.closeModal = function(id) { document.getElementById(id).style.display = 'none'; };

function renderHUD() {
  document.getElementById('valCoins').textContent = state.coins;
  document.getElementById('valHamsterCount').textContent = state.hamsters.length;
  const stockEl = document.getElementById('valFeedStock');
  if (stockEl) stockEl.textContent = state.feedStock;
}

// === YouTube 官方播放器控制 ===
let ytBgmPlayer = null;
let isYtPlaying = false;

window.onYouTubeIframeAPIReady = function() {
  ytBgmPlayer = new YT.Player('yt-audio-player', {
    videoId: 'LBjUh4bYF8w',
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: 'LBjUh4bYF8w',
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: (e) => {
        e.target.setVolume(18);
      },
      onStateChange: (e) => {
        const btn = document.getElementById('btnBgmToggle');
        if (e.data === YT.PlayerState.PLAYING) {
          isYtPlaying = true;
          if (btn) btn.textContent = '🎵';
        } else {
          isYtPlaying = false;
          if (btn) btn.textContent = '🔇';
        }
      }
    }
  });
};

window.toggleBgmPlayer = function() {
  if (!ytBgmPlayer || typeof ytBgmPlayer.playVideo !== 'function') return;

  if (isYtPlaying) {
    ytBgmPlayer.pauseVideo();
  } else {
    ytBgmPlayer.setVolume(18);
    ytBgmPlayer.playVideo();
  }
};

window.startBgmOnUnlock = function() {
  if (ytBgmPlayer && typeof ytBgmPlayer.playVideo === 'function') {
    ytBgmPlayer.setVolume(18);
    ytBgmPlayer.playVideo();
  }
};

renderFurniture();
renderHamsters();
renderPoops();
renderHUD();
