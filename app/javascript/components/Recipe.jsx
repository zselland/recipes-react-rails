import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Recipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ ingredients: "" });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipe(response))
      .catch(() => navigate("/recipes"));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteRecipe = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/recipes"))
      .catch((error) => console.log(error.message));
  };

  const ingredientList = () => {
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }

    return ingredientList;
  };

  const recipeInstruction = addHtmlEntities(recipe.instruction);
  
  return (
    <div className="">
      <div className="hero container h-96 bg-no-repeat bg-left-top" style={{backgroundImage: `url(${recipe.image})`}}>
      	<div className="prose">
	        <h1 className="display-4 position-relative text-white">
	          {recipe.name}
	        </h1>
        </div>
      </div>
      <div className="container flex flex-row py-5">
        <div className="basis-1/4">
          <ul className="list-group">
            <h5 className="mb-2">Ingredients</h5>
            {ingredientList()}
          </ul>
        </div>
        <div className="basis-1/2">
          <h5 className="mb-2">Preparation Instructions</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: `${recipeInstruction}`,
            }}
          />
        </div>
        <div className="basis-1/4 text-center">
          <button
            type="button"
            className="btn btn-error"
            onClick={deleteRecipe}
          >
            Delete Recipe
          </button>
        </div>
      </div>
      <Link to="/recipes" className="btn btn-link">
        Back to recipes
      </Link>
    </div>
  );

};

export default Recipe;