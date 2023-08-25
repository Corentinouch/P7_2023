export function search(searchInput, recipes) {
    const matchingRecipes = [];

    recipes.forEach((recipe) => {
        const foundInNameOrDescription = recipe.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                                          recipe.description.toLowerCase().includes(searchInput.toLowerCase());

        const foundInIngredients = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (foundInNameOrDescription || foundInIngredients) {
            matchingRecipes.push(recipe);
        }
    });

    return matchingRecipes;
}