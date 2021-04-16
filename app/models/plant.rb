class Plant < ApplicationRecord
  belongs_to :user
  has_many :collections
  has_many :users, through: :collections

  validates :name, presence: true, uniqueness: true
end
