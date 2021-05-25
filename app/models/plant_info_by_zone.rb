class PlantInfoByZone < ApplicationRecord
  belongs_to :zone
  belongs_to :plant
end
