export default class Toolbox {
  constructor(tools, onSelect) {
    this.tools = tools
    this.onSelect = onSelect
    this.name = null
    this.previous = null
  }

  select(name) {
    this.tools[this.name]?.deactivate()
    this.name = name
    this.tools[name].activate()
    this.onSelect(name)
  }

  hold(name) {
      this.previous ??= this.name
      this.select(name)
    }

  release() {
    this.previous && this.select(this.previous)
    this.previous = null
  }

  refresh() {
    this.tools[this.name].refresh()
  }
}