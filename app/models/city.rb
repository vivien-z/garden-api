class City < ApplicationRecord
  belongs_to :zone

  has_many :gardens
  has_many :users
end
