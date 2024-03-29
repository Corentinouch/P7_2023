import { getRecipes } from './getRecipes';

export class AppareilModel {

  async getAppareils() {

    let recipes = await getRecipes();
    let listeDesAppareilsDeToutesLesRecettes = [];

    recipes.forEach((recipe) => {
      recipe.appliances
        if (
          !listeDesAppareilsDeToutesLesRecettes.includes(
            recipe.appliance
          )
        ) {
          listeDesAppareilsDeToutesLesRecettes.push(recipe.appliance);
        }
    });

    return listeDesAppareilsDeToutesLesRecettes;
  }

}

