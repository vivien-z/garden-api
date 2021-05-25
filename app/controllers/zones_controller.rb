class ZonesController < ApplicationController
  def create
    @zone = Zone.new(zone_params)
    authorize(@zone)

    if @zone.save
      redirect_to zone_path(@zone)
    else
      flash[:title] = '¡Error!'
      flash[:notice] = 'Please verify your data'
    end
  end

  private

  def zone_params
    params.require(:zone).permit(:zone_code, :temperature)
  end
end
