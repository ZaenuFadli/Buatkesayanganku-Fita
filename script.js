// Variabel Global
let partnerName = localStorage.getItem('partnerName') || '';
let anniversaryDate = localStorage.getItem('anniversaryDate') || '';
let theme = localStorage.getItem('theme') || 'light';
let confessions = JSON.parse(localStorage.getItem('confessions')) || [];
let memoryGameCards = []; // Untuk Memory Game
let flippedCards = []; // Untuk Memory Game
let matchedPairs = 0; // Untuk Memory Game

// Array Data untuk Fitur
const quotes = [
    "Setiap hari bersamamu terasa seperti keajaiban kecil yang tak pernah habis Terima kasih sudah mencintaiku dengan cara yang begitu hangat dan tulus,Kamu bukan hanya bagian dari hidupku kamu adalah alasanku untuk terus tersenyum setiap hari. 💖",
    "Aku jatuh cinta dengan caramu tersenyum, tapi aku jatuh cinta lebih dalam dengan caramu tersenyum kepadaku. 💖",
    "Kamu adalah alasan aku percaya pada takdir. 🌟",
    "Cinta sejati adalah ketika kamu tidak perlu kata-kata untuk mengungkapkan perasaanmu. 💘",
    "Setiap hari bersamamu adalah petualangan baru. 🥰"
];

const petNames = [
    "Sayang", "Beb", "Seng", "Cantik" ,"Bidadariku","Kesayangan Fadli"
];

const affirmations = [
    "Kamu hebat dan aku selalu bangga padamu. 💕",
    "Cintamu membuat dunia ini lebih indah. 🌸",
    "Kita adalah hati yang tak akan terpisahkan. 💑",
    "Setiap momen bersamamu adalah kebahagianku. ",
    "Aku mencintaimu lebih dari apa pun. 💖",
    "Aku mencintaimu dengan sepenuh hati, hari ini dan selamanya 💞",
    "Terima kasih sudah hadir dan mencintaiku dengan sepenuh hati.Kamu adalah anugerah terindah dalam hidupku.Semoga Tuhan selalu menjaga kita, menguatkan cinta ini, dan menyatukan langkah kita hingga akhir waktu.Aku ingin tetap bersamamu, sekarang dan selamanya. 🤍"
];

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('login-page')) {
        initLogin();
    } else if (document.body.classList.contains('dashboard-page')) {
        initDashboard();
        startHeartParticles(); // Tambah partikel hati terus-menerus
    }
});

// Login
function initLogin() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        partnerName = document.getElementById('partnerName').value;
        anniversaryDate = document.getElementById('anniversaryDate').value;
        localStorage.setItem('partnerName', partnerName);
        localStorage.setItem('anniversaryDate', anniversaryDate);
        window.location.href = 'dashboard.html';
    });
}

// Dashboard
function initDashboard() {
    applyTheme();
    loadPage('home');
    initNav();
    initThemeToggle();
    initMuteToggle();
    initBackgroundHearts(); // Tetap dari kode lama (interval hati)
}

function initNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            loadPage(page);
            navMenu.classList.remove('open');
        });
    });
}

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    toggle.addEventListener('click', () => {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
        triggerConfetti(); // Efek confetti saat toggle tema
    });
}

function applyTheme() {
    document.body.classList.toggle('dark-mode', theme === 'dark');
}

function initMuteToggle() {
    const toggle = document.getElementById('muteToggle');
    const audio = document.getElementById('bgMusic');
    let muted = false;
    toggle.addEventListener('click', () => {
        muted = !muted;
        audio.muted = muted;
        toggle.textContent = muted ? '🔇' : '🔊';
    });
    if (audio) audio.play().catch(() => {}); // Opsional, hindari error jika tidak ada audio
}

function initBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.classList.add('heart-fall');
        heart.style.left = Math.random() * 100 + '%';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }, 1000);
}

// Partikel Hati Terus-Menerus
function startHeartParticles() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.classList.add('heart-fall');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Variasi kecepatan
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 500); // Lebih sering
}

// Efek Confetti
function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function loadPage(page) {
    const content = document.getElementById('mainContent');
    content.innerHTML = '';
    switch (page) {
        case 'home':
            content.innerHTML = `
                <div class="card">
                    <h1 class="romantic-text">Hai, ${partnerName} 💕</h1>
                    <p>Tanggal Jadian: ${anniversaryDate}</p>
                    <p>Lama Hubungan: ${calculateRelationshipDuration()} hari</p>
                    <p>Terima kasih sudah hadir, mencinta, dan bertahan,aku mencintaimu bukan karena sempurna,
tapi karena bersamamu, semuanya terasa indah. 💞</p>
                </div>
            `;
            break;
        case 'timeline':
            content.innerHTML = `
                <div class="card">
                    <h3>Timeline Cinta Kita</h3>
                    <div class="timeline">
                        <div class="card">Hari Jadian: ${anniversaryDate} - Mulai cerita indah kita! 💑</div>
                        <div class="card">Tanggal Nembak: 21 April 2025 - Hari dimana aku berani menyatakan cinta kepadamu💖</div>
                        <div class="card">Momen Spesial: Ketika sama kamu semua hal akan menjadi momen spesial💕</div>
                    </div>
                </div>
            `;
            break;
        case 'gallery':
            content.innerHTML = `
                <div class="grid">
                    <img src="Kenangan1.jpg" alt="Kenangan 1" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Kenangan2.jpg" alt="Kenangan 2" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Kenangan3.jpg" alt="Kenangan 3" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Kenangan4.jpg" alt="Kenangan 4" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Kenangan5.jpg" alt="Kenangan 5" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Kenangan6.jpg" alt="Kenangan 6" class="card gallery-img" onclick="zoomImage(this)">
                     <img src="Kenangan7.jpg" alt="Kenangan 7" class="card gallery-img" onclick="zoomImage(this)">
                      <img src="Kenangan8.jpg" alt="Kenangan 8" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="Love.jpg" alt="Love" class="card gallery-img" onclick="zoomImage(this)">
                    <img src="you.jpg" alt="You" class="card gallery-img" onclick="zoomImage(this)">
                    <!-- Tambahkan lebih banyak gambar -->
                </div>
            `;
            break;
        case 'messages':
            content.innerHTML = `
                <div class="card">
                    <p class="typewriter">Aku mencintaimu lebih dari kata-kata bisa ungkapkan. Kamu adalah segalanya bagiku. 💕</p>
                    <p class="typewriter" style="animation-delay: 3s;">Setiap hari bersamamu adalah hari yang penuh kebahagiaan. 🌟</p>
                </div>
            `;
            break;
        case 'countdown':
            content.innerHTML = `
                <div class="card">
                    <p>Hari Jadian: ${calculateDaysSince()} hari yang lalu</p>
                    <p>Countdown ke Anniversary Berikutnya: ${calculateNextAnniversary()}</p>
                </div>
            `;
            break;
        case 'quotes':
            content.innerHTML = `
                <div class="card">
                    <p id="quote">${getRandomQuote()}</p>
                    <button class="btn" onclick="document.getElementById('quote').textContent = getRandomQuote()">Tampilkan Lagi 💬</button>
                </div>
            `;
            break;
        case 'confession':
            content.innerHTML = `
                <div class="card">
                    <textarea id="confessionText" placeholder="Tulis pengakuan cintamu di sini... 💌" rows="4"></textarea>
                    <button class="btn" onclick="saveConfession()">Kirim 💖</button>
                    <div id="savedConfessions"></div>
                </div>
            `;
            loadConfessions();
            break;
        case 'loveMeter':
            content.innerHTML = `
                <div class="card">
                    <input type="text" id="name1" placeholder="Nama 1 (misal: Kamu)">
                    <input type="text" id="name2" placeholder="Nama 2 (misal: Aku)">
                    <button class="btn" onclick="calculateLove()">Hitung Cinta 💘</button>
                    <p id="result"></p>
                </div>
            `;
            break;
        case 'memoryGame':
            initMemoryGame();
            break;
        case 'petName':
            content.innerHTML = `
                <div class="card">
                    <p>Nama Panggilan Romantis: <span id="petName">${getRandomPetName()}</span> 🐻</p>
                    <button class="btn" onclick="document.getElementById('petName').textContent = getRandomPetName()">Acak Lagi</button>
                </div>
            `;
            break;
        case 'loveLetter':
            content.innerHTML = `
                <div class="card envelope" onclick="openEnvelope()">
                    <p>✉️ Klik Amplop Ini untuk Buka Surat Cinta</p>
                </div>
                <div id="letterContent" class="card" style="display:none; animation: fadeIn 1s;">
                    <h3>Surat Cinta untuk ${partnerName} 💕</h3>
                    <p>Hai sayang, aku ingin mengatakan bahwa kamu adalah cahaya dalam hidupku. Setiap hari bersamamu adalah kebahagian terbesarkus. Aku mencintaimu selamanya. 🌹</p>
                </div>
            `;
            break;
        case 'affirmation':
            content.innerHTML = `
                <div class="card">
                    <p id="affirmation">${getRandomAffirmation()}</p>
                    <button class="btn" onclick="document.getElementById('affirmation').textContent = getRandomAffirmation()">Tampilkan Lagi 🌸</button>
                </div>
            `;
            break;
    }
}

