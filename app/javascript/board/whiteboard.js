import { Canvas, PencilBrush } from "fabric"

export default class Whiteboard {
  constructor(element) {
    this.canvas = new Canvas(element, {
      selection: false, perPixelTargetFind: true, targetFindTolerance: 8
    })
    this.canvas.freeDrawingBrush = new PencilBrush(this.canvas)
    this.canvas.on("object:added", ({ target }) => target.set({ selectable: false }))
  }

  resize(width, height) {
    this.canvas.setDimensions({ width, height })
  }

  dispose() {
    this.canvas.dispose()
  }
}