class PlantInfoByZonesController < ApplicationController
  # def index
  #   @plant_info_by_zones = policy_scope(PlantInfoByZone)
  # end

  # def show
  #   @plant_info_by_zone = PlantInfoByZone.find(params[:id])
  #   authorize(@plant_info_by_zone)
  # end

  def new
    # @plant = Plant.new
    @plant_info_by_zone = PlantInfoByZone.new
    # @plant_info_by_zone.plant = @plant
    @zones = policy_scope(Zone)
    authorize(@plant_info_by_zone)
  end

  def create
    @plant_info_by_zone = PlantInfoByZone.new(plant_info_by_zone_params)
    @plant_info_by_zone.plant = Plant.find(params["plant_id"]) unless params["plant_id"] == ""
    # @plant_info_by_zone.user = current_user
    @plant_info_by_zone.zone = Zone.find(params["plant_info_by_zone"]["zone_id"]) unless params["zone_id"] == ""
    authorize(@plant_info_by_zone)

    if @plant_info_by_zone.save
      redirect_to plant_path(@plant_info_by_zone.plant)
    else
      render new_plant_path
    end
  end

  private

  def plant_info_by_zone_params
    params.require(:plant_info_by_zone).permit(:plant, :zone, :indoor_seeding, :seeding_date, :transplant_date)
  end
end
