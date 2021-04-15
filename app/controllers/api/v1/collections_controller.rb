class Api::V1::CollectionsController < Api::V1::BaseController
  def index
    @collections = policy_scope(Collections)
  end
end
