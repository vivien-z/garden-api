class AddColumnToPlants < ActiveRecord::Migration[6.0]
  def change
    add_column :plants, :indoor_seed_date_end, :date
    add_column :plants, :direct_seed_date_end, :date
    add_column :plants, :transplant_date_end, :date
  end
end
