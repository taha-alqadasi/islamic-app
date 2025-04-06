"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Palette, Check, Moon, Sun, Monitor, Settings, Heart, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme, type ThemeColor, type ThemeMode, type ThemeFont, type ThemeBackground } from "@/lib/theme-context"
import { useToast } from "@/components/ui/use-toast"

// بيانات الألوان
const themeColors = [
  { id: "green", name: "أخضر", color: "bg-green-500" },
  { id: "blue", name: "أزرق", color: "bg-blue-500" },
  { id: "purple", name: "بنفسجي", color: "bg-purple-500" },
  { id: "red", name: "أحمر", color: "bg-red-500" },
  { id: "orange", name: "برتقالي", color: "bg-orange-500" },
  { id: "teal", name: "فيروزي", color: "bg-teal-500" },
  { id: "pink", name: "وردي", color: "bg-pink-500" },
  { id: "indigo", name: "نيلي", color: "bg-indigo-500" },
]

// بيانات الخلفيات
const backgrounds = [
  { id: "mosque", name: "مسجد", image: "/placeholder.svg?height=100&width=200" },
  { id: "kaaba", name: "الكعبة", image: "/placeholder.svg?height=100&width=200" },
  { id: "medina", name: "المسجد النبوي", image: "/placeholder.svg?height=100&width=200" },
  { id: "quran", name: "القرآن الكريم", image: "/placeholder.svg?height=100&width=200" },
  { id: "pattern", name: "نقوش إسلامية", image: "/placeholder.svg?height=100&width=200" },
  { id: "calligraphy", name: "خط عربي", image: "/placeholder.svg?height=100&width=200" },
]

