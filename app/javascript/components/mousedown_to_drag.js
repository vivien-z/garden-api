const mousedownToDrag = () => {
  const dragTarget = document.getElementsByClassName('drag-target')[0]

  if (dragTarget) {
    const dropField = document.getElementsByClassName('drop-field')[0]
    const moveTarget = dropField.getElementsByClassName('plantCopy')[0]

    dragTarget.ondragstart = () => { return false }
    dropField.ondragstart = () => { return false }

    dragTarget.onmousedown = dragItem
    dropField.onmousedown = dragItem

    function dragItem(event) {
      event = event || window.event
      event.preventDefault()

      const dragged = event.target
      if (dragged && dragged.classList.contains("draggable")) {
        let shiftX = event.clientX - dragged.getBoundingClientRect().left;
        let shiftY = event.clientY - dragged.getBoundingClientRect().top;

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

        moveAt(dragged, event)

        function moveAt(elmnt, event) {
          elmnt.style.left = event.pageX - shiftX + 'px'
          elmnt.style.top = event.pageY - shiftY + 'px'
        }

        function adjustToDropZone(elmnt) {
          const rectField = dropField.getBoundingClientRect()
          const rectElmnt = elmnt.getBoundingClientRect()

          // const leftIn = rectField.left > rectElmnt.left
          // const rightIn = rectField.right < rectElmnt.right
          // const topIn = rectField.top > rectElmnt.top
          // const bottomIn = rectField.bottom < rectElmnt.bottom

          // while ( !(leftIn && rightIn && topIn && bottomIn) ) {

            if ((rectField.left + 6) > rectElmnt.left) {
              elmnt.style.left = (rectField.left + 6) + 'px'
            }
            if ((rectField.right - 6) < rectElmnt.right) {
              elmnt.style.left = (rectField.right - 6 - rectElmnt.width) + 'px'
            }
            if ((rectField.top + 6) > rectElmnt.top) {
              elmnt.style.top = (rectField.top + 6) + 'px'
            }
            if ((rectField.bottom - 6) < rectElmnt.bottom) {
              elmnt.style.top = (rectField.bottom - 6 - rectElmnt.height) + 'px'
            }

          // }

        }

        function onMouseMove(e) {
          moveAt(dragged, e)
        }

        // move the dragged on mousemove
        document.addEventListener('mousemove', onMouseMove)

        // drop the dragged, remove unneeded handlers
        dragged.onmouseup = function() {
          dragged.parentNode.removeChild(dragged)
          dropField.appendChild(dragged)
          adjustToDropZone(dragged)
          document.removeEventListener('mousemove', onMouseMove)
          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'
          dragged.onmouseup = null
        }
      }
    }
  }

}

export { mousedownToDrag };

