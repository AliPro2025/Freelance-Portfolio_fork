// Fix Auth - check kz_user instead of kickzone_user
const savedUser = localStorage.getItem('kz_user');
if (!savedUser) {
    window.location.href = '../login/index.html';
}

let currentPitches = [];

// Fetch fields from API
async function loadFields() {
    const token = localStorage.getItem('kz_token');
    try {
        const res = await fetch(API_BASE + '/api/fields', {
            headers: token ? { 'Authorization': 'Bearer ' + token } : {}
        });
        const json = await res.json();
        if (json.success) {
            currentPitches = json.data;
            renderPitches(currentPitches);
        }
    } catch (err) {
        console.error('Failed to load fields:', err);
    }
}

function renderPitches(pitches) {
    const grid = document.querySelector('.grid.grid-cols-1');
    if (!grid) return;

    grid.innerHTML = '';

    pitches.forEach((pitch, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300';
        card.innerHTML = `
            <div class="relative aspect-video">
                <img class="w-full h-full object-cover"
                     src="${pitch.image_url || 'https://images.unsplash.com/photo-1551698618-1d0f0c2c2b1b?w=400&h=250&fit=crop'}"
                     alt="${pitch.name}">
                <div class="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-lg">
                    <span class="text-primary font-bold">EGP ${pitch.price_per_hour}</span>
                    <span class="text-xs text-white/60 ml-1">/hr</span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-white group-hover:text-primary transition-colors">${pitch.name}</h3>
                    <div class="flex items-center text-primary">
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
                        <span class="text-sm font-bold ml-1">${pitch.avg_rating || 'New'}</span>
                    </div>
                </div>
                <div class="flex items-center text-on-surface-variant text-sm mb-6">
                    <span class="material-symbols-outlined text-base mr-1">location_on</span>
                    ${pitch.area}, ${pitch.city}
                </div>
                <div class="flex items-center gap-3">
                    <button class="flex-1 bg-primary text-on-primary font-bold py-3 rounded-xl transition-all active:scale-95">
                        View Details
                    </button>
                    <button class="w-12 h-12 flex items-center justify-center glass-card rounded-xl hover:text-primary transition-colors">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadFields);