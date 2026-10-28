import Tool from "./tool"

export default class PenTool extends Tool {
  activate() {
    this.configure({ drawing: true, cursor: "crosshair" })
    this.refresh()
  }

  refresh() {
    Object.assign(this.canvas.freeDrawingBrush, {
      color: this.style.color, width: this.style.width
    })
  }
}