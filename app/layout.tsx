import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/lib/theme-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MobileNav from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "شنين - التطبيق الإسلامي",
  description: "تطبيق إسلامي شامل يحتوي على مواقيت الصلاة، السبحة، الأذكار، وأسماء الله الحسنى",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Mada:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col rtl">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'