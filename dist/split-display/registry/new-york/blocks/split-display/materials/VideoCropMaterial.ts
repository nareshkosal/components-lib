'use client';

import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Custom Shader Material for UV cropping
export const VideoCropMaterial = shaderMaterial(
  {
    map: null,
    uvOffset: new THREE.Vector2(0, 0),
    uvScale: new THREE.Vector2(1, 1),
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  // fragment shader
  `
    uniform sampler2D map;
    uniform vec2 uvOffset;
    uniform vec2 uvScale;
    varying vec2 vUv;
    void main() {
      vec2 croppedUv = vUv * uvScale + uvOffset;
      gl_FragColor = texture2D(map, croppedUv);
    }
  `
)

extend({ VideoCropMaterial })

declare module 'react' {
  interface IntrinsicElements {
    videoCropMaterial: {
      map?: THREE.Texture
      uvOffset?: [number, number]
      uvScale?: [number, number]
    }
  }
}