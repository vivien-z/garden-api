class Plant < ApplicationRecord
  has_many :users, through: :collections

  validates :name, presence: true, uniqueness: true
end
