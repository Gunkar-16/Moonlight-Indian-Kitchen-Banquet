const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

toggle.addEventListener('click', function () {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex', 'flex-col');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex', 'flex-col');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }
});

const cards = document.querySelectorAll('.menu-card');
const categories = document.getElementById('menu-categories');
const itemsSection = document.getElementById('menu-items');
const title = document.getElementById('menu-title');
const backBtn = document.getElementById('back-btn');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;

    categories.classList.add('hidden');
    itemsSection.classList.remove('hidden');

    title.innerText = category.toUpperCase();
  });
});

backBtn.addEventListener('click', () => {
  itemsSection.classList.add('hidden');
  categories.classList.remove('hidden');
});

