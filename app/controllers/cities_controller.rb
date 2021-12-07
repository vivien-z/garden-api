class CitiesController < ApplicationController
  def create
    @city = City.new(city_params)
    authorize(@city)

    if @city.save
      redirect_to "/", notice: "City added to successfully."
    else
      redirect_to "/"
      flash[:title] = '¡Error!'
      flash[:notice] = 'Please verify your data. City might already exist!'
    end
  end

  private

  def city_params
    params.require(:city).permit(:name, :zone_id)
  end
end
