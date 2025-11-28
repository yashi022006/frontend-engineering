const API_BASE = 'http://universities.hipolabs.com/search';
const countryInput = document.getElementById('countryInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const errorMsg = document.getElementById('errorMsg');
const universityList = document.getElementById('universityList');

searchBtn.addEventListener('click', searchUniversities);
countryInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchUniversities();
});

async function searchUniversities() {
  const country = countryInput.value.trim();
  if (!country) {
    showError('Please enter a country name');
    return;
  }

  showLoading(true);
  hideError();
  
  try {
    const response = await fetch(`${API_BASE}?country=${encodeURIComponent(country)}`);
    const universities = await response.json();
    
    showLoading(false);
    
    if (universities.length === 0) {
      universityList.innerHTML = '<div class="no-results"><i class="fas fa-university" style="font-size: 3rem; color: #dee2e6; margin-bottom: 20px;"></i>No universities found for this country. Try "United States", "India", or "Germany".</div>';
      return;
    }
    
    displayUniversities(universities);
    
  } catch (error) {
    showLoading(false);
    showError('Failed to fetch universities. Please check your connection and try again.');
    console.error('API Error:', error);
  }
}

function displayUniversities(universities) {
  universityList.innerHTML = '';
  
  universities.slice(0, 20).forEach(uni => {  // Limit to 20 for better UX
    const card = document.createElement('div');
    card.className = 'university-card';
    card.innerHTML = `
      <div class="university-name">${uni.name || 'N/A'}</div>
      <a href="${uni.web_pages?.[0] || '#'}" target="_blank" class="university-website">
        <i class="fas fa-globe"></i> ${uni.domains?.[0] || 'Website not available'}
      </a>
      <div class="university-state">
        <i class="fas fa-map-marker-alt"></i> ${uni['state-province'] || 'State not specified'}
      </div>
    `;
    universityList.appendChild(card);
  });
  
  const count = Math.min(universities.length, 20);
  universityList.insertAdjacentHTML('beforeend', 
    `<p style="text-align: center; color: #6c757d; margin-top: 20px;">
      Showing ${count} of ${universities.length} universities
    </p>`
  );
}

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
  results.classList.toggle('hidden', show);
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}

function hideError() {
  errorMsg.classList.add('hidden');
}

function searchCountry(country) {
  countryInput.value = country;
  searchUniversities();
}

window.addEventListener('load', () => {
  setTimeout(() => searchCountry('United States'), 1000);
});
