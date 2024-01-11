class RemoveIngredientsColumnFromRecipe < ActiveRecord::Migration[7.1]
  def change
    remove_column :recipes, :ingredients
  end
end
