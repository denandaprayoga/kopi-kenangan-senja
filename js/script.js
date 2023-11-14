//toggle class active hambuger menu
const navbarNav = document.querySelector('.navbar__nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');
hamburgerMenu.addEventListener('click', () => {
  navbarNav.classList.toggle('active');
});

//toggle class active search box
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('.navbar__search');
const searchBox = document.querySelector('#search-box');
searchBtn.addEventListener('click', () => {
  searchForm.classList.toggle('active-search');
  searchBox.focus();
});

//toggle class active shopping cart
const cartBtn = document.querySelector('#shopping-cart-btn');
const shopBox = document.querySelector('.shopping-cart');
cartBtn.addEventListener('click', () => {
  shopBox.classList.toggle('active-cart');
});

//klik diluar elemen
document.addEventListener('click', function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
    searchForm.classList.remove('active-search');
  }

  if (!cartBtn.contains(e.target) && !shopBox.contains(e.target)) {
    shopBox.classList.remove('active-cart');
  }

  if (e.target === modalBox) {
    modalBox.style.display = 'none';
  }
});

// modal
const modalBox = document.querySelector('.modal');
const detailBtn = document.querySelectorAll('.item-detail-btn');
detailBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalBox.style.display = 'flex';
  });
});

//close modal
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
  modalBox.style.display = 'none';
});
