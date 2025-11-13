import type { Panel } from '../constants/panels'

export function getPanelsBoundingBox(panels: Panel[]) {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity
  panels.forEach(({ position, size }) => {
    const [x, y] = position
    const [w, h] = size
    minX = Math.min(minX, x - w / 2)
    maxX = Math.max(maxX, x + w / 2)
    minY = Math.min(minY, y - h / 2)
    maxY = Math.max(maxY, y + h / 2)
  })
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY }
}