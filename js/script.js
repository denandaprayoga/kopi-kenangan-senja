//toggle class active hambuger menu
const navbarLinks = document.querySelector('.navbar__links');
const hamburgerMenu = document.querySelector('#hamburger-menu');
hamburgerMenu.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
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
    name: 'Otten Coffee Flores Bajawa',
    image: 'otten-flores.jpg',
    price: 20000,
  },
  {
    id: 2,
    name: 'Supresso Sumatra Mandheling',
    image: 'sumatra.jpg',
    price: 30000,
  },
  {
    id: 3,
    name: 'Woca Robusta Gayo',
    image: 'robusta-gayo.jpg',
    price: 40000,
  },
  {
    id: 4,
    name: 'Kupu-Kupu Bola Dunia Bali Kintamani',
    image: 'bali-kintamani.jpg',
    price: 50000,
  },
  {
    id: 5,
    name: 'Artcofie Java Robusta',
    image: 'java-robusta.jpg',
    price: 50000,
  },
];

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
};

//membuat elemen card
function createCardElement(item) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardImg = document.createElement('img');
  cardImg.src = `img/${item.image}`;
  cardImg.alt = 'espresso';
  cardImg.classList.add('card__img');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card__title');
  cardTitle.textContent = item.name;

  const cardReview = document.createElement('div');
  cardReview.classList.add('card__reviews');

  for (let i = 0; i < 5; i++) {
    const iconReview = document.createElement('span');
    iconReview.classList.add('mgc_star_line');
    iconReview.classList.add('icon-black');
    cardReview.append(iconReview);
  }

  const cardPrice = document.createElement('div');
  cardPrice.classList.add('card__price');

  const div = document.createElement('div');
  const price = document.createElement('p');
  price.textContent = rupiah(item.price);

  const buttonMin = document.createElement('button');
  buttonMin.classList.add('card__min-btn');
  buttonMin.classList.add('disabled');
  buttonMin.setAttribute('disabled', '');
  buttonMin.setAttribute('data-id', item.id);

  const spanMin = document.createElement('span');
  spanMin.classList.add('mgc_minimize_line');
  spanMin.classList.add('icon');
  spanMin.setAttribute('data-id', item.id);

  buttonMin.append(spanMin);

  const cardQty = document.createElement('p');
  cardQty.textContent = 0;

  const buttonAdd = document.createElement('button');
  buttonAdd.classList.add('card__add-btn');
  buttonAdd.setAttribute('data-id', item.id);

  const spanAdd = document.createElement('span');
  spanAdd.classList.add('mgc_add_line');
  spanAdd.classList.add('icon');
  spanAdd.setAttribute('data-id', item.id);

  buttonAdd.append(spanAdd);

  div.append(buttonMin);
  div.append(cardQty);
  div.append(buttonAdd);

  cardPrice.append(price);
  cardPrice.append(div);

  card.append(cardImg);
  card.append(cardTitle);
  card.append(cardReview);
  card.append(cardPrice);

  return card;
}

const fragment = document.createDocumentFragment();
products.forEach((item) => {
  const card = createCardElement(item);
  fragment.appendChild(card);
});

//menambahkan elemen card ke menu
const productsItem = document.querySelector('.products__items');
productsItem.appendChild(fragment);

//array untuk menyimpan product di cart
const cart = [];

//ketika button shopping-cart di klik
document.querySelectorAll('.card__add-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);

    //update qty
    const parentElem = btn.parentElement;
    const qty = parentElem.querySelector('p');
    const product = cart.find((product) => product.id === id);
    qty.textContent = product.quantity;

    const buttonMin = parentElem.querySelector('.card__min-btn');
    buttonMin.removeAttribute('disabled');
    buttonMin.classList.remove('disabled');
    buttonMin.style.backgroundColor = 'var(--secondary-100)';

    //update tombol checkout di landing page
    updateCheckout();
  });
});

document.querySelectorAll('.card__min-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);

    //update qty
    const existingProduct = cart.find((item) => item.id == id);
    const index = cart.findIndex((item) => item.id === id);
    const parentElem = btn.parentElement;
    const qty = parentElem.querySelector('p');
    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
      qty.textContent = existingProduct.quantity;
    } else if (existingProduct.quantity === 1) {
      cart.splice(index, 1);
      qty.textContent = 0;
      btn.setAttribute('disabled', '');
      btn.classList.add('disabled');
      btn.style.backgroundColor = 'var(--primary-100)';
    }

    //update tombol checkout di landing page
    updateCheckout();
  });
});

//menambahkan product ke cart[]
function addToCart(productID) {
  const selectedProduct = products.find((product) => product.id === productID);

  //memeriksa apakah produk sudah ada di dalam cart atau belum
  //jika belum maka tambahkan ke array cart[]
  //jika sudah tambahkan quantity nya
  const existingProduct = cart.find((product) => product.id === productID);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: productID,
      name: selectedProduct.name,
      image: selectedProduct.image,
      price: selectedProduct.price,
      quantity: 1,
    });
  }
}

//update tombol checkout di landing page
function updateCheckout() {
  const btnCheckout = document.querySelector('.card__checkout');
  const checkout = document.querySelector('.card__checkout span');
  let total = 0;
  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  checkout.textContent = rupiah(total);

  if (total > 1) {
    btnCheckout.removeAttribute('disabled');
    btnCheckout.classList.remove('disabled');
  } else {
    btnCheckout.setAttribute('disabled', '');
    btnCheckout.classList.add('disabled');
  }
}

// //menambahkan item ke cart
// function addToCart(productID) {
//   const selectedProduct = products.find((product) => product.id === productID);

//   //cek apakah item sudah ada di keranjang
//   const existingItem = cart.find((item) => item.id == productID);
//   if (existingItem) {
//     existingItem.quantity++;
//   } else {
//     cart.push({
//       id: productID,
//       name: selectedProduct.name,
//       image: selectedProduct.image,
//       price: selectedProduct.price,
//       quantity: 1,
//     });
//   }
//   updateCart();
// }

// //display item cart
// function updateCart() {
//   shopBox.innerHTML = '';
//   cart.forEach((item) => {
//     createCartElement(item);
//   });

//   //tambahkan event listener ke remove button
//   document.querySelectorAll('.remove-btn').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       removeItem(e);
//     });
//   });

//   //tambahkan event listener ke add button
//   document.querySelectorAll('.add-btn').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       addItem(e);
//     });
//   });

//   updateBadge();
// }

// //remove item
// function removeItem(e) {
//   const existingItem = cart.find(
//     (item) => item.id == parseInt(e.target.dataset.id)
//   );

//   const index = cart.findIndex(
//     (item) => item.id === parseInt(e.target.dataset.id)
//   );

//   if (existingItem.quantity > 1) {
//     existingItem.quantity--;
//   } else if (existingItem.quantity === 1) {
//     cart.splice(index, 1);
//   }

//   updateCart();
// }

// //add item
// function addItem(e) {
//   const existingItem = cart.find(
//     (item) => item.id == parseInt(e.target.dataset.id)
//   );

//   if (existingItem.quantity >= 1) {
//     existingItem.quantity++;
//   }

//   updateCart();
// }

// //update badge
// const badge = document.querySelector('.badge');
// function updateBadge() {
//   if (cart.length > 0) {
//     badge.textContent = cart.length + ' items';
//   } else {
//     badge.textContent = cart.length + ' item';
//   }
// }

// //create cart element
// function createCartElement(item) {
//   //membuat elemen
//   const div = document.createElement('div');
//   div.classList.add('cart-item');

//   const img = document.createElement('img');

//   const divItem = document.createElement('div');
//   divItem.classList.add('item-detail');

//   const h3 = document.createElement('h3');
//   const p = document.createElement('p');
//   p.classList.add('item-price');
//   const span = document.createElement('span');

//   const minBtn = document.createElement('button');
//   minBtn.classList.add('remove-btn');
//   minBtn.setAttribute('data-id', item.id);
//   const plusBtn = document.createElement('button');
//   plusBtn.classList.add('add-btn');
//   plusBtn.setAttribute('data-id', item.id);

//   const spanQTY = document.createElement('span');

//   //menambahkan konten ke elemen
//   img.src = `img/${item.image}`;
//   h3.textContent = item.name;
//   p.textContent = `${item.price} x ${item.quantity}`;
//   span.textContent = ` = ${item.price * item.quantity}`;
//   minBtn.textContent = `-`;
//   plusBtn.textContent = `+`;
//   spanQTY.textContent = item.quantity;

//   //append element
//   div.append(img);
//   div.append(divItem);
//   divItem.append(h3);
//   divItem.append(p);
//   divItem.append(minBtn);
//   divItem.append(spanQTY);
//   divItem.append(plusBtn);
//   p.append(span);

//   shopBox.append(div);
// }

// //toggle class active shopping cart
// const cartBtn = document.querySelector('#shopping-cart-btn');
// const shopBox = document.querySelector('.shopping-cart');
// cartBtn.addEventListener('click', () => {
//   shopBox.classList.toggle('active-cart');
// });

// //klik diluar elemen
// document.addEventListener('click', function (e) {
//   // if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
//   //   navbarNav.classList.remove('active');
//   // }

//   if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
//     searchForm.classList.remove('active-search');
//   }
// });
