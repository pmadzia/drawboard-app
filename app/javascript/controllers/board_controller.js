import { Controller } from "@hotwired/stimulus"
import Whiteboard from "../board/whiteboard"
import Viewport from "../board/viewport"
import BoardApi from "../board/board_api"
import Synchronizer from "../board/synchronizer"
import Style from "../board/style"
import Toolbox from "../board/toolbox"
import { buildTools } from "../board/tools"
import Thumbnailer from "../board/thumbnailer"
import Exporter from "../board/exporter"

export default class extends Controller {
  static targets = ["stage", "canvas", "zoomLabel", "toolButton"]
  static values = { slug: String, title: String }

  connect() {
    const canvas = this.createWhiteboard()
    this.thumbnailer = new Thumbnailer(canvas, this.slugValue)
    this.exporter = new Exporter(canvas)
    this.toolbox = new Toolbox(buildTools(canvas, new Style()), (name) => this.markTool(name))
    this.synchronizer = new Synchronizer(canvas, new BoardApi(this.slugValue), this.slugValue)
    this.synchronizer.start()
    this.toolbox.select("pen")
    this.observeStage()
  }

  disconnect() {
    this.observer.disconnect()
    this.thumbnailer.flush()
    this.synchronizer.stop()
    this.whiteboard.dispose()
  }

  createWhiteboard() {
    this.whiteboard = new Whiteboard(this.canvasTarget)
    this.viewport = new Viewport(this.whiteboard.canvas, (zoom) => this.showZoom(zoom))
    return this.whiteboard.canvas
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

  selectTool(event) {
    this.toolbox.select(event.params.name)
  }

  startPanning(event) {
    event.preventDefault()
    this.toolbox.hold("pan")
  }

  stopPanning() {
    this.toolbox.release()
  }

  markTool(name) {
    this.toolButtonTargets.forEach((el) =>
      el.classList.toggle("active", el.getAttribute("data-board-name-param") === name))
  }

  exportJpeg() {
    return this.exporter.downloadJpeg(`${this.titleValue}.jpg`)
  }
}