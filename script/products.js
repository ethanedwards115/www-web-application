const uri = 'https://api.myjson.com/bins/eu9qu'; // the uri of the json containing the products list

// creates a new element
function createNode(element) {
  return document.createElement(element);
}

// appends an element to the parent
function append(parent, element) {
  parent.appendChild(element);
}

// shows each product as a card with a button
// to add the product to your basket and a
// selector to choose the amount you wish to add.
// The parameter allows for displaying of a
// set list of product items, i.e. through a filter
function displayProducts(products = getProducts()) {

  var container = document.getElementById("products-container");

  // clears the container of previously displayed
  // products, allowing the new ones to be added
  // without adding to the end of previously displayed
  // products
  clearChildren(container);

  // loads products as said cards
  products.then(function(items) {

    // for every product given
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items[i].length; j++) {

        // creates elements for each new product card
        let li = createNode('li'),
          img = createNode('img'), // note: images were planned but were too much hassle for styling
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
        // formats the stock and price properly into 2 decimal places
        stock.innerHTML = `Stock: ${items[i][j].stock.toFixed(2)}kg`;
        price.innerHTML = `Price: £${items[i][j].price.toFixed(2)}/kg`;
        label.innerHTML = 'Select amount: '
        basketButton.innerHTML = 'Add to basket';

        // sets the necesssary attributes for each product card
        li.setAttribute('class', 'card m-2');
        img.setAttribute('class', 'card-img-top');
        cardBody.setAttribute('class', 'card-body');
        name.setAttribute('class', 'card-title');
        stock.setAttribute('class', 'card-text');
        price.setAttribute('class', 'card-text');
        label.setAttribute('for', 'selector' + i + j);
        label.setAttribute('class', 'mr-2')

        // makes each selector work based on the card it is in
        selector.setAttribute('id', 'selector' + i + j);
        basketButton.setAttribute('class', 'btn btn-primary');
        basketButton.setAttribute('type', 'button');
        basketButton.setAttribute('onclick', 'addToBasket(' + i + ', ' + j + ')');

        try {
          // appends created items together
          append(li, img);
          append(li, cardBody);
          append(cardBody, name);
          append(cardBody, stock);
          append(cardBody, price);
          append(cardBody, label);
          append(cardBody, selector);

          // adds 100g-500g options to the selector
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

// gets the JSON of the products from the JSON bin and
// returns it as a promise
function getProducts() {
  return fetch(uri)
    .then((response) => response.json())
    .then((json) => json.items);
}

// returns a filtered version of the products list
// byCategory: we initially planned on using this
// function for a search bar as well but we ran out of time
function getFilteredProducts(filterValue, byCategory = true) {

  // ignores the 'none' filter
  if (filterValue == 'default') {
    return;
  } else {
    let products = getProducts();

    // returns the filtered products list as a promise
    return products.then(function(items) {

      filteredProducts = [];

      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items[i].length; j++) {

          if (byCategory) {
            if (items[i][j].category == filterValue) {
              filteredProducts.push(items[i]);

              break;
            }
            // start of deprecated code.
          } else {
            if (items[i][j].name.includes(filterValue)) {
              filteredProducts.push(items[i]);
              break;
            }
          }
          // end of deprecated code.
        }
      }

      return filteredProducts;
    });
  }
}

// loads the basket from local storage
function loadBasket() {

  var basket = localStorage.getItem('basket');

  // makes a new basket if one isnt found in local storage
  if (basket === null) {
    basket = {
      products: []
    };
  } else {
    basket = JSON.parse(basket);
  }

  return basket;
}

// counts the items in the basket, used for the basket
// counter on the LGL pages
function countBasketItems() {
  var basket = loadBasket();

  var basketCounters = document.getElementsByClassName('basket-counter');

  for (var i = 0; i < basketCounters.length; i++) {
    basketCounters[i].innerHTML = `${basket.products.length}`
  }
}

// adds an item to the basket based on its index
// in the products JSON
function addToBasket(i, j) {

  // loads the basket
  var basket = loadBasket();

  // get the products JSON
  getProducts().then(function(items) {

    //basket = JSON.parse(basket);

    // used for adding specific quantities of a
    // product to the basket
    let amount = document.getElementById('selector' + i + j).value;

    // adds the item, with the quantity and
    // calculated price, to the basket
    basket.products.push({
      "name": items[i][j].name,
      "amount": amount + 'g',
      "price": items[i][j].price * amount / 1000
    })

    // saves the basket back to local storage
    basket = JSON.stringify(basket);

    localStorage.setItem('basket', basket);

    // redisplays the basket
    displayBasket();
  });
}

// clears the child elements of a given element
function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// displays the basket beside the products
function displayBasket() {

  var basket = loadBasket();

  // clear out the basket container so that
  // the function doesn't display duplicates
  var basketList = document.getElementById('basket');
  clearChildren(basketList);

  items = basket.products;

  // loads the basket if it has items, if it
  // doesn't then a message appears asking
  // users to add items to the basket
  var head = document.getElementById('basketHead');
  var noItemsText = document.getElementById('noItemsText');
  if (items.length == 0) {
    head.setAttribute("class", "d-none");
    noItemsText.setAttribute("class", "")
  } else {
    head.setAttribute("class", "");
    noItemsText.setAttribute("class", "d-none");

    // displays each basket item
    for (var i = 0; i < items.length; i++) {

      // creates table elements
      var row = document.createElement('tr');
      var itemName = document.createElement('td');
      var amount = document.createElement('td');
      var price = document.createElement('td');
      var removeItemButton = document.createElement('button');

      // adds the button which lets basket items be removed
      removeItemButton.setAttribute('class', 'badge badge-danger');
      removeItemButton.setAttribute('onclick', 'removeBasketItem(' + i + ')');

      itemName.innerHTML = `${items[i].name}`;
      amount.innerHTML = `${items[i].amount}`;
      price.innerHTML = `£${items[i].price.toFixed(2)} `;
      removeItemButton.innerHTML = 'X'; // shows as an X so the user knows what the button is for

      // appends each item to its necessary parent
      append(price, removeItemButton);
      append(row, itemName);
      append(row, amount);
      append(row, price);
      append(basketList, row);
    }
  }

  // recount the number of items in the basket
  countBasketItems();
}

// gets the filter tags from the products JSON and
// adds them to the filter selector
function setFilterTags() {
  let products = getProducts();

  products.then(function(items) {

    let filterList = document.getElementById('filterSelector');

    // creates each filter option
    for (var i = 0; i < items.length; i++) {

      let option = document.createElement('option');

      // adds the filter information to the option
      option.setAttribute('value', items[i][0].category);
      option.innerHTML = items[i][0].category;
      append(filterList, option);
    }

    // adds an event listener to the selector so that
    // items are redisplayed any time the value of the
    // filter selector changes
    filterList.addEventListener('change', function() {
      var value = filterList.value;

      var filteredProducts = getFilteredProducts(value);
      displayProducts(filteredProducts);
    });
  });
}

// removes an item from the basket
function removeBasketItem(i) {

  // loads the basket
  var basket = loadBasket();

  // splices the item, deleting it from the array
  basket.products.splice(i, 1);

  // saves the new basket to local storage
  basket = JSON.stringify(basket);
  localStorage.setItem('basket', basket);

  // redisplays the basket
  displayBasket();
}

// redraws the basket
function redrawBasket() {

  let basket = document.getElementsByClassName('basket')[0];
  basket.style.display = 'none';
  basket.style.display = 'block';
}

// loads initial functions
setFilterTags();
displayProducts();
displayBasket();

// redraws the basket when the window size changes
window.addEventListener('resize', redrawBasket);
