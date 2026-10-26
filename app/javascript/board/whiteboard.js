import { Canvas, PencilBrush } from "fabric"

export default class Whiteboard {
  constructor(element) {
    this.canvas = new Canvas(element, { isDrawingMode: true, selection: false })
    this.canvas.freeDrawingBrush = new PencilBrush(this.canvas)
    this.canvas.freeDrawingBrush.width = 4
  }

  resize(width, height) {
    this.canvas.setDimensions({ width, height })
  }

  dispose() {
    this.canvas.dispose()
  }
}