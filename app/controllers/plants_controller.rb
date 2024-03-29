class PlantsController < ApplicationController
  def index
    @plants = policy_scope(Plant)
    @plant = Plant.new
    authorize(@plant)
  end

  def show
    @plant = Plant.find(params[:id])
    @plant_info_by_zone = PlantInfoByZone.new
    @zone_codes = policy_scope(Zone).map { |zone| zone.zone_code }
    @collection = Collection.new
    authorize(@plant)
  end

  def new
    @plant = Plant.new
    authorize(@plant)
  end

  def create
    @plant = Plant.new(plant_params)
    @plant.user = current_user
    authorize(@plant)

    if @plant.save
      redirect_to plant_path(@plant)
    else
      render 'new'
    end
  end

  private

  def plant_params
    params.require(:plant).permit(:id, :name, :light, :size, :plant_info_by_zone, :photo)
  end
end
