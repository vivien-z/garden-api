class CollectionsController < ApplicationController
  def create
    @collection = Collection.new ##(collection_params)
    @plant = Plant.find(params[:plant_id])
    @collection.plant = @plant
    @collection.user = current_user

    authorize(@collection)

    if @collection.save
      redirect_to user_path(current_user), notice: "Plant added to collection successfully."
    else
      render plant_path(@plant)
    end
  end

  private

  # def collection_params
  #   params.require(:collection).permit(:plant_id)
  # end
end
