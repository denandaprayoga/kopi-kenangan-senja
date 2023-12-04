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

//membuat elemen card
function createCardElement(item) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardIcons = document.createElement('div');
  cardIcons.classList.add('card-icons');

  const cartButton = document.createElement('button');
  cartButton.type = 'button';
  cartButton.classList.add('shop-cart-btn');
  cartButton.setAttribute('data-id', item.id);
  cartButton.innerHTML = `
  <span class="mgc_shopping_bag_3_line icon-black" data-id=${item.id}><span>
  `;

  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.classList.add('item-detail-btn');
  detailButton.setAttribute('data-id', item.id);
  detailButton.innerHTML = `
  <span class="mgc_eye_2_line icon-black" data-id=${item.id}><span>
  `;

  cardIcons.appendChild(cartButton);
  cardIcons.appendChild(detailButton);

  const cardImg = document.createElement('img');
  cardImg.src = `img/${item.image}`;
  cardImg.alt = 'espresso';
  cardImg.classList.add('card-img');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = item.name;

  const cardReview = document.createElement('div');
  cardReview.classList.add('card-review');

  for (let i = 0; i < 5; i++) {
    cardReview.innerHTML += `
    <span class="mgc_star_line icon" data-id=${item.id}><span>
    `;
  }

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('card-price');
  cardPrice.textContent = item.price;

  card.appendChild(cardIcons);
  card.appendChild(cardImg);
  card.appendChild(cardTitle);
  card.appendChild(cardReview);
  card.appendChild(cardPrice);

  return card;
}

const fragment = document.createDocumentFragment();
products.forEach((item) => {
  const card = createCardElement(item);
  fragment.appendChild(card);
});

//menambahkan elemen card ke menu
const menu = document.querySelector('.menu .row');
menu.appendChild(fragment);

//ketika button shopping-cart di klik
document.querySelectorAll('.shop-cart-btn').forEach((btn) => {
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
  } else {
    cart.push({
      id: productID,
      name: selectedProduct.name,
      image: selectedProduct.image,
      price: selectedProduct.price,
      quantity: 1,
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
  } else if (existingItem.quantity === 1) {
    cart.splice(index, 1);
  }
  updateCart();
}

//update badge
const badge = document.querySelector('.badge');
function updateBadge() {
  if (cart.length > 0) {
    badge.style.transform = 'scale(1)';
    badge.textContent = cart.length;
  } else {
    badge.style.transform = 'scale(0)';
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

  const spanQTY = document.createElement('span');

  //menambahkan konten ke elemen
  img.src = `img/${item.image}`;
  h3.textContent = item.name;
  p.textContent = `${item.price} x ${item.quantity}`;
  span.textContent = ` = ${item.price * item.quantity}`;
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

  // if (!cartBtn.contains(e.target) && !shopBox.contains(e.target)) {
  //   shopBox.classList.remove('active-cart');
  // }

  if (e.target === modalBox) {
    modalBox.style.display = 'none';
  }
});

// modal
const modalBox = document.querySelector('.modal');
const detailBtn = document.querySelectorAll('.item-detail-btn');
detailBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    modalBox.style.display = 'flex';
    modal(parseInt(e.target.dataset.id));
  });
});

function modal(id) {
  const data = products.find((item) => item.id === id);
  modalBox.innerHTML = `
    <div class="modal-container">
      <button type="button" class="close-btn">
        <svg class="feather">
          <use href="img/feather-sprite.svg#x" />
        </svg>
      </button>
      <div class="modal-content">
        <img src="img/${data.image}" alt="${data.name}" />
        <div class="product-content">
          <h3>${data.name}</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est esse,
            soluta fugit saepe iure, nesciunt impedit possimus nemo aut quidem
            ea, illum quam. Atque, saepe?
          </p>
          <div class="card-review">
            <svg class="feather icon-star">
              <use href="img/feather-sprite.svg#star" />
            </svg>
            <svg class="feather icon-star">
              <use href="img/feather-sprite.svg#star" />
            </svg>
            <svg class="feather icon-star">
              <use href="img/feather-sprite.svg#star" />
            </svg>
            <svg class="feather icon-star">
              <use href="img/feather-sprite.svg#star" />
            </svg>
            <svg class="feather icon-star">
              <use href="img/feather-sprite.svg#star" />
            </svg>
          </div>
          <p class="card-price">${data.price}</p>
          <button type="button" class="btn-cart">
            <i data-feather="shopping-cart"></i><span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  `;

  //close modal
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modalBox.style.display = 'none';
  });
}
