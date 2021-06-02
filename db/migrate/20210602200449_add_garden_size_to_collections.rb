class AddGardenSizeToCollections < ActiveRecord::Migration[6.0]
  def change
    add_column :collections, :garden_size, :float
  end
end
