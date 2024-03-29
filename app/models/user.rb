class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :city, required: true
  has_many :collections
  has_many :plants
  has_many :plants, through: :collections
  has_many :gardens
  has_one_attached :avatar

  acts_as_token_authenticatable
end
