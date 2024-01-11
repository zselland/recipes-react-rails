class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    ingredients = @recipe.recipe_ingredients
    @recipe.ingredients = ingredients.as_json
    render json: @recipe
  end

  def destroy
    @recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :image, :instruction, recipe_ingredients_attributes: [:ingredient_name, :quantity])
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end
end
