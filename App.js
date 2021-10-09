import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

 const APP_ID = 'a97138c7';
 const APP_KEY = 'b2fba678e2f74e85bd8c160351dff01f';

 const [recipes, setRecipes] = useState([]);
 const [search, setSearch] = useState("");
 const [query, setQuery] = useState('chicken');

useEffect(() => {
  getRecipes();
},[query]);

const getRecipes = async () => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=a97138c7&app_key=b2fba678e2f74e85bd8c160351dff01f`;
  const response = await fetch(url, {mode:'cors'});
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
 
 return (
   <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input 
       className="search-bar" 
       type="text" 
       value={search} 
       onChange={updateSearch}/>
       <button className="search-button" type="submit">
         Search
      </button> 
     </form>
     <div className="recipes">
     {recipes.map(recipe =>(
       <Recipe
       key={recipe.recipe.label}
        title={recipe.recipe.label} 
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       />
     ))}
   </div>
   </div>
 );
};

export default App;
