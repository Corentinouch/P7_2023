export function filterSearch(tagTable, recipes) {
    const filteredTag = recipes.filter((recipe) =>{
        for(let i=0; i< recipe.ingredients.length; i++){
            if(recipe.ingredients[i].ingredient.includes(tagTable)){
                console.log(tagTable)
                return recipe
            }
        } 
    })
    console.log(filteredTag);
    return filteredTag
}

/*const testrecipes =[ "A", "B", "C"]
const tagTable = ["B", "C"]
let filteredRecipe = tagTable.some(i => testrecipes.includes(i))
if(filteredRecipe === true){
    tagTable.forEach(element => {
        console.log(element);
    });
    
}
console.log(filteredRecipe);*/