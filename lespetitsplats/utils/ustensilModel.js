import { getRecipes } from './getRecipes';

export class UstensilModel {

  async getUstensils() {

    let recipes = await getRecipes();
    let listeDesUstensilsDeToutesLesRecettes = [];

    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (
          !listeDesUstensilsDeToutesLesRecettes.includes(
            ustensil
          )
        ) {
          listeDesUstensilsDeToutesLesRecettes.push(ustensil);
        }
      });
    });

    return listeDesUstensilsDeToutesLesRecettes;
  }

}
