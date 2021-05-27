class Zone < ApplicationRecord
  has_many :plants, through: :plant_info_by_zones
  has_many :plant_info_by_zones

  # def to_label
  #   zone_code
  # end
end
