"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Moon,
  Sun,
  Compass,
  Calendar,
  BookOpen,
  MessageSquareQuote,
  FileText,
  Calculator,
  Palette,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { name: "الرئيسية", path: "/", icon: null },
    { name: "اتجاه القبلة", path: "/qibla", icon: Compass },
    { name: "التقويم الهجري", path: "/hijri-calendar", icon: Calendar },
    { name: "القرآن الكريم", path: "/quran", icon: BookOpen },
    { name: "الأحاديث النبوية", path: "/hadith", icon: MessageSquareQuote },
    { name: "الأدعية", path: "/duas", icon: FileText },
    { name: "تتبع رمضان", path: "/ramadan", icon: Moon },
    { name: "حاسبة الزكاة", path: "/zakat", icon: Calculator },
    { name: "الثيمات", path: "/themes", icon: Palette },
    { name: "منبه الصلاة", path: "/prayer-alarm", icon: Bell },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]" dir="rtl">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => {
                  const Icon = route.icon
                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-2 py-3 text-lg rounded-md hover:bg-accent ${
                        pathname === route.path ? "bg-accent font-medium" : ""
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {route.name}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">شنين</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {routes.slice(0, 6).map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="تبديل الوضع المظلم"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}

