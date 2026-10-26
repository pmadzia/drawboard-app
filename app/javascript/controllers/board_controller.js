import { Controller } from "@hotwired/stimulus"
import Whiteboard from "../board/whiteboard"
import Viewport from "../board/viewport"
import PanTool from "../board/pan_tool"

const PRESS = { " ": "enable" }
const RELEASE = { " ": "disable" }

export default class extends Controller {
  static targets = ["stage", "canvas", "zoomLabel"]

  connect() {
    this.whiteboard = new Whiteboard(this.canvasTarget)
    this.viewport = new Viewport(this.whiteboard.canvas, (zoom) => this.showZoom(zoom))
    this.panTool = new PanTool(this.whiteboard.canvas)
    this.observeStage()
  }

  disconnect() {
    this.observer.disconnect()
    this.whiteboard.dispose()
  }

  observeStage() {
    this.observer = new ResizeObserver(() => this.resizeBoard())
    this.observer.observe(this.stageTarget)
  }

  resizeBoard() {
    const { width, height } = this.stageTarget.getBoundingClientRect()
    this.whiteboard.resize(width, height)
  }

  showZoom(zoom) {
    this.zoomLabelTarget.textContent = `${Math.round(zoom * 100)}%`
  }

  zoomIn() { this.viewport.zoomIn() }
  zoomOut() { this.viewport.zoomOut() }
  resetView() { this.viewport.reset() }

  pressKey(event) { this.runKey(PRESS, event) }
  releaseKey(event) { this.runKey(RELEASE, event) }

  runKey(actions, event) {
    const name = actions[event.key]
    this.panTool[name]?.()
    name && event.preventDefault()
  }
}