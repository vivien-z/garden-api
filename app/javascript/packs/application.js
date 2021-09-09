// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import "bootstrap";
import { onclickToClipboard } from "../components/onclick_to_clipboard";
import { clickToScroll } from "../components/click_to_scroll";
import { mousedownToDrag } from "../components/mousedown_to_drag";


document.addEventListener('turbolinks:load', () => {
  onclickToClipboard()
  // mousedownToDrag()

  // draggableDiv()
  // duplicateDivOnclick()
});
