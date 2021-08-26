let dragged;

function duplicateDiv(originDiv) {
  let clone = originDiv.cloneNode(true)
  clone.classList.add("plantCopy")
  clone.classList.remove("plantOrigin")
  originDiv.parentNode.appendChild(clone)
  clone.style.zIndex = "100"
  return clone
}

function onDragOver(e) {
  e.preventDefault()
}

// function onDragLeave(e) {
//   e.target.style.background = ''
// }

function onDragEnter(e) {
  const target = e.target

  if (target && dragged) {
      e.preventDefault()
      // Set the dropEffect to move
      e.dataTransfer.dropEffect = 'move'
      // target.style.background = '#1f904e'
  }
}

function onDrop(e) {
  const target = e.target


  if (target && dragged) {
    // target.style.backgroundColor = ''
    e.preventDefault()
    // Add the moved element to the target's DOM
    const clone = duplicateDiv(dragged)
    clone.style.opacity = ''
    dragged.parentNode.insertBefore(clone, dragged)
    dragged.parentNode.removeChild(dragged)
    dragged.style.opacity = ''
    target.appendChild(dragged)
  }
}


function onDragStart(e) {
  let target = e.target

  if (target && target.classList.contains("draggable")) { // If target is an image
      dragged = target
      // dragged = duplicateDiv(dragged)
      e.dataTransfer.setData('text', target.id)
      console.log("target.id")
      console.log(target.id)
      e.dataTransfer.dropEffect = 'move'
      e.target.style.opacity = 0.6
  }
}

function onDragEnd(event) {
  if (event.target && event.target.classList.contains("draggable")) {
      event.target.style.opacity = ''
      dragged = null
  }
}

// define sections for different action
const dragTarget = document.querySelector('.drag-target');
const dropField = document.querySelector('.drop-field');

// Adding event listeners
dragTarget.addEventListener('dragstart', onDragStart);
dragTarget.addEventListener('dragend', onDragEnd);
dropField.addEventListener('drop', onDrop);
dropField.addEventListener('dragenter', onDragEnter);
// dropField.addEventListener('dragleave', onDragLeave);
dropField.addEventListener('dragover', onDragOver);

// const mousedownToDrag = () => {
//   let targets = document.querySelectorAll(".draggable")

//   targets.forEach((target, i) => {
//     dragElement(target, i)
//   })
//   // dragElement(document.querySelectorAll(".draggable:not(.plantOrigin)"))
//   console.log(document.querySelectorAll(".draggable:not(.plantOrigin)"))
// }

// function dragElement(elmnt, i) {

//   elmnt.onmousedown = (e) => {
//     e = e || window.event
//     e.preventDefault()

//     let shiftX = event.clientX - elmnt.getBoundingClientRect().left
//     let shiftY = event.clientY - elmnt.getBoundingClientRect().top

//     // let elmnt

//     function duplicateDiv(originDiv) {
//       let clone = originDiv.cloneNode(true)
//       clone.classList.add("plantCopy")
//       clone.classList.remove("plantOrigin")
//       originDiv.parentNode.appendChild(clone)
//       clone.style.zIndex = "100"
//       return clone
//     }

//     if (elmnt.classList.contains("plantOrigin")) {
//       elmnt = duplicateDiv(elmnt)
//     // } else if (elmnt.classList.contains("plantCopy")){
//     //   elmnt = target
//     }

//     // let offX = e.clientX - elmnt.getBoundingClientRect().left
//     // let offY = e.clientY - elmnt.getBoundingClientRect().top

//     // let x = elmnt.offsetWidth/2
//     // let y = elmnt.offsetHeight/2

//     elmnt.style.position = 'absolute'
//     elmnt.style.zIndex = "99"
//     document.body.append(elmnt)

//     moveAt(e.pageX, e.pageY)

//     //adjust elmnt to center position under pointer
//     function moveAt(pageX, pageY) {
//       elmnt.style.left = pageX - shiftX + 'px';
//       elmnt.style.top = pageY - shiftY + 'px';
//     }

//     function onMouseMove(e) {
//       moveAt(e.pageX, e.pageY);
//     }
//     document.addEventListener('mousemove', onMouseMove)
//     elmnt.onmouseup = () => {
//       document.removeEventListener('mousemove', onMouseMove)
//       elmnt.onmouseup = null
//     }
//   }

//   elmnt.ondragstart = () => {
//     return false
//   }

//   // elmnt.onmousedown = dragMouseDown
//   // function dragMouseDown(e) {

//   //   e = e || window.event
//   //   e.preventDefault()

//   //   let plantCopy = duplicateDiv(elmnt)
//   //   offX = e.clientX - parseInt(plantCopy.offsetLeft)
//   //   offY = e.clientY - parseInt(plantCopy.offsetTop)
//   //   document.onmouseup = closeDragElement
//   //   document.onmousemove = elementDrag
//   // }



//   // function duplicateDiv(originDiv) {
//   //   let clone = originDiv.cloneNode(true)
//   //   clone.classList.add("plantCopy")
//   //   clone.classList.remove("plantOrigin")
//   //   originDiv.parentNode.appendChild(clone)
//   //   clone.style.zIndex = "100"
//   // }

//   // function elementDrag(e) {
//   //   e = e || window.event
//   //   e.preventDefault()

//   //   elmnt.style.cursor = 'move'
//   //   elmnt.style.position = 'absolute'
//   //   elmnt.style.top = (e.clientY - offY) + "px"
//   //   elmnt.style.left = (e.clientX - offX) + "px"
//   // }

//   // function closeDragElement(e) {
//   //   document.onmouseup = null
//   //   document.onmousemove = null
//   // }
// }

// export { mousedownToDrag };
