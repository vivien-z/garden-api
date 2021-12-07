class City < ApplicationRecord
  belongs_to :zone

  has_many :gardens
  has_many :users

  validates :name, presence: true, uniqueness: true
end
