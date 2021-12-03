class Garden < ApplicationRecord
  belongs_to :user
  belongs_to :city

  has_many :plant_position_by_gardens
  has_many :plants, through: :plant_position_by_gardens

  validates :name, presence: true, uniqueness: true
end
