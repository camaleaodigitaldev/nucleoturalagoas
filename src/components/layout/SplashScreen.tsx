"use client"

import { useEffect, useRef, useState } from "react"

export function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("splash-shown")) return
    setVisible(true)

    // Fallback: dismiss after 5s in case video fails
    const fallback = setTimeout(dismiss, 5000)
    return () => clearTimeout(fallback)
  }, [])

  function dismiss() {
    setFading(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("splash-shown", "1")
    }, 600)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-600"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      <video
        ref={videoRef}
        src="/splash.mp4"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        className="max-w-xs w-full"
      />
    </div>
  )
}
