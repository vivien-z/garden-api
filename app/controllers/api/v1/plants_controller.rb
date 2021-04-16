class Api::V1::PlantsController < Api::V1::BaseController
  def index
    @plants = policy_scope(Plant)
    authorize @plants
  end

  def show
    @plant = Plant.find(params[:id])
    authorize @plant
  end

  def update
  end

  private


end
