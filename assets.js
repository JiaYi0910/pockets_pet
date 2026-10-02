// 房間定義
const ROOMS = [
  { name: '客廳 🛋️', id: 'living' },
  { name: '活動室 🎡', id: 'play' },
  { name: '露天庭院 🌿', id: 'garden' }
];
let currentRoomIndex = 0;

// 7 大倉鼠品種
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

// 完整素材庫 (所有帽子、習性家具與手繪明信片)
const ASSETS = {
  hats: {
    straw_hat: { name: '夏日草帽', cost: 30, svg: `<svg viewBox="0 0 60 40" width="46" height="30"><path d="M5 28 Q30 22 55 28 Q30 34 5 28" fill="#e9c46a" stroke="#d4a373" stroke-width="2"/><ellipse cx="30" cy="20" rx="16" ry="12" fill="#f4a261"/><rect x="14" y="20" width="32" height="4" fill="#e76f51"/></svg>` },
    pink_bow: { name: '粉櫻蝴蝶結', cost: 45, svg: `<svg viewBox="0 0 50 35" width="40" height="28"><polygon points="25,18 10,8 10,28" fill="#f4a5ae"/><polygon points="25,18 40,8 40,28" fill="#f4a5ae"/><ellipse cx="25" cy="18" rx="5" ry="5" fill="#e56b81"/></svg>` },
    grad_cap: { name: '學士帽', cost: 70, svg: `<svg viewBox="0 0 60 40" width="46" height="30"><polygon points="30,8 54,18 30,28 6,18" fill="#2b2d42"/><rect x="22" y="24" width="16" height="8" fill="#1d1e2c"/><path d="M48 20 L48 30" stroke="#f4a261" stroke-width="2"/><circle cx="48" cy="31" r="2" fill="#f4a261"/></svg>` },
    crown: { name: '國王金皇冠', cost: 110, svg: `<svg viewBox="0 0 50 35" width="42" height="30"><polygon points="8,26 12,12 25,18 38,12 42,26" fill="#ffd166" stroke="#f4a261" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#e76f51"/><circle cx="25" cy="18" r="3" fill="#2a9d8f"/><circle cx="38" cy="12" r="3" fill="#e76f51"/></svg>` },
    ghost_hood: { name: '小幽靈頭套', cost: 95, svg: `<svg viewBox="0 0 50 40" width="40" height="32"><path d="M15 32 C10 12 40 12 35 32 Q25 28 15 32 Z" fill="#ffffff" stroke="#ced4da" stroke-width="2"/><circle cx="22" cy="20" r="2" fill="#333"/><circle cx="28" cy="20" r="2" fill="#333"/></svg>` },
    daisy_clip: { name: '小雛菊髮夾', cost: 40, svg: `<svg viewBox="0 0 40 40" width="34" height="34"><circle cx="20" cy="20" r="6" fill="#ffd166"/><circle cx="20" cy="10" r="4" fill="#ffffff"/><circle cx="28" cy="15" r="4" fill="#ffffff"/><circle cx="28" cy="25" r="4" fill="#ffffff"/><circle cx="20" cy="30" r="4" fill="#ffffff"/><circle cx="12" cy="25" r="4" fill="#ffffff"/><circle cx="12" cy="15" r="4" fill="#ffffff"/></svg>` }
  },
  furniture: {
    wheel: {
      name: '靜音滾輪', cost: 60, w: 125, h: 125, defaultRoom: 'living', defaultX: 20, defaultY: 0.58,
      svg: `<svg viewBox="0 0 100 100" width="125" height="125"><g id="wheel-rotor"><circle cx="50" cy="50" r="44" fill="none" stroke="#d4a373" stroke-width="6"/><circle cx="50" cy="50" r="8" fill="#8c6239"/><line x1="50" y1="6" x2="50" y2="94" stroke="#d4a373" stroke-width="4"/><line x1="6" y1="50" x2="94" y2="50" stroke="#d4a373" stroke-width="4"/></g><path d="M25 94 L50 50 L75 94" stroke="#8c6239" stroke-width="7" fill="none"/></svg>`
    },
    mushroom_house: {
      name: '儲糧小木窩', cost: 80, w: 130, h: 130, defaultRoom: 'living', defaultX: 230, defaultY: 0.58,
      svg: `<svg viewBox="0 0 100 100" width="130" height="130"><rect x="25" y="48" width="50" height="48" rx="10" fill="#f5ebe0"/><path d="M8 50 Q50 6 92 50 Z" fill="#e76f51"/><circle cx="32" cy="30" r="6" fill="#fff"/><circle cx="68" cy="25" r="7" fill="#fff"/><circle cx="50" cy="40" r="5" fill="#fff"/><path d="M38 96 A12 12 0 0 1 62 96 Z" fill="#582f0e"/></svg>`
    },
    sand_bath: {
      name: '鼠砂沐浴盆', cost: 70, w: 110, h: 75, defaultRoom: 'play', defaultX: 40, defaultY: 0.65,
      svg: `<svg viewBox="0 0 110 75" width="110" height="75"><rect x="10" y="25" width="90" height="45" rx="14" fill="#edf2f4" stroke="#8d99ae" stroke-width="3"/><ellipse cx="55" cy="50" rx="40" ry="14" fill="#faedcd"/><circle cx="35" cy="48" r="2" fill="#d4a373"/><circle cx="70" cy="52" r="2.5" fill="#d4a373"/><circle cx="52" cy="54" r="1.5" fill="#d4a373"/></svg>`
    },
    bedding_pile: {
      name: '厚鋪白楊木屑', cost: 50, w: 120, h: 65, defaultRoom: 'play', defaultX: 180, defaultY: 0.68,
      svg: `<svg viewBox="0 0 120 65" width="120" height="65"><ellipse cx="60" cy="45" rx="55" ry="18" fill="#f3dfbf"/><path d="M25 40 Q40 25 55 42 Q70 20 85 45 Q100 30 110 50 Z" fill="#e6ccb2"/><circle cx="45" cy="38" r="3" fill="#ddb892"/><circle cx="75" cy="36" r="3" fill="#ddb892"/></svg>`
    },
    water_bottle: {
      name: '滾珠飲水器', cost: 40, w: 60, h: 100, defaultRoom: 'living', defaultX: 160, defaultY: 0.55,
      svg: `<svg viewBox="0 0 60 100" width="60" height="100"><rect x="18" y="10" width="24" height="60" rx="8" fill="#caf0f8" stroke="#48cae4" stroke-width="3"/><rect x="22" y="70" width="16" height="8" fill="#adb5bd"/><line x1="30" y1="78" x2="16" y2="94" stroke="#6c757d" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="96" r="3" fill="#00b4d8"/></svg>`
    },
    slide: {
      name: '雙層木滑梯', cost: 90, w: 140, h: 100, defaultRoom: 'garden', defaultX: 60, defaultY: 0.60,
      svg: `<svg viewBox="0 0 140 100" width="140" height="100"><rect x="10" y="30" width="30" height="60" rx="4" fill="#d4a373"/><path d="M40 35 L120 85 L120 90 L40 45 Z" fill="#e76f51"/><line x1="25" y1="30" x2="25" y2="90" stroke="#8c6239" stroke-width="4"/></svg>`
    }
  },
  postcards: {
    shrine: { title: '京都神社之櫻', desc: '在千本鳥居旁散步，偶遇了微風吹落的春櫻花瓣。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#fceade"/><polygon points="20,70 20,35 60,35 60,70" fill="none" stroke="#d90429" stroke-width="6"/><line x1="12" y1="35" x2="68" y2="35" stroke="#d90429" stroke-width="8"/><circle cx="60" cy="20" r="4" fill="#ffb4a2"/><circle cx="45" cy="15" r="3" fill="#ffb4a2"/></svg>` },
    field: { title: '陽光向日葵田', desc: '置身在向日葵海裡，摘了幾顆新鮮飽滿的葵花子！', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#e9f5db"/><circle cx="40" cy="38" r="16" fill="#603808"/><circle cx="40" cy="20" r="6" fill="#ffb703"/><circle cx="56" cy="30" r="6" fill="#ffb703"/><circle cx="56" cy="46" r="6" fill="#ffb703"/><circle cx="40" cy="56" r="6" fill="#ffb703"/><circle cx="24" cy="46" r="6" fill="#ffb703"/><circle cx="24" cy="30" r="6" fill="#ffb703"/></svg>` },
    beach: { title: '黃金海岸浪花', desc: '在細緻的金黃沙灘邊追浪，拾獲了五彩繽紛的貝殼。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#caf0f8"/><ellipse cx="40" cy="65" rx="35" ry="12" fill="#ffd166"/><circle cx="65" cy="22" r="8" fill="#f77f00"/></svg>` },
    fuji: { title: '富士山雪見溫泉', desc: '遠眺積雪的聖岳富士山，在暖呼呼的湯池邊打瞌睡。', svg: `<svg viewBox="0 0 80 80" width="70" height="70"><rect width="80" height="80" rx="10" fill="#e2eafc"/><polygon points="40,15 15,65 65,65" fill="#4361ee"/><polygon points="40,15 30,35 50,35" fill="#ffffff"/><circle cx="68" cy="22" r="7" fill="#ef233c"/></svg>` }
  }
};

const LOCAL_KEY = 'pocket_hamster_save_v11';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}'); } catch(e) { saved = {}; }

const state = {
  coins: saved.coins ?? 200,
  hamsters: saved.hamsters || [
    { id: 'h_1', name: '泡泡', gender: '♂', species: 'golden', feedCount: 22, cheekPouch: 0, equippedHat: 'straw_hat', room: 'living', x: 80, y: window.innerHeight * 0.70 }
  ],
  inventory: saved.inventory || ['straw_hat', 'wheel', 'mushroom_house', 'water_bottle', 'sand_bath'],
  furnitureCoords: saved.furnitureCoords || {
    wheel: { room: 'living', x: 25, y: window.innerHeight * 0.58 },
    mushroom_house: { room: 'living', x: window.innerWidth - 150, y: window.innerHeight * 0.58 },
    water_bottle: { room: 'living', x: 170, y: window.innerHeight * 0.55 },
    sand_bath: { room: 'play', x: 60, y: window.innerHeight * 0.65 }
  },
  postcards: saved.postcards || [],
  isBuilding: false,
  travelingIds: [],
  wardrobeTargetId: null,
  furnitureOccupant: {},
  isDraggingHamster: false
};

window.saveGame = function() {
  localStorage.setItem(LOCAL_KEY, JSON.stringify({
    coins: state.coins,
    hamsters: state.hamsters,
    inventory: state.inventory,
    furnitureCoords: state.furnitureCoords,
    postcards: state.postcards
  }));
  if (window.saveGameCloud) window.saveGameCloud();
};

function changeRoom(direction) {
  currentRoomIndex = (currentRoomIndex + direction + ROOMS.length) % ROOMS.length;
  document.getElementById('world-slider').style.transform = `translateX(-${currentRoomIndex * 100}vw)`;
  document.getElementById('roomIndicatorText').textContent = ROOMS[currentRoomIndex].name;
  renderHamsters();
  renderFurniture();
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

    Object.keys(state.furnitureCoords).forEach(id => {
      const item = ASSETS.furniture[id];
      const coords = state.furnitureCoords[id];
      if (!item || coords.room !== roomId) return;

      const el = document.createElement('div');
      el.className = `placed-furniture ${state.isBuilding ? 'building' : ''}`;
      el.id = `furni-${id}`;
      el.innerHTML = item.svg;
      el.style.left = `${coords.x}px`;
      el.style.top = `${coords.y}px`;

      if (state.isBuilding) {
        let fDrag = false, fOffset = { x: 0, y: 0 };
        el.addEventListener('pointerdown', (e) => {
          fDrag = true;
          fOffset.x = e.clientX - coords.x;
          fOffset.y = e.clientY - coords.y;
          el.setPointerCapture(e.pointerId);
        });
        el.addEventListener('pointermove', (e) => {
          if (!fDrag) return;
          coords.x = e.clientX - fOffset.x;
          coords.y = Math.max(window.innerHeight * 0.50, Math.min(window.innerHeight * 0.80, e.clientY - fOffset.y));
          el.style.left = `${coords.x}px`;
          el.style.top = `${coords.y}px`;
        });
        el.addEventListener('pointerup', () => { fDrag = false; saveGame(); });
      }
      con.appendChild(el);
    });
  });
}

