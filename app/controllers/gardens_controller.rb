class GardensController < ApplicationController
  def index
    @gardens = policy_scope(Garden)
  end

  def show
    @garden = Garden.find(params[:id])
    @user = current_user
    @plant_position_by_garden = PlantPositionByGarden.new
    @plant_position_by_garden.garden = @garden
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
      redirect_to garden_path(@garden)
    else
      render 'new'
    end
  end

  private

  def garden_params
    params.require(:garden).permit(:id, :name, :width, :length)
  end
end
