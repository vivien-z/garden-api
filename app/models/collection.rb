class Collection < ApplicationRecord
  belongs_to :user
  belongs_to :plant

  validates :plant, uniqueness: true
end
