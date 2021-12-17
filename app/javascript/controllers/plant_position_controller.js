import ApplicationController from './application_controller';
import { setPlantPosition } from "../components/set_plant_position";

export default class extends ApplicationController {
  // static targets = [ "plantCount" ]

  submit(event) {
    event.preventDefault()
    // get plant position
    const elmnt = event.target,
          dropZone = document.getElementById(`drop_${this.element.dataset.gardenId}`),
          rectField = dropZone.getBoundingClientRect(),
          rectElmnt = elmnt.getBoundingClientRect()
    setPlantPosition(elmnt, rectField, rectElmnt, 6)
    console.log(elmnt)
    console.log(elmnt.style.left)
    console.log(elmnt.style.top)
    const data = {
      "garden_id": this.element.dataset.gardenId, //element: whole elmt the controller covers
      "plant_id": event.target.dataset.plantId,
      "positionX": elmnt.style.left,
      "positionY": elmnt.style.top
    }
    this.stimulate("GardenPlantForm#add_plant", event, event.target, data);
  }
}
