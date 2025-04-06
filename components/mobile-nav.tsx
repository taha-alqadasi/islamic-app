"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Compass, Calendar, BookOpen, MessageSquareQuote, FileText, Calculator, Bell } from "lucide-react"

export default function MobileNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const routes = [
    { name: "الرئيسية", path: "/", icon: Home },
    { name: "القبلة", path: "/qibla", icon: Compass },
    { name: "التقويم", path: "/hijri-calendar", icon: Calendar },
    { name: "القرآن", path: "/quran", icon: BookOpen },
    { name: "الأحاديث", path: "/hadith", icon: MessageSquareQuote },
    { name: "الأذكار", path: "/adhkar", icon: FileText },
    { name: "الصلاة", path: "/prayer-times", icon: Bell },
    { name: "الزكاة", path: "/zakat", icon: Calculator },
  ]

  // Handle scroll to hide/show the navigation bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center h-16">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.path

          return (
            <Link key={route.path} href={route.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center justify-center h-14 w-12 rounded-none ${
                  isActive ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{route.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

