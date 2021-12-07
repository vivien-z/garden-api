class CollectionsController < ApplicationController
  def create
    @collection = Collection.new(collection_params)
    @plant = Plant.find(params[:plant_id])
    @collection.plant = @plant
    @collection.user = current_user

    authorize(@collection)

    if @collection.save
      redirect_to plant_path(@plant), notice: "Plant added to collection successfully."
    else
      redirect_to plant_path(@plant), notice: "Fail to add to collection."
    end
  end

  private

  def collection_params
    params.permit(:plant_id)
  end
end
