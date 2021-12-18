const setPlantPosition = (elmnt, dropZone, borderWth = 0) => {
    const rectField = dropZone.getBoundingClientRect(),
          rectElmnt = elmnt.getBoundingClientRect()

    let isAllAdjusted = false
    while (!isAllAdjusted) {
        // set general element position
        elmnt.style.left = (rectElmnt.left - rectField.left - borderWth) + 'px'
        elmnt.style.top = (rectElmnt.top - rectField.top - borderWth) + 'px'
        // adjust element position when dropped OUTSIDE range
        let tooLeft = rectElmnt.left < rectField.left + borderWth,
        tooRight = rectElmnt.right > rectField.right - borderWth,
        tooHigh = rectElmnt.top < rectField.top + borderWth,
        tooLow = rectElmnt.bottom > rectField.bottom - borderWth
        
        if (tooLeft) {
        elmnt.style.left = 0 + 'px'
        tooLeft = false
        }
        if (tooRight) {
        elmnt.style.left = (rectField.width - rectElmnt.width - 2*borderWth) + 'px'
        tooRight = false
        }
        if (tooHigh) {
        elmnt.style.top = 0 + 'px'
        tooHigh = false
        }
        if (tooLow) {
        elmnt.style.top = (rectField.height - rectElmnt.height - 2*borderWth) + 'px'
        tooLow = false
        } 
        isAllAdjusted = ((tooLeft && tooRight && tooHigh && tooLow) === false)
    }
}

export { setPlantPosition }