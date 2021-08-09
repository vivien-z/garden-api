const draggableDiv = () => {
  dragElement(document.querySelector(".draggable"))
}

function dragElement(elmnt) {
  let offX
  let offY
  // let offY
  // if (document.getElementById(elmnt.id + "header")) {
  //   // if present, the header is where you move the DIV from:
  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  // } else {
  //   // otherwise, move the DIV from anywhere inside the DIV:
  elmnt ? (elmnt.onmousedown = dragMouseDown) : null;
  // }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()

    offX = e.clientX - parseInt(elmnt.offsetLeft)
    offY = e.clientY - parseInt(elmnt.offsetTop)
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()

    elmnt.style.position = 'absolute'
    elmnt.style.top = (e.clientY - offY) + "px"
    elmnt.style.left = (e.clientX - offX) + "px"
  }

  function closeDragElement(e) {
    document.onmouseup = null
    document.onmousemove = null
  }
}

export { draggableDiv };
