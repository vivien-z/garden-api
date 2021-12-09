class GardenPlantFormReflex < ApplicationReflex
  before_reflex do
    # @plant_position_by_garden.assign_attributes(plant_position_by_garden_params)
  end

  def add_plant(event, target, data)
    @plant_position_by_garden = PlantPositionByGarden.new
    @plant_position_by_garden.assign_attributes(data)
    @garden = Garden.find(data[:garden_id])
    @plant_position_by_garden.garden = @garden
    @plant = Plant.find(data[:plant_id])
    @plant_position_by_garden.plant = @plant


    # @plant_position_by_garden.save

    # if @plant_position_by_garden.save
    #   redirect_to garden_path(@garden), notice: "#{@plant_position_by_garden.plant.name} saved"
    #   # @alert = "saved id:#{ @plant_position_by_garden&.id }"
    # else
    #   @alert = 'NOT saved'
    # end
    # puts @garden = Garden.find(data[:garden_id]).plants
  end

  private

  def plant_position_by_garden_params
    params.require(:plant_position_by_garden).permit(:garden_id, :plant_id, :positionX, :positionY)
  end
end
