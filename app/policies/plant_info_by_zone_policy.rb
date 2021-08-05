class PlantInfoByZonePolicy < ApplicationPolicy
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

  def create?
    # any logged in user can create a plant profile
    !user.nil?
  end

  def update?
    record.user == user
  end
end
