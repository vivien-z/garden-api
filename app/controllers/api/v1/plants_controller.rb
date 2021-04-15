class Api::V1::PlantsController < Api::V1::BaseController
  def index
    @plants = policy_scope(Plant)
    authorize @plants
  end
end
