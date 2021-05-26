Zone.destroy_all
puts "start seeding..."

gap = 5.6
counter = 0
14.times do
  temp_a = -53.9 + gap*counter
  temp_b = -48.3 + gap*counter
  Zone.create!(zone_code: "#{counter}a", temperature: temp_a )
  Zone.create!(zone_code: "#{counter}b", temperature: temp_b )
  counter += 1
end

puts "finish seeding..."
