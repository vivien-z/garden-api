class CitiesController < ApplicationController
  def create
    @city = City.new(city_params)
    authorize(@city)

    if @city.save
      redirect_to "/", notice: "City added to successfully."
    else
      flash[:title] = '¡Error!'
      flash[:notice] = 'Please verify your data'
    end
  end

  private

  def city_params
    params.require(:city).permit(:name, :zone_id)
  end
end