// Fungsi Tambahan untuk Fitur
function calculateRelationshipDuration() {
    if (!anniversaryDate) return 0;
    const start = new Date(anniversaryDate.split('/').reverse().join('-'));
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function calculateDaysSince() {
    return calculateRelationshipDuration();
}

function calculateNextAnniversary() {
    if (!anniversaryDate) return 'Tidak ada data';
    const [day, month] = anniversaryDate.split('/');
    const now = new Date();
    let nextAnniv = new Date(now.getFullYear(), month - 1, day);
    if (nextAnniv < now) nextAnniv.setFullYear(now.getFullYear() + 1);
    const diff = Math.ceil((nextAnniv - now) / (1000 * 60 * 60 * 24));
    return `${diff} hari lagi`;
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function saveConfession() {
    const text = document.getElementById('confessionText').value;
    if (text) {
        confessions.push(text);
        localStorage.setItem('confessions', JSON.stringify(confessions));
        document.getElementById('confessionText').value = '';
        loadConfessions();
        // Efek hati jatuh
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.classList.add('heart-fall');
        heart.style.left = '50%';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}

function loadConfessions() {
    const container = document.getElementById('savedConfessions');
    container.innerHTML = confessions.map(conf => `<div class="card">${conf}</div>`).join('');
}

function calculateLove() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    if (!name1 || !name2) return;
    const percentage = Math.floor(Math.random() * 5) + 96; // 90-100%
    document.getElementById('result').innerHTML = `Persentase Cinta antara ${name1} dan ${name2}: ${percentage}% 💘`;
    // Animasi hati
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.classList.add('heart-fall');
            heart.style.left = Math.random() * 100 + '%';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 200);
    }
}

function initMemoryGame() {
    const content = document.getElementById('mainContent');
    memoryGameCards = [
        'love.png', 'baby.png',
        'bebeb.png', 'love.png',
        'baby.png', 'bebeb.png'
    ].sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedPairs = 0;
    // Responsivitas: Sesuaikan ukuran kartu berdasarkan lebar layar
    const cardSize = window.innerWidth < 500 ? '60px' : '15px'; // Lebih kecil di mobile
    content.innerHTML = `
        <div class="card">
            <h3>Memory Game Cinta 🎮</h3>
            <p>Cocokkan pasangan gambar romantis! Klik kartu untuk flip.</p>
            <div class="grid" id="gameBoard" style="grid-template-columns: repeat(auto-fit, minmax(${cardSize}, 1fr));"></div>
            <p id="score">Pasangan Cocok: 0/3</p>
        </div>
    `;
    const board = document.getElementById('gameBoard');
    memoryGameCards.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'memory-card');
        card.dataset.index = index;
        card.innerHTML = '<div class="card-front">?</div><div class="card-back"><img src="' + img + '" alt="Game"></div>';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    function resetMemoryGame() {
    flippedCards = [];
    matchedCards = [];
    createMemoryGame();
    }
}

function flipCard(e) {
    const card = e.currentTarget;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;
    if (img1 === img2) {
        matchedPairs++;
        document.getElementById('score').textContent = `Pasangan Cocok: ${matchedPairs}/3`;
        if (matchedPairs === 3) alert('Selamat! Kamu menang! 💖');
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}

function getRandomPetName() {
    return petNames[Math.floor(Math.random() * petNames.length)];
}

function openEnvelope() {
    document.querySelector('.envelope').style.display = 'none';
    document.getElementById('letterContent').style.display = 'block';
}

function getRandomAffirmation() {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function zoomImage(img) {
    // Sederhana zoom (bisa dikembangkan dengan modal)
    img.style.transform = 'scale(1.5)';
    setTimeout(() => img.style.transform = 'scale(1)', 2000);
}

function startSlideshow() {
    const images = ['images/photo1.jpg', 'images/photo2.jpg'];
    let index = 0;
    document.getElementById('slideshow').style.display = 'block';
    const slideImg = document.getElementById('slideImg');
    slideImg.src = images[index];
    setInterval(() => {
        index = (index + 1) % images.length;
        slideImg.src = images[index];
    }, 3000);
}

function nextSlide() {
    // Fungsi untuk tombol Next di slideshow (opsional, bisa dikembangkan)
    startSlideshow(); // Restart slideshow
}
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Logika logout, misalnya redirect ke halaman login
    window.location.href = 'index.html'; // Ganti dengan URL halaman login Anda
    // Atau jika ada sesi, hapus token, dll.
});