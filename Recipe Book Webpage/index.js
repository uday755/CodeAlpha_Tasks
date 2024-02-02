const API_KEY = "0ba6c3003ad941deac4a987c2d5d3bf0";
const recipeListElement = document.getElementById("recipe-list");

function displayRecipes(recipes){
    recipeListElement.innerHTML = "";
    recipes.forEach((recipe)=>{
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
        
        recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "Recipe Image";
        
        recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;
        
        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
            <strong>Ingredients: </strong> ${recipe.extendedIngredients.
                map((ingredient) => ingredient.original).join(", ")} `;

        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);
        
        recipeListElement.appendChild(recipeItemEl);
    });
}


async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`);

    const data = await response.json(); // string to json

    return data.recipes;
}




async function init(){
    const recipes = await getRecipes();
    console.log(recipes);
    displayRecipes(recipes);
}

init();
