json.array! @plants do |plant|
  json.extract! plant, :name, :indoor_seed_date, :indoor_seed_date_end,
                       :direct_seed_date, :direct_seed_date_end,
                       :transplant_date, :transplant_date_end
end
