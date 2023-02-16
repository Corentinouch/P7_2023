import './style.css'
import petitplatLogo from './logo.svg'
import recipeFactory from './factory/recipe';
import { search } from './utils/search';
import tagFactory from './factory/tag';

document.querySelector('#app').innerHTML = `
  <div>
    <header>
        <img src="${petitplatLogo}">
    </header>
    <div class="corps">
      <div class="search_bar_container">
          <input id="search_bar" placeholder="Rechercher une recette">
          <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div id="tag_container">
      </div>
      <div id="search_filter">
        <div class="ingredientFilter">
          <input class="inputFilter" id="ingredientFilterInput" name="ingredientfilter" placeholder="Ingredient" />
        </div>
        <!--<div class="appareilFilter">
          <input class="inputFilter" role="combobox" list="appliance" id="appareilFilter" name="appareil" placeholder="Appareil">
          <datalist id="appliance" role="listbox">
          </datalist>
        </div>
        <div class="ustensilFilter">
          <input class="inputFilter" role="combobox" list="ustensil" id="ustensilFilter" name="ustensil" placeholder="Ustensils">
          <datalist id="ustensil" role="listbox">
          </datalist>
        </div>-->
      </div>
      <div class="ingredientList">
          <div id="ingredient" class="test">
          </div>
      </div>
      <div id="recipes_list">
      </div>
    </div>
  </div>
`

async function getRecipes() {
  return await fetch('./recipes.json')
    .then((response) => response.json())
    .then(({ recipes }) => {
      //console.log(recipes)
      return recipes;
    });
}

async function displayData(recipes) {
  const recipesSection = document.getElementById('recipes_list');
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCard = recipeModel.displayRecipeCard();
    recipesSection.appendChild(recipeCard);
  })
}

/*async function displayTag() {
  const tagSection = document.getElementById('tag_container');
  const ingredient = document.getElementById('ingredientFilter');
  const appareil = document.getElementById('appareilFilter');
  const ustensil = document.getElementById('ustensilFilter');

  ingredient.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      console.log(ingredient.value)
      const tagModel = tagFactory();
      const tagBlock = tagModel.displayTagFactory();
      tagSection.appendChild(tagBlock);
      ingredient.value = "";
    }
  })

  appareil.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      console.log(appareil.value)
      const tagModel = tagFactory();
      const tagBlock = tagModel.displayTagFactory();
      tagSection.appendChild(tagBlock);
      appareil.value = "";
    }
  });

  ustensil.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      console.log(ustensil.value)
      const tagModel = tagFactory();
      const tagBlock = tagModel.displayTagFactory();
      tagSection.appendChild(tagBlock);
      ustensil.value = "";
    }
  });
}*/

async function init() {
  const recipes = await getRecipes();
  const search_bar = document.getElementById('search_bar')
  search_bar.addEventListener('input', (e) => {
    const searchInput = e.target.value;
    if (searchInput.length < 3) {
      displayData(recipes);
    } else {
      const result = search(searchInput, recipes)
      displayData(result)
    }
  })
  displayData(recipes);
};

/* Filter specifique */
const data = await getRecipes();
function optionDisplay(table, option) {
  for (let i = 0; i < table.length; i++) {
    option.innerHTML += `<span data="${i}" value="${table[i]}">${table[i]}</span>`
  }
  console.log(option)
  /*option.forEach(element => {
    element.addEventListener('click', () => {
      console.log(option.children[i])
      //let ingrInput = document.getElementById('ingredientFilterInput')
      //ingrInput.innerHTML = option.value
    })
  });*/
}

function ingredientTable() {
  let ingrInput = document.getElementById('ingredientFilterInput')
  let ingr = document.getElementById('ingredient')
  ingr.style.display = "none";
  console.log(ingrInput, ingr)
  ingrInput.addEventListener('click', () => {
    ingr.style.display = "grid";
  })
}

async function ingredientData() {
  const option = document.getElementById('ingredient')
  let table = []
  data.forEach(recipe => {
    recipe.ingredients.forEach(element => {
      if (!table.includes(element.ingredient)) {
        table.push(element.ingredient)
      }
    })
  })
  optionDisplay(table, option);
  ingredientTable();
}


/*async function applianceData() {
  const option = document.getElementById('appliance')
  let table = []
  data.forEach(recipe => {
    if (!table.includes(recipe.appliance)) {
      table.push(recipe.appliance)
    }
  })
  optionDisplay(table, option);
}

async function ustensilsData() {
  const option = document.getElementById('ustensil')
  let table = []
  data.forEach(recipe => {
    recipe.ustensils.forEach(element => {
      if (!table.includes(element)) {
        table.push(element)
      }
    })
  })
  optionDisplay(table, option);
}*/

//displayTag();
ingredientData();
//applianceData();
//ustensilsData();
init();