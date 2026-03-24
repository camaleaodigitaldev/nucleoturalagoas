import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/constants"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? SITE_NAME
  const description = searchParams.get("description") ?? "Turismo de Alagoas"
  const type = searchParams.get("type") ?? "default"

  const bgColor = type === "noticia" ? "#0f766e" : type === "evento" ? "#0369a1" : "#14b8a6"

  return new ImageResponse(
    (
      <div
        style={{
          background: bgColor,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: bgColor,
            }}
          >
            N
          </div>
          <span
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
