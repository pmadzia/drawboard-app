import Tool from "./tool"
import { ERASER_CURSOR } from "../cursors"

export default class EraserTool extends Tool {
  activate() {
    this.configure({ cursor: ERASER_CURSOR, hitTest: true })
    this.listen("mouse:down", ({ target }) => this.erase(target))
    this.listen("mouse:move", ({ e, target }) => e.buttons && this.erase(target))
  }

  erase(target) {
    [target].filter(Boolean).forEach((object) => {
      this.canvas.remove(object)
      this.canvas.fire("object:erased", { target: object })
    })
  }
}