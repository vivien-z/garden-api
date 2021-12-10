import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ "plantInfo" ]

  add(event) {
    event.preventDefault()
    const data = {
      "garden_id": this.element.dataset.gardenId,
      "plant_id": this.getInnerText("id"),
      "positionX": event.offsetX,
      "positionY": event.offsetY
    }
    this.stimulate("GardenPlantForm#add_plant", event, event.target, data)
    console.log(data)
  }
  test(event) {
    this.plantInfoTarget.textContent = 'Hello, Stimulus!'
  }

  getInnerText(data) {
    const element = event.target.getElementsByClassName(`plant-detail__${data}`)[0]
    if (element) {
      return element.innerText
    }
  }
}

