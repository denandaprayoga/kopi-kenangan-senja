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

//data products
const products = [
  {
    id: 1,
    name: 'Espresso',
    image: 'espresso.png',
    price: 20000,
  },
  {
    id: 2,
    name: 'Cappucino',
    image: 'cappucino.png',
    price: 30000,
  },
  {
    id: 3,
    name: 'Latte',
    image: 'latte.png',
    price: 40000,
  },
  {
    id: 4,
    name: 'Black Coffee',
    image: 'black-coffee.png',
    price: 50000,
  },
  {
    id: 5,
    name: 'Artcofie Java Robusta',
    image: 'java-robusta.jpg',
    price: 50000,
  },
];

//membuat elemen card
function createCardElement(item) {
  const card = document.createElement('div');
  card.classList.add('card');

  const productContent = document.createElement('div');
  productContent.classList.add('product__content');

  const cardImg = document.createElement('img');
  cardImg.src = `img/${item.image}`;
  cardImg.alt = item.name;

  const productReview = document.createElement('div');
  productReview.classList.add('product__review');
  for (let i = 0; i < 5; i++) {
    productReview.innerHTML += `
    <span class="mgc_star_line icon-primary" data-id=${item.id}><span>
    `;
  }

  const cardTitle = document.createElement('h4');
  cardTitle.textContent = item.name;

  productContent.append(cardImg);
  productContent.append(productReview);
  productContent.append(cardTitle);

  const productPrice = document.createElement('div');
  productPrice.classList.add('product__price');

  const btnPrice = document.createElement('button');
  btnPrice.classList.add('btn__add-item');
  btnPrice.setAttribute('data-id', item.id);
  btnPrice.textContent = 'Add to cart';

  const price = document.createElement('p');
  price.textContent = rupiah(item.price);

  productPrice.append(btnPrice);
  productPrice.append(price);

  card.appendChild(productContent);
  card.appendChild(productPrice);

  return card;
}

const fragment = document.createDocumentFragment();
products.forEach((item) => {
  const card = createCardElement(item);
  fragment.appendChild(card);
});

//menambahkan elemen card ke product item
const productItems = document.querySelector('.product__items');
productItems.appendChild(fragment);

//ketika button shopping-cart di klik
document.querySelectorAll('.btn__add-item').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    addToCart(parseInt(id));
  });
});

//array untuk menyimpan item cart
const cart = [];

//menambahkan item ke cart
function addToCart(productID) {
  const selectedProduct = products.find((product) => product.id === productID);

  //cek apakah item sudah ada di keranjang
  const existingItem = cart.find((item) => item.id == productID);
  if (existingItem) {
    existingItem.quantity++;
    existingItem.subTotal = existingItem.price * existingItem.quantity;
  } else {
    cart.push({
      id: productID,
      name: selectedProduct.name,
      image: selectedProduct.image,
      price: selectedProduct.price,
      quantity: 1,
      subTotal: selectedProduct.price,
    });
  }

  updateCart();
}

//display item cart
function updateCart() {
  shopBox.innerHTML = '';
  cart.forEach((item) => {
    createCartElement(item);
  });

  //membuat total harga
  const p = document.createElement('p');
  p.classList.add('total');
  let total = 0;
  cart.forEach((item) => {
    total += item.subTotal;
  });
  p.textContent = `Total = ${rupiah(total)}`;
  shopBox.append(p);

  //tambahkan event listener ke add button
  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      addItem(e);
    });
  });

  //tambahkan event listener ke remove button
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removeItem(e);
    });
  });

  updateBadge();
}

//remove item
function removeItem(e) {
  const existingItem = cart.find(
    (item) => item.id == parseInt(e.target.dataset.id)
  );

  const index = cart.findIndex(
    (item) => item.id === parseInt(e.target.dataset.id)
  );

  if (existingItem.quantity > 1) {
    existingItem.quantity--;
    existingItem.subTotal = existingItem.price * existingItem.quantity;
  } else if (existingItem.quantity === 1) {
    cart.splice(index, 1);
  }
  updateCart();

  if (cart.length === 0) {
    cartIsEmpty();
  }
}

//add item
function addItem(e) {
  const existingItem = cart.find(
    (item) => item.id == parseInt(e.target.dataset.id)
  );

  if (existingItem.quantity > 0) {
    existingItem.quantity++;
    existingItem.subTotal = existingItem.price * existingItem.quantity;
  }
  updateCart();
}

//update badge
const badge = document.querySelector('.badge');
function updateBadge() {
  if (cart.length > 0) {
    badge.textContent = `${cart.length} items`;
  } else {
    badge.textContent = `${cart.length} item`;
  }
}

//create cart element
function createCartElement(item) {
  //membuat elemen
  const div = document.createElement('div');
  div.classList.add('cart-item');

  const img = document.createElement('img');

  const divItem = document.createElement('div');
  divItem.classList.add('item-detail');

  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  p.classList.add('item-price');
  const span = document.createElement('span');

  const minBtn = document.createElement('button');
  minBtn.classList.add('remove-btn');
  minBtn.setAttribute('data-id', item.id);
  const plusBtn = document.createElement('button');
  plusBtn.classList.add('add-btn');
  plusBtn.setAttribute('data-id', item.id);

  const spanQTY = document.createElement('span');

  //menambahkan konten ke elemen
  img.src = `img/${item.image}`;
  h3.textContent = item.name;
  p.textContent = `${rupiah(item.price)} X ${item.quantity}`;
  span.textContent = ` = ${rupiah(item.subTotal)}`;
  minBtn.textContent = `-`;
  plusBtn.textContent = `+`;
  spanQTY.textContent = item.quantity;

  //append element
  div.append(img);
  div.append(divItem);
  divItem.append(h3);
  divItem.append(p);
  divItem.append(minBtn);
  divItem.append(spanQTY);
  divItem.append(plusBtn);
  p.append(span);

  shopBox.append(div);
}

//jika cart masih kosong
function cartIsEmpty() {
  shopBox.textContent = '';
  const p = document.createElement('p');
  p.classList.add('cart__empty');
  p.textContent = 'Cart is Empty';
  shopBox.append(p);
}

//format Rupiah
function rupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

//total harga

//toggle class active shopping cart
const cartBtn = document.querySelector('#shopping-cart-btn');
const shopBox = document.querySelector('.shopping-cart');
cartBtn.addEventListener('click', () => {
  shopBox.classList.toggle('active-cart');
  if (cart.length === 0) {
    cartIsEmpty();
  }
});

//klik diluar elemen
document.addEventListener('click', function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
    searchForm.classList.remove('active-search');
  }
});
