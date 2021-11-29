import Dropzone from "dropzone"
import { Controller } from "stimulus"
import { DirectUpload } from "@rails/activestorage"
import {
  getMetaValue,
  findElement,
  removeElement,
  insertAfter
} from "helpers";

//----- Define Dropzone ----//
// Data passed from dropzone Controller
function createDropZone(controller) {
  return new Dropzone(controller.element, {
    url: controller.url,
    headers: controller.headers,
    maxFiles: controller.maxFiles,
    maxFilesize: controller.maxFileSize,
    acceptedFiles: controller.acceptedFiles,
    addRemoveLinks: controller.addRemoveLinks,
    autoQueue: false
  });
}

//---- Define Controller Class (for dropzone) ----//
export default class extends Controller {
  static targets = ["input"];

  connect() {
    this.dropZone = createDropZone(this);
    this.hideFileInput();
    this.bindEvents();
    Dropzone.autoDiscover = false;
  }

  // Private
  hideFileInput() {
    this.inputTarget.disabled = true;
    this.inputTarget.style.display = "none";
  }

  bindEvents() {
    this.dropZone.on("addedfile", file => {
      setTimeout(() => {
        file.accepted && new DirectUploadController(this, file).start(); // Controller Class defined below
      }, 500);
    });

    this.dropZone.on("removedfile", file => {
      file.controller && removeElement(file.controller.hiddenInput);
    });

    this.dropZone.on("canceled", file => {
      file.controller && file.controller.xhr.abort();
    });
  }

// Date: for creating Dropzone
  get headers() {
    return { "X-CSRF-Token": getMetaValue("csrf-token") };
  }

  get url() {
    return this.inputTarget.getAttribute("data-direct-upload-url");
  }

  get maxFiles() {
    return this.data.get("maxFiles") || 1;
  }

  get maxFileSize() {
    return this.data.get("maxFileSize") || 256;
  }

  get acceptedFiles() {
    return this.data.get("acceptedFiles");
  }

  get addRemoveLinks() {
    return this.data.get("addRemoveLinks") || true;
  }
}

//---- Define Direct Upload Class (interact with rails active storage)----//
class DirectUploadController {
  constructor(inputSource, file) {
    this.inputSource = inputSource;
    this.file = file;
    this.directUpload = new DirectUpload(file, inputSource.url, this); // Rails direct upload
  }

  start() {
    this.file.controller = this;
    this.hiddenInput = this.createHiddenInput();
    this.directUpload.create((error, attributes) => {
      if (error) {
        removeElement(this.hiddenInput);
        this.emitDropzoneError(error);
      } else {
        this.hiddenInput.value = attributes.signed_id;
        this.emitDropzoneSuccess();
      }
    });
  }

// Data
  directUploadWillStoreFileWithXHR(xhr) {
    this.bindProgressEvent(xhr);
    this.emitDropzoneUploading();
  }

  bindProgressEvent(xhr) {
    this.xhr = xhr;
    this.xhr.upload.addEventListener("progress", event =>
      this.uploadRequestDidProgress(event)
    );
  }

// Data and Style: inset input data, style hidden
  createHiddenInput() {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = this.inputSource.inputTarget.name;
    insertAfter(input, this.inputSource.inputTarget);
    return input;
  }

// Style: Show upload progress bar by %
  uploadRequestDidProgress(event) {
    const element = this.inputSource.element;
    const progress = (event.loaded / event.total) * 100;
    findElement(
      this.file.previewTemplate,
      ".dz-upload"
    ).style.width = `${progress}%`;
  }

// Emit Status
  emitDropzoneUploading() {
    this.file.status = Dropzone.UPLOADING;
    this.inputSource.dropZone.emit("processing", this.file);
  }

  emitDropzoneError(error) {
    this.file.status = Dropzone.ERROR;
    this.inputSource.dropZone.emit("error", this.file, error);
    this.inputSource.dropZone.emit("complete", this.file);
  }

  emitDropzoneSuccess() {
    this.file.status = Dropzone.SUCCESS;
    this.inputSource.dropZone.emit("success", this.file);
    this.inputSource.dropZone.emit("complete", this.file);
  }
}
