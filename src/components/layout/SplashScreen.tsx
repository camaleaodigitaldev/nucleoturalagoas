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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "white",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
        transition: "opacity 0.6s ease",
      }}
    >
      <video
        ref={videoRef}
        src="/splash.mp4"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  )
}
