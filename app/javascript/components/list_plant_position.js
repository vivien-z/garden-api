const listPlantPosition = () => {
  // pass object data from Rails to Javascript
  const garden = $('.garden_information').data('garden')
  const positions = $('.garden_information').data('positions')
  // const position = $('.position_information').data('position')
  console.log(garden)
  console.log(test)
  // console.log(position)

  const field = document.getElementsByClassName("garden-field")[0]
  const plant = field.getElementsByClassName("plantCopy")[0]

  console.log(plant)
  // // plants.forEach ((plant) => {
  if (plant) {
    plant.style.left = position.positionX + "px" // getting position without using event
    plant.style.top  = position.positionY + "px"
    console.log(field.offsetLeft)
    console.log(field.offsetTop)
    console.log(plant.style.left)
    console.log(plant.style.top)
  }
  // })

}

export { listPlantPosition };
