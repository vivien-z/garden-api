import ApplicationController from './application_controller';
import { setPlantPosition } from "../components/set_plant_position";

export default class extends ApplicationController {

  submit(event) {
    event.preventDefault()
    // get plant position
    const elmnt = event.target,
          dropZone = document.getElementById(`drop_${this.element.dataset.gardenId}`)
    setPlantPosition(elmnt, dropZone, 6)
    // data for Reflex
    const data = {
      "garden_id": this.element.dataset.gardenId, //element: whole elmt the controller covers
      "plant_id": event.target.dataset.plantId,
      "positionX": elmnt.style.left,
      "positionY": elmnt.style.top
    }
    this.stimulate("GardenPlantForm#add_plant", event, event.target, data);
  }
}
