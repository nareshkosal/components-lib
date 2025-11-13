'use client';

import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import '../../split-display/materials/VideoCropMaterial'

type Props = {
  video: HTMLVideoElement | null
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  uvOffset: [number, number]
  uvScale: [number, number]
  isCenter?: boolean
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
}

export function VideoPanel({
  video,
  position,
  rotation,
  size,
  uvOffset,
  uvScale,
  isCenter = false,
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
}: Props) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null)

  useEffect(() => {
    if (!video) return
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBAFormat
    videoTexture.flipY = true
    videoTexture.colorSpace = THREE.SRGBColorSpace
    setTexture(videoTexture)
    return () => videoTexture.dispose()
  }, [video])

  useFrame(() => {
    if (texture && video && video.readyState >= video.HAVE_CURRENT_DATA) {
      texture.needsUpdate = true
    }
  })

  if (!texture) return null

  return (
    <group position={position} rotation={rotation}>
      {showFrame && (
        <mesh>
          <planeGeometry args={[size[0] + (isCenter ? framePaddingCenter : framePadding), size[1] + (isCenter ? framePaddingCenter : framePadding)]} />
          <meshBasicMaterial color={frameColor} />
        </mesh>
      )}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={size} />
        {/* @ts-expect-error */}
        <videoCropMaterial map={texture} uvOffset={uvOffset} uvScale={uvScale} />
      </mesh>
      {isCenter && (
        <>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[size[0] + 0.15, size[1] + 0.15]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[size[0] + 0.3, size[1] + 0.3]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.05} />
          </mesh>
        </>
      )}
    </group>
  )
}