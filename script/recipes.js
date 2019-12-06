// Identifications for the Edamam API
var appId = "89ffb0f4";
var appKey = "5bf4b71458e151b43f4ad1c2b5bdbb23";

const recipeContainer = document.getElementById('recipes');
var input = document.getElementById("recipeTitle");

input.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

// Helper methods
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

// Called on click on the submit button.
function getRecipes() {
  document.getElementById("recipes").innerHTML = "";
  // get the search querry
  searchString = document.getElementById("recipeTitle").value;
  url = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&from=0&to=20&q=${searchString}`;

  // Fetch the recipes
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

      let recipes = data.hits;
      return recipes.map(function(element) {
        // create a new nodes for the recipe and set their attributes.
        let wrapper = createNode('div');
        wrapper.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3 my-3')

        let card = createNode('div');
        card.setAttribute('class', 'card border-success h-100');

        let img = createNode(img);
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', element.recipe.image);

        let cardBody = createNode('div');
        cardBody.setAttribute('class', 'card-body');

        let title = createNode('h5');
        title.setAttribute('class', 'card-title');
        title.innerHTML = element.recipe.label;

        let text = createNode('p');
        text.setAttribute('class', 'card-text');
        text.innerHTML = element.recipe.source;

        let footer = createNode('div');
        footer.setAttribute('class', 'card-footer bg-transparent border-white');

        let button = createNode('a');
        a.setAttribute('class', 'btn btn-primary card-text');
        a.setAttribute('href', element.recipe.url);
        a.setAttribute('target', '_blank');
        a.innerHTML = "Go to recipe";

        // Add the nodes to each other and to the DOM
        footer.append(button);
        
        cardBody.append(title);
        cardBody.append(text);

        card.append(img);
        card.append(cardBody);
        card.append(footer);

        wrapper.append(card);

        recipeContainer.append(wrapper);

     //   wrapper.innerHTML = "<div class='card border-success h-100'><img class='card-img-top' src=" + recipeImage + "><div class='card-body'><h5 class='card-title'>" + recipeTitle + "</h5><p class='card-text'>" + recipeSource +
     //     "</p></div><div class='card-footer bg-transparent border-white'><a class='btn btn-primary card-text' href='" + recipeURL + "' target='_blank' >Go to recipe</a></div></div>";
     //   append(recipeContainer, div);
      })
    })
    .catch(function(error) {
      // do nothing
    });
};
