class GardenPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    record.user == user
  end

  def show?
    index?
  end

  def create?
    # any logged in user can create a plant profile
    !user.nil?
  end

  def update?
    record.user == user
  end

  def destroy?
    update?
  end
end
