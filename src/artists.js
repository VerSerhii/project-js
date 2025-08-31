const API_BASE = 'https://sound-wave.b.goit.study/api';
const artistsList = document.getElementById('artists-list');
const loadMoreBtn = document.getElementById('load-more');




let currentPage = 1;
const limit = 8;

async function fetchArtists(page = 1, limit = 8) {
  try {
    const response = await fetch(`${API_BASE}/artists?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch artists');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function renderArtists(artists) {
  const filtered = artists.filter(artist => artist.strArtistThumb);
  const markup = artists
    .map(
      (artist) => `
      <li class="artist-card">
        <img class="artist-photo" src="${artist.strArtistThumb}" alt="${artist.strArtist}" />
        <div class="artist-info">
          <ul class="artist-genres">
            ${artist.genres.map(g => `<li class="artist-genre">${g}</li>`).join('')}
          </ul>
          <h3 class="artist-name">${artist.strArtist}</h3>
          <p class="artist-description">
            ${artist.strBiographyEN
              ? artist.strBiographyEN.slice(0, 120) + '...'
              : 'No description available'}
          </p>
          <button class="learn-more-btn" data-id="${artist._id}">Learn More</button>
        </div>
      </li>
    `
    )
    .join('');
  artistsList.insertAdjacentHTML('beforeend', markup);

  document.querySelectorAll('.learn-more-btn').forEach((btn) =>
    btn.addEventListener('click', (e) => openModal(e.target.dataset.id))
  );
}


async function init() {
  const data = await fetchArtists(currentPage, limit);
  renderArtists(data.artists);
}

init();


loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  const data = await fetchArtists(currentPage, limit);
  renderArtists(data.artists);

  if (!data.hasMore) loadMoreBtn.style.display = 'none';
});

