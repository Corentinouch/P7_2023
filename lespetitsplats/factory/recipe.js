function recipeFactory(data) {
    const { id, name, ingredients, time, description, appliance, ustensils } = data


    function displayRecipeCard() {
        const div = document.createElement('div')
        const recipesCompo = document.createElement('div')
        const nameRecipes = document.createElement('p')
        const ingredientsRecipes = document.createElement('ul')
        const timeRecipes = document.createElement('p')
        const descriptionRecipes = document.createElement('p')

        ingredients.forEach(element => {
            ingredientsRecipes.innerHTML += `<li>${element.ingredient} ${element.quantity ? " : " + element.quantity : ""} ${element.unit ? element.unit : ""}</li>`;
        });
        
        recipesCompo.classList.add('all_recipes')
        nameRecipes.innerHTML = `${name}`;
        nameRecipes.classList.add('name-line-clamp')
        timeRecipes.innerHTML = `${time} min`;
        descriptionRecipes.innerHTML = `${description}`;
        descriptionRecipes.classList.add('description-line-clamp')

        recipesCompo.appendChild(nameRecipes);
        recipesCompo.appendChild(timeRecipes);
        recipesCompo.appendChild(ingredientsRecipes);
        recipesCompo.appendChild(descriptionRecipes);
        div.classList.add('recipes_card')
        div.appendChild(recipesCompo);

        return div;

    }


    return { id, name, ingredients, time, description, appliance, ustensils, displayRecipeCard };
}

export default recipeFactory