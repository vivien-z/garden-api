require "open-uri"

puts "destroying records..."
Zone.destroy_all
City.destroy_all
User.destroy_all
Plant.destroy_all

puts "start seeding..."

# zone info
gap = 5.6
counter = 0
14.times do
  temp_a = -53.9 + gap*counter
  temp_b = -48.3 + gap*counter
  Zone.create!(zone_code: "#{counter}A", temperature: temp_a )
  Zone.create!(zone_code: "#{counter}B", temperature: temp_b )
  counter += 1
end
puts "created zone"

# cities
zone_5A = Zone.find_by! zone_code: "5A"
zone_7A = Zone.find_by! zone_code: "7A"
zone_8B = Zone.find_by! zone_code: "8B"
montreal = City.create!(name: "montreal", zone_id: zone_5A.id)
toronto = City.create!(name: "toronto", zone_id: zone_7A.id)
vancouver = City.create!(name: "vancouver", zone_id: zone_8B.id)
puts "created cities"

# users
admin = User.new(email: "admin@garden.com" , password: "123456")
admin.city = montreal
admin.save!
yaki = User.new(email: "yaki@garden.com" , password: "123456")
yaki.city = toronto
yaki.save!
puts "created users"

# plants
img = URI.open("https://res.cloudinary.com/vivienz/image/upload/v1622577022/6mkr4m7h7lf3oyu9c5w9v66jbp85.jpg")
garlic = Plant.new(name: "garlic", light: "medium", size: 5)
garlic.user = admin
garlic.photo.attach(io: img, filename: 'garlic.jpg', content_type: 'image/jpg')
garlic.save!

puts "finish seeding..."
