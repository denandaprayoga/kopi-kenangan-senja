//toggle class active
const navbarNav = document.querySelector('.navbar__nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');
document.addEventListener('click', function (e) {
  if (hamburgerMenu.contains(e.target)) {
    navbarNav.classList.toggle('active');
  } else if (
    !hamburgerMenu.contains(e.target) &&
    !navbarNav.contains(e.target)
  ) {
    navbarNav.classList.remove('active');
  }
});
