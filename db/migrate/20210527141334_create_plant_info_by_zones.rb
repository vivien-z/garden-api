class CreatePlantInfoByZones < ActiveRecord::Migration[6.0]
  def change
    create_table :plant_info_by_zones do |t|
      t.references :zone, null: false, foreign_key: true
      t.references :plant, null: false, foreign_key: true
      t.boolean :indoor_seeding
      t.date :seeding_date
      t.date :transplant_date

      t.timestamps
    end
  end
end