setInterval(() => {
  if (state.isBuilding || state.isDraggingHamster) return;

  state.hamsters.forEach(h => {
    if (state.travelingIds.includes(h.id)) return;

    if ((h.cheekPouch || 0) >= 2 && state.furnitureCoords.mushroom_house && h.room === state.furnitureCoords.mushroom_house.room) {
      const home = state.furnitureCoords.mushroom_house;
      const wrap = document.getElementById(`entity-${h.id}`);
      if (!wrap) return;
      walkTo(h, wrap, home.x + 30, home.y + 40, () => {
        h.cheekPouch = 0;
        spawnBubble('🌾', h.x + 30, h.y - 15);
        saveGame();
        renderHamsters();
      });
      return;
    }

    if (Math.random() < 0.12) spawnPoopPellet(h.x + (Math.random()*20-10), h.y + 25, h.room);

    if (Math.random() < 0.15) {
      const otherRooms = ROOMS.map(r => r.id).filter(id => id !== h.room);
      hamsterRunToRoom(h, otherRooms[Math.floor(Math.random() * otherRooms.length)]);
      return;
    }

    const wrap = document.getElementById(`entity-${h.id}`);
    if (!wrap || wrap.classList.contains('held') || wrap.classList.contains('fighting')) return;

    const curRoomFurnis = Object.keys(state.furnitureCoords).filter(id => state.furnitureCoords[id].room === h.room);
    if (curRoomFurnis.length > 0 && Math.random() < 0.7) {
      const targetFurni = curRoomFurnis[Math.floor(Math.random() * curRoomFurnis.length)];
      const fCoords = state.furnitureCoords[targetFurni];

      walkTo(h, wrap, fCoords.x + 20, fCoords.y + 20, () => {
        state.furnitureOccupant[targetFurni] = h.id;
        useFurniture(targetFurni, h);
      });
    } else {
      const destX = Math.random() * (window.innerWidth - 120) + 40;
      walkTo(h, wrap, destX, window.innerHeight * 0.70);
    }
  });
}, 6500);

