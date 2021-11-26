import Dropzone from "dropzone"
import { Controller } from "stimulus"
import { DirectUpload } from "@rails/activestorage"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    this.dropZone = createDropZone(this)
    this.hideFileInput()
    this.bindEvents()
    Dropzone.autoDiscover = false
  }

  hideFileInput() {
    this.inputTarget.disabled = true
    this.inputTarget.style.display = "none"
  }
}

