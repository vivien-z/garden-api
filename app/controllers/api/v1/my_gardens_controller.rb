class Api::V1::MyGardensController < Api::V1::BaseController
  def index
    @my_gardens = policy_scope(MyGarden)
  end
end
