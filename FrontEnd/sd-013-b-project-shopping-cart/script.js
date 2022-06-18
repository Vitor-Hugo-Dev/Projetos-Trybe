const getCart = document.getElementsByClassName('cart__items')[0];
const listItemsLocalStorage = [];
let totalPrice = 0;
const getButtonEmpty = document.querySelector('.empty-cart');

const cleanCart = () => { // REQUISITO 6
  for (let index = 0; index < getCart.children.length; index += 1) {
  console.log('teste');
  getCart.removeChild(getCart.firstChild);
  index -= 1;
}
localStorage.removeItem('computerList');
};

getButtonEmpty.addEventListener('click', cleanCart);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const localPrice = () => { // REQUISITO 5
  const elementPrice = document.querySelector('.total-price');
  elementPrice.innerText = `TOTAL: R$${totalPrice}`;
  elementPrice.className = 'total-price';
};

const removeItemLocalStorage = (item) => { // REQUISITO 4
  for (let index = 0; index < listItemsLocalStorage.length; index += 1) {
    if (item === listItemsLocalStorage[index]) {
      listItemsLocalStorage.splice(index, 1);
    }
  }
  localStorage.setItem('computerList', JSON.stringify(listItemsLocalStorage));
};

function cartItemClickListener(event) {
  // REQUISITO 3
  const cartItem = event.target;
  getCart.removeChild(cartItem);
  removeItemLocalStorage(cartItem.innerText);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const reloadCart = () => { // REQUISITO 4
  const returnItemsLocalStorage = JSON.parse(localStorage.getItem('computerList'));
  // esse if abaixo foi implementado com o principio de: Se uma variável for null, undefined ou 0
  // ela é equivalente a false. se não, ela é true
  if (returnItemsLocalStorage) { 
    for (let index = 0; index < returnItemsLocalStorage.length; index += 1) {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = returnItemsLocalStorage[index];
      li.addEventListener('click', cartItemClickListener);
      getCart.appendChild(li);
      // console.log('for');
    }
  }
};

const saveItemsList = (obj) => { // REQUISITO 4
  // adicionar objetos a um array
  listItemsLocalStorage.push(createCartItemElement(obj).innerText);
  localStorage.setItem('computerList', JSON.stringify(listItemsLocalStorage));
};

const getIdItem = (event) => {
  // REQUISITO 2
  const idTarget = event.target.parentNode.firstChild.innerText;
  fetch(`https://api.mercadolibre.com/items/${idTarget}`)
    .then((response) => response.json())
    .then((obj) => {
      const thePc = {
        sku: obj.id,
        name: obj.title,
        salePrice: obj.price,
      };
      totalPrice += thePc.salePrice;
      // console.log(totalPrice);
      getCart.appendChild(createCartItemElement(thePc));
      saveItemsList(thePc); // REQUISITO 4
      localPrice(); // REQUISITO 5
    })
    .catch((error) => console.log(error));
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', getIdItem);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const getItemList = (seach) => {
  // REQUISITO 2
  const getTheSection = document.getElementsByClassName('items')[0];
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${seach}`)
    .then((response) => response.json())
    .then((obj) => {
      obj.results.forEach((pc) => {
        const thePc = {
          sku: pc.id,
          name: pc.title,
          image: pc.thumbnail,
        };
        // console.log(obj);
        getTheSection.appendChild(createProductItemElement(thePc));
      });
    }).then(() => {
      document.querySelector('.loading').remove();
    });
};

window.onload = () => {
  getItemList('computador');
  reloadCart();
};
