class CreateGardens < ActiveRecord::Migration[6.0]
  def change
    create_table :gardens do |t|
      t.string :name
      t.float :width
      t.float :length
      t.references :user, null: false, foreign_key: true
      t.references :zone, null: false, foreign_key: true

      t.timestamps
    end
  end
end
