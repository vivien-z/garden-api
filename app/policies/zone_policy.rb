class ZonePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    # any logged in user can create a plant profile
    !user.nil?
  end
end
