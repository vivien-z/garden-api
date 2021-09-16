const addToPlantDetailList = (draggedElmt) => {
  console.log(draggedElmt.getElementsByClassName("plant-detail__name")[0])
  console.log(draggedElmt.getElementsByClassName("plant-detail__light")[0])
  console.log(draggedElmt.getElementsByClassName("plant-detail__size")[0])
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
