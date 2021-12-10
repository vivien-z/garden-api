class GardenPlantFormReflex < ApplicationReflex
  def add_plant(event, target, data)
    @plant_position_by_garden = PlantPositionByGarden.new(data)
    @garden = Garden.find(data[:garden_id])
    @plant_position_by_garden.garden = @garden
    @plant = Plant.find(data[:plant_id])
    @plant_position_by_garden.plant = @plant
    @plant_position_by_garden.save!

    morph "#plant-sum", render(partial: "plant_summary", locals: { garden: @garden })
  end
end
