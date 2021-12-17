import { addToPlantDetailList } from "../components/add_to_plant_detail";
import { setPlantPosition } from "../components/set_plant_position";

const mousedownToDrag = () => {
  const garden = $('.garden_info').data('garden')
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
      let plantCount = 1 // XX

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
        
        moveAt(dragged, e)
        document.addEventListener('mousemove', onMouseMove)

        function setItemAtt(elmnt) {
          const clone = duplicateDiv(elmnt)
          elmnt.parentNode.insertBefore(clone, elmnt)
          elmnt.classList.remove("plantOrigin", "yellow", "m-3")
          elmnt.classList.add("plantCopy")
          elmnt.id = plantCount
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
        //------DROP and remove un-needed handlers------
        dragged.onmouseup = function(e) {
          const position = trackPosition(dragged, dropZone) // capture getBoundingClientRect() value, to avoid abnormal data
          dragged.parentNode.removeChild(dragged)
          dropZone.appendChild(dragged)
          setPlantPosition(dragged, position.rectField, position.rectElmnt, 6)

          // dragged.setAttribute("data-plant-positionx", `${dragged.style.left}`)
          // dragged.setAttribute("data-plant-positiony", `${dragged.style.top}`)
          // dragged.setAttribute("data-offset-position", `left: ${dragged.style.left}; top: ${dragged.style.top}`)

          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'
          document.removeEventListener('mousemove', onMouseMove)
          plantCount = dropZone.getElementsByClassName('draggable').length
          addToPlantDetailList(dragged, plantCount, isNewDrag)
          
          dragged.onmouseup = null

          function trackPosition(elmnt, dropZone) {
            const rectField = dropZone.getBoundingClientRect(),
                  rectElmnt = elmnt.getBoundingClientRect()
            return { rectField: rectField, rectElmnt: rectElmnt }
          }
        }
      }
    }
  }
}

export { mousedownToDrag };
