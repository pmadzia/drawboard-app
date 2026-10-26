import { Point } from "fabric"

const LIMITS = { min: 0.1, max: 5 }
const STEP = 1.2
const WHEEL_ACTION = { true: "zoomWithWheel", false: "scrollWithWheel" }
const WHEEL_SPEED = 0.999

export default class Viewport {
  constructor(canvas, onZoom) {
    this.canvas = canvas
    this.onZoom = onZoom
    this.canvas.on("mouse:wheel", ({ e }) => this.handleWheel(e))
  }

  handleWheel(event) {
    event.preventDefault()
    this[WHEEL_ACTION[event.ctrlKey]](event)
  }

  zoomWithWheel(event) {
    this.zoomAt(WHEEL_SPEED ** event.deltaY, new Point(event.offsetX, event.offsetY))
  }

  scrollWithWheel(event) {
    this.canvas.relativePan(new Point(-event.deltaX, -event.deltaY))
  }

  zoomAt(factor, point) {
    this.canvas.zoomToPoint(point, this.clamp(this.canvas.getZoom() * factor))
    this.onZoom(this.canvas.getZoom())
  }

  zoomIn() {
    this.zoomAt(STEP, this.findCenter())
  }

  zoomOut() {
    this.zoomAt(1 / STEP, this.findCenter())
  }

  reset() {
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    this.onZoom(1)
  }

  findCenter() {
    return new Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2)
  }

  clamp(zoom) {
    return Math.min(Math.max(zoom, LIMITS.min), LIMITS.max)
  }
}