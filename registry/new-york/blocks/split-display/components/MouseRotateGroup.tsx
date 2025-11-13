'use client';

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function MouseRotateGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.y = (e.clientX / window.innerWidth) * 2 - 1
      target.current.x = (e.clientY / window.innerHeight) * 2 - 1
      target.current.y *= 0.5
      target.current.x *= 0.3
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.08
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.08
    }
  })

  return <group ref={group}>{children}</group>
}