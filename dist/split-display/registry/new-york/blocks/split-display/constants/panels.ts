export type Panel = {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
}

export const panels: Panel[] = [
  { position: [-1.6, 2.5, -0.2], rotation: [0, -0.25, 0], size: [2, 2.5] },
  { position: [1.1, 2.5, 1.0], rotation: [0, 0.25, -0.1], size: [2, 2.8] },
  { position: [0, 0, 0.5], rotation: [0, 0, 0], size: [2.3, 4] },
  { position: [-0.9, -2.5, -0.2], rotation: [0, -0.2, 0.06], size: [1.7, 2.8] },
  { position: [0.9, -2.5, -0.2], rotation: [0, 0.2, -0.12], size: [1.8, 2.6] },
]