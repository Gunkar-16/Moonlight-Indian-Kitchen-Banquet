document.addEventListener('DOMContentLoaded', function () {

  // ===== HAMBURGER MENU =====
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isHidden = menu.classList.contains('hidden');

      if (isHidden) {
        menu.classList.remove('hidden');
        menu.classList.add('flex', 'flex-col');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex', 'flex-col');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when a nav link is clicked on mobile
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          menu.classList.add('hidden');
          menu.classList.remove('flex', 'flex-col');
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ===== MENU CARDS =====
  const cards = document.querySelectorAll('.menu-card');
  const categories = document.getElementById('menu-categories');
  const itemsSection = document.getElementById('menu-items');
  const title = document.getElementById('menu-title');
  const backBtn = document.getElementById('back-btn');

  const categoryNames = {
    nonveg: 'Non-Vegetarian',
    veg: 'Vegetarian',
    starters: 'Non-Vegetarian Starters',
    rice: 'Rice & Biryani',
    thali: 'Thali',
    tandoori: 'Tandoori',
    soups: 'Soups',
    breads: 'Roti & Naan',
    yogurt: 'Yogurt & Pickles',
    salads: 'Salad & Sides',
    desserts: 'Silky Desserts',
    beverages: 'Beverages',
  };

  // function openCategory(category) {
  //   categories.classList.add('hidden');
  //   itemsSection.classList.remove('hidden');
  //   title.innerText = categoryNames[category] || category.toUpperCase();
  //   // Scroll to menu section smoothly
  //   itemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }

  // cards.forEach(card => {
  //   card.addEventListener('click', () => openCategory(card.dataset.category));
  //   // Keyboard accessibility
  //   card.addEventListener('keydown', (e) => {
  //     if (e.key === 'Enter' || e.key === ' ') {
  //       e.preventDefault();
  //       openCategory(card.dataset.category);
  //     }
  //   });
  // });

  // if (backBtn) {
  //   backBtn.addEventListener('click', () => {
  //     itemsSection.classList.add('hidden');
  //     categories.classList.remove('hidden');
  //     categories.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   });
  // }

  // ===== SEARCH =====
  const searchKeywords = {
    nonveg:    ['non veg', 'nonveg', 'non-veg', 'chicken', 'lamb', 'meat', 'mutton', 'fish', 'prawn', 'seafood', 'beef'],
    veg:       ['veg', 'vegetarian', 'paneer', 'dal', 'lentil', 'sabzi', 'curry', 'tofu'],
    starters:  ['starter', 'starters', 'appetizer', 'appetiser', 'snack', 'tikka', 'kebab', 'wings', 'crispy'],
    rice:      ['rice', 'biryani', 'fried rice', 'pulao', 'pilaf', 'basmati'],
    thali:     ['thali', 'platter', 'combo', 'meal', 'set'],
    tandoori:  ['tandoori', 'tandoor', 'grill', 'grilled', 'smoky', 'smoked'],
    soups:     ['soup', 'broth', 'shorba', 'warm'],
    breads:    ['bread', 'roti', 'naan', 'paratha', 'kulcha', 'puri', 'flatbread'],
    yogurt:    ['yogurt', 'yoghurt', 'raita', 'pickle', 'pickles', 'achaar', 'lassi', 'dahi'],
    salads:    ['salad', 'sides', 'side', 'fresh', 'kachumber'],
    desserts:  ['dessert', 'desserts', 'sweet', 'sweets', 'gulab', 'kheer', 'halwa', 'kulfi', 'mithai'],
    beverages: ['drink', 'drinks', 'beverage', 'juice', 'chai', 'tea', 'mango', 'lassi', 'soda'],
  };

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    const menuSection = document.getElementById('menu');

    // Make sure we're showing categories not items
    itemsSection.classList.add('hidden');
    categories.classList.remove('hidden');

// Reset all cards first
cards.forEach(card => {
  card.style.opacity = '';
  card.style.transform = '';
  card.style.transition = '';
});

if (!q) {
  menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return;
}

let firstMatch = null;

cards.forEach(card => {
  const key = card.dataset.category;
  const name = (categoryNames[key] || '').toLowerCase();
  const keywords = searchKeywords[key] || [];
const matches = (() => {
  if (q === 'veg' || q === 'vegetarian') {
    return key === 'veg';
  }
  if (q === 'nonveg' || q === 'non veg' || q === 'non-veg') {
    return key === 'nonveg' || key === 'starters';
  }
  return name.includes(q) || keywords.some(kw => kw.includes(q));
})();  card.style.transition = 'opacity 0.3s ease';
  card.style.opacity = matches ? '1' : '0.15';

  if (matches && !firstMatch) firstMatch = card;
});

// Scroll to first match, or fall back to menu section
const target = firstMatch ?? menuSection;
target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Attach to both search inputs by querying all text inputs
  const searchInputs = document.querySelectorAll('input[type="text"]');

  searchInputs.forEach(input => {
    // Enter key triggers search
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runSearch(input.value);
        // sync other input
        searchInputs.forEach(other => { if (other !== input) other.value = input.value; });
      }
    });

    // Clear search when input is emptied
    input.addEventListener('input', (e) => {
      if (e.target.value === '') {
        cards.forEach(card => {
          card.style.opacity = '';
          card.style.transition = 'opacity 0.3s ease';
        });
        searchInputs.forEach(other => { if (other !== input) other.value = ''; });
      }
    });
  });

  // Wire up search buttons
  document.querySelectorAll('.search-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // find the nearest input to this button
      const input = btn.closest('div').querySelector('input[type="text"]');
      if (input) {
        runSearch(input.value);
        searchInputs.forEach(other => { if (other !== input) other.value = input.value; });
      }
    });
  });

});