class Api::V1::PlantsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_plant, only: [:show, :update]
  def index
    @plants = policy_scope(Plant)
    authorize @plants
  end

  def show
  end
  # API does not need new and edit method.
  def update
    if @plant.update(plant_params)
      render :show
    else
      render_error
    end
  end

  def create
    @plant = Plant.new(plant_params)
    @plant.user = current_user
    authorize @plant

    if @plant.save
      render :show
    else
      render_error
    end
  end

  private

  def set_plant
    @plant = policy_scope(Plant).find(params[:id])
    authorize @plant
  end

  def plant_params
    params.require(:plant).permit(:id, :name, :indoor_seed_date, :indoor_seed_date_end,
                                  :direct_seed_date, :direct_seed_date_end,
                                  :transplant_date, :transplant_date_end)
  end

  def render_error
    render json: { errors: @plant.errors.full_message },
           status: :unprocessable_entity
  end
end
