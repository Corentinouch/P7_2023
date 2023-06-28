/*export function filterSearch(tagTable, recipes) {
    const filteredTagIngredient = recipes.filter((recipe) =>{
        return tagTable.every((tag) => {
          console.log(recipe.ingredients);
          console.log(recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())));
            return recipe.ingredients.some(
              (ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
            );
          });
    })
    //console.log(filteredTagIngredient, 'filtered ingredient');
    return filteredTagIngredient
}*/

export function filterByIngredient(tagTable, recipes) {
  let filteredTagIngredient = []
  recipes.forEach(recipe => {
    //console.log(recipe.ingredients);
    const ingredientsTAB = recipe.ingredients
    ingredientsTAB.forEach(ingredient => {
      //console.log(ingredient.ingredient);
      console.log(tagTable);
      if(tagTable.includes(ingredient.ingredient)){
        console.log(recipe);
        filteredTagIngredient.push(recipe)
        return
      }
    });
  });
  console.log(filteredTagIngredient);
  return filteredTagIngredient
  ;
 }

export function filterByAppliance(tagTable, recipes) {
  let filteredTagAppliance = []
  recipes.forEach(recipe => {
    if(tagTable.includes(recipe.appliance)){
      console.log(recipe);
      filteredTagAppliance.push(recipe)
      return
    }
  });
  console.log(filteredTagAppliance);
  return filteredTagAppliance
 }
  
 export function filterByUtensils(tagTable, recipes) {
  let filteredTagUstensil = []
  recipes.forEach(recipe => {
    const ustensils = recipe.ustensils;
    ustensils.forEach(ustensil => {
      //console.log(ustensil);
      if(tagTable.includes(ustensil)){
        console.log(recipe);
        filteredTagUstensil.push(recipe)
        return
      }
    });
  });
  console.log(filteredTagUstensil);
  return filteredTagUstensil
 }
  
  
  /*export function filterByUtensils(tagTable, recipes) {
    const filteredTagUstensil = recipes.filter((recipe) => {
      return tagTable.every((tag) => {
        console.log(recipe.ustensils.some((utensil) => utensil.toLowerCase().includes(tag.toLowerCase())));
        return recipe.ustensils.some(
          (utensil) => utensil.toLowerCase().includes(tag.toLowerCase())
        );
      });
    });
  
    //console.log(filteredTagUstensil);
    return filteredTagUstensil;
  }*/

  export function applyFilters(tagTable, recipes) {
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        tagTable.every((tag) => {
          return (
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
            ) || filterTagAppliance
            //recipe.appliance.toLowerCase().includes(tag.toLowerCase()) 
            ||
            recipe.ustensils.some((utensil) =>
              utensil.toLowerCase().includes(tag.toLowerCase())
            )
          );
        })
      );
    });
  
    console.log(filteredRecipes);
    return filteredRecipes;
  }
