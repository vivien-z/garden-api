class Zone < ApplicationRecord
  has_many :plants, through: :plant_info_by_zones
  has_many :plant_info_by_zones
  has_many :gardens
end
