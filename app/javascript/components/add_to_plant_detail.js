const addToPlantDetailList = (draggedElmt, isNewDrag) => {

  const dropField = document.getElementsByClassName('drop-field').item(0),
        table = document.getElementsByClassName("plant-detail__table")[0],
        tableContent = table.getElementsByTagName('tbody')[0];
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left,
      offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

  function divValueByClassName(elmt, className) {
    const div = elmt.getElementsByClassName(className)[0]
    if (div) {
      return div.innerText
    }
  }

  function isRepeatPlant = (plantIndex) => {
    const plantList = tableContent.getElementsByTagName('tr')
    console.log(plantList)

  }

  // plant info data variable
  const plantIndex = divValueByClassName(draggedElmt, "plant-detail__index"),
        name = divValueByClassName(draggedElmt, "plant-detail__name"),
        light = divValueByClassName(draggedElmt, "plant-detail__light"),
        size = divValueByClassName(draggedElmt, "plant-detail__size"),
        indoorSeeding = divValueByClassName(draggedElmt, "plant-detail__inSeeding") ? 'True' : 'Flase',
        seedDate = divValueByClassName(draggedElmt, "plant-detail__seedDate") || 'n/a',
        transDate = divValueByClassName(draggedElmt, "plant-detail__transDate") || 'n/a';


  const plantInfo = `
                    <tr class="plantIndex__${plantIndex}">
                      <td>${name}</td>
                      <td>${light}</td>
                      <td>${size}</td>
                      <td>${indoorSeeding}</td>
                      <td>${seedDate}</td>
                      <td>${transDate}</td>
                      <td class="positionX">${offX}</td>
                      <td class="positionY">${offY}</td>
                    </tr>`
  if (isNewDrag) {
    tableContent.insertAdjacentHTML('beforeend',plantInfo)
  } else {
    console.log('test')
  }
}

export { addToPlantDetailList };
