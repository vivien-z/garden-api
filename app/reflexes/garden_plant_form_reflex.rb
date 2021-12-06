class GardenPlantFormReflex < ApplicationReflex
  before_reflex do
    @plant_position_by_garden = GlobalID::Locator.locate_signed(element.dataset.signed_id)
    @plant_position_by_garden.assign_attributes(plant_position_by_garden_params)
  end

  def submit
    @plant_position_by_garden.save
  end

  private

  def plant_position_by_garden_params
    params.require(:plant_position_by_garden).permit(:garden_id, :plant_id, :positionX, :positionY)
  end
end
