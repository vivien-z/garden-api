class Garden < ApplicationRecord
  belongs_to :user
  belongs_to :city

  has_one :zone, through: :city
  has_many :plant_position_by_gardens
  has_many :plants, through: :plant_position_by_gardens
  accepts_nested_attributes_for :plant_position_by_gardens

  validates :name, presence: true, uniqueness: true
end
