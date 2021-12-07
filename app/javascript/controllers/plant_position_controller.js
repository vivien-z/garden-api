import ApplicationController from './application_controller'

export default class extends ApplicationController {
  // beforeReflex(element, reflex, noop, reflexId) {
  //   const { params } = element.reflexData[reflexId]
  //   element.reflexData[reflexId].params = {
  //     ...params,
  //     garden_id: true,
  //     plant_id: true,
  //     positionX: true,
  //     positionY: true
  //   }
  // }

  static targets = [ "plantInfo" ]

  submit(event) {
    // this.formTarget.textContent = 'Hello, Stimulus!'
    this.stimulate("GardenPlantFormReflex#add_plant", event.target)
  }
  // submit(event) {
  //   console.log(event)
  //   this.stimulate("GardenPlantForm#add_plant", event.target)
  // }

  test(event) {
    // this.stimulate("GardenPlantFormReflex#add_plant", event.target)
    this.plantInfoTarget.textContent = 'Hello, Stimulus!'
  }
}

