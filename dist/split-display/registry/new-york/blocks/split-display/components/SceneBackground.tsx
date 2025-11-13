'use client';

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function SceneBackground({ color }: { color?: string }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = color ? new THREE.Color(color) : null
  }, [color, scene])
  return null
}