function spawnPoopPellet(x, y, room) {
  if (ROOMS[currentRoomIndex].id !== room) return;
  const poop = document.createElement('div');
  poop.className = 'poop-pellet';
  poop.style.left = `${x}px`;
  poop.style.top = `${y}px`;
  poop.onclick = () => {
    poop.remove();
    state.coins += 5;
    saveGame();
    renderHUD();
  };
  document.getElementById('viewport').appendChild(poop);
  setTimeout(() => poop.remove(), 18000);
}

function useFurniture(furniId, h) {
  const wrap = document.getElementById(`entity-${h.id}`);
  if (!wrap) return;

  if (furniId === 'sand_bath') {
    wrap.classList.add('sand-bathing');
    spawnBubble('✨', h.x + 25, h.y - 15);
    setTimeout(() => {
      wrap.classList.remove('sand-bathing');
      delete state.furnitureOccupant['sand_bath'];
    }, 3600);
  } else if (furniId === 'wheel') {
    const rotor = document.getElementById('wheel-rotor');
    if (rotor) rotor.classList.add('spinning-wheel');
    spawnBubble('⚡', h.x + 30, h.y - 15);
    state.coins += 2;
    renderHUD();
    setTimeout(() => {
      if (rotor) rotor.classList.remove('spinning-wheel');
      delete state.furnitureOccupant['wheel'];
    }, 3800);
  } else if (furniId === 'mushroom_house') {
    wrap.classList.add('sleeping');
    spawnBubble('💤', h.x + 30, h.y - 15);
    setTimeout(() => {
      wrap.classList.remove('sleeping');
      delete state.furnitureOccupant['mushroom_house'];
    }, 4500);
  } else {
    spawnBubble('✨', h.x + 30, h.y - 15);
    setTimeout(() => { delete state.furnitureOccupant[furniId]; }, 3000);
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
  if (state.isBuilding || state.isDraggingHamster) return;
  if (e.clientY < 110 || e.clientY > window.innerHeight - 85) return;
  if (e.target.closest('.dock-wrapper') || e.target.closest('.room-nav-btn')) return;
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
    spawnBubble('🐹', closest.x + 35, closest.y);
  });
}

