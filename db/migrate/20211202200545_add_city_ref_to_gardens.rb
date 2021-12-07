class AddCityRefToGardens < ActiveRecord::Migration[6.0]
  def change
    add_reference :gardens, :city, foreign_key: true
  end
end
