const btnLeft = document.getElementById('scrollLeft')
const btnRight = document.getElementById('scrollRight')

btnLeft.onclick = function() {
  console.log('left')
  document.getElementsByClassName('scrolling-container').scrollLeft += 20;
}
btnRight.onclick = function() {
  console.log(document.getElementsByClassName('scrolling-container'))
  document.getElementsByClassName('scrolling-container').scrollRight += 20;
}
