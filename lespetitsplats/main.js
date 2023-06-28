import './style.css';
import petitplatLogo from './logo.svg';
import recipeFactory from './factory/recipe';
import { search } from './utils/search';
import { getRecipes } from './utils/getRecipes';
import { IngredientModel } from './utils/ingredientModel';
import { AppareilModel } from './utils/appareilModel';
import { UstensilModel } from './utils/ustensilModel';
import { filterByIngredient, filterByAppliance, filterByUtensils, applyFilters } from './utils/filterSearch';

document.querySelector('#app').innerHTML = `
  <div>
  <div id="container"></div>
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
const ingredientModel = new IngredientModel();
const appareilModel = new AppareilModel();
const ustensilModel = new UstensilModel();

async function displayData(recipes) {
  const recipesSection = document.getElementById('recipes_list');
  recipesSection.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCard = recipeModel.displayRecipeCard();
    recipesSection.appendChild(recipeCard);
  });
}

async function init() {
  const recipes = await data;
  const search_bar = document.getElementById('search_bar');
  search_bar.addEventListener('input', (e) => {
    const searchInput = e.target.value;
    if (searchInput.length < 3 || tagTable == null) {
      displayData(recipes);
    } else {
      const result = search(searchInput, recipes);
      displayData(result);
    }
  });
  displayData(recipes);
}

/* Filter specifique */

let tagTable = [];
const recipes = await data;

async function initIngredient() {
  
  let ingr = document.getElementById('ingredient')
  ingr.style.display = "none";
  
  //Affichage de tous les ingredients dans une liste
  let ingredients = await ingredientModel.getIngredients();

  for (let i = 0; i < ingredients.length; i++) {
  ingr.innerHTML+=`<span index=${i} class="ingr">${ingredients[i]}</span>`
  }
  let span = document.querySelectorAll('.ingr')
  span.forEach(element => {
    element.addEventListener('click',()=>{
      if(tagTable.includes(element.innerHTML)){
        console.log(element.innerHTML, "is already in tag container")
      }else{
        tagTable.push(element.innerHTML)
        element.classList.add('alreadyClicked')
        console.log(tagTable)
        
        const result = filterByIngredient(tagTable, recipes);
        displayData(result)

        createTag(element)
        closeTag(tagTable)
      }
  })
  });
  displayData(recipes)
}

async function initAppareil(){
  let appa = document.getElementById('appareil')

  appa.style.display = "none";

  let appareils = await appareilModel.getAppareils();
  for (let i = 0; i < appareils.length; i++){
    appa.innerHTML+=`<span index=${i} class="appa">${appareils[i]}</span>`
  }
  
  let span = document.querySelectorAll('.appa')
  span.forEach(element => {
    element.addEventListener('click',()=>{
      if(tagTable.includes(element.innerHTML)){
        console.log(element.innerHTML, "is already in tag container")
      }else{
        tagTable.push(element.innerHTML)
        element.classList.add('alreadyClicked')
        console.log(tagTable)
        const result = filterByAppliance(tagTable, recipes);
        displayData(result)
        createTag(element)
        closeTag(tagTable)
      }
  })
  });
  displayData(recipes)
}

async function initUstensil(){
  let use = document.getElementById('ustensil')
  use.style.display = "none";

  let ustensils = await ustensilModel.getUstensils();
  for (let i = 0; i < ustensils.length; i++){
    use.innerHTML+=`<span index=${i} class="use">${ustensils[i]}</span>`
  }
  let span = document.querySelectorAll('.use')
  span.forEach(element => {
    element.addEventListener('click',()=>{
      if(tagTable.includes(element.innerHTML)){
        console.log(element.innerHTML, "is already in tag container")
      }else{
        tagTable.push(element.innerHTML)
        element.classList.add('alreadyClicked')
        console.log(tagTable)
        const result = filterByUtensils(tagTable, recipes);
        displayData(result)
        createTag(element)
        closeTag(tagTable)
      }
  })
  });
  displayData(recipes)
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

function createTag(element){
  let tagLine = document.getElementById("tag_container");
  tagLine.innerHTML += `<div><p>${element.innerHTML}</p><button class="close"><i class="fa-sharp fa-solid fa-xmark"></i></button></div>`
}

function closeTag(tagTable){
  let close_btn = document.querySelectorAll('.close');
  let spaningr = document.querySelectorAll('.ingr')
  let spanappa = document.querySelectorAll('.appa')
  let spanuse = document.querySelectorAll('.use')


  
  close_btn.forEach(element => {
    element.addEventListener('click', () => {
      let closestDiv = element.closest("div")
      const paragraphText = closestDiv.innerText.trim()
      const index = tagTable.indexOf(paragraphText);
      tagTable.splice(index, 1);
      closestDiv.remove()
      console.log(tagTable)

      spaningr.forEach(element => {
        if(paragraphText === element.innerHTML){
           element.classList.remove('alreadyClicked')
        }
      })
      spanappa.forEach(element => {
        if(paragraphText === element.innerHTML){
           element.classList.remove('alreadyClicked')
        }
      })
      spanuse.forEach(element => {
        if(paragraphText === element.innerHTML){
           element.classList.remove('alreadyClicked')
        }
      })

      const resultfilter = filterByIngredient(tagTable, recipes);
      const resultappareil = filterByAppliance(tagTable, recipes);
      const resultuse = filterByUtensils(tagTable, recipes);
      let allfilter = resultfilter.concat(resultappareil,resultuse)
      displayData(allfilter);
      console.log(tagTable);
      if(tagTable.length === 0){
        displayData(recipes)
      }
      return tagTable
    })
  });
}

initUstensil();
initAppareil();
initIngredient();
init()
