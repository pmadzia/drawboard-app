import Snapshot from "./snapshot"

export default class Exporter {
  constructor(canvas) {
    this.canvas = canvas
  }

  async downloadJpeg(filename) {
    const snapshot = await Snapshot.fromCanvas(this.canvas)
    this.save(snapshot.createExport(), filename)
  }

  save(url, filename) {
    Object.assign(document.createElement("a"), { href: url, download: filename }).click()
  }
}