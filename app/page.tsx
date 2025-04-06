"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Compass,
  Book,
  Calendar,
  Calculator,
  Clock,
  Moon,
  Heart,
  MessageSquareQuote,
  Palette,
  Bell,
  Hand,
  FileText,
  Sparkles,
} from "lucide-react"

export default function Home() {
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [currentHijriDate, setCurrentHijriDate] = useState("")
  const [nextPrayer, setNextPrayer] = useState({ name: "", time: "" })
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    // تعيين التحية بناءً على وقت اليوم
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("صباح الخير")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("مساء الخير")
    } else {
      setGreeting("مساء الخير")
    }

    // تعيين التاريخ الميلادي
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as const
    setCurrentDate(new Date().toLocaleDateString("ar-SA", options))

    // محاكاة التاريخ الهجري (في التطبيق الحقيقي سيتم استخدام مكتبة للتقويم الهجري)
    setCurrentHijriDate("15 رمضان 1445هـ")

    // محاكاة وقت الصلاة القادمة
    const prayers = [
      { name: "الفجر", time: "04:35" },
      { name: "الظهر", time: "12:20" },
      { name: "العصر", time: "15:45" },
      { name: "المغرب", time: "18:35" },
      { name: "العشاء", time: "20:05" },
    ]

    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    // البحث عن الصلاة القادمة
    let nextPrayerObj = null
    for (const prayer of prayers) {
      if (prayer.time > currentTime) {
        nextPrayerObj = prayer
        break
      }
    }

    // إذا لم يتم العثور على صلاة قادمة، فهذا يعني أن جميع صلوات اليوم قد مرت
    // لذا الصلاة القادمة هي صلاة الفجر غداً
    if (!nextPrayerObj) {
      nextPrayerObj = prayers[0]
    }

    setNextPrayer(nextPrayerObj)

    // حساب الوقت المتبقي للصلاة القادمة
    const updateRemainingTime = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const [nextHours, nextMinutes] = nextPrayerObj.time.split(":").map(Number)
      let nextPrayerMinutes = nextHours * 60 + nextMinutes

      // إذا كانت الصلاة القادمة هي الفجر وقد مرت جميع صلوات اليوم
      if (nextPrayerObj.name === "الفجر" && nextPrayerMinutes < currentTime) {
        nextPrayerMinutes += 24 * 60 // إضافة يوم كامل
      }

      const diffMinutes = nextPrayerMinutes - currentTime
      const hours = Math.floor(diffMinutes / 60)
      const minutes = diffMinutes % 60

      setTimeRemaining(`${hours} ساعة و ${minutes} دقيقة`)
    }

    updateRemainingTime()
    const interval = setInterval(updateRemainingTime, 60000) // تحديث كل دقيقة

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "القبلة",
      description: "تحديد اتجاه القبلة بدقة من موقعك الحالي",
      icon: <Compass className="h-8 w-8" />,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-300",
      link: "/qibla",
    },
    {
      title: "القرآن الكريم",
      description: "قراءة واستماع للقرآن الكريم مع التفسير",
      icon: <Book className="h-8 w-8" />,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-300",
      link: "/quran",
    },
    {
      title: "التقويم الهجري",
      description: "عرض التقويم الهجري والميلادي والمناسبات الإسلامية",
      icon: <Calendar className="h-8 w-8" />,
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-300",
      link: "/hijri-calendar",
    },
    {
      title: "حاسبة الزكاة",
      description: "حساب زكاة المال والذهب والفضة",
      icon: <Calculator className="h-8 w-8" />,
      color: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-600 dark:text-yellow-300",
      link: "/zakat",
    },
    {
      title: "مواقيت الصلاة",
      description: "عرض مواقيت الصلاة حسب موقعك",
      icon: <Clock className="h-8 w-8" />,
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-600 dark:text-red-300",
      link: "/prayer-times",
    },
    {
      title: "الأذكار",
      description: "أذكار الصباح والمساء وأذكار متنوعة",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-teal-100 dark:bg-teal-900",
      textColor: "text-teal-600 dark:text-teal-300",
      link: "/adhkar",
    },
    {
      title: "السبحة الإلكترونية",
      description: "سبحة إلكترونية للتسبيح وذكر الله",
      icon: <Hand className="h-8 w-8" />,
      color: "bg-emerald-100 dark:bg-emerald-900",
      textColor: "text-emerald-600 dark:text-emerald-300",
      link: "/tasbih",
    },
    {
      title: "تتبع رمضان",
      description: "تتبع صيامك وعباداتك خلال شهر رمضان",
      icon: <Moon className="h-8 w-8" />,
      color: "bg-indigo-100 dark:bg-indigo-900",
      textColor: "text-indigo-600 dark:text-indigo-300",
      link: "/ramadan",
    },
    {
      title: "الأدعية",
      description: "مجموعة من الأدعية المأثورة للمناسبات المختلفة",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-pink-100 dark:bg-pink-900",
      textColor: "text-pink-600 dark:text-pink-300",
      link: "/duas",
    },
    {
      title: "الأحاديث النبوية",
      description: "مجموعة من الأحاديث النبوية الشريفة",
      icon: <MessageSquareQuote className="h-8 w-8" />,
      color: "bg-orange-100 dark:bg-orange-900",
      textColor: "text-orange-600 dark:text-orange-300",
      link: "/hadith",
    },
    {
      title: "الثيمات الإسلامية",
      description: "تخصيص مظهر التطبيق بثيمات إسلامية",
      icon: <Palette className="h-8 w-8" />,
      color: "bg-cyan-100 dark:bg-cyan-900",
      textColor: "text-cyan-600 dark:text-cyan-300",
      link: "/themes",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ترحيب وملخص */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">تطبيق شنين الإسلامي</h1>
          <p className="text-xl text-muted-foreground">{greeting}! استكشف ميزات التطبيق الإسلامي الشاملة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* التاريخ */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                التاريخ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{currentDate}</p>
              <p className="text-muted-foreground">{currentHijriDate}</p>
            </CardContent>
          </Card>

          {/* الصلاة القادمة */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                الصلاة القادمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{nextPrayer.name}</p>
                  <p className="text-muted-foreground">متبقي: {timeRemaining}</p>
                </div>
                <p className="text-2xl font-bold">{nextPrayer.time}</p>
              </div>
            </CardContent>
          </Card>

          {/* أذكار اليوم */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                أذكار اليوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">أذكار الصباح والمساء</p>
                <Link href="/adhkar">
                  <Button size="sm">عرض الأذكار</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* الميزات */}
      <h2 className="text-2xl font-bold mb-6">ميزات التطبيق</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link href={feature.link} key={index}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${feature.color}`}>
                    <div className={feature.textColor}>{feature.icon}</div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  استكشف
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

