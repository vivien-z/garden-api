const draggableDiv = () => {
  let items = document.querySelectorAll(".draggable:not(.plantCopy)")
  items.forEach((item, i) => {
    dragElement(item, i)
  })
  dragElement(document.querySelectorAll(".draggable:not(.plantCopy)"))
  console.log(document.querySelectorAll(".draggable:not(.plantCopy)"))
}

function dragElement(elmnt) {

  let offX
  let offY

  elmnt.onmousedown = dragMouseDown

  console.log("elmnt")
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

    elmnt.style.cursor = 'move'
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
