json.array! @plants do |plant|
  json.extract! plant, :id, :name, :light, :size,
                        plant_info_by_zone: @plant_info_by_zone
end
