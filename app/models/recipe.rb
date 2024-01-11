class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  validates :name, presence: true
  validates :recipe_ingredients, presence: true
  validates :instruction, presence: true

  accepts_nested_attributes_for :recipe_ingredients, reject_if: :reject_ingredients

  attribute :ingredients, :jsonb

  def reject_ingredients(attributes)
    attributes['ingredient_name'].blank?
  end
end
