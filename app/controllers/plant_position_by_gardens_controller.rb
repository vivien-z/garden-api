class PlantPositionByGardensController < ApplicationController
  def create
    @plant_position_by_garden ||= PlantPositionByGarden.new(plant_position_by_garden_params)
    @garden ||= Garden.find(params[:garden_id])
    @plant ||= Plant.find(params[:plant_position_by_garden][:plant_id])
    @plant_position_by_garden.garden = @garden
    @plant_position_by_garden.plant = @plant

    authorize(@plant_position_by_garden)

    if @plant_position_by_garden.save
      redirect_to garden_path(@garden), notice: "Plant Info added to garden successfully."
    else
      redirect_to garden_path(@garden), notice: "Please try again."
    end
  end

  private

  def plant_position_by_garden_params
    params.require(:plant_position_by_garden).permit(:garden_id, :plant_id, :positionX, :positionY)
  end
end
