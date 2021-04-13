json.array! @plants do |plant|
  json.extract! plant, :name, :indoor_seed_date, :direct_seed_date, :transplant_date
end
