const addToPlantDetailList = (draggedElmt) => {

  function divValueByClassName(elmt, className) {
    const div = elmt.getElementsByClassName(className)[0]
    if (div) {
      return div.innerText
    }
  }
  // plant info data variable
  const name = divValueByClassName(draggedElmt, "plant-detail__name"),
        light = divValueByClassName(draggedElmt, "plant-detail__light"),
        size = divValueByClassName(draggedElmt, "plant-detail__size"),
        indoorSeeding = divValueByClassName(draggedElmt, "plant-detail__inSeeding") ? 'True' : 'Flase',
        seedDate = divValueByClassName(draggedElmt, "plant-detail__seedDate") || 'n/a',
        transDate = divValueByClassName(draggedElmt, "plant-detail__transDate") || 'n/a';

  const dropField = document.getElementsByClassName('drop-field').item(0)
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left,
      offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

  const table = document.getElementsByClassName("plant-detail__table")[0]
  const tableContent = table.getElementsByTagName('tbody')[0]
  const plantName = draggedElmt.getElementsByTagName('a')[0].innerText

  const plantPosition = `<tr><td>${name}</td><td>${light}</td><td>${size}</td><td>${indoorSeeding}</td><td>${seedDate}</td><td>${transDate}</td></tr>`
  tableContent.insertAdjacentHTML('beforeend',plantPosition)
}

export { addToPlantDetailList };
