var sample_basket =
{ "products" :
  [
    {
      "name" : "Rice",
      "amount" : "1kg",
      "price" : 5
    },
    {
      "name" : "Fat",
      "amount" : "2kg",
      "price" : 1
    },
    {
      "name" : "Soap",
      "amount" : "3 bar",
      "price" : 15
    },
  ]
};

localStorage.setItem('basket', JSON.stringify(sample_basket));

let basket = JSON.parse(localStorage.getItem('basket'));
 
let tableBody = document.getElementById('basket-table').getElementsByTagName('tbody')[0];
for (product of basket.products) {
    let row = document.createElement('tr');

    for (key in product) {
        let cell = document.createElement('td');
        cell.innerHTML = product[key];
        row.appendChild(cell)
    }

    tableBody.appendChild(row);
}
