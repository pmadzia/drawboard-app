import { util } from "fabric"
import { createConsumer } from "@rails/actioncable"

const HANDLERS = { added: "pullStroke" }

export default class Synchronizer {
  constructor(canvas, api, slug) {
    this.canvas = canvas
    this.api = api
    this.slug = slug
    this.knownStrokes = new Set()
  }

  subscribe() {
    this.consumer = createConsumer()
    this.subscription = this.consumer.subscriptions.create(
      { channel: "BoardChannel", slug: this.slug },
      { received: (message) => this.receive(message)}
    )
  }

  receive({ type, uid }) {
    this[HANDLERS[type]](uid)
  }

  start() {
    this.subscribe()
    this.canvas.on("path:created", ({ path }) => this.publish(path))
    return this.restore()
  }

  stop() {
    this.subscription.unsubscribe()
    this.consumer.disconnect()
  }

  async restore() {
    this.display(await this.api.fetchAll())
  }

  async pullStroke(uid) {
    this.display([await this.api.fetchOne(uid)])
  }

  async publish(path) {
    path.uid = crypto.randomUUID()
    this.knownStrokes.add(path.uid)
    await this.api.save(path.uid, path.toObject(["uid"]))
  }

  async display(list) {
    const newStrokes = list.filter((data) => !this.knownStrokes.has(data.uid))
    newStrokes.forEach((data) => this.knownStrokes.add(data.uid))
    this.canvas.add(...(await this.enliven(newStrokes)))
  }

  async enliven(list) {
    const objects = await util.enlivenObjects(list)
    objects.forEach((object, index) => (object.uid = list[index].uid))
    return objects
  }
}