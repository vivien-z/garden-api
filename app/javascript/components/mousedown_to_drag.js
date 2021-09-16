import { addToPlantDetailList } from "../components/add_to_plant_detail";

const mousedownToDrag = () => {
  const dragTarget = document.getElementsByClassName('drag-target').item(0)

  if (dragTarget) {
    const dropField = document.getElementsByClassName('drop-field').item(0)
    const moveTarget = dropField.getElementsByClassName('plantCopy').item(0)

// Define drag event
    function dragItem(e) {
      e = e || window.event
      e.preventDefault()
      const dragged = e.target

      if (dragged && dragged.classList.contains("draggable")) {
        let newDrag = false
        let shiftX = e.clientX - dragged.getBoundingClientRect().left;
        let shiftY = e.clientY - dragged.getBoundingClientRect().top;

        function duplicateDiv(originDiv) {
          let clone = originDiv.cloneNode(true)
          return clone
        }
        function moveAt(elmnt, event) {
          elmnt.style.left = event.pageX - shiftX + 'px'
          elmnt.style.top = event.pageY - shiftY + 'px'
        }
        function adjustToDropZone(elmnt, event) {
          const rectField = dropField.getBoundingClientRect()
          const rectElmnt = elmnt.getBoundingClientRect()
          const diff = event.pageY - event.clientY

          if ((rectField.left + 6) > rectElmnt.left) {
            elmnt.style.left = (rectField.left + 6) + 'px'
          }
          if ((rectField.right - 6) < rectElmnt.right) {
            elmnt.style.left = (rectField.right - 6 - rectElmnt.width) + 'px'
          }
          if ((rectField.top + 6) > rectElmnt.top) {
            elmnt.style.top = (diff + rectField.top + 6) + 'px'
          }
          if ((rectField.bottom - 6) < rectElmnt.bottom) {
            elmnt.style.top = (diff + rectField.bottom - 6 - rectElmnt.height) + 'px'
          }
        }
        function onMouseMove(e) {
          moveAt(dragged, e)
        }
        // function addToPlantDetailList(draggedElmt) {
        //   console.log(draggedElmt.getElementsByClassName("plant-detail__name")[0])
        //   console.log(draggedElmt.getElementsByClassName("plant-detail__light")[0])
        //   console.log(draggedElmt.getElementsByClassName("plant-detail__size")[0])
        //   let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left;
        //   let offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;

        //   const table = document.getElementsByClassName("plant-detail__table")[0]
        //   const tableContent = table.getElementsByTagName('tbody')[0]
        //   const plantName = draggedElmt.getElementsByTagName('a')[0].innerText

        //   const plantPosition = `<tr><td>${plantName}</td><td>${plantName}</td><td>${plantName}</td><td>${'ture'}</td><td>${new Date()}</td><td>${new Date()}</td></tr>`
        //   tableContent.insertAdjacentHTML('beforeend',plantPosition)
        // }

        // when dragged item is newly added to field
        if (dragged.classList.contains("plantOrigin")) {
          newDrag = true
          // setting
          const clone = duplicateDiv(dragged)
          dragged.parentNode.insertBefore(clone, dragged)
          dragged.classList.remove("plantOrigin", "yellow", "m-3")
          dragged.classList.add("plantCopy")
          // get plant data
        }

        // style dragged item
        dragged.style.opacity = 0.7
        dragged.style.zIndex = 1000
        dragged.style.cursor = 'grabbing'
        dragged.style.position = 'absolute'

        moveAt(dragged, e)

        // move the dragged on mousemove
        document.addEventListener('mousemove', onMouseMove)

        // drop the dragged, remove unneeded handlers
        dragged.onmouseup = function(e) {
          // style
          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'

          // setting + action
          dragged.parentNode.removeChild(dragged)
          dropField.appendChild(dragged)
          adjustToDropZone(dragged, e)
          document.removeEventListener('mousemove', onMouseMove)
          if (newDrag) {
            addToPlantDetailList(dragged)
            newDrag = false
          }
          dragged.onmouseup = null
        }
      }
    }

// Action -- define drag and drop
    dragTarget.ondragstart = () => { return false }
    dropField.ondragstart = () => { return false }

    dragTarget.onmousedown = dragItem
    dropField.onmousedown = dragItem
  }
}

export { mousedownToDrag };
