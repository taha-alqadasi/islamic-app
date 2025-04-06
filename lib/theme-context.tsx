"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// تعريف أنواع البيانات
export type ThemeColor = "green" | "blue" | "purple" | "red" | "orange" | "teal" | "pink" | "indigo"
export type ThemeMode = "light" | "dark" | "system"
export type ThemeFont = "naskh" | "kufi" | "thuluth" | "diwani"
export type ThemeBackground = "" | "mosque" | "kaaba" | "medina" | "quran" | "pattern" | "calligraphy"

// تعريف نوع الثيم
export interface ThemeSettings {
  mode: ThemeMode
  color: ThemeColor
  background: ThemeBackground
  font: ThemeFont
  fontSize: "normal" | "large"
  animations: boolean
  highContrast: boolean
  systemTheme?: "light" | "dark" // القيمة الفعلية للثيم النظام
}

// القيم الافتراضية
const defaultTheme: ThemeSettings = {
  mode: "light",
  color: "green",
  background: "",
  font: "naskh",
  fontSize: "normal",
  animations: true,
  highContrast: false,
}

// إنشاء سياق الثيم
interface ThemeContextType {
  theme: ThemeSettings
  setTheme: (theme: Partial<ThemeSettings>) => void
  applyThemeToElement: (element: HTMLElement) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// مزود الثيم
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSettings>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // تحميل الثيم المحفوظ عند تحميل الصفحة
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("islamic_app_theme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setThemeState((prevTheme) => ({ ...prevTheme, ...parsedTheme }))
      } catch (e) {
        console.error("Error loading saved theme:", e)
      }
    }
  }, [])

  // مراقبة تغييرات وضع النظام
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme.mode === "system") {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light"
        setThemeState((prev) => ({
          ...prev,
          systemTheme: newSystemTheme,
        }))
        applyTheme({
          ...theme,
          systemTheme: newSystemTheme,
        })
      }
    }

    // تعيين القيمة الأولية
    setThemeState((prev) => ({
      ...prev,
      systemTheme: mediaQuery.matches ? "dark" : "light",
    }))

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mounted, theme.mode])

  // تطبيق الثيم عند تغييره
  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
    localStorage.setItem("islamic_app_theme", JSON.stringify(theme))
  }, [theme, mounted])

  // تحديث الثيم
  const setTheme = (newTheme: Partial<ThemeSettings>) => {
    setThemeState((prevTheme) => ({ ...prevTheme, ...newTheme }))
  }

  // الحصول على قيمة اللون المحسوبة
  const getComputedColorValue = (colorName: ThemeColor): string => {
    switch (colorName) {
      case "green":
        return "#10b981"
      case "blue":
        return "#3b82f6"
      case "purple":
        return "#8b5cf6"
      case "red":
        return "#ef4444"
      case "orange":
        return "#f97316"
      case "teal":
        return "#14b8a6"
      case "pink":
        return "#ec4899"
      case "indigo":
        return "#6366f1"
      default:
        return "#3b82f6"
    }
  }

  // الحصول على عائلة الخط
  const getFontFamily = (fontName: ThemeFont): string => {
    switch (fontName) {
      case "naskh":
        return "'Noto Naskh Arabic', 'Amiri', serif"
      case "kufi":
        return "'Noto Kufi Arabic', 'Scheherazade New', serif"
      case "thuluth":
        return "'Aref Ruqaa', 'Amiri', serif"
      case "diwani":
        return "'Mada', 'Tajawal', sans-serif"
      default:
        return "'Noto Naskh Arabic', 'Amiri', serif"
    }
  }

  // الحصول على مسار الخلفية
  const getBackgroundImage = (bgName: ThemeBackground): string => {
    if (!bgName) return "none"
    return `url(/backgrounds/${bgName}.jpg)`
  }

  // تطبيق الثيم على عنصر HTML
  const applyThemeToElement = (element: HTMLElement) => {
    if (!element) return

    // تطبيق الوضع (فاتح/داكن)
    const effectiveMode = theme.mode === "system" ? theme.systemTheme || "light" : theme.mode

    if (effectiveMode === "dark") {
      element.classList.add("dark-theme")
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      element.classList.remove("dark-theme")
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }

    // تطبيق التباين العالي
    if (theme.highContrast) {
      element.classList.add("high-contrast")
    } else {
      element.classList.remove("high-contrast")
    }

    // تطبيق حجم الخط
    if (theme.fontSize === "large") {
      element.classList.add("large-text")
    } else {
      element.classList.remove("large-text")
    }

    // تطبيق تأثيرات الحركة
    if (theme.animations) {
      element.classList.add("animations-enabled")
    } else {
      element.classList.remove("animations-enabled")
    }

    // تعيين متغيرات CSS
    element.style.setProperty("--primary-color", getComputedColorValue(theme.color))
    element.style.setProperty("--primary-color-rgb", hexToRgb(getComputedColorValue(theme.color)))
    element.style.setProperty("--font-family", getFontFamily(theme.font))
    element.style.setProperty("--bg-image", getBackgroundImage(theme.background))
  }

  // تطبيق الثيم على الصفحة بأكملها
  const applyTheme = (themeToApply: ThemeSettings) => {
    applyThemeToElement(document.body)

    // تطبيق الثيم على عناصر iframe إذا وجدت
    const iframes = document.querySelectorAll("iframe")
    iframes.forEach((iframe) => {
      try {
        if (iframe.contentDocument && iframe.contentDocument.body) {
          applyThemeToElement(iframe.contentDocument.body)
        }
      } catch (e) {
        // تجاهل أخطاء CORS
      }
    })
  }

  // تحويل لون hex إلى RGB
  const hexToRgb = (hex: string): string => {
    // إزالة # إذا وجدت
    hex = hex.replace(/^#/, "")

    // تحويل الرمز المختصر (مثل #03F) إلى الشكل الكامل (مثل #0033FF)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("")
    }

    // تحويل hex إلى RGB
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    return `${r}, ${g}, ${b}`
  }

  return <ThemeContext.Provider value={{ theme, setTheme, applyThemeToElement }}>{children}</ThemeContext.Provider>
}

// هوك استخدام الثيم
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

