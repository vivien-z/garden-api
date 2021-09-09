class UsersController < ApplicationController
  def show
    # if params[:id] == "sign_out"
    #   sign_out current_user
    #   return
    # end
    @user = User.find(params[:id])
    @garden = Garden.new
    @plants = policy_scope(Plant)
    authorize(@user)
  end

  # def destroy
  #   redirect_to destroy_user_session_path
  # end
end
