import * as React from "react"

import SplitDisplay from "@/registry/new-york/blocks/split-display/split-display"
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
  
      <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            Split display (WebGL video panels)
          </h2>
        </div>
        <div className="flex items-center justify-center min-h-[400px] relative">
          <SplitDisplay
            videoUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            containerClassName="h-[600px]"
            backgroundColor="black"
            sceneBackgroundColor="#000000"
            showFrame
          />
        </div>
      </div>
    </div>
  )
}
