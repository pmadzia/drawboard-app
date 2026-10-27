export default class Tool {
  constructor(canvas, style) {
    this.canvas = canvas
    this.style = style
    this.listeners = []
  }

  activate() {}

  deactivate() {
    this.listeners.forEach((stop) => stop())
    this.listeners = []
  }

  listen(event, handler) {
    this.listeners.push(this.canvas.on(event, handler))
  }

  configure({ drawing = false, cursor = "default", hitTest = false }) {
    this.canvas.isDrawingMode = drawing
    this.canvas.skipTargetFind = !hitTest
    this.showCursor(cursor)
  }

  showCursor(cursor) {
    Object.assign(this.canvas, {
      defaultCursor: cursor, hoverCursor: cursor, freeDrawingCursor: cursor
    })
  }
}