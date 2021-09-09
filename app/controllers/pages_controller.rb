class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @garden = Garden.new
    @plants = policy_scope(Plant)
  end

  def api_instruction
  end
end
