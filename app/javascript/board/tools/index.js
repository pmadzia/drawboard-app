import PenTool from "./pen_tool"
import EraserTool from "./eraser_tool"
import PanTool from "./pan_tool"

export function buildTools(canvas, style) {
  return {
    pen: new PenTool(canvas, style),
    eraser: new EraserTool(canvas, style),
    pan: new PanTool(canvas, style)
  }
}