function spawnBubble(emoji, x, y) {
  const b = document.createElement('div');
  b.className = 'action-bubble';
  b.textContent = emoji;
  b.style.left = `${x}px`;
  b.style.top = `${y}px`;
  document.getElementById('viewport').appendChild(b);
  setTimeout(() => b.remove(), 800);
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
      if (state.coins < sp.cost) return alert('金幣不夠了！');
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
      alert(`恭喜領養成功！這是一隻 ${assignedGender === '♂' ? '小男生 ♂' : '小女生 ♀'}！`);
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
      openWardrobeActual(h);
    };
    list.appendChild(btn);
  });
  document.getElementById('wardrobeSelectModal').style.display = 'flex';
}

function openWardrobeActual(hamster) {
  document.getElementById('wardrobeTargetName').textContent = `${hamster.name} (${hamster.gender})`;
  const grid = document.getElementById('wardrobeGrid');
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
      <button class="btn-action" style="padding:6px; margin-top:4px;" onclick="toggleHatForCurrent('${id}')">
        ${isEquipped ? '卸下' : '穿上'}
      </button>
    `;
    grid.appendChild(card);
  });
  document.getElementById('wardrobeModal').style.display = 'flex';
}

function toggleHatForCurrent(hatId) {
  const h = state.hamsters.find(item => item.id === state.wardrobeTargetId);
  if (!h) return;
  h.equippedHat = (h.equippedHat === hatId) ? null : hatId;
  saveGame();
  renderHamsters();
  openWardrobeActual(h);
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
  if (state.travelingIds.includes(targetId)) return alert('牠已經在散步路上囉！');

  state.travelingIds.push(targetId);
  closeModal('postcardModal');
  renderHamsters();
  alert(`${traveler.name} 出門旅行了！8 秒後會寄明信片回來～`);

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
    alert(`🌸 ${traveler.name} 散步回來了！寄回了【${cardData.title}】，賺了 50 金幣！`);
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

function openShop() {
  document.getElementById('shopCoinText').textContent = state.coins;
  const grid = document.getElementById('shopGrid');
  grid.innerHTML = '';
  Object.keys(ASSETS.hats).forEach(id => {
    if (!state.inventory.includes(id)) renderShopItem(grid, ASSETS.hats[id], () => buyItem(id, 'hat', ASSETS.hats[id].cost));
  });
  Object.keys(ASSETS.furniture).forEach(id => {
    if (!state.inventory.includes(id)) renderShopItem(grid, ASSETS.furniture[id], () => buyItem(id, 'furniture', ASSETS.furniture[id].cost));
  });
  document.getElementById('shopModal').style.display = 'flex';
}

function renderShopItem(con, item, onBuy) {
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

function buyItem(id, type, cost) {
  if (state.coins < cost) return alert('金幣不夠了！快去玩小遊戲吧！');
  state.coins -= cost;
  state.inventory.push(id);
  if (type === 'furniture') {
    const item = ASSETS.furniture[id];
    state.furnitureCoords[id] = { room: item.defaultRoom, x: item.defaultX, y: window.innerHeight * item.defaultY };
    renderFurniture();
  }
  saveGame();
  renderHUD();
  alert('購買成功！');
  openShop();
}

function toggleBuildMode() {
  state.isBuilding = !state.isBuilding;
  document.getElementById('buildBanner').style.display = state.isBuilding ? 'block' : 'none';
  document.getElementById('buildBtnText').textContent = state.isBuilding ? '完成佈置' : '建造模式';
  renderFurniture();
  if (!state.isBuilding) saveGame();
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
  alert(`挑戰結束！總得分 ${gScore}，折算獲得 🪙 ${earned} 金幣！`);
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
}

renderFurniture();
renderHamsters();
renderHUD();