class PlantPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    true
  end

  def show?
    true
  end

  def update?
    # currently open to all users, to be adjusted later
    show?
  end

  def create?
    # any logged in user can create a plant profile
    !user.nil?
  end
end
