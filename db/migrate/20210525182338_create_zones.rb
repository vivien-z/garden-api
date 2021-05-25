class CreateZones < ActiveRecord::Migration[6.0]
  def change
    create_table :zones do |t|
      t.string :zone_code
      t.float :temperature

      t.timestamps
    end
  end
end
