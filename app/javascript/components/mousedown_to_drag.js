import { addToPlantDetailList } from "../components/add_to_plant_detail";

const mousedownToDrag = () => {
  const garden = $('.garden_info').data('garden')
  const dragZone = document.getElementById(`drag_${garden.id}`)
  const dropZone = document.getElementById(`drop_${garden.id}`)

  if (dragZone && dropZone) {
    // const dropZone = document.getElementsByClassName('drop-field').item(0)
    // const moveTarget = dropZone.getElementsByClassName('plantCopy').item(0)
// ---------Define drag and drop: action--------------------------------
    dragZone.ondragstart = () => { return false }
    dropZone.ondragstart = () => { return false }

    dragZone.onmousedown = dragItem
    dropZone.onmousedown = dragItem

// ---------Define drag event-------------------------------------------
    function dragItem(e) {
      e = e || window.event
      e.preventDefault()
      const dragged = e.target
      const isNewDrag = dragged.parentNode.classList.contains("drag-zone")
      let plantCount = 1 // XX

      if (dragged && dragged.classList.contains("draggable")) {
        const shiftX = e.clientX - dragged.getBoundingClientRect().left,
              shiftY = e.clientY - dragged.getBoundingClientRect().top;
              

        //------DRAG: new item to field------
        if (isNewDrag) {
          addToDropzone(dragged)
          // const clone = duplicateDiv(dragged)
          // dragged.parentNode.insertBefore(clone, dragged)
          // dragged.classList.remove("plantOrigin", "yellow", "m-3")
          // dragged.classList.add("plantCopy")
          // dragged.id = plantCount
        }
        //-----------------------------------
        dragged.style.opacity = 0.7
        dragged.style.zIndex = 1000
        dragged.style.cursor = 'grabbing'
        dragged.style.position = 'absolute'
        
        moveAt(dragged, e)
        document.addEventListener('mousemove', onMouseMove)

        function addToDropzone(elmt) {
          const clone = duplicateDiv(elmt)
          elmt.parentNode.insertBefore(clone, elmt)
          elmt.classList.remove("plantOrigin", "yellow", "m-3")
          elmt.classList.add("plantCopy")
          elmt.id = plantCount
        }
        function duplicateDiv(originDiv) {
          let clone = originDiv.cloneNode(true)
          return clone
        }
        function moveAt(elmnt, event) {
          elmnt.style.left = event.pageX - shiftX + 'px'
          elmnt.style.top = event.pageY - shiftY + 'px'
        }
        function onMouseMove(e) {
          moveAt(dragged, e)
        }
        //------DROP and remove unneeded handlers------
        function adjustToDropZone(elmnt, event) {
          const rectField = dropZone.getBoundingClientRect()
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

        dragged.onmouseup = function(e) {
          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'

          dragged.parentNode.removeChild(dragged)
          dropZone.appendChild(dragged)
          adjustToDropZone(dragged, e)
          document.removeEventListener('mousemove', onMouseMove)
          plantCount = dropZone.getElementsByClassName('draggable').length
          addToPlantDetailList(dragged, plantCount, isNewDrag)
          if (isNewDrag) {
            isNewDrag = false
          }
          dragged.onmouseup = null
        }
      }
    }
  }
}

export { mousedownToDrag };
