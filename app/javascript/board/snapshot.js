import { StaticCanvas, Group, util } from "fabric"

const PADDING = 32
const MAX_SIDE = 4096
const BLANK = { left: 0, top: 0, width: 640, height: 400 }

export default class Snapshot {
  static async from(list) {
    return new Snapshot(await util.enlivenObjects(list))
  }

  static fromCanvas(canvas) {
    return Snapshot.from(canvas.toObject(["uid"]).objects)
  }

  constructor(objects) {
    this.objects = objects
  }

  createThumbnail() {
    return this.render({ maxSide: 320, padding: 16, quality: 0.8 })
  }

  createExport() {
    return this.render({ maxSide: MAX_SIDE, padding: PADDING, quality: 0.92 })
  }

  render({ maxSide, padding, quality }) {
    const box = this.measure()
    const region = {
      left: box.left - padding, top: box.top - padding,
      width: box.width + padding * 2, height: box.height + padding * 2
    }
    return this.capture(region, quality, Math.min(1, maxSide / Math.max(region.width, region.height)))
  }

  capture(region, quality, multiplier) {
    const canvas = new StaticCanvas(undefined, { ...region, backgroundColor: "#ffffff" })
    canvas.add(...this.objects)
    const url = canvas.toDataURL({ format: "jpeg", quality, multiplier, ...region })
    canvas.dispose()
    return url
  }

  measure() {
    return [BLANK, new Group(this.objects).getBoundingRect()][Number(this.objects.length > 0)]
  }
}