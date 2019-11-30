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
// Add the products to the table line by line
for (product of basket.products) {
    let row = document.createElement('tr');

    for (key in product) {
        let cell = document.createElement('td');
        cell.innerHTML = product[key];
        row.appendChild(cell)
    }

    tableBody.appendChild(row);
}

/*// Disable submit if the fields of the form are invalid
(function () {
    'use strict';
    window.addEventListener(
        'load',
        function () {
            let forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener(
                        'submit',
                        function (event) {
                            if (form.checkValidity === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add('was-validated');
                        },
                        false);
                });
        },
        false);
});*/

function sendOrder() {
    let form = document.getElementById('order');
    let name = document.getElementById('inputName').value;
    let house = document.getElementById('inputHouse').value;
    let street = document.getElementById('inputStreet').value;
    let city = document.getElementById('inputCity').value;
    let zip = document.getElementById('inputZip').value;

    let delivery = {};
    delivery.name = name;
    delivery.address = `${house}, ${street}\n${city}\n${zip}`;

    let email = document.getElementById('inputEmail').value;
    let phone =document.getElementById('inputPhone').value;

    let contact = {};
    contact.email = email;
    contact.phone = phone;

    let order = {};
    order.products = basket.products;
    order.delivery = delivery;
    order.contact = contact;

    // Save from here: https://stackoverflow.com/a/30832210
    let blob = new Blob([JSON.stringify(order)], {type: "text/plain;charset=utf-8"});
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
}
