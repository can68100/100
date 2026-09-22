// Tamamen Aktif Film Listesi (Linkleri Kendinize Göre Düzenleyebilirsiniz)
const MOVIES_DATA = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Bilim Kurgu",
        year: "2014",
        rating: "8.7",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com", // BURAYA FİLMİN GERÇEK İZLEME LİNKİNİ KOYUN
        desc: "İnsanlığın geleceği tehlikeye girdiğinde, bir grup astronot yaşanabilir yeni bir gezegen bulmak için solucan deliğinden geçerek uzayda sınırları zorlar."
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Aksiyon",
        year: "2008",
        rating: "9.0",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com", 
        desc: "Batman, Gotham şehrini kaosa sürüklemeye çalışan gizemli ve acımasız suçlu Joker ile karşı karşıya geldiğinde en büyük adalet sınavını verir."
    },
    {
        id: 3,
        title: "Inception",
        genre: "Bilim Kurgu",
        year: "2010",
        rating: "8.8",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com",
        desc: "Çok yetenekli bir hırsız olan Dom Cobb, insanların rüya gördüğü sırada bilinçaltının derinliklerindeki sırları çalmakta uzmandır."
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        genre: "Dram",
        year: "1994",
        rating: "9.3",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com",
        desc: "Suçsuzluğunu iddia etmesine rağmen müebbet hapse çarptırılan bankacı Andy Dufresne'in Shawshank hapishanesinde kurduğu dostlukları anlatır."
    },
    {
        id: 5,
        title: "Mad Max: Fury Road",
        genre: "Aksiyon",
        year: "2015",
        rating: "8.1",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com",
        desc: "Gelecekte, çölleşmiş dünyada hayatta kalmaya çalışan Max, zalim bir liderden kaçan İmparatoriçe Furiosa ve ekibine katılmak zorunda kalır."
    },
    {
        id: 6,
        title: "The Godfather",
        genre: "Dram",
        year: "1972",
        rating: "9.2",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://google.com",
        desc: "New York'taki güçlü bir İtalyan-Amerikan mafya ailesinin reisi olan Don Vito Corleone'nin imparatorluğunu ve yönetimi devrettiği oğlu Michael'ı konu alır."
    }
    {
        id: 7, 
        title: "z�b�k",
        genre: "Aksiyon", 
        year: "2026",
        rating: "8.5",
        image: "https://unsplash.com", 
        trailer: "https://youtube.com",
        watch_url: "https://dn790001.ca.archive.org/0/items/zubuk_1980/Z%C3%BCb%C3%BCk.mp4", 
        desc: "Filmin k�sa a��klamas� veya konusu buraya yaz�lacak."
    },

];
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const listTitle = document.getElementById('list-title');
const modal = document.getElementById('movie-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');
const heroPlayBtn = document.getElementById('hero-play-btn');

// İlk Açılışta Filmleri Yükle
displayMovies(MOVIES_DATA);

// Film Kartlarını Ekrana Basma Fonksiyonu
function displayMovies(movies) {
    movieGrid.innerHTML = "";
    if(movies.length === 0) {
        movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted); margin-top:20px;">Aradığınız film arşivde bulunamadı.</p>`;
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year} | ${movie.genre}</span>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openMovieDetail(movie));
        movieGrid.appendChild(card);
    });
}

// Detay Pop-Up'ını Açma (Fragman + İzleme Butonu Aktif)
function openMovieDetail(movie) {
    modalBody.innerHTML = `
        <div class="video-container">
            <iframe id="trailer-video" src="${movie.trailer}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="modal-desc">
            <h2>${movie.title}</h2>
            <div style="margin-bottom: 15px;">
                <span class="badge">${movie.genre}</span>
                <span style="margin-left:15px; color:#ffb400; font-weight:bold;"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                <span style="margin-left:15px; color:var(--text-muted);">${movie.year}</span>
            </div>
            <p>${movie.desc}</p>
            <a href="${movie.watch_url}" target="_blank" class="btn btn-primary" style="margin-top: 20px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
                <i class="fa-solid fa-circle-play"></i> Filmi Full İzle
            </a>
        </div>
    `;
    modal.style.display = "flex";
}

// Hero Kısmındaki Buton Tetikleyicisi (İlk Filmi Açar)
heroPlayBtn.addEventListener('click', () => {
    openMovieDetail(MOVIES_DATA[0]);
});

// Kategori Filtreleme Motoru (Sorunsuz Aktif)
function filterGenre(genreName) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));
    
    if(event && event.target.classList.contains('nav-item')) {
        event.target.classList.add('active');
    }

    if(genreName === 'Tümü') {
        listTitle.innerText = "Tüm Filmler";
        displayMovies(MOVIES_DATA);
    } else {
        listTitle.innerText = `${genreName} Türündeki Filmler`;
        const filtered = MOVIES_DATA.filter(m => m.genre === genreName);
        displayMovies(filtered);
    }
}

// Gelişmiş Arama Motoru
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if(query !== "") {
        listTitle.innerText = `"${searchInput.value}" İçin Sonuçlar`;
        const filtered = MOVIES_DATA.filter(m => 
            m.title.toLowerCase().includes(query) || m.genre.toLowerCase().includes(query)
        );
        displayMovies(filtered);
    } else {
        listTitle.innerText = "Tüm Filmler";
        displayMovies(MOVIES_DATA);
    }
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') handleSearch(); });

// Modalı Kapatma ve Videoyu Durdurma Kontrolü
function stopAndCloseModal() {
    const iframe = document.getElementById('trailer-video');
    if (iframe) {
        iframe.setAttribute('src', ''); // Arka planda video sesinin devam etmesini engeller
    }
    modal.style.display = "none";
}

closeModal.addEventListener('click', stopAndCloseModal);
window.addEventListener('click', (e) => { if(e.target === modal) stopAndCloseModal(); });
