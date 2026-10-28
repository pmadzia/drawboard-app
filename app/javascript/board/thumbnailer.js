import { patch } from "@rails/request.js"
import debounce from "lodash.debounce"
import Snapshot from "./snapshot"

const EVENTS = ["path:created", "object:erased"]
const DELAY = 2000

export default class Thumbnailer {
  constructor(canvas, slug) {
    this.canvas = canvas
    this.url = `/boards/${slug}/thumbnail`
    this.schedule = debounce(() => this.upload(), DELAY)
    EVENTS.forEach((name) => canvas.on(name, this.schedule))
  }

  flush() {
    return this.schedule.flush()
  }

  async upload() {
    const snapshot = await Snapshot.fromCanvas(this.canvas)
    const form = new FormData()
    form.append("image", await this.fetchBlob(snapshot.createThumbnail()), "thumbnail.jpg")
    return patch(this.url, { body: form })
  }

  async fetchBlob(dataUrl) {
    return (await fetch(dataUrl)).blob()
  }
}