class Plant < ApplicationRecord
  belongs_to :user
  has_many :collections
  has_many :users, through: :collections
  has_many :plant_info_by_zones
  has_many :zones, through: :plant_info_by_zones
  has_one_attached :photo

  validates :name, presence: true, uniqueness: true
end
