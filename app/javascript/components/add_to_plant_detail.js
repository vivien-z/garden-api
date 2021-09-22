const addToPlantDetailList = (draggedElmt, isNewDrag) => {

  function divValueByClassName(elmt, className) {
    const div = elmt.getElementsByClassName(className)[0]
    if (div) {
      return div.innerText
    }
  }
  function isRepeatPlant(plantIndex) {
    const targetDivClass = `plantIndex__${plantIndex}`
    return plantIndexList.includes(targetDivClass)
  }

  const dropField = document.getElementsByClassName('drop-field').item(0),
        table = document.getElementsByClassName("plant-detail__table")[0],
        tableContent = table.getElementsByTagName('tbody')[0];
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left,
      offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;


  // plant info data variable
  const plantIndex = divValueByClassName(draggedElmt, "plant-detail__index"),
        name = divValueByClassName(draggedElmt, "plant-detail__name"),
        light = divValueByClassName(draggedElmt, "plant-detail__light"),
        size = divValueByClassName(draggedElmt, "plant-detail__size"),
        indoorSeeding = divValueByClassName(draggedElmt, "plant-detail__inSeeding") ? 'True' : 'Flase',
        seedDate = divValueByClassName(draggedElmt, "plant-detail__seedDate") || 'n/a',
        transDate = divValueByClassName(draggedElmt, "plant-detail__transDate") || 'n/a';


  // array: plant index list
  const plantHTMLCollection = tableContent.getElementsByTagName('tr')
  const plantInfoArr = [].slice.call( plantHTMLCollection )
  const plantCount = plantInfoArr.length
  let plantIndexList = []
  plantInfoArr.forEach(function callback(plantInfo, index) {
    const divClass = plantInfo.classList.value
    if (divClass.includes("plantIndex")) {
      plantIndexList.push(divClass)
    }
  })

  const plantInfoNew = `
                    <tr class="plantIndex__${plantIndex}">
                      <td class="count">${plantCount}</td>
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

  // const selectedPlant = draggedElmt.getElementsByClassName("count")[0].innerText
  // const selectedPlant = draggedElmt.getElementsByClassName("count")[0].innerText
  // selectedPlant.getElementsByClassName("positionX")[0].innerText = offX
  // selectedPlant.getElementsByClassName("positionY")[0].innerText = offY


  const repeatPlant = tableContent.getElementsByClassName(`plantIndex__${plantIndex}`)[0]
  let countDisply = repeatPlant.getElementsByClassName("count")[0].innerText
  repeatPlant.getElementsByClassName("positionX")[0].innerText = offX
  repeatPlant.getElementsByClassName("positionY")[0].innerText = offY
  if (isNewDrag) {
    countDisply = parseInt(countDisply) + 1
    console.log(countDisply)
  }
}

export { addToPlantDetailList };
