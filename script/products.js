// API used to fetch the products
const uri = 'https://api.myjson.com/bins/eu9qu';

// helper functions
function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  parent.appendChild(element);
}

// display the products on cards in a container
function displayProducts(products = getProducts()) {

  var container = document.getElementById("products-container");

  // Delete all the childs first
  clearChildren(container);

  products.then(function(items) {

    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items[i].length; j++) {

        let li = createNode('li'),
          img = createNode('img'),
          cardBody = createNode('div'),
          name = createNode('h5'),
          stock = createNode('p'),
          price = createNode('p'),
          label = createNode('label')
        selector = createNode('select'),
          basketButton = createNode('button'),
          span = createNode('span');

        img.src = items[i][j].img;
        name.innerHTML = `${items[i][j].name}`;
        stock.innerHTML = `Stock: ${items[i][j].stock.toFixed(2)}kg`;
        price.innerHTML = `Price: £${items[i][j].price.toFixed(2)}/kg`;
        label.innerHTML = 'Select amount: '
        basketButton.innerHTML = 'Add to basket';

        li.setAttribute('class', 'card m-2');
        img.setAttribute('class', 'card-img-top');
        cardBody.setAttribute('class', 'card-body');
        name.setAttribute('class', 'card-title');
        stock.setAttribute('class', 'card-text');
        price.setAttribute('class', 'card-text');
        label.setAttribute('for', 'selector' + i + j);
        label.setAttribute('class', 'mr-2')
        selector.setAttribute('id', 'selector' + i + j);
        basketButton.setAttribute('class', 'btn btn-primary');
        basketButton.setAttribute('type', 'button');
        basketButton.setAttribute('onclick', 'addToBasket(' + i + ', ' + j + ')');

        try {
          append(li, img);
          append(li, cardBody);
          append(cardBody, name);
          append(cardBody, stock);
          append(cardBody, price);
          append(cardBody, label);
          append(cardBody, selector);
          for (var k = 100; k < 600; k += 100) {
            let value = k;
            let option = document.createElement('option');

            option.setAttribute('value', value);
            option.innerHTML = value + 'g';

            append(selector, option);
          }
          append(cardBody, basketButton);

          append(li, span);
          append(container, li);
        } catch (e) {
          // do nothing
        }
      }
    }
  });
}

function getProducts() {
  return fetch(uri)
    .then((response) => response.json())
    .then((json) => json.items);
}

function getFilteredProducts(filterValue, byCategory = true) {

  if (filterValue == 'default') {
    return;
  } else {
    let products = getProducts();

    return products.then(function(items) {

      filteredProducts = [];

      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items[i].length; j++) {

          if (byCategory) {
            if (items[i][j].category == filterValue) {
              filteredProducts.push(items[i]);

              break;
            }
          } else {
            if (items[i][j].name.includes(filterValue)) {
              filteredProducts.push(items[i]);
              break;
            }
          }
        }
      }

      return filteredProducts;
    });
  }
}

// Load the basket from the local storage
function loadBasket() {

  var basket = localStorage.getItem('basket');

  if (basket === null) {
    basket = {
      products: []
    };
  } else {
    basket = JSON.parse(basket);
  }

  return basket;
}

//  count the number of items in the basket and display the number on the basket nav item
function countBasketItems() {
  var basket = loadBasket();

  var basketCounters = document.getElementsByClassName('basket-counter');

  for (var i = 0; i < basketCounters.length; i++) {
    basketCounters[i].innerHTML = `${basket.products.length}`
  }
}

// Add a new product to the basket
function addToBasket(i, j) {

  var basket = loadBasket();

  getProducts().then(function(items) {

    let amount = document.getElementById('selector' + i + j).value;

    basket.products.push({
      "name": items[i][j].name,
      "amount": amount + 'g',
      "price": items[i][j].price * amount / 1000
    })

    basket = JSON.stringify(basket);

    localStorage.setItem('basket', basket);

    displayBasket();
  });
}

function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function displayBasket() {

  var basket = loadBasket();

  var basketList = document.getElementById('basket');
  clearChildren(basketList);

  items = basket.products;

  var head = document.getElementById('basketHead');
  var noItemsText = document.getElementById('noItemsText');
  if (items.length == 0) {
    head.setAttribute("class", "d-none");
    noItemsText.setAttribute("class", "")
  } else {
    head.setAttribute("class", "");
    noItemsText.setAttribute("class", "d-none");

    for (var i = 0; i < items.length; i++) {
      var row = document.createElement('tr');
      var itemName = document.createElement('td');
      var amount = document.createElement('td');
      var price = document.createElement('td');
      var removeItemButton = document.createElement('button');

      removeItemButton.setAttribute('class', 'badge badge-danger');
      removeItemButton.setAttribute('onclick', 'removeBasketItem(' + i + ')');

      itemName.innerHTML = `${items[i].name}`;
      amount.innerHTML = `${items[i].amount}`;
      price.innerHTML = `£${items[i].price.toFixed(2)} `;
      removeItemButton.innerHTML = 'X';

      append(price, removeItemButton);
      append(row, itemName);
      append(row, amount);
      append(row, price);
      append(basketList, row);
    }
  }
  countBasketItems();
}

function setFilterTags() {
  let products = getProducts();

  products.then(function(items) {

    let filterList = document.getElementById('filterSelector');

    for (var i = 0; i < items.length; i++) {

      let option = document.createElement('option');

      option.setAttribute('value', items[i][0].category);
      option.innerHTML = items[i][0].category;
      append(filterList, option);
    }

    filterList.addEventListener('change', function() {
      var value = filterList.value;

      var filteredProducts = getFilteredProducts(value);
      displayProducts(filteredProducts);
    });
  });
}

function removeBasketItem(i) {

  var basket = loadBasket();

  basket.products.splice(i, 1);

  basket = JSON.stringify(basket);
  localStorage.setItem('basket', basket);

  displayBasket();
}

function redrawBasket() {

  let basket = document.getElementsByClassName('basket')[0];
  basket.style.display = 'none';
  basket.style.display = 'block';
}

setFilterTags();
displayProducts();
displayBasket();

window.addEventListener('resize', redrawBasket);
