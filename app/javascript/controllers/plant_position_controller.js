import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ "plantCount" ]

  submit(event) {
    event.preventDefault()
    const data = {
      "garden_id": this.element.dataset.gardenId, //element: whole elmt the controller covers
      "plant_id": event.target.dataset.plantId,
      "positionX": event.offsetX,
      "positionY": event.offsetY
    }
    // this.stimulate("GardenPlantForm#add_plant", event, event.target, data);
    // update Plants Detail table
    const count = this.plantCountTarget.textContent
    this.plantCountTarget.textContent = Number(count, 10) + 1
    // get plant position
    const dropZone = document.getElementById(`drop_${this.element.dataset.gardenId}`)
    const rect = dropZone.getBoundingClientRect()
    const shiftX = event.clientX - event.target.getBoundingClientRect().left,
          shiftY = event.clientY - event.target.getBoundingClientRect().top;
    const dataset = event.target.dataset
    console.log(event.clientX - shiftX - rect.left)
    console.log(event.clientY - shiftY - rect.top)

    console.log(event.target.getAttribute("data-plant-positionx"))
    console.log(event.target.getAttribute("data-plant-positionx"))
    console.log(dataset.plantPositionx)
    console.log(dataset.plantPositiony)
    console.log(dataset.plantId)
    console.log(dataset.action)
    console.log(dataset)
    console.log(event.target.attributes.style)
    console.log(event.target)

  }

}

// beforeReflex (element, reflex, noop, reflexId) {
//   const { params } = element.reflexData[reflexId]
//   element.reflexData[reflexId].params = {
//     ...params, plant_position: true
//   }
//   console.log(element.reflexData[reflexId])
// }