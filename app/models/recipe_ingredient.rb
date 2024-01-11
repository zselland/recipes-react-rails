class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  validates :ingredient_name, presence: true
  validates :quantity, presence: true
end
