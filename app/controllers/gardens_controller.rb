class GardensController < ApplicationController
  def index
    @gardens = policy_scope(Garden)
  end

  def show
    @garden = Garden.find(params[:id])
    @zone_codes = policy_scope(Zone).map { |zone| zone.zone_code }
    # @plant_info_by_zone = PlantInfoByZone.new
    # @position = Collection.new
    authorize(@garden)
  end

  def new
    @garden = Garden.new
    # @plant.plant_info_by_zones << @plant_info_by_zone
    authorize(@garden)
  end

  def create
    @garden = Garden.new(garden_params)
    @garden.user = current_user
    @garden.zone = Zone.find(params["garden"]["zone_id"]) unless params["zone_id"] == ""
    authorize(@garden)

    if @garden.save
      redirect_to plant_path(@garden)
    else
      render 'new'
    end
  end

  private

  def garden_params
    params.require(:garden).permit(:id, :name, :size)
  end
end
