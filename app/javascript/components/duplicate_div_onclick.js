function duplicateDiv(originDiv) {
  let clone = originDiv.cloneNode(true)
  clone.classList.add("plantCopy")
  clone.classList.remove("plantOrigin")
  originDiv.parentNode.appendChild(clone)
  clone.style.zIndex = "99"
}

const duplicateDivOnclick = (e) => {
  let origin = document.querySelector(".plantOrigin")
  if (origin) {
    origin.addEventListener("mousedown", (e) => {
      e = e || window.event
      e.preventDefault()

      console.log("click")
      duplicateDiv(origin)
      // setCloneDiv(origin)
    })
  }


}

// function duplicateDiv(origin) {


// }

export { duplicateDivOnclick };

// const duplicateDivOnclick = () => {
//   console.log("duplicateDivOnclick")
//   duplicateDiv(document.querySelector(".draggable"))
//   console.log(document.querySelector(".draggable"))
// }

// function duplicateDiv(elmnt) {
//   // let i = 0, originX = 0, originY = 0
//   console.log("duplicate")
//   function setCloneDiv(originDiv) {
//     let clone = originDiv.cloneNode(true)
//     clone.classList.add("plantCopy")
//     originDiv.parentNode.appendChild(clone)
//   }

//   elmnt.addEventListener("mousedown", (e) => {
//     e = e || window.event
//     e.preventDefault()

//     setCloneDiv(elmnt)
//   })
// }
