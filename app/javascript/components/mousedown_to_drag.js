const dragTarget = document.querySelector('.drag-target')
const dropField = document.querySelector('.drop-field')
const moveTarget = dropField.querySelector('.plantCopy')

dragTarget.ondragstart = () => { return false }
dropField.ondragstart = () => { return false }

dragTarget.onmousedown = dragItem
dropField.onmousedown = dragItem

function dragItem(event) {
  e = event || window.event
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
      console.log('origin')
      const clone = duplicateDiv(dragged)
      dragged.parentNode.insertBefore(clone, dragged)
      dragged.classList.remove("plantOrigin", "m-3")
      dragged.classList.add("plantCopy", "yellow")
    }
    if (dragged.classList.contains("plantCopy")) {
      console.log('copy')
    }

    dragged.style.opacity = 0.7
    dragged.style.cursor = 'grabbing'
    dragged.style.zIndex = 1000
    dragged.style.position = 'absolute'

    moveAt(dragged, e)

    function moveAt(elmnt, e) {
      elmnt.style.left = e.pageX - shiftX + 'px'
      elmnt.style.top = e.pageY - shiftY + 'px'
    }

    function adjustToDropZone(elmnt) {
      const rectField = dropField.getBoundingClientRect()
      const rectElmnt = elmnt.getBoundingClientRect()

      if (rectField.left > rectElmnt.left) {
        elmnt.style.left = rectField.left + 'px'
      }
      if (rectField.right < rectElmnt.right) {
        elmnt.style.left = rectField.right - rectElmnt.width + 'px'
      }
      if (rectField.top > rectElmnt.top) {
        elmnt.style.top = rectField.top + 'px'
      }
      if (rectField.bottom < rectElmnt.bottom) {
        elmnt.style.top = rectField.bottom - rectElmnt.height + 'px'
      }
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
