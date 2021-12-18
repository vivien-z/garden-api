const mousedownToDrag = () => {
  const garden = $('.garden_info').data('garden')
  if (garden) {
    const dragZone = document.getElementById(`drag_${garden.id}`)
    const dropZone = document.getElementById(`drop_${garden.id}`)

    if (dragZone && dropZone) {
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

        if (dragged && dragged.classList.contains("draggable")) {
          const shiftX = e.clientX - dragged.getBoundingClientRect().left,
                shiftY = e.clientY - dragged.getBoundingClientRect().top;
                
          //------DRAG: new item to field------
          if (isNewDrag) setItemAtt(dragged)
          //-----------------------------------
          dragged.style.opacity = 0.7
          dragged.style.zIndex = 1000
          dragged.style.cursor = 'grabbing'
          dragged.style.position = 'absolute'
          
          moveAt(dragged, e, isNewDrag)
          document.addEventListener('mousemove', onMouseMove)

          function setItemAtt(elmnt) {
            const clone = duplicateDiv(elmnt)
            elmnt.parentNode.insertBefore(clone, elmnt)
            elmnt.classList.remove("plantOrigin", "yellow", "m-3")
            elmnt.classList.add("plantCopy")
          }
          function duplicateDiv(originDiv) {
            let clone = originDiv.cloneNode(true)
            return clone
          }
          function moveAt(elmnt, event, isNewDrag) {
            if (isNewDrag) {
              elmnt.style.left = event.pageX - shiftX + 'px'
              elmnt.style.top = event.pageY - shiftY + 'px'
            } else {
              elmnt.style.left = event.offsetX - shiftX + 'px'
              elmnt.style.top = event.offsetY - shiftY + 'px'
            }
          }
          function onMouseMove(e) {
            moveAt(dragged, e, isNewDrag)
          }
          //------DROP and remove un-needed handlers------
          dragged.onmouseup = function(e) {
            dragged.parentNode.removeChild(dragged)
            dropZone.appendChild(dragged)

            dragged.style.opacity = ''
            dragged.style.cursor = 'grab'
            document.removeEventListener('mousemove', onMouseMove)
            
            dragged.onmouseup = null
          }
        }
      }
    }
  }
}

export { mousedownToDrag };
