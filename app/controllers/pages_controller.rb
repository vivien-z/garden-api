class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @plants = policy_scope(Plant)
  end

  def api_instruction
  end
end
