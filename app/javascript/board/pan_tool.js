import { Point } from "fabric"

export default class PanTool {
  constructor(canvas) {
    this.canvas = canvas
    this.disposers = []
  }

  enable() {
    this.disable()
    this.canvas.isDrawingMode = false
    this.canvas.skipTargetFind = true
    this.canvas.defaultCursor = "grab"
    this.disposers = [this.canvas.on("mouse:move", ({ e }) => this.drag(e))]
  }

  disable() {
    this.disposers.forEach((dispose) => dispose())
    this.disposers = []
    this.canvas.isDrawingMode = true
    this.canvas.skipTargetFind = false
    this.canvas.defaultCursor = "default"
  }

  drag(event) {
    event.buttons && this.canvas.relativePan(new Point(event.movementX, event.movementY))
  }
}