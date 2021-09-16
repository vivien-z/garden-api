const addToPlantDetailList = (draggedElmt) => {

  function divValueByClassName(div, className) {
    return div.getElementsByClassName(className)[0]
  }
  // plant info data variable
  const name = divValueByClassName(draggedElmt, "plant-detail__name")
  const light = divValueByClassName(draggedElmt, "plant-detail__light")
  const size = divValueByClassName(draggedElmt, "plant-detail__size")
  console.log(name)
  console.log(light)
  console.log(size)

  const dropField = document.getElementsByClassName('drop-field').item(0)
  let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left;
  let offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

  const table = document.getElementsByClassName("plant-detail__table")[0]
  const tableContent = table.getElementsByTagName('tbody')[0]
  const plantName = draggedElmt.getElementsByTagName('a')[0].innerText

  const plantPosition = `<tr><td>${plantName}</td><td>${plantName}</td><td>${plantName}</td><td>${'ture'}</td><td>${new Date()}</td><td>${new Date()}</td></tr>`
  tableContent.insertAdjacentHTML('beforeend',plantPosition)
}

export { addToPlantDetailList };
