const clickToScroll = () => {

  const scrollContent = document.getElementById('scrollContent')
  if (scrollContent) {
    const scrollLeft = document.getElementById('scrollLeft')
    const scrollRight = document.getElementById('scrollRight')
    scrollLeft.onclick = function(e) {
      scrollContent.scrollLeft -= 60;
      e.preventDefault();
    }

    scrollRight.onclick = function(e) {
      scrollContent.scrollLeft += 60;
      e.preventDefault();
    }
  }

}

export { clickToScroll };
