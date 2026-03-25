import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SplashScreen } from "@/components/layout/SplashScreen"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "turismo Alagoas",
    "NúcleoTur",
    "turismo Maceió",
    "agências de turismo",
    "hotelaria Alagoas",
    "associados turismo",
    "Maragogi",
    "Maceió turismo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SplashScreen />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
