import './style.css';
import petitplatLogo from './logo.svg';
import recipeFactory from './factory/recipe';
import { search } from './utils/search';
import { getRecipes } from './utils/getRecipes';
import { IngredientModel } from './utils/ingredientModel';
import { AppareilModel } from './utils/appareilModel';
import { UstensilModel } from './utils/ustensilModel';
import { filterSearch } from './utils/filterSearch';

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
        <div id="ingredientFilter" class="specificFilter">
          <div class="hg25 inputFilter">Ingredient</div>
          <button id="ingredientButton" class="hg25 button"><i class="fa-solid fa-chevron-down"></i></button> 
          <div class="ingredientList">
            <div id="ingredient" class="list"></div>
          </div>
        </div>
        <div id="appareilFilter" class="specificFilter">
          <div class="hg25 inputFilter">Appareil</div>
          <button id="appareilButton"class="hg25 button"><i class="fa-solid fa-chevron-down"></i></button> 
          <div class="appareilList">
            <div id="appareil" class="list"></div>
          </div>
        </div>
        <div id="ustensilFilter" class="specificFilter">
          <div class="hg25 inputFilter">Ustensil</div>
          <button id="ustensilButton"class="hg25 button"><i class="fa-solid fa-chevron-down"></i></button> 
          <div class="ustensilList">
            <div id="ustensil" class="list"></div>
          </div>
        </div>
      </div> 
      </div>
      <div id="recipes_list">
      </div>
    </div>
  </div>
`;
const data = getRecipes();

let filteredRecipes = []; // Déclaration de la variable filteredRecipes en tant que variable globale

async function displayData(recipes) {
  const recipesSection = document.getElementById('recipes_list');
  recipesSection.innerHTML = '';

  if (recipes.length === 0) {
    const message = document.createElement('p');
    message.classList.add('noRecipes_info')
    const reinitialiser = document.createElement('button')
    message.innerHTML = `<span>Aucune recette ne correspond à votre recherche.</span><br>Veuillez modifier celle-ci ou réinitialiser les filtres sur le bouton.`;
    reinitialiser.textContent = 'Réinitialiser'
    recipesSection.classList.add('noRecipes_section')
    recipesSection.appendChild(message);
    recipesSection.appendChild(reinitialiser);
    reinitialiser.addEventListener('click', () =>{
      location.reload()
    })
  } else {
    recipesSection.classList.remove('noRecipes_section')
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCard = recipeModel.displayRecipeCard();
      recipesSection.appendChild(recipeCard);
    });
  }
}

async function init() {
  const recipes = await data;
  const search_bar = document.getElementById('search_bar');
  const ingr = document.getElementById('ingredient');
  const appa = document.getElementById('appareil');
  const use = document.getElementById('ustensil');

  ingr.style.display = 'none';
  appa.style.display = 'none';
  use.style.display = 'none';

  let filteredRecipes = [...recipes];
  let tagTable = [];

  const updateRecipes = () => {
    let result = filteredRecipes;

    if (tagTable.length > 0) {
      result = filterSearch(tagTable, result);
    }

    displayData(result);
  };

  const handleTagClick = (tag) => {
    if (tagTable.includes(tag)) {
      return;
    }
  
    tagTable.push(tag);  
    const searchInput = search_bar.value.toLowerCase();
    let result = recipes;
  
    if (searchInput.length >= 3) {
      result = search(searchInput, result);
    }
  
    if (tagTable.length > 0) {
      result = filterSearch(tagTable, result);
    }
  
    filteredRecipes = result;
    updateRecipes();
    createTag(tag);
    closeTag(tagTable);
  };
  

  search_bar.addEventListener('input', (e) => {
    const searchInput = e.target.value.toLowerCase();

    if (searchInput.length < 3) {
      filteredRecipes = [...recipes];
    } else {
      filteredRecipes = search(searchInput, recipes);
    }

    if (tagTable.length > 0) {
      filteredRecipes = filterSearch(tagTable, filteredRecipes);
    }

    updateRecipes();
  });

  ingr.addEventListener('click', (e) => {
    if (e.target.classList.contains('ingr')) {
      const ingredient = e.target.innerHTML;
      if (ingredient) {
        handleTagClick(ingredient);
      }
    }
  });

  appa.addEventListener('click', (e) => {
    if (e.target.classList.contains('appa')) {
      const appareil = e.target.innerHTML;
      if (appareil) {
        handleTagClick(appareil);
      }
    }
  });

  use.addEventListener('click', (e) => {
    if (e.target.classList.contains('use')) {
      const ustensil = e.target.innerHTML;
      if (ustensil) {
        handleTagClick(ustensil);
      }
    }
  });

  displayData(recipes);
}

/* Filter specifique */

let tagTable = [];
const recipes = await data;

async function initIngredient() {
  let ingr = document.getElementById('ingredient');
  ingr.style.display = "none";

  let ingredientModel = new IngredientModel();
  let ingredients = await ingredientModel.getIngredients();

  for (let i = 0; i < ingredients.length; i++) {
    ingr.innerHTML += `<span index=${i} class="ingr">${ingredients[i]}</span>`;
  }

  let span = document.querySelectorAll('.ingr');
  span.forEach(element => {
    element.addEventListener('click', () => {
      const ingredient = element.innerHTML.trim();
      if (tagTable.includes(ingredient)) {
      } else {
        tagTable.push(ingredient);
        element.classList.add('alreadyClicked');
        const result = filterSearch(tagTable.filter(tag => tag !== undefined), recipes);
        displayData(result);
        createTag(element, "ingredient");
        closeTag(tagTable);
      }
    });
  });

  displayData(recipes);
}

async function initAppareil() {
  let appa = document.getElementById('appareil');
  appa.style.display = "none";

  let appareilModel = new AppareilModel();
  let appareils = await appareilModel.getAppareils();

  for (let i = 0; i < appareils.length; i++) {
    appa.innerHTML += `<span index=${i} class="appa">${appareils[i]}</span>`;
  }

  let span = document.querySelectorAll('.appa');
  span.forEach(element => {
    element.addEventListener('click', () => {
      const appareil = element.innerHTML.trim();
      if (tagTable.includes(appareil)) {
      } else {
        tagTable.push(appareil);
        element.classList.add('alreadyClicked');
        const result = filterSearch(tagTable.filter(tag => tag !== undefined), recipes);
        displayData(result);
        createTag(element, "appareil");
        closeTag(tagTable);
      }
    });
  });

  displayData(recipes);
}

async function initUstensil() {
  let use = document.getElementById('ustensil');
  use.style.display = "none";

  let ustensilModel = new UstensilModel();
  let ustensils = await ustensilModel.getUstensils();

  for (let i = 0; i < ustensils.length; i++) {
    use.innerHTML += `<span index=${i} class="use">${ustensils[i]}</span>`;
  }

  let span = document.querySelectorAll('.use');
  span.forEach(element => {
    element.addEventListener('click', () => {
      const ustensil = element.innerHTML.trim();
      if (tagTable.includes(ustensil)) {
      } else {
        tagTable.push(ustensil);
        element.classList.add('alreadyClicked');
        const result = filterSearch(tagTable.filter(tag => tag !== undefined), recipes);
        displayData(result);
        createTag(element, "ustensil");
        closeTag(tagTable);
      }
    });
  });

  displayData(recipes);
}

/*Toggle Button*/

function toggleButtonState(buttonId) {
  const buttons = document.querySelectorAll('.button');
  
  buttons.forEach(button => {
    if (button.id === buttonId) {
      if (button.classList.contains('ouvert')) {
        button.classList.remove('ouvert');
        button.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
        updateDivStyle(null);
      } else {
        button.classList.add('ouvert');
        button.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
        updateDivStyle(buttonId);
      }
    } else {
      button.classList.remove('ouvert');
      button.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    }
  });
  
}
function updateDivStyle(buttonId) {
  const divs = document.querySelectorAll('.list');
  
  divs.forEach(div => {
    if (buttonId && div.id === buttonId.replace('Button', '')) {
      div.classList.add('active');
    } else {
      div.classList.remove('active');
    }
  });
}

const ingredientButton = document.getElementById('ingredientButton');
const appareilButton = document.getElementById('appareilButton');
const ustensilButton = document.getElementById('ustensilButton');

ingredientButton.addEventListener('click', function() {
  toggleButtonState('ingredientButton');
});

appareilButton.addEventListener('click', function() {
  toggleButtonState('appareilButton');
});

ustensilButton.addEventListener('click', function() {
  toggleButtonState('ustensilButton');
});

/* Tag creation and delete */ 

function createTag(element, category){
  if (element.innerHTML) {
    let tagLine = document.getElementById("tag_container");
    let tagClass = "";
    if (category === "ingredient") {
      tagClass = "tag-ingredient";
    } else if (category === "appareil") {
      tagClass = "tag-appareil";
    } else if (category === "ustensil") {
      tagClass = "tag-ustensil";
    }
    tagLine.innerHTML += `<div class="${tagClass}"><p>${element.innerHTML}</p><button class="close"><i class="fa-sharp fa-solid fa-xmark"></i></button></div>`;
  }
}

function closeTag(tagTable) {
  let close_btn = document.querySelectorAll('.close');
  let spaningr = document.querySelectorAll('.ingr');
  let spanappa = document.querySelectorAll('.appa');
  let spanuse = document.querySelectorAll('.use');

  close_btn.forEach(element => {
    element.addEventListener('click', () => {
      let closestDiv = element.closest("div");
      const paragraphText = closestDiv.innerText.trim();
      const index = tagTable.indexOf(paragraphText);
      if (index !== -1) {
        tagTable.splice(index, 1);
      }
      closestDiv.remove();
      spaningr.forEach(element => {
        if (paragraphText === element.innerHTML) {
          element.classList.remove('alreadyClicked');
        }
      });
      spanappa.forEach(element => {
        if (paragraphText === element.innerHTML) {
          element.classList.remove('alreadyClicked');
        }
      });
      spanuse.forEach(element => {
        if (paragraphText === element.innerHTML) {
          element.classList.remove('alreadyClicked');
        }
      });

      const searchInput = search_bar.value.toLowerCase();
      if (tagTable.length === 0 && searchInput.length === 0) {
        filteredRecipes = [...recipes];
      } else if (searchInput.length >= 3) {
        filteredRecipes = search(searchInput, recipes);
        if (tagTable.length > 0) {
          filteredRecipes = filterSearch(tagTable, filteredRecipes);
        }
      } else {
        filteredRecipes = filterSearch(tagTable, recipes);
      }

      displayData(filteredRecipes);

      return tagTable;
    });
  });
}

initUstensil();
initAppareil();
initIngredient();
init()
