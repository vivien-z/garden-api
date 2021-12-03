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
    authorize(@garden)
  end

  def create
    @garden = Garden.new(garden_params)
    @garden.user = current_user
    @garden.city = City.find(params[:garden][:city_id])
    authorize(@garden)

    if @garden.save
      redirect_to garden_path(@garden)
    else
      redirect_to partial: "users/_my_garden_plans"
    end
  end

  def destroy
    @garden = Garden.find(params[:id])
    authorize(@garden)
    @garden.plant_position_by_gardens.destroy_all
    @garden.destroy

    flash[:notice] = "Page successfully destroyed"
    redirect_to user_path(current_user)
  end

  private

  def garden_params
    params.require(:garden).permit(:id, :name, :width, :length, :city_id)
  end
end
