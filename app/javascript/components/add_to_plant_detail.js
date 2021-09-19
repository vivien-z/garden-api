const addToPlantDetailList = (draggedElmt, newDrag) => {

  function divValueByClassName(elmt, className) {
    const div = elmt.getElementsByClassName(className)[0]
    if (div) {
      return div.innerText
    }
  }
  // plant info data variable
  const plantId = divValueByClassName(draggedElmt, "plant-detail__id"),
        name = divValueByClassName(draggedElmt, "plant-detail__name"),
        light = divValueByClassName(draggedElmt, "plant-detail__light"),
        size = divValueByClassName(draggedElmt, "plant-detail__size"),
        indoorSeeding = divValueByClassName(draggedElmt, "plant-detail__inSeeding") ? 'True' : 'Flase',
        seedDate = divValueByClassName(draggedElmt, "plant-detail__seedDate") || 'n/a',
        transDate = divValueByClassName(draggedElmt, "plant-detail__transDate") || 'n/a';

  const dropField = document.getElementsByClassName('drop-field').item(0),
        table = document.getElementsByClassName("plant-detail__table")[0],
        tableContent = table.getElementsByTagName('tbody')[0];
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left,
      offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

  const plantInfo = `
                    <tr class="plantId_git ${plantId}">
                      <td>${name}</td>
                      <td>${light}</td>
                      <td>${size}</td>
                      <td>${indoorSeeding}</td>
                      <td>${seedDate}</td>
                      <td>${transDate}</td>
                      <td class="positionX">${offX}</td>
                      <td class="positionY">${offY}</td>
                    </tr>`
  if (newDrag) {
    tableContent.insertAdjacentHTML('beforeend',plantInfo)
  } else {
    console.log('test')
  }
}

export { addToPlantDetailList };
