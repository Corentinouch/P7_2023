export function search(searchInput, recipes) {

    const filtered = recipes.filter((recipe) => {

        console.log(recipe)
        if (recipe.name.toLowerCase().includes(searchInput.toLowerCase()) || recipe.description.toLowerCase().includes(searchInput.toLowerCase())) {
            return recipe
        } else {
            for(let i=0; i<recipe.ingredients.length; i++){
                //console.log(recipe.ingredients[i])
                if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchInput.toLowerCase())){
                   // console.log(recipe)
                    return recipe
                }
            }
        }
    })
    console.log(filtered)
    return filtered
}
