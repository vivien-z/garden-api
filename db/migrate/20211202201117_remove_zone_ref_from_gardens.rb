class RemoveZoneRefFromGardens < ActiveRecord::Migration[6.0]
  def change
    remove_reference :gardens, :zone, foreign_key: true
  end
end
