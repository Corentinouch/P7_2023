export async function getRecipes() {
    return await fetch('./recipes.json')
      .then((response) => response.json())
      .then(({ recipes }) => {
        return recipes;
      });
  }