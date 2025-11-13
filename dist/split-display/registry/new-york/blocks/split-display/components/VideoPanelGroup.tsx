'use client';

import { VideoPanel } from './VideoPanel'
import type { Panel } from '@/lib/split-display/panels'
import { getPanelsBoundingBox } from '@/lib/split-display/get-panels-bbox'

type Props = {
  video: HTMLVideoElement | null
  panels: Panel[]
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
}

export function VideoPanelGroup({
  video,
  panels,
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
}: Props) {
  const bbox = getPanelsBoundingBox(panels)

  return (
    <>
      {panels.map((panel, i) => {
        const [x, y] = panel.position
        const [w, h] = panel.size
        const u0 = (x - w / 2 - bbox.minX) / bbox.width
        const u1 = (x + w / 2 - bbox.minX) / bbox.width
        const v0 = (y - h / 2 - bbox.minY) / bbox.height
        const v1 = (y + h / 2 - bbox.minY) / bbox.height
        const uvOffset: [number, number] = [u0, v0]
        const uvScale: [number, number] = [u1 - u0, v1 - v0]

        return (
          <VideoPanel
            key={i}
            video={video}
            position={panel.position}
            rotation={panel.rotation}
            size={panel.size}
            uvOffset={uvOffset}
            uvScale={uvScale}
            isCenter={i === 2}
            showFrame={showFrame}
            frameColor={frameColor}
            framePadding={framePadding}
            framePaddingCenter={framePaddingCenter}
          />
        )
      })}
    </>
  )
}