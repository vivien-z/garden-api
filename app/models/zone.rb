class Zone < ApplicationRecord
  has_many :plants, through: :plant_info_by_zones
end
