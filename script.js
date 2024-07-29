let kataList = [];
let usedKataList = [];
const fonts = ['Roboto', 'Open Sans'];
let currentMusic = null;

export function playMusic(src) {
    const music = document.getElementById('backgroundMusic');
    if (currentMusic !== src) {
        music.src = src;
        currentMusic = src;
        music.play().then(() => {
            console.log('Musik mulai diputar otomatis.');
        }).catch(error => {
            console.log('Musik tidak bisa diputar otomatis karena kebijakan browser:', error);
        });
    }
}

export function loadKata() {
    fetch('assets/kata.json')
        .then(response => response.json())
        .then(data => {
            kataList = data.kata;
            usedKataList = []; // Reset used list when new data is loaded
            changeKata(); // Panggil untuk menampilkan kata pertama
        });
}

export function changeKata() {
    if (kataList.length === 0) return;

    if (usedKataList.length === kataList.length) {
        usedKataList = []; // Reset if all quotes have been used
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * kataList.length);
    } while (usedKataList.includes(randomIndex));

    usedKataList.push(randomIndex);

    const kataInspirasional = document.getElementById('kataInspirasional');
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const selectedKata = kataList[randomIndex];
    kataInspirasional.style.opacity = 0; // Sembunyikan teks sebelum mengganti
    setTimeout(() => {
        kataInspirasional.textContent = selectedKata.text;
        kataInspirasional.style.display = 'block'; // Tampilkan kata-kata inspiratif
        kataInspirasional.style.fontFamily = randomFont; // Terapkan font acak
        kataInspirasional.style.animation = 'none'; // Hapus animasi sebelumnya
        kataInspirasional.offsetHeight; // Trigger reflow untuk mengaplikasikan animasi baru
        kataInspirasional.style.animation = 'fadeInUp 1s forwards'; // Tambahkan animasi
        playMusic(selectedKata.music); // Putar musik sesuai dengan kata-kata
    }, 200);
}

export function showCreators(event) {
    event.preventDefault();
    const creatorsList = document.getElementById('creatorsList');
    if (creatorsList.classList.contains('show')) {
        creatorsList.classList.remove('show');
    } else {
        creatorsList.classList.add('show');
    }
}

// Fungsi untuk membuat banyak tetesan hujan
function createRainDrops() {
    const rainContainer = document.querySelector('.rain');
    const numberOfDrops = 50; // Tentukan jumlah tetesan hujan yang diinginkan

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`; // Variasi durasi jatuh
        drop.style.animationDelay = `${Math.random() * 2}s`; // Variasi delay
        rainContainer.appendChild(drop);
    }
}

// Panggil fungsi createRainDrops saat halaman dimuat
document.addEventListener('DOMContentLoaded', createRainDrops);
