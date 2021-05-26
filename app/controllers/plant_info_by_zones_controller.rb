class PlantInfoByZonesController < ApplicationController
  # def index
  #   @plant_info_by_zones = policy_scope(PlantInfoByZone)
  # end

  # def show
  #   @plant_info_by_zone = PlantInfoByZone.find(params[:id])
  #   authorize(@plant_info_by_zone)
  # end

  # def new
  #   @plant_info_by_zone = PlantInfoByZone.new
  #   @plant_info_by_zone.plant = Plant.new
  #   @zones = policy_scope(Zone)
  #   authorize(@plant_info_by_zone)
  # end

  def create
    @plant_info_by_zone = PlantInfoByZone.new(plant_info_by_zone_params)
    @plant_info_by_zone.user = current_user
    @plant_info_by_zone.zone = zone
    authorize(@plant_info_by_zone)

    if @plant_info_by_zone.save
      redirect_to plant_path(@plant_info_by_zone)
    else
      render 'new'
    end
  end

  private

  def plant_info_by_zone_params
    params.require(:plant_info_by_zone).permit(:zone, :indoor_seeding, :seeding_date, :transplant_date)
  end
end
