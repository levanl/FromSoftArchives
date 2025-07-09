const navbar = document.querySelector('.navbar');
const navbarContainer = document.querySelector('.navbar-container');
const initialNavbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > initialNavbarHeight) {
        navbar.classList.add('sticky-navbar');
        navbar.style.setProperty('--navbar-bg', 'black');
        document.body.classList.add('fixed-navbar');
    } else {
        navbar.classList.remove('sticky-navbar');
        navbar.style.setProperty('--navbar-bg', 'transparent');
        document.body.classList.remove('fixed-navbar');
    }
});

async function init() {
    try {
        const res = await fetch('data/posts.json');
        const games = await res.json();
        renderGames(games);
    } catch (err) {
        console.error('Could not load games:', err);
    }
}

function renderGames(games) {
    const root = document.getElementById('games-root');
    games.forEach(game => {
        const infoSection = document.createElement('section');
        infoSection.className = 'game-info';
        infoSection.innerHTML = `
      <h2>${game.title}</h2>
      <div class="game-details">
        <div class="detail"><strong>Release Date:</strong> <span>${game.releaseDate}</span></div>
        <div class="detail"><strong>Genres:</strong> <span>${game.genres.join(', ')}</span></div>
        <div class="detail"><strong>Developer:</strong> <span>${game.developer}</span></div>
      </div>
    `;

        const detailsSection = document.createElement('section');
        detailsSection.className = 'game-info-details';
        detailsSection.innerHTML = `
      <div class="game-info-left">
        <h3>About ${game.title}</h3>
        <p>${game.about}</p>
      </div>
      <div class="game-info-right">
        <h3>${game.trailer.title}</h3>
        <div class="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/${game.trailer.videoId}"
            title="${game.trailer.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
        root.appendChild(infoSection);
        root.appendChild(detailsSection);
    });
}

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open);
});

init();
