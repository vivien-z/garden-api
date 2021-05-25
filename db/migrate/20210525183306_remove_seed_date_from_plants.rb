class RemoveSeedDateFromPlants < ActiveRecord::Migration[6.0]
  def change
    remove_column :plants, :indoor_seed_date, :date
    remove_column :plants, :direct_seed_date, :date
    remove_column :plants, :transplant_date, :date
  end
end
