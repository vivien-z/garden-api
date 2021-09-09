const scrollLeft = document.getElementById('scrollLeft')
const scrollRight = document.getElementById('scrollRight')
const scrollContent = document.getElementById('scrollContent')

scrollLeft.onclick = function(e) {
  scrollContent.scrollLeft += 56;
  e.preventDefault();
}

scrollRight.onclick = function(e) {
  scrollContent.scrollLeft -= 56;
  e.preventDefault();
}