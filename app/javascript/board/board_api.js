import { get, post } from "@rails/request.js"

export default class BoardApi {
  constructor(slug) {
    this.root = `/boards/${slug}/strokes`
  }

  async fetchAll() {
    return (await get(this.root, { responseKind: "json" })).json
  }

  async fetchOne(uid) {
    return (await get(`${this.root}/${uid}`, { responseKind: "json" })).json
  }

  async save(uid, data) {
    return post(this.root, { body: { uid, data }, responseKind: "json" })
  }
}