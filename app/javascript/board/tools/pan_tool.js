import { Point } from "fabric"
import Tool from "./tools/tool"

export default class PanTool extends Tool {
  activate() {
    this.configure({ cursor: "grab" })
    this.listen("mouse:down", () => this.showCursor("grabbing"))
    this.listen("mouse:up", () => this.showCursor("grab"))
    this.listen("mouse:move", ({ e }) => this.drag(e))
  }

  drag(event) {
    event.buttons && this.canvas.relativePan(new Point(event.movementX, event.movementY))
  }
}