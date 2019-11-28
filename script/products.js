var products = {

  categories: [
    [{
        category: "Beans and pulses",
        name: "Black turtle beans",
        img: "",
        stock: "0.00kg",
        price: "£0.00/kg"
      },
      {
        category: "Beans and pulses",
        name: "Black eye beans",
        img: "",
        stock: "0.00kg",
        price: "£0.00/kg"
      },
      {
        category: "Beans and pulses",
        name: "Broth mix",
        img: "",
        stock: "0.00kg",
        price: "£0.00/kg"
      },
      {
        category: "Beans and pulses",
        name: "Butter beans",
        img: "",
        stock: "0.00kg",
        price: "£0.00/kg"
      }
    ],
    [{
      category: "cereal",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "dried fruit",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "grains",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "rice",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "pasta",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "nuts",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"

    }],
    [{
      category: "vegan pick and mix",
      name: "Vegan pick and mix",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "snacks",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "baking",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "herbs and spices",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "tea",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "gluten-free",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }],
    [{
      category: "dog biscuits",
      name: "xxx",
      img: "",
      stock: "0.00kg",
      price: "£0.00/kg"
    }]
  ]
};

console.log(products);

function append(parent, element) {
  parent.appendChild(element);
}

function displayProducts() {

  var promise = Promise.resolve(products);

  var container = document.getElementById("products-container");

  promise.then(function(json) {
      return json.categories;
    })
    .then(function(items) {

      for (var i = 0; i < items.length; i++) {
        for(var j = 0; j < items[i].length; j++){

          var item = document.createElement("li");
          var name = document.createElement("h3");
          var stock = document.createElement("p");
          var price = document.createElement("p");
          item.setAttribute("class", "list-group-item");

          name.innerHTML = items[i][j].name;
          stock.innerHTML = "Stock remaining: " + items[i][j].stock;
          price.innerHTML = "Price: " + items[i][j].price;

          append(item, name);
          append(item, stock);
          append(item, price);

          append(container, item);
        }
      }
    });
}


displayProducts();
