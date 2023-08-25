export function search(searchInput, recipes) {

    const filtered = recipes.filter((recipe) => {

        if (recipe.name.toLowerCase().includes(searchInput.toLowerCase()) || recipe.description.toLowerCase().includes(searchInput.toLowerCase())) {
            return recipe
        } else {
            for(let i=0; i<recipe.ingredients.length; i++){
                if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchInput.toLowerCase())){
                    return recipe
                }
            }
        }
    })
    return filtered
}