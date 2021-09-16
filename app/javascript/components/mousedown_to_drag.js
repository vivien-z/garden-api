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
        let shiftX = e.clientX - dragged.getBoundingClientRect().left;
        let shiftY = e.clientY - dragged.getBoundingClientRect().top;

        function duplicateDiv(originDiv) {
          let clone = originDiv.cloneNode(true)
          return clone
        }

        if (dragged.classList.contains("plantOrigin")) {
          const clone = duplicateDiv(dragged)
          dragged.parentNode.insertBefore(clone, dragged)
          dragged.classList.remove("plantOrigin", "yellow", "m-3")
          dragged.classList.add("plantCopy")
        }
        if (dragged.classList.contains("plantCopy")) {
        }

        dragged.style.opacity = 0.7
        dragged.style.cursor = 'grabbing'
        dragged.style.zIndex = 1000
        dragged.style.position = 'absolute'

        moveAt(dragged, e)

        function moveAt(elmnt, event) {
          elmnt.style.left = event.pageX - shiftX + 'px'
          elmnt.style.top = event.pageY - shiftY + 'px'
          // let offX = elmnt.getBoundingClientRect().left - dropField.getBoundingClientRect().left;
          // let offY = elmnt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;
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

        // move the dragged on mousemove
        document.addEventListener('mousemove', onMouseMove)

        // drop the dragged, remove unneeded handlers
        dragged.onmouseup = function(e) {
          dragged.parentNode.removeChild(dragged)
          dropField.appendChild(dragged)
          adjustToDropZone(dragged, e)
          document.removeEventListener('mousemove', onMouseMove)
          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'

          // let offX = dragged.getBoundingClientRect().left - dropField.getBoundingClientRect().left;
          // let offY = dragged.getBoundingClientRect().top - dropField.getBoundingClientRect().top;
          listPlantDetail(dragged)
          dragged.onmouseup = null
        }

        function listPlantDetail(draggedElmt) {
          const tableContent = document.getElementsByClassName("plant-detail_content")[0]
          const plantName = draggedElmt.getElementsByTagName('a')[0].innerText

          let offX = draggedElmt.getBoundingClientRect().left - dropField.getBoundingClientRect().left;
          let offY = draggedElmt.getBoundingClientRect().top - dropField.getBoundingClientRect().top;
          console.log(tableContent)
          // tableContent.insertAdjacentHTML('beforeend', '<div>test</div>')
          // console.log(tableContent)
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

