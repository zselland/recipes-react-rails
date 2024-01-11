import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [recipe_ingredients_attributes, setIngredients] = useState([
    { ingredient_name: '', quantity: '' }
  ])

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }; 

  const handleFormChange = (index, event) => {
    let data = [...recipe_ingredients_attributes];
    data[index][event.target.name] = event.target.value;
    setIngredients(data);
	}

	const addIngredients = () => {
    let newIngredient = { ingredient_name: '', quantity: '' }
    setIngredients([...recipe_ingredients_attributes, newIngredient])
	}

	const removeFields = (index) => {
		let data = [...recipe_ingredients_attributes];
		data.splice(index, 1)
    setIngredients(data)
	}

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";

    if (name.length == 0 || recipe_ingredients_attributes.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      recipe_ingredients_attributes,
      instruction: stripHtmlEntities(instruction),
    };
    console.log(body);
    console.log(JSON.stringify(body))

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container px-500 justify-center mt-5">
        <div className="">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={onSubmit}>
	          <div className="flex flex-col mb-4">
	            <label htmlFor="recipeName">Recipe name</label>
	            <input
	              type="text"
	              name="name"
	              id="recipeName"
	              className="form-input px-4 py-3 rounded-md"
	              required
	              onChange={(event) => onChange(event, setName)}
	            />
	          </div>
            <label htmlFor="recipeIngredients">Ingredients</label>
	          {recipe_ingredients_attributes.map((input, index) => {
		          return (
		            <div className="flex flex-row mb-4" key={index}>
		              <input
		              	type="text"
		                name='ingredient_name'
		                id={`ingredient_name_${index}`} 
			              className="form-input basis-8/12 px-4 py-3 rounded-md"
		                placeholder='Ingredient Name'
		                value={input.ingredient_name}
		                onChange={event => handleFormChange(index, event)}
		              />
		              <input
		              	type="text"
		                name='quantity'
		                id={`quantity_${index}`}
		                className="form-input basis-3/12 px-4 py-3 rounded-md"
		                placeholder='Ingredient Quantity'
		                value={input.quantity}
		                onChange={event => handleFormChange(index, event)}
		              />
		              <button onClick={() => removeFields(index)} className="btn btn-error basis-1/12">Remove</button>
		            </div>
		          )
		        })}
		        <button className="btn btn-primary" onClick={addIngredients}>Add More..</button>
	          <div className="flex flex-col mb-4">
	            <label htmlFor="instruction">Preparation Instructions</label>
	            <textarea
	              className="form-textarea px-4 py-3 rounded-md"
	              id="instruction"
	              name="instruction"
	              rows="5"
	              required
	              onChange={(event) => onChange(event, setInstruction)}
	            />
	          </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
    </div>
  );
};

export default NewRecipe;