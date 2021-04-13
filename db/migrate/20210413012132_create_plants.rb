class CreatePlants < ActiveRecord::Migration[6.0]
  def change
    create_table :plants do |t|
      t.string :name
      t.date :indoor_seed_date
      t.date :direct_seed_date
      t.date :transplant_date

      t.timestamps
    end
  end
end
