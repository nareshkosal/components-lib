'use client';

import { useEffect, useState } from 'react'

export function useVideoElement(videoUrl: string) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!videoUrl) return
    const videoElement = document.createElement('video')
    videoElement.src = videoUrl
    videoElement.crossOrigin = 'anonymous'
    videoElement.loop = true
    videoElement.muted = true
    videoElement.playsInline = true
    videoElement.preload = 'auto'
    videoElement.style.position = 'absolute'
    videoElement.style.width = '1px'
    videoElement.style.height = '1px'
    videoElement.style.top = '-9999px'
    videoElement.style.left = '-9999px'
    document.body.appendChild(videoElement)

    const handleCanPlay = () => {
      videoElement.play().then(() => setIsPlaying(true)).catch(() => {})
    }

    videoElement.addEventListener('canplay', handleCanPlay)
    videoElement.addEventListener('loadeddata', () => setVideo(videoElement))
    videoElement.addEventListener('play', () => setIsPlaying(true))
    videoElement.addEventListener('pause', () => setIsPlaying(false))

    videoElement.load()

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay)
      if (document.body.contains(videoElement)) {
        document.body.removeChild(videoElement)
      }
    }
  }, [videoUrl])

  useEffect(() => {
    if (video && !isPlaying) {
      const tryPlay = () => {
        video
          .play()
          .then(() => {
            setIsPlaying(true)
            document.removeEventListener('click', tryPlay)
            document.removeEventListener('touchstart', tryPlay)
          })
          .catch(() => {})
      }
      document.addEventListener('click', tryPlay)
      document.addEventListener('touchstart', tryPlay)
      return () => {
        document.removeEventListener('click', tryPlay)
        document.removeEventListener('touchstart', tryPlay)
      }
    }
  }, [video, isPlaying])

  return video
}