'use client';

import { Canvas } from '@react-three/fiber'
import type { CSSProperties, HTMLAttributes } from 'react'
import { MouseRotateGroup } from '@/components/split-display/MouseRotateGroup'
import { SceneBackground } from '@/components/split-display/SceneBackground'
import { VideoPanelGroup } from '@/components/split-display/VideoPanelGroup'
import { useVideoElement } from '@/hooks/use-video-element'
import { panels } from '@/lib/split-display/panels'

export type SplitDisplayProps = {
  videoUrl?: string
  showDebug?: boolean
  showLoadingOverlay?: boolean
  loadingOverlayClassName?: string
  debugPanelClassName?: string
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
  backgroundColor?: string
  canvasAlpha?: boolean
  sceneBackgroundColor?: string
  containerClassName?: string
  containerStyle?: CSSProperties
  containerProps?: HTMLAttributes<HTMLDivElement>
}

export function SplitDisplay({
  videoUrl = '',
  showDebug = false,
  showLoadingOverlay = true,
  loadingOverlayClassName = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white',
  debugPanelClassName = 'absolute top-4 right-4 w-fit bg-black bg-opacity-70 text-white p-3 rounded-lg text-sm',
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
  backgroundColor = 'black',
  canvasAlpha = false,
  sceneBackgroundColor,
  containerClassName = '',
  containerStyle,
  containerProps = {},
}: SplitDisplayProps) {
  const video = useVideoElement(videoUrl)

  return (
    <div
      {...containerProps}
      className={[
        'w-full h-screen',
        containerClassName,
        containerProps.className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        position: 'relative',
        background: backgroundColor,
        ...(containerProps.style || {}),
        ...(containerStyle || {}),
      }}
    >
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }} gl={{ antialias: true, alpha: canvasAlpha }}>
        <SceneBackground color={sceneBackgroundColor} />
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 8]} intensity={0.3} color="#8b5cf6" />
        <MouseRotateGroup>
          <VideoPanelGroup
            video={video}
            panels={panels}
            showFrame={showFrame}
            frameColor={frameColor}
            framePadding={framePadding}
            framePaddingCenter={framePaddingCenter}
          />
        </MouseRotateGroup>
      </Canvas>
      {!video && showLoadingOverlay && (
        <div className={loadingOverlayClassName}>Loading video...</div>
      )}
      {showDebug && video && (
        <div className={debugPanelClassName}>
          <div>Status: {video.paused ? 'Paused' : 'Playing'}</div>
          <div>Ready State: {video.readyState}/4</div>
          <div>Current Time: {video.currentTime.toFixed(1)}s</div>
          <div>Duration: {video.duration ? `${video.duration.toFixed(1)}s` : 'Unknown'}</div>
        </div>
      )}
    </div>
  )
}

export default SplitDisplay