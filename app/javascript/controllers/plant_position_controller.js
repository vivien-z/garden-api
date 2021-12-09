import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ "plantInfo" ]

  add(event) {
    event.preventDefault()
    // const plantInfo = {
    //       plantId: this.getInnerText("id"),
    //       name: this.getInnerText("name"),
    //       light: this.getInnerText("light"),
    //       size: this.getInnerText("size"),
    //       indoorSeeding: this.getInnerText("inSeeding") ? 'True' : 'Flase',
    //       seedDate: this.getInnerText("seedDate") || 'n/a',
    //       transDate: this.getInnerText("transDate") || 'n/a'
    // }
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

