 /*export function filterByIngredient(tagTable, recipes) {
  let filteredTagIngredient = recipes.filter(recipe => {
    const ingredientsTAB = recipe.ingredients.map(ingredient => ingredient.ingredient);
    return tagTable.every(tag => ingredientsTAB.includes(tag));
  });

  console.log(filteredTagIngredient);
  return filteredTagIngredient;
}

 export function filterByAppliance(tagTable, recipes) {
  let filteredTagAppliance = recipes.filter(recipe => {
    return tagTable.every(tag => recipe.appliance.includes(tag));
  });

  console.log(filteredTagAppliance);
  return filteredTagAppliance;
}
 
 export function filterByUtensils(tagTable, recipes) {
  let filteredTagUstensil = recipes.filter(recipe => {
    return tagTable.every(tag => recipe.ustensils.includes(tag));
  });

  console.log(filteredTagUstensil);
  return filteredTagUstensil;
}*/

export function filterSearch(tags, recipes) {
  let filteredRecipes = [...recipes]; // Copie les recettes dans un tableau filtré initial

  tags.forEach(tag => { // Parcourt chaque tag dans le tableau des tags
    filteredRecipes = filteredRecipes.filter(recipe => { // Filtre les recettes en fonction du tag actuel
      const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()); // Récupère un tableau des noms d'ingrédients en minuscules
      return (
        ingredients.includes(tag.toLowerCase()) || // Vérifie si le tag est inclus dans les ingrédients
        recipe.appliance.toLowerCase().includes(tag.toLowerCase()) || // Vérifie si le tag est inclus dans l'appareil de la recette
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) // Vérifie si le tag est inclus dans les ustensiles de la recette
      );
    });
  });

  console.log(filteredRecipes); // Affiche les recettes filtrées dans la console
  return filteredRecipes; // Retourne les recettes filtrées
}