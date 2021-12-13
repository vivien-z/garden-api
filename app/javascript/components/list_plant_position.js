const listPlantPosition = () => {
  const field = document.getElementsByClassName("garden-field")[0]
  // pass object data from Rails to Javascript
  const garden = $('.garden_information').data('garden')
  const positions = $('.garden_information').data('positions')

  positions.forEach( position => {
    const elmt = document.getElementById(`position_${position.id}`)
    elmt.style.left = position.positionX + "px"
    elmt.style.top  = position.positionY + "px"
  })
}

export { listPlantPosition };
