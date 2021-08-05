class CreatePlantPositions < ActiveRecord::Migration[6.0]
  def change
    create_table :plant_positions do |t|
      t.float :positionX
      t.float :positionY
      t.references :plant, null: false, foreign_key: true
      t.references :garden, null: false, foreign_key: true

      t.timestamps
    end
  end
end