// بيانات الخطوط
const fontOptions = [
  { id: "naskh", name: "نسخ", sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
  { id: "kufi", name: "كوفي", sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
  { id: "thuluth", name: "ثلث", sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
  { id: "diwani", name: "ديواني", sample: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
]

export default function ThemesPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  // تحديث الإعدادات
  const handleThemeChange = (mode: ThemeMode) => {
    setTheme({ mode })
  }

  const handleColorChange = (color: ThemeColor) => {
    setTheme({ color })
  }

  const handleBackgroundChange = (background: ThemeBackground) => {
    setTheme({ background })
  }

  const handleFontChange = (font: ThemeFont) => {
    setTheme({ font })
  }

  // تحديث الإعدادات الإضافية
  const handleSettingsChange = (setting: "animations" | "fontSize" | "highContrast", value: boolean) => {
    if (setting === "fontSize") {
      setTheme({ fontSize: value ? "large" : "normal" })
    } else {
      setTheme({ [setting]: value })
    }
  }

  // تطبيق الثيم
  const applyTheme = () => {
    // إظهار رسالة نجاح
    toast({
      title: "تم تطبيق الثيم بنجاح",
      description: "تم تطبيق الإعدادات على جميع صفحات التطبيق",
    })
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

  // تحديد ما إذا كان الوضع الداكن مفعلاً
  const isDarkMode = theme.mode === "dark" || (theme.mode === "system" && theme.systemTheme === "dark")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">الثيمات الإسلامية</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            تخصيص المظهر
          </CardTitle>
          <CardDescription>قم بتخصيص مظهر التطبيق ليناسب ذوقك</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mode">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mode">الوضع</TabsTrigger>
              <TabsTrigger value="colors">الألوان</TabsTrigger>
              <TabsTrigger value="background">الخلفية</TabsTrigger>
              <TabsTrigger value="font">الخط</TabsTrigger>
            </TabsList>

            <TabsContent value="mode" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">وضع العرض</h3>
                  <RadioGroup
                    value={theme.mode}
                    onValueChange={(value) => handleThemeChange(value as ThemeMode)}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-2">
                        <Sun className="h-5 w-5" />
                        فاتح
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-2">
                        <Moon className="h-5 w-5" />
                        داكن
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        تلقائي (حسب النظام)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">إعدادات إضافية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">تأثيرات الحركة</Label>
                      <Switch
                        id="animations"
                        checked={theme.animations}
                        onCheckedChange={(checked) => handleSettingsChange("animations", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="largeText">نص كبير</Label>
                      <Switch
                        id="largeText"
                        checked={theme.fontSize === "large"}
                        onCheckedChange={(checked) => handleSettingsChange("fontSize", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="highContrast">تباين عالي</Label>
                      <Switch
                        id="highContrast"
                        checked={theme.highContrast}
                        onCheckedChange={(checked) => handleSettingsChange("highContrast", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-4">
              <div>
                <h3 className="text-lg font-medium mb-4">لون التطبيق الرئيسي</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themeColors.map((color) => (
                    <div
                      key={color.id}
                      className={`
                        p-4 rounded-md border cursor-pointer text-center transition-all duration-200
                        ${theme.color === color.id ? "border-primary ring-2 ring-primary/20" : ""}
                        ${theme.animations ? "hover:scale-105" : ""}
                      `}
                      onClick={() => handleColorChange(color.id as ThemeColor)}
                    >
                      <div className={`w-full h-12 rounded-md mb-2 ${color.color}`}>
                        {theme.color === color.id && (
                          <div className="flex items-center justify-center h-full">
                            <Check className="text-white h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <p>{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="background" className="mt-4">
              <div>
                <h3 className="text-lg font-medium mb-4">خلفية التطبيق</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    className={`
                      p-4 rounded-md border cursor-pointer text-center transition-all duration-200
                      ${theme.background === "" ? "border-primary ring-2 ring-primary/20" : ""}
                      ${theme.animations ? "hover:scale-105" : ""}
                    `}
                    onClick={() => handleBackgroundChange("")}
                  >
                    <div className="w-full h-24 rounded-md mb-2 bg-background border">
                      {theme.background === "" && (
                        <div className="flex items-center justify-center h-full">
                          <Check className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <p>بدون خلفية</p>
                  </div>

                  {backgrounds.map((bg) => (
                    <div
                      key={bg.id}
                      className={`
                        p-4 rounded-md border cursor-pointer text-center transition-all duration-200
                        ${theme.background === bg.id ? "border-primary ring-2 ring-primary/20" : ""}
                        ${theme.animations ? "hover:scale-105" : ""}
                      `}
                      onClick={() => handleBackgroundChange(bg.id as ThemeBackground)}
                    >
                      <div
                        className="w-full h-24 rounded-md mb-2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bg.image})` }}
                      >
                        {theme.background === bg.id && (
                          <div className="flex items-center justify-center h-full bg-black/30 rounded-md">
                            <Check className="text-white h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <p>{bg.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="font" className="mt-4">
              <div>
                <h3 className="text-lg font-medium mb-4">نوع الخط</h3>
                <div className="space-y-4">
                  {fontOptions.map((font) => (
                    <div
                      key={font.id}
                      className={`
                        p-4 rounded-md border cursor-pointer transition-all duration-200
                        ${theme.font === font.id ? "border-primary ring-2 ring-primary/20" : ""}
                        ${theme.animations ? "hover:translate-x-1" : ""}
                      `}
                      onClick={() => handleFontChange(font.id as ThemeFont)}
                      style={{ fontFamily: getFontFamily(font.id as ThemeFont) }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{font.name}</p>
                        {theme.font === font.id && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-xl mt-2 text-muted-foreground">{font.sample}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            onClick={applyTheme}
            className={`w-full ${theme.animations ? "transition-transform hover:scale-105" : ""}`}
          >
            تطبيق الثيم
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معاينة الثيم</CardTitle>
          <CardDescription>هكذا سيبدو تطبيقك بعد تطبيق الإعدادات المختارة</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              p-6 rounded-lg border overflow-hidden transition-all duration-300
              ${theme.background ? "bg-cover bg-center" : ""}
              ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
            `}
            style={{
              backgroundImage: theme.background
                ? `url(${backgrounds.find((bg) => bg.id === theme.background)?.image})`
                : "none",
              fontFamily: getFontFamily(theme.font),
            }}
          >
            <div
              className={`
                ${theme.background ? "bg-background/80 backdrop-blur-sm p-4 rounded-lg" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold`} style={{ color: getComputedColorValue(theme.color) }}>
                  بسم الله الرحمن الرحيم
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={theme.animations ? "transition-all hover:scale-110" : ""}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={theme.animations ? "transition-all hover:scale-110" : ""}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <p className={`${theme.fontSize === "large" ? "text-lg" : "text-base"}`}>
                  هذا مثال على كيفية ظهور النصوص والعناصر في التطبيق بعد تطبيق الثيم المختار.
                </p>

                <div className="flex flex-col space-y-2">
                  <div
                    className={`p-3 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} ${theme.animations ? "transition-all hover:bg-opacity-80" : ""}`}
                  >
                    قال تعالى: {'"إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا"'}
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge style={{ backgroundColor: getComputedColorValue(theme.color) }}>أذكار الصباح</Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={theme.animations ? "transition-all hover:scale-110" : ""}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={theme.animations ? "transition-all hover:scale-110" : ""}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    style={{
                      backgroundColor: getComputedColorValue(theme.color),
                      borderColor: getComputedColorValue(theme.color),
                    }}
                    className={theme.animations ? "transition-all hover:scale-105" : ""}
                  >
                    زر أساسي
                  </Button>
                  <Button variant="outline" className={theme.animations ? "transition-all hover:scale-105" : ""}>
                    زر ثانوي
                  </Button>
                </div>

                <Progress
                  value={65}
                  className="h-2"
                  style={
                    {
                      "--progress-background": getComputedColorValue(theme.color),
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

