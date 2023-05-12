import { getRecipes } from './getRecipes';

export class IngredientModel {

  async getIngredients() {

    let recipes = await getRecipes();
    let listeDesIngredientsDeToutesLesRecettes = [];

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (
          !listeDesIngredientsDeToutesLesRecettes.includes(
            ingredient.ingredient
          )
        ) {
          listeDesIngredientsDeToutesLesRecettes.push(ingredient.ingredient);
        }
      });
    });

    return listeDesIngredientsDeToutesLesRecettes;
  }

}

