import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const { path } = body as { path?: string; tag?: string }

  try {
    if (path) {
      revalidatePath(path)
    }
    if (!path) {
      // Revalidate all main paths
      revalidatePath("/")
      revalidatePath("/associados")
      revalidatePath("/noticias")
      revalidatePath("/eventos")
      revalidatePath("/quem-somos")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 })
  }
}
