class PlantsController < ApplicationController
  def index
    @plants = policy_scope(Plant)
  end

  def show
    @plant = Plant.find(params[:id])
    @plant_info_by_zone = PlantInfoByZone.new
    @zone_codes = policy_scope(Zone).map { |zone| zone.zone_code }
    authorize(@plant)
  end

  def new
    @plant = Plant.new
    # @plant.plant_info_by_zones << @plant_info_by_zone
    authorize(@plant)
  end

  def create
    @plant = Plant.new(plant_params)
    @plant.user = current_user
    # @plant.plant_info_by_zones << PlantInfoByZone.new(plant_params["plant"]["plant_info_by_zone"])
    authorize(@plant)

    if @plant.save
      redirect_to plant_path(@plant)
    else
      render 'new'
    end
  end

  private

  def plant_params
    params.require(:plant).permit(:id, :name, :light, :size, :plant_info_by_zone)
  end
end
