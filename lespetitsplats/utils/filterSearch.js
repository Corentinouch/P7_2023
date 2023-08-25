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

  return filteredRecipes; // Retourne les recettes filtrées
}