var appId = "89ffb0f4";
var appKey = "5bf4b71458e151b43f4ad1c2b5bdbb23";
const recipeContainer = document.getElementById('recipes');

var input = document.getElementById("recipeTitle");
input.addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {
    event.preventDefault();
  }
});


function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function getRecipes() {
  document.getElementById("recipes").innerHTML = "";
  searchString = document.getElementById("recipeTitle").value;
  url = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&from=0&to=20&q=${searchString}`;


  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

      let recipes = data.hits;
      return recipes.map(function(element) {
        div = createNode('div');
        div.setAttribute('class', 'col-sm-3 mb-2')

        recipeImage = element.recipe.image;
        recipeTitle = element.recipe.label;
        recipeSource = element.recipe.source;
        recipeIngredients = element.recipe.ingredientLines.toString();
        recipeURL = element.recipe.url;

        div.innerHTML = "<div class='card border-success mb-3 mx-auto my-3'><img class='card-img-top' src=" + recipeImage + "><div class='card-body'><h5 class='card-title'>" + recipeTitle + "</h5><p class='card-text'>" + recipeSource +
          "</p><a class=\"btn btn-primary card-text\" href=\"" + recipeURL + "\" target=\"_blank\" >Go to recipe</a></div>";
        append(recipeContainer, div);
      })
    })
    .catch(function(error) {
      // do nothing
    });
};
