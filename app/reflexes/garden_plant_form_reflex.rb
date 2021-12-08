class GardenPlantFormReflex < ApplicationReflex
  def add_plant(target, dataset)
    @garden = Garden.find(dataset[:gardenId])
    # @plant_position_by_garden.garden
    puts dataset
    puts @garden
    # p event
    # puts plant
  end
end
