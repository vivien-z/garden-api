class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
        @garden = Garden.new
    @plants = policy_scope(Plant)
    authorize(@user)
  end
end
