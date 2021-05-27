json.plant do
  json.extract! @plant, :id, :name, :light, :size

  json.plant_info_by_zones(@plant_info_by_zones) do |info|
    json.zone @zones.find(info.zone_id).zone_code
    json.extract! info, :zone_id, :indoor_seeding, :seeding_date, :transplant_date
  end
end
