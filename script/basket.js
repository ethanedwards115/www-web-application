let basket = localStorage.getItem('basket');

if (basket === null) {
  basket = {
    "products": []
  };
} else {
  basket = JSON.parse(basket);
}

console.log(basket);

let tableBody = document.getElementById('basket-table').getElementsByTagName('tbody')[0];
// Add the products to the table line by line
for (product of basket.products) {
  let row = document.createElement('tr');

  for (key in product) {
    let cell = document.createElement('td');
    if (key == "price") {
      cell.innerHTML = `£${product[key].toFixed(2)}`;
    } else {
      cell.innerHTML = product[key];
    }
    row.appendChild(cell)

  }

  tableBody.appendChild(row);
}

function sendOrder() {
  let name = document.getElementById('inputName').value;
  let house = document.getElementById('inputHouse').value;
  let street = document.getElementById('inputStreet').value;
  let city = document.getElementById('inputCity').value;
  let zip = document.getElementById('inputZip').value;

  let delivery = {};
  delivery.name = name;
  delivery.address = `${house}, ${street}\n${city}\n${zip}`;

  let email = document.getElementById('inputEmail').value;
  let phone = document.getElementById('inputPhone').value;

  let contact = {};
  contact.email = email;
  contact.phone = phone;

  let order = {};
  order.products = basket.products;
  order.delivery = delivery;
  order.contact = contact;

  // Save from here: https://stackoverflow.com/a/30832210
  let blob = new Blob([JSON.stringify(order)], {
    type: "text/plain;charset=utf-8"
  });
  let filename = `order ${name}.txt`;
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(blob, filename);
  else { // Others
    let a = document.createElement("a"),
      url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  let form = document.getElementById('order');
  form.reset();
}
