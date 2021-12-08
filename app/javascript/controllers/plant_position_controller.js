import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ "plantInfo" ]

  add(event) {
    const dataset = this.element.dataset
    const plantInfo = {

          plantId: this.getInnerText("id"),
          name: this.getInnerText("name"),
          light: this.getInnerText("light"),
          size: this.getInnerText("size"),
          indoorSeeding: this.getInnerText("inSeeding") ? 'True' : 'Flase',
          seedDate: this.getInnerText("seedDate") || 'n/a',
          transDate: this.getInnerText("transDate") || 'n/a'
    }

    this.stimulate("GardenPlantForm#add_plant", plantInfo, dataset)
    console.log(dataset)
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

