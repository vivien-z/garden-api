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
    this.stimulate("GardenPlantForm#add_plant", event, event.target, data);
    // update Plants Detail table
    const count = this.plantCountTarget.textContent
    this.plantCountTarget.textContent = Number(count, 10) + 1
  }
  test(event) {
    this.plantCountTarget.textContent = 'Hello, Stimulus!'
  }
}

// beforeReflex (element, reflex, noop, reflexId) {
//   const { params } = element.reflexData[reflexId]
//   element.reflexData[reflexId].params = {
//     ...params, plant_position: true
//   }
//   console.log(element.reflexData[reflexId])
// }