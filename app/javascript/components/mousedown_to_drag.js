const mousedownToDrag = () => {
  let targets = document.querySelectorAll(".draggable")

  targets.forEach((target, i) => {
    dragElement(target, i)
  })
  // dragElement(document.querySelectorAll(".draggable:not(.plantOrigin)"))
  console.log(document.querySelectorAll(".draggable:not(.plantOrigin)"))
}

function dragElement(target, i) {

  target.onmousedown = (e) => {
    e = e || window.event
    e.preventDefault()

    let elmnt

    function duplicateDiv(originDiv) {
      let clone = originDiv.cloneNode(true)
      clone.classList.add("plantCopy")
      clone.classList.remove("plantOrigin")
      originDiv.parentNode.appendChild(clone)
      clone.style.zIndex = "100"
      return clone
    }

    if (target.classList.contains("plantOrigin")) {
      elmnt = duplicateDiv(target)
    } else if (elmnt.classList.contains("plantCopy")){
      elmnt = target
    }

    let offX = e.clientX - elmnt.getBoundingClientRect().left
    let offY = e.clientY - elmnt.getBoundingClientRect().top

    elmnt.style.position = 'absolute'
    elmnt.style.zIndex = "99"
    document.body.append(elmnt)

    moveAt(e.pageX, e.pageY)

    //adjust elmnt to center position under pointer
    function moveAt(pageX, pageY) {
      elmnt.style.left = pageX - offX/2 + 'px';
      elmnt.style.top = pageY - offY/2 + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove)
    elmnt.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove)
      elmnt.onmouseup = null
    }
  }

  target.ondragstart = () => {
    return false
  }

  // elmnt.onmousedown = dragMouseDown
  // function dragMouseDown(e) {

  //   e = e || window.event
  //   e.preventDefault()

  //   let plantCopy = duplicateDiv(elmnt)
  //   offX = e.clientX - parseInt(plantCopy.offsetLeft)
  //   offY = e.clientY - parseInt(plantCopy.offsetTop)
  //   document.onmouseup = closeDragElement
  //   document.onmousemove = elementDrag
  // }



  // function duplicateDiv(originDiv) {
  //   let clone = originDiv.cloneNode(true)
  //   clone.classList.add("plantCopy")
  //   clone.classList.remove("plantOrigin")
  //   originDiv.parentNode.appendChild(clone)
  //   clone.style.zIndex = "100"
  // }

  // function elementDrag(e) {
  //   e = e || window.event
  //   e.preventDefault()

  //   elmnt.style.cursor = 'move'
  //   elmnt.style.position = 'absolute'
  //   elmnt.style.top = (e.clientY - offY) + "px"
  //   elmnt.style.left = (e.clientX - offX) + "px"
  // }

  // function closeDragElement(e) {
  //   document.onmouseup = null
  //   document.onmousemove = null
  // }
}

export { mousedownToDrag };
