import { addToPlantDetailList } from "../components/add_to_plant_detail";

const mousedownToDrag = () => {
  const garden = $('.garden_info').data('garden')
  const dragZone = document.getElementById(`drag_${garden.id}`)
  const dropZone = document.getElementById(`drop_${garden.id}`)

  if (dragZone && dropZone) {

  // ---- TEST: dropzone: getBoundingClientRect() -----------
  // document.addEventListener( "scroll", () => {
  //   let rectdpz = dropZone.getBoundingClientRect();
  //   const exp = document.getElementById('example');
  //   exp.innerHTML = ''; 
  //   for (let key in rectdpz) {
  //     if(typeof rectdpz[key] !== 'function') {
  //       let para = document.createElement('p');
  //       para.textContent  = `${ key } : ${ rectdpz[key] } `;
  //       exp.appendChild(para);
  //     }
  //   }
  // })
  // console.log( dropZone.getBoundingClientRect())
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

        function addToDropzone(elmnt) {
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
          const position = trackPosition(dragged)
          dragged.parentNode.removeChild(dragged)
          dropZone.appendChild(dragged)
          setPosition(position, dragged)
          
          dragged.style.opacity = ''
          dragged.style.cursor = 'grab'
          document.removeEventListener('mousemove', onMouseMove)
          plantCount = dropZone.getElementsByClassName('draggable').length
          addToPlantDetailList(dragged, plantCount, isNewDrag)

          dragged.onmouseup = null
        }
        function trackPosition(elmnt) {
          const rectField = dropZone.getBoundingClientRect(),
                rectElmnt = elmnt.getBoundingClientRect(),
                position = { rectField: rectField, rectElmnt: rectElmnt }
          return position
        }
        function setPosition(position, elmnt) {
          const rectField = position.rectField,
                rectElmnt = position.rectElmnt
          const borderWth = 6

          let isAllAdjusted = false

          while (!isAllAdjusted) {
            let tooLeft = rectElmnt.left < rectField.left + borderWth,
                tooRight = rectElmnt.right > rectField.right - borderWth,
                tooHigh = rectElmnt.top < rectField.top + borderWth,
                tooLow = rectElmnt.bottom > rectField.bottom - borderWth
            
            elmnt.style.left = (rectElmnt.left - rectField.left - borderWth) + 'px'
            elmnt.style.top = (rectElmnt.top - rectField.top - borderWth) + 'px'
            if (tooLeft) {
              elmnt.style.left = 0 + 'px'
              // elmnt.style.left = borderWth + 'px'
              tooLeft = false
            }
            if (tooRight) {
              elmnt.style.left = (rectField.width - rectElmnt.width - 2*borderWth) + 'px'
              tooRight = false
            }
            if (tooHigh) {
              elmnt.style.top = 0 + 'px'
              // elmnt.style.top = (borderWth) + 'px'
              tooHigh = false
            }
            if (tooLow) {
              elmnt.style.top = (rectField.height - rectElmnt.height - 2*borderWth) + 'px'
              tooLow = false
            }
            
            isAllAdjusted = ((tooLeft && tooRight && tooHigh && tooLow) === false)
          }
        }


      }
    }
  }
}

export { mousedownToDrag };
