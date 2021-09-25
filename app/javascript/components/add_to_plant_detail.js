const addToPlantDetailList = (draggedElmt, plantCount, isNewDrag) => {

  const dropField = document.getElementsByClassName('drop-field').item(0),
        table = document.getElementsByClassName("plant-detail__table")[0],
        tableContent = table.getElementsByTagName('tbody')[0];
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left,
      offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

  //---------------DATA: get plant info from show pg--------------------------
  function getDivValueByClassName(elmt, className) {
    const div = elmt.getElementsByClassName(className)[0]
    if (div) {
      return div.innerText
    }
  }

  const plantId = getDivValueByClassName(draggedElmt, "plant-detail__id"),
        name = getDivValueByClassName(draggedElmt, "plant-detail__name"),
        light = getDivValueByClassName(draggedElmt, "plant-detail__light"),
        size = getDivValueByClassName(draggedElmt, "plant-detail__size"),
        indoorSeeding = getDivValueByClassName(draggedElmt, "plant-detail__inSeeding") ? 'True' : 'Flase',
        seedDate = getDivValueByClassName(draggedElmt, "plant-detail__seedDate") || 'n/a',
        transDate = getDivValueByClassName(draggedElmt, "plant-detail__transDate") || 'n/a';

  const plantInfoNew = `
                    <tr class="plantId__${plantId} divId__${plantCount}">
                      <td>${plantCount}</td>
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
    tableContent.insertAdjacentHTML('beforeend',plantInfoNew)
  }
  //-----after drag: update div position-------
  const targetplant = tableContent.getElementsByClassName(`divId__${plantCount}`)[0]
  targetplant.getElementsByClassName("positionX")[0].innerText = offX
  targetplant.getElementsByClassName("positionY")[0].innerText = offY

  //-----TEST if plant already exist in field-----
  function isRepeatPlant(plantId) {
    const targetDivClass = `plantId__${plantId}`
    const count = plantIdList.filter(pId => pId === targetDivClass).length
    return count > 1
  }
  const plantHTMLCollection = tableContent.getElementsByTagName('tr')
  const plantInfoArr = [].slice.call( plantHTMLCollection )
  let plantIdList = []

  plantInfoArr.forEach(function callback(plantInfo, index) {
    const regexp = /plantId__\d+/
    const divClass = plantInfo.classList.value.match(regexp)

    if (divClass && divClass[0].includes("plantId")) {
      plantIdList.push(divClass[0])
    }
  })

  //-------hide repetitive plants' info-----------
  if (isRepeatPlant(plantId)) {
    targetplant.style.display = "none"
  }
}

export { addToPlantDetailList };
