class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @plants = policy_scope(Plant)
    authorize(@user)
  end
end
