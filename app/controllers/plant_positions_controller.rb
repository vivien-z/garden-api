class PlantPositionsController < ApplicationController
  def create
    @plant_position = PlantPosition.new
    @plant = Plant.find(params[:plant_id])
    @plant_position.plant = @plant
    @garden = Garden.find(params[:garden_id])
    @plant_position.garden = @garden

    authorize(@plant_position)

    if @plant_position.save
      redirect_to garden_path(@garden), notice: "Plant detail added successfully."
    else
      render garden_path(@garden), notice: "Make sure all information entered right."
    end
  end
end
