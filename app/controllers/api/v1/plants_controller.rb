class Api::V1::PlantsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [:index, :show]
  before_action :set_plant, only: [:show, :update, :destory]
  def index
    @plants = policy_scope(Plant)
    @plant_info_by_zones = policy_scope(PlantInfoByZone)
    @zones = policy_scope(Zone)
    authorize @plants
  end

  def show
    # @plant = Plant.find(params[:id])
    @plant_info_by_zones = @plant.plant_info_by_zones
    @zones = policy_scope(Zone)
  end

  def create
    @plant = Plant.new(plant_params)
    @plant.user = current_user
    authorize @plant

    if @plant.save
      render :show, status: :created # 201 created successfully
    else
      render_error
    end
  end

  def update
    if @plant.update(plant_params)
      render :show # 200 success
    else
      render_error
    end
  end

  def destory
    plant.destory
    head :no_content # convention: 204 no content meaning deleted successfully
  end

  private

  def set_plant
    @plant = policy_scope(Plant).find(params[:id])
    authorize @plant
  end

  def plant_params
    params.require(:plant).permit(:id, :name, :light, :size, :plant_info_by_zone, :photo)
  end

  def render_error
    render json: { status: 'ERROR', message: 'Issue occurred when trying to save info for the plant', data: @plant.errors.full_message },
           status: :unprocessable_entity # 422
  end
end
