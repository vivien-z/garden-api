class Api::V1::PlantsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [:index, :show]
  before_action :set_plant, only: [:show, :update]
  def index
    @plants = policy_scope(Plant)
    authorize @plants

    render_success('Loaded all plants', @plants)
  end

  def show
    @plant = Plant.find(params[:id])

    render_success('Loaded requested plant', @plant)
  end

  def create
    @plant = Plant.new(plant_params)
    @plant.user = current_user
    authorize @plant

    if @plant.save
      render_success('Plant info saved', @plant)
    else
      render_error
    end
  end

  def update
    if @plant.update(plant_params)
      render_success('Plant info updated', @plant)
    else
      render_error
    end
  end

  def destory
    @plant = Plant.find(params[:id])
    plant.destory

    render_success('Plant info deleted', @plant)
  end

  private

  def set_plant
    @plant = policy_scope(Plant).find(params[:id])
    authorize @plant
  end

  def plant_params
    params.require(:plant).permit(:id, :name, :user_id,
                                  :indoor_seed_date, :indoor_seed_date_end,
                                  :direct_seed_date, :direct_seed_date_end,
                                  :transplant_date, :transplant_date_end)
  end

  def render_error
    render json: { status: 'ERROR', message: 'Issue occurred when trying to save info for the plant', data: @plant.errors.full_message },
           status: :unprocessable_entity
  end

  def render_success(msg, data)
    render json: {
      status: 'SUCCESS',
      messages: msg,
      data: data
    }, status: :ok
  end
end
