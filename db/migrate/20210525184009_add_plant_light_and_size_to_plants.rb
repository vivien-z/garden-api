class AddPlantLightAndSizeToPlants < ActiveRecord::Migration[6.0]
  def change
    add_column :plants, :light, :string
    add_column :plants, :size, :float
  end
end
