function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  parent.appendChild(element);
}

function displayProducts() {

  const uri = 'https://api.myjson.com/bins/n5oam';

  var container = document.getElementById("products-container");

  fetch(uri)
  .then((response) => response.json())
  .then((json) => json.items)
    .then(function(items) {

      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items[i].length; j++) {

          let li = createNode('li'),
            img = createNode('img'),
            cardBody = createNode('div'),
            name = createNode('h5'),
            stock = createNode('p'),
            price = createNode('p'),
            basketButton = createNode('button'),
            span = createNode('span');

          img.src = items[i][j].img;
          name.innerHTML = `${items[i][j].name}`;
          stock.innerHTML = `${items[i][j].stock}`;
          price.innerHTML = `${items[i][j].price}`;
          basketButton.innerHTML = 'Add to basket';

          li.setAttribute('class', 'card m-2');
          //div1.setAttribute('style', 'width: 18rem;');
          img.setAttribute('class', 'card-img-top');
          cardBody.setAttribute('class', 'card-body');
          name.setAttribute('class', 'card-title');
          stock.setAttribute('class', 'card-text');
          price.setAttribute('class', 'card-text');
          basketButton.setAttribute('class', 'btn btn-primary');
          basketButton.setAttribute('type', 'button');
          basketButton.setAttribute('onclick', 'addToBasket(' + i + ', ' + j + ')');

          try {
            append(li, img);
            append(li, cardBody);
            append(cardBody, name);
            append(cardBody, stock);
            append(cardBody, price);
            append(cardBody, basketButton);

            append(li, span);
            append(container, li);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
}

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

function countBasketItems() {
  var basket = loadBasket();

  var basketCounter = document.getElementById('basketCounter');

  basketCounter.innerHTML = `${basket.products.length}`
}

function addToBasket(i, j) {

  var basket = loadBasket();

  console.log(basket);

  var promise = Promise.resolve(products);

  promise.then(function(json) {
      return json.items;
    })
    .then(function(items) {

      //basket = JSON.parse(basket);

      console.log(basket);
      console.log(items[i][j].name);

      basket.products.push({
        "name": items[i][j].name,
        "amount": "100g",
        "price": 2.5
      })

      basket = JSON.stringify(basket);
      console.log(basket);

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
    price.innerHTML = `${'£'+items[i].price.toFixed(2)}` + " ";
    removeItemButton.innerHTML = 'X';

    append(price, removeItemButton);
    append(row, itemName);
    append(row, amount);
    append(row, price);
    append(basketList, row);
  }
  countBasketItems();
}

function removeBasketItem(i) {

  var basket = loadBasket();

  var promise = Promise.resolve(basket);


  console.log(basket);

  basket.products.splice(i, 1);

  basket = JSON.stringify(basket);
  console.log(basket);

  localStorage.setItem('basket', basket);

  displayBasket();
}

//setFilterTags();
displayProducts();
displayBasket();

console.log(localStorage.getItem('basket'));
