const OUTLINE = "M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"
const TOP_PART = "M10.207 2.914a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414z"
const BOTTOM_PART = "M8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"

const ERASER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
  <path d="${TOP_PART}" fill="#f4a6b8"/>
  <path d="${BOTTOM_PART}" fill="#ffffff"/>
  <path d="${OUTLINE}" fill="#1f1d36"/>
</svg>`

const HOTSPOT = "5 24"

function buildCursor(svg, hotspot) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot}, pointer`
}

export const ERASER_CURSOR = buildCursor(ERASER_SVG, HOTSPOT)