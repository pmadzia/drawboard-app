import { Controller } from "@hotwired/stimulus"
import Whiteboard from "../board/whiteboard"
import Viewport from "../board/viewport"
import PanTool from "../board/pan_tool"
import BoardApi from "../board/board_api"
import Synchronizer from "../board/synchronizer"

const PRESS = { " ": "enable" }
const RELEASE = { " ": "disable" }

export default class extends Controller {
  static targets = ["stage", "canvas", "zoomLabel"]
  static values = { slug: String }

  connect() {
    this.whiteboard = new Whiteboard(this.canvasTarget)
    this.viewport = new Viewport(this.whiteboard.canvas, (zoom) => this.showZoom(zoom))
    this.panTool = new PanTool(this.whiteboard.canvas)
    this.synchronizer = new Synchronizer(
      this.whiteboard.canvas, new BoardApi(this.slugValue), this.slugValue
    )
    this.synchronizer.start()
    this.observeStage()
  }

  disconnect() {
    this.observer.disconnect()
    this.synchronizer.stop()
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