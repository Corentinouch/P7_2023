import './style.css';
import petitplatLogo from './logo.svg';
import recipeFactory from './factory/recipe';
import { search } from './utils/search';
import { getRecipes } from './utils/getRecipes';
import { IngredientModel } from './utils/ingredientModel';
import { AppareilModel } from './utils/appareilModel';
import { UstensilModel } from './utils/ustensilModel';

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
          <button class="hg25 toggle_button ingredient_button">Down</button> 
          <div class="ingredientList">
            <div id="ingredient" class="list"></div>
          </div>
        </div>
        <div id="appareilFilter" class="specificFilter">
          <div class="hg25 inputFilter">Appareil</div>
          <button class="hg25 toggle_button appareil_button">Down</button> 
          <div class="appareilList">
            <div id="appareil" class="list"></div>
          </div>
        </div>
        <div id="ustensilFilter" class="specificFilter">
          <div class="hg25 inputFilter">Ustensil</div>
          <button class="hg25 toggle_button ustensil_button">Down</button> 
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
    if (searchInput.length < 3) {
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

async function initIngredient() {
  
  let ingr = document.getElementById('ingredient')
  ingr.style.display = "none";
  
  //Affichage de tous les ingredients dans une liste
  let ingredients = await ingredientModel.getIngredients();
  console.log(ingredients)

  for (let i = 0; i < ingredients.length; i++) {
  console.log(ingredients[i])
  ingr.innerHTML+=`<span index=${i} class="ingr">${ingredients[i]}</span>`
  }
  let span = document.querySelectorAll('.ingr')
  span.forEach(element => {
    element.addEventListener('click',()=>{
      console.log(element.innerHTML)
      if(tagTable.includes(element.innerHTML)){
        console.log(element.innerHTML, "is already in tag container")
      }else{
        tagTable.push(element.innerHTML)
        console.log(tagTable,"Tableau de Tag")
        createTag(element)
        closeTag(tagTable)
      }
  })
  });
  
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
      console.log(element.innerHTML)
      tagTable.push(element.innerHTML)
      console.log(tagTable)
      createTag(element)
      closeTag(tagTable)
  })
  });
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
      console.log(element.innerHTML)
      tagTable.push(element.innerHTML)
      console.log(tagTable)
      createTag(element)
      closeTag(tagTable)
  })
  });
}

function toggleState(){

let toggleButton = document.querySelectorAll('.toggle_button')
let ingr = document.getElementById('ingredient')
let appa = document.getElementById('appareil')
let use = document.getElementById('ustensil')

toggleButton.forEach(element => {
  element.addEventListener('click', () => {
      if(element.innerHTML === 'Down'){
        console.log(element.classList);
        element.innerHTML = 'Up'
        if (element.classList.contains('ingredient_button')){
          ingr.style.display = 'grid'
        }else if(element.classList.contains('appareil_button')){
          appa.style.display = 'grid'
        }else{
          use.style.display = 'grid'
        }
      }else{
        element.innerHTML = 'Down'
        if (element.classList.contains('ingredient_button')){ 
          ingr.style.display = 'none'
        }else if(element.classList.contains('appareil_button')){
          appa.style.display = 'none'
        }else{
          use.style.display = 'none'
        }
      }
    }) 
  });
}
toggleState();


/* TAG */ 

function createTag(element){
  let tagLine = document.getElementById("tag_container");
  tagLine.innerHTML += `<div><p>${element.innerHTML}</p><button class="close"><i class="fa-sharp fa-solid fa-xmark"></i></button></div>`
}


function closeTag(tagTable){
  let close_btn = document.querySelectorAll('.close');
  
  close_btn.forEach(element => {
    element.addEventListener('click', () => {
      let closestDiv = element.closest("div")
      const paragraphText = closestDiv.innerText.trim()
      const index = tagTable.indexOf(paragraphText);
      tagTable.splice(index, 1);
      closestDiv.remove()
      console.log(tagTable)
      return tagTable
  })
  });
}

initUstensil();
initAppareil();
initIngredient();
init();
