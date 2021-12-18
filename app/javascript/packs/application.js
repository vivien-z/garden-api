require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import "bootstrap";
import "controllers";
import 'channels';
import { onclickToClipboard } from "../components/onclick_to_clipboard";
import { clickToScroll } from "../components/click_to_scroll";
import { mousedownToDrag } from "../components/mousedown_to_drag";
import { rangeSlider } from "../components/range_slider";

document.addEventListener('turbolinks:load', () => {
  onclickToClipboard();
  mousedownToDrag();
  rangeSlider();
  clickToScroll();
});

