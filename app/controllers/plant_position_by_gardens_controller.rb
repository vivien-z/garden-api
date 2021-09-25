class PlantPositionByGardensController < ApplicationController
  def create
    @plant_position_by_garden = PlantPositionByGarden.new
    @garden = Garden.find(params[:garden_id])
    @plant_position_by_garden.garden = @garden
    @plant = Plant.find(params[:plant_id])
    @plant_position_by_garden.plant = @plant

    authorize(@plant_position_by_garden)

    if @plant_position_by_garden.save
      redirect_to garden_path(@garden), notice: "Plant Info added to garden successfully."
    else
      render garden_path(@garden), notice: "Please try again."
    end
  end
end
