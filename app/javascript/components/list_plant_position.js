const listPlantPosition = () => {
  const field = document.getElementsByClassName("garden-field")[0]
  // pass object data from Rails to Javascript
  const garden = $('.garden_info').data('garden')
  const positions = $('.garden_info').data('positions')

  if (positions !== undefined) {
    positions.forEach( position => {
      const elmt = document.getElementById(`position_${position.id}`)
      elmt.style.left = position.positionX + "px"
      elmt.style.top  = position.positionY + "px"
    })
  }
}

export { listPlantPosition };
