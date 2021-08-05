class Garden < ApplicationRecord
  belongs_to :user
  belongs_to :zone
  has_many :plant_positions
  has_many :plants, through: :plant_positions

  validates :name, presence: true, uniqueness: true
end
