"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Moon,
  Sun,
  Settings,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Printer,
  Share2,
  Download,
  Bell,
  Bookmark,
  Star,
} from "lucide-react"
import { format, addMonths, subMonths, addYears, subYears, isToday } from "date-fns"
import { ar } from "date-fns/locale"

// بيانات الأشهر الهجرية
const hijriMonths = [
  { id: 1, name: "محرم", days: 30, description: "شهر محرم هو أول شهور السنة الهجرية، وهو من الأشهر الحرم." },
  { id: 2, name: "صفر", days: 29, description: "شهر صفر هو الشهر الثاني من شهور السنة الهجرية." },
  {
    id: 3,
    name: "ربيع الأول",
    days: 30,
    description: "شهر ربيع الأول هو الشهر الثالث من شهور السنة الهجرية، وفيه ولد النبي صلى الله عليه وسلم.",
  },
  { id: 4, name: "ربيع الثاني", days: 29, description: "شهر ربيع الثاني هو الشهر الرابع من شهور السنة الهجرية." },
  { id: 5, name: "جمادى الأولى", days: 30, description: "شهر جمادى الأولى هو الشهر الخامس من شهور السنة الهجرية." },
  { id: 6, name: "جمادى الآخرة", days: 29, description: "شهر جمادى الآخرة هو الشهر السادس من شهور السنة الهجرية." },
  { id: 7, name: "رجب", days: 30, description: "شهر رجب هو الشهر السابع من شهور السنة الهجرية، وهو من الأشهر الحرم." },
  { id: 8, name: "شعبان", days: 29, description: "شهر شعبان هو الشهر الثامن من شهور السنة الهجرية." },
  { id: 9, name: "رمضان", days: 30, description: "شهر رمضان هو الشهر التاسع من شهور السنة الهجرية، وهو شهر الصيام." },
  { id: 10, name: "شوال", days: 29, description: "شهر شوال هو الشهر العاشر من شهور السنة الهجرية، وفيه عيد الفطر." },
  {
    id: 11,
    name: "ذو القعدة",
    days: 30,
    description: "شهر ذو القعدة هو الشهر الحادي عشر من شهور السنة الهجرية، وهو من الأشهر الحرم.",
  },
  {
    id: 12,
    name: "ذو الحجة",
    days: 29,
    description: "شهر ذو الحجة هو الشهر الثاني عشر من شهور السنة الهجرية، وفيه الحج وعيد الأضحى، وهو من الأشهر الحرم.",
  },
]

// بيانات الأشهر الميلادية
const gregorianMonths = [
  { id: 1, name: "يناير", days: 31 },
  { id: 2, name: "فبراير", days: 28 }, // 29 في السنة الكبيسة
  { id: 3, name: "مارس", days: 31 },
  { id: 4, name: "أبريل", days: 30 },
  { id: 5, name: "مايو", days: 31 },
  { id: 6, name: "يونيو", days: 30 },
  { id: 7, name: "يوليو", days: 31 },
  { id: 8, name: "أغسطس", days: 31 },
  { id: 9, name: "سبتمبر", days: 30 },
  { id: 10, name: "أكتوبر", days: 31 },
  { id: 11, name: "نوفمبر", days: 30 },
  { id: 12, name: "ديسمبر", days: 31 },
]

// بيانات المناسبات الإسلامية
const islamicEvents = [
  {
    id: 1,
    title: "رأس السنة الهجرية",
    date: { day: 1, month: 1 },
    description: "بداية السنة الهجرية، وهي ذكرى هجرة النبي صلى الله عليه وسلم من مكة إلى المدينة.",
    type: "ذكرى",
    importance: "مهم",
  },
  {
    id: 2,
    title: "يوم عاشوراء",
    date: { day: 10, month: 1 },
    description:
      "اليوم العاشر من محرم، وفيه يستحب الصيام، وهو اليوم الذي نجى الله فيه موسى عليه السلام وقومه من فرعون.",
    type: "عبادة",
    importance: "مهم",
  },
  {
    id: 3,
    title: "المولد النبوي الشريف",
    date: { day: 12, month: 3 },
    description: "ذكرى مولد النبي محمد صلى الله عليه وسلم في 12 ربيع الأول.",
    type: "ذكرى",
    importance: "مهم",
  },
  {
    id: 4,
    title: "ليلة الإسراء والمعراج",
    date: { day: 27, month: 7 },
    description: "ذكرى رحلة الإسراء والمعراج للنبي صلى الله عليه وسلم في 27 رجب.",
    type: "ذكرى",
    importance: "مهم",
  },
  {
    id: 5,
    title: "ليلة النصف من شعبان",
    date: { day: 15, month: 8 },
    description: "ليلة النصف من شعبان، وفيها يستحب قيام الليل والدعاء.",
    type: "عبادة",
    importance: "مهم",
  },
  {
    id: 6,
    title: "بداية شهر رمضان",
    date: { day: 1, month: 9 },
    description: "بداية شهر رمضان المبارك، شهر الصيام والقيام والقرآن.",
    type: "عبادة",
    importance: "مهم جداً",
  },
  {
    id: 7,
    title: "ليلة القدر (المرجحة)",
    date: { day: 27, month: 9 },
    description: "ليلة القدر، وهي خير من ألف شهر، ويتحرى المسلمون قيامها في العشر الأواخر من رمضان، وأرجحها ليلة 27.",
    type: "عبادة",
    importance: "مهم جداً",
  },
  {
    id: 8,
    title: "عيد الفطر",
    date: { day: 1, month: 10 },
    description: "عيد الفطر، وهو أول أيام شهر شوال، ويأتي بعد انتهاء شهر رمضان المبارك.",
    type: "عيد",
    importance: "مهم جداً",
  },
  {
    id: 9,
    title: "يوم عرفة",
    date: { day: 9, month: 12 },
    description: "يوم عرفة، وهو اليوم التاسع من ذي الحجة، ويستحب صيامه لغير الحاج.",
    type: "عبادة",
    importance: "مهم جداً",
  },
  {
    id: 10,
    title: "عيد الأضحى",
    date: { day: 10, month: 12 },
    description: "عيد الأضحى، وهو اليوم العاشر من ذي الحجة، ويستمر أربعة أيام، وفيه تذبح الأضاحي.",
    type: "عيد",
    importance: "مهم جداً",
  },
]

// بيانات الأيام الفضيلة
const specialDays = [
  {
    id: 1,
    title: "يوم الاثنين",
    description: "يستحب صيام يوم الاثنين، وفيه تعرض الأعمال.",
    type: "صيام",
    importance: "مستحب",
  },
  {
    id: 2,
    title: "يوم الخميس",
    description: "يستحب صيام يوم الخميس، وفيه تعرض الأعمال.",
    type: "صيام",
    importance: "مستحب",
  },
  {
    id: 3,
    title: "أيام البيض",
    description: "يستحب صيام أيام البيض، وهي 13 و14 و15 من كل شهر هجري.",
    type: "صيام",
    importance: "مستحب",
  },
  {
    id: 4,
    title: "يوم الجمعة",
    description: "يوم الجمعة هو سيد الأيام، وفيه ساعة إجابة، ويكره إفراده بالصيام.",
    type: "عبادة",
    importance: "مهم",
  },
  {
    id: 5,
    title: "الست من شوال",
    description: "يستحب صيام ستة أيام من شوال بعد رمضان.",
    type: "صيام",
    importance: "مستحب",
  },
  {
    id: 6,
    title: "العشر الأوائل من ذي الحجة",
    description: "العشر الأوائل من ذي الحجة، وهي أيام فاضلة يستحب فيها الإكثار من العمل الصالح.",
    type: "عبادة",
    importance: "مهم",
  },
  {
    id: 7,
    title: "أيام التشريق",
    description: "أيام التشريق هي 11 و12 و13 من ذي الحجة، وهي أيام أكل وشرب وذكر لله.",
    type: "عبادة",
    importance: "مهم",
  },
]

export default function IslamicCalendarPage() {
  // حالة التطبيق
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("hijri")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hijriDate, setHijriDate] = useState({ day: 15, month: 9, year: 1445 })
  const [gregorianDate, setGregorianDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [reminders, setReminders] = useState<number[]>([])

  // إعدادات
  const [showGregorianDate, setShowGregorianDate] = useState(true)
  const [showHijriDate, setShowHijriDate] = useState(true)
  const [showEventNotifications, setShowEventNotifications] = useState(true)
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<"sunday" | "saturday" | "monday">("sunday")

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("islamic_calendar_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setShowGregorianDate(settings.showGregorianDate ?? true)
          setShowHijriDate(settings.showHijriDate ?? true)
          setShowEventNotifications(settings.showEventNotifications ?? true)
          setFirstDayOfWeek(settings.firstDayOfWeek ?? "sunday")
        }

        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("islamic_calendar_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل التذكيرات
        const savedReminders = localStorage.getItem("islamic_calendar_reminders")
        if (savedReminders) {
          setReminders(JSON.parse(savedReminders))
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "islamic_calendar_settings",
      JSON.stringify({
        darkMode,
        showGregorianDate,
        showHijriDate,
        showEventNotifications,
        firstDayOfWeek,
      }),
    )
  }, [darkMode, showGregorianDate, showHijriDate, showEventNotifications, firstDayOfWeek])

  useEffect(() => {
    localStorage.setItem("islamic_calendar_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("islamic_calendar_reminders", JSON.stringify(reminders))
  }, [reminders])

  // الانتقال إلى الشهر التالي
  const nextMonth = () => {
    if (activeTab === "hijri") {
      // انتقال للشهر الهجري التالي
      const nextMonth = hijriDate.month === 12 ? 1 : hijriDate.month + 1
      const nextYear = hijriDate.month === 12 ? hijriDate.year + 1 : hijriDate.year
      setHijriDate({ ...hijriDate, month: nextMonth, year: nextYear })
    } else {
      // انتقال للشهر الميلادي التالي
      setGregorianDate(addMonths(gregorianDate, 1))
    }
  }

  // الانتقال إلى الشهر السابق
  const prevMonth = () => {
    if (activeTab === "hijri") {
      // انتقال للشهر الهجري السابق
      const prevMonth = hijriDate.month === 1 ? 12 : hijriDate.month - 1
      const prevYear = hijriDate.month === 1 ? hijriDate.year - 1 : hijriDate.year
      setHijriDate({ ...hijriDate, month: prevMonth, year: prevYear })
    } else {
      // انتقال للشهر الميلادي السابق
      setGregorianDate(subMonths(gregorianDate, 1))
    }
  }

  // الانتقال إلى السنة التالية
  const nextYear = () => {
    if (activeTab === "hijri") {
      // انتقال للسنة الهجرية التالية
      setHijriDate({ ...hijriDate, year: hijriDate.year + 1 })
    } else {
      // انتقال للسنة الميلادية التالية
      setGregorianDate(addYears(gregorianDate, 1))
    }
  }

  // الانتقال إلى السنة السابقة
  const prevYear = () => {
    if (activeTab === "hijri") {
      // انتقال للسنة الهجرية السابقة
      setHijriDate({ ...hijriDate, year: hijriDate.year - 1 })
    } else {
      // انتقال للسنة الميلادية السابقة
      setGregorianDate(subYears(gregorianDate, 1))
    }
  }

  // الانتقال إلى اليوم الحالي
  const goToToday = () => {
    if (activeTab === "hijri") {
      setHijriDate({ day: 15, month: 9, year: 1445 }) // تاريخ هجري تقريبي للتوضيح
    } else {
      setGregorianDate(new Date())
    }
  }

  // عرض تفاصيل الحدث
  const viewEventDetails = (event: any) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (eventId: number) => {
    if (favorites.includes(eventId)) {
      setFavorites(favorites.filter((id) => id !== eventId))
    } else {
      setFavorites([...favorites, eventId])
    }
  }

  // إضافة أو إزالة من التذكيرات
  const toggleReminder = (eventId: number) => {
    if (reminders.includes(eventId)) {
      setReminders(reminders.filter((id) => id !== eventId))
    } else {
      setReminders([...reminders, eventId])
    }
  }

  // مشاركة الحدث
  const shareEvent = (event: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `${event.title}: ${event.description}\nالتاريخ: ${event.date.day} ${hijriMonths[event.date.month - 1].name}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard
        .writeText(
          `${event.title}: ${event.description}\nالتاريخ: ${event.date.day} ${hijriMonths[event.date.month - 1].name}`,
        )
        .then(() => {
          alert("تم نسخ معلومات الحدث إلى الحافظة")
        })
    }
  }

  // طباعة الحدث
  const printEvent = (event: any) => {
    const printContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center;">${event.title}</h1>
        <p style="text-align: center; font-size: 18px;">${event.description}</p>
        <hr style="margin: 20px 0;" />
        <div style="margin-bottom: 15px;">
          <strong>التاريخ:</strong> ${event.date.day} ${hijriMonths[event.date.month - 1].name}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>النوع:</strong> ${event.type}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>الأهمية:</strong> ${event.importance}
        </div>
      </div>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${event.title}</title>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // تنزيل الحدث كملف PDF
  const downloadEvent = (event: any) => {
    alert(`جاري تنزيل معلومات الحدث: ${event.title}`)
    // في التطبيق الحقيقي، سيتم تنفيذ عملية التنزيل كملف PDF هنا
  }

  // الحصول على أحداث الشهر الحالي
  const getCurrentMonthEvents = () => {
    if (activeTab === "hijri") {
      return islamicEvents.filter((event) => event.date.month === hijriDate.month)
    } else {
      const month = gregorianDate.getMonth() + 1
      // في التطبيق الحقيقي، سيتم تحويل التواريخ الهجرية إلى ميلادية للمقارنة
      return []
    }
  }

  // الحصول على أحداث اليوم
  const getTodayEvents = () => {
    // في التطبيق الحقيقي، سيتم مقارنة التاريخ الهجري الحالي مع تواريخ الأحداث
    return islamicEvents.filter((event) => event.date.day === hijriDate.day && event.date.month === hijriDate.month)
  }

  // الحصول على الأحداث القادمة
  const getUpcomingEvents = () => {
    // في التطبيق الحقيقي، سيتم ترتيب الأحداث حسب قربها من التاريخ الحالي
    return islamicEvents.slice(0, 5)
  }

  // إنشاء أيام الشهر الهجري
  const generateHijriMonthDays = () => {
    const days = []
    const daysInMonth = hijriMonths[hijriDate.month - 1].days

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = islamicEvents.filter((event) => event.date.day === i && event.date.month === hijriDate.month)
      days.push({
        day: i,
        events: dayEvents,
        isToday: i === hijriDate.day,
      })
    }

    return days
  }

  // إنشاء أيام الشهر الميلادي
  const generateGregorianMonthDays = () => {
    const days = []
    const year = gregorianDate.getFullYear()
    const month = gregorianDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        day: i,
        date,
        isToday: isToday(date),
      })
    }

    return days
  }

  // الحصول على اسم اليوم بالعربية
  const getArabicDayName = (date: Date) => {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    return days[date.getDay()]
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">التقويم الإسلامي</h1>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? "الوضع النهاري" : "الوضع الليلي"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSettings(true)}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>الإعدادات</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="hijri" className="flex items-center gap-1">
              <Moon className="h-4 w-4" />
              <span>التقويم الهجري</span>
            </TabsTrigger>
            <TabsTrigger value="gregorian" className="flex items-center gap-1">
              <Sun className="h-4 w-4" />
              <span>التقويم الميلادي</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم التقويم الهجري */}
          <TabsContent value="hijri" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevYear}>
                      <ChevronRight className="h-4 w-4" />
                      <ChevronRight className="h-4 w-4 -mr-2" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <CardTitle className="text-xl">
                      {hijriMonths[hijriDate.month - 1].name} {hijriDate.year}هـ
                    </CardTitle>
                    {showGregorianDate && (
                      <CardDescription>{format(gregorianDate, "MMMM yyyy", { locale: ar })}م</CardDescription>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextYear}>
                      <ChevronLeft className="h-4 w-4" />
                      <ChevronLeft className="h-4 w-4 -ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    <div className="text-center font-medium p-2">الأحد</div>
                    <div className="text-center font-medium p-2">الإثنين</div>
                    <div className="text-center font-medium p-2">الثلاثاء</div>
                    <div className="text-center font-medium p-2">الأربعاء</div>
                    <div className="text-center font-medium p-2">الخميس</div>
                    <div className="text-center font-medium p-2">الجمعة</div>
                    <div className="text-center font-medium p-2">السبت</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateHijriMonthDays().map((day, index) => (
                      <div
                        key={index}
                        className={`min-h-[80px] p-2 rounded-md border ${
                          day.isToday
                            ? "bg-primary/10 border-primary"
                            : darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-200"
                        } ${day.events.length > 0 ? "ring-1 ring-primary/20" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-lg ${day.isToday ? "font-bold text-primary" : ""}`}>{day.day}</span>
                          {day.events.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {day.events.length}
                            </Badge>
                          )}
                        </div>

                        {day.events.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {day.events.map((event) => (
                              <div
                                key={event.id}
                                className="text-xs p-1 rounded bg-primary/10 text-primary cursor-pointer truncate"
                                onClick={() => viewEventDetails(event)}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">أحداث الشهر</h3>
                  <div className="space-y-2">
                    {getCurrentMonthEvents().length > 0 ? (
                      getCurrentMonthEvents().map((event) => (
                        <div
                          key={event.id}
                          className={`p-3 rounded-md cursor-pointer ${
                            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() => viewEventDetails(event)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-2">
                              <div
                                className={`p-1 rounded-full ${event.type === "عيد" ? "bg-green-500/20" : event.type === "عبادة" ? "bg-blue-500/20" : "bg-amber-500/20"}`}
                              >
                                {event.type === "عيد" ? (
                                  <Star className="h-4 w-4 text-green-500" />
                                ) : event.type === "عبادة" ? (
                                  <Moon className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <Calendar className="h-4 w-4 text-amber-500" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {event.date.day} {hijriMonths[event.date.month - 1].name}
                                </div>
                              </div>
                            </div>
                            <Badge variant={event.importance === "مهم جداً" ? "default" : "secondary"}>
                              {event.importance}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">لا توجد أحداث في هذا الشهر</div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={goToToday}>
                  العودة إلى اليوم الحالي
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* قسم التقويم الميلادي */}
          <TabsContent value="gregorian" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevYear}>
                      <ChevronRight className="h-4 w-4" />
                      <ChevronRight className="h-4 w-4 -mr-2" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <CardTitle className="text-xl">{format(gregorianDate, "MMMM yyyy", { locale: ar })}م</CardTitle>
                    {showHijriDate && (
                      <CardDescription>
                        {hijriMonths[hijriDate.month - 1].name} {hijriDate.year}هـ
                      </CardDescription>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextYear}>
                      <ChevronLeft className="h-4 w-4" />
                      <ChevronLeft className="h-4 w-4 -ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    <div className="text-center font-medium p-2">الأحد</div>
                    <div className="text-center font-medium p-2">الإثنين</div>
                    <div className="text-center font-medium p-2">الثلاثاء</div>
                    <div className="text-center font-medium p-2">الأربعاء</div>
                    <div className="text-center font-medium p-2">الخميس</div>
                    <div className="text-center font-medium p-2">الجمعة</div>
                    <div className="text-center font-medium p-2">السبت</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateGregorianMonthDays().map((day, index) => (
                      <div
                        key={index}
                        className={`min-h-[80px] p-2 rounded-md border ${
                          day.isToday
                            ? "bg-primary/10 border-primary"
                            : darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-lg ${day.isToday ? "font-bold text-primary" : ""}`}>{day.day}</span>
                            <div className="text-xs text-muted-foreground">{getArabicDayName(day.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={goToToday}>
                  العودة إلى اليوم الحالي
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle>أحداث اليوم</CardTitle>
              <CardDescription>
                {hijriDate.day} {hijriMonths[hijriDate.month - 1].name} {hijriDate.year}هـ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getTodayEvents().length > 0 ? (
                <div className="space-y-3">
                  {getTodayEvents().map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-md cursor-pointer ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => viewEventDetails(event)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          {event.type === "عيد" ? (
                            <Star className="h-5 w-5 text-green-500" />
                          ) : event.type === "عبادة" ? (
                            <Moon className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Calendar className="h-5 w-5 text-amber-500" />
                          )}
                          <div className="font-medium">{event.title}</div>
                        </div>
                        <Badge variant={event.importance === "مهم جداً" ? "default" : "secondary"}>
                          {event.importance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">لا توجد أحداث اليوم</div>
              )}
            </CardContent>
          </Card>

          <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle>الأحداث القادمة</CardTitle>
              <CardDescription>المناسبات الإسلامية القادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getUpcomingEvents().map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-md cursor-pointer ${
                      darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => viewEventDetails(event)}
                  >
                    <div className="flex justify-between">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date.day} {hijriMonths[event.date.month - 1].name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("hijri")}>
                عرض كل الأحداث
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className={`mt-6 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <CardTitle>الأيام الفضيلة</CardTitle>
            <CardDescription>أيام لها فضل خاص في الإسلام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialDays.map((day) => (
                <div
                  key={day.id}
                  className={`p-4 rounded-md border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{day.title}</h3>
                    <Badge variant="outline">{day.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{day.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* نافذة تفاصيل الحدث */}
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    {selectedEvent.type === "عيد" ? (
                      <Star className="h-6 w-6 text-green-500" />
                    ) : selectedEvent.type === "عبادة" ? (
                      <Moon className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Calendar className="h-6 w-6 text-amber-500" />
                    )}
                    <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                  </div>
                  <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">
                        {selectedEvent.date.day} {hijriMonths[selectedEvent.date.month - 1].name}
                      </Badge>
                      <Badge variant="outline">{selectedEvent.type}</Badge>
                      <Badge variant={selectedEvent.importance === "مهم جداً" ? "default" : "secondary"}>
                        {selectedEvent.importance}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">الوصف</h3>
                      <p className="text-muted-foreground">{selectedEvent.description}</p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">التاريخ</h3>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <p className="font-medium">
                          {selectedEvent.date.day} {hijriMonths[selectedEvent.date.month - 1].name}
                        </p>
                      </div>
                    </div>

                    {selectedEvent.type === "عبادة" && (
                      <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <h3 className="text-lg font-medium mb-2">فضل هذا اليوم</h3>
                        <p className="text-muted-foreground">
                          {selectedEvent.title === "يوم عرفة" &&
                            "يوم عرفة هو أفضل أيام السنة، ويستحب صيامه لغير الحاج، وفيه يغفر الله الذنوب، قال النبي صلى الله عليه وسلم: «صيام يوم عرفة أحتسب على الله أن يكفر السنة التي قبله والسنة التي بعده»."}
                          {selectedEvent.title === "ليلة القدر (المرجحة)" &&
                            "ليلة القدر خير من ألف شهر، أي العبادة فيها خير من العبادة في ألف شهر، وفيها تنزل الملائكة والروح بإذن ربهم من كل أمر، سلام هي حتى مطلع الفجر."}
                          {selectedEvent.title === "يوم عاشوراء" &&
                            "يوم عاشوراء هو اليوم العاشر من محرم، وفيه يستحب الصيام، قال النبي صلى الله عليه وسلم: «صيام يوم عاشوراء أحتسب على الله أن يكفر السنة التي قبله»."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleFavorite(selectedEvent.id)}
                      className={favorites.includes(selectedEvent.id) ? "text-primary" : ""}
                    >
                      <Bookmark
                        className={`h-4 w-4 mr-2 ${
                          favorites.includes(selectedEvent.id) ? "fill-primary text-primary" : ""
                        }`}
                      />
                      {favorites.includes(selectedEvent.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => toggleReminder(selectedEvent.id)}
                      className={reminders.includes(selectedEvent.id) ? "text-primary" : ""}
                    >
                      <Bell
                        className={`h-4 w-4 mr-2 ${
                          reminders.includes(selectedEvent.id) ? "fill-primary text-primary" : ""
                        }`}
                      />
                      {reminders.includes(selectedEvent.id) ? "إلغاء التذكير" : "تذكير"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => shareEvent(selectedEvent)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" onClick={() => printEvent(selectedEvent)}>
                      <Printer className="h-4 w-4 mr-2" />
                      طباعة
                    </Button>
                    <Button variant="outline" onClick={() => downloadEvent(selectedEvent)}>
                      <Download className="h-4 w-4 mr-2" />
                      تنزيل
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* نافذة الإعدادات */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>إعدادات التقويم</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص تجربة التقويم الإسلامي
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المظهر</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">الوضع الليلي</Label>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات العرض</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showGregorianDate">عرض التاريخ الميلادي</Label>
                  <Switch id="showGregorianDate" checked={showGregorianDate} onCheckedChange={setShowGregorianDate} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showHijriDate">عرض التاريخ الهجري</Label>
                  <Switch id="showHijriDate" checked={showHijriDate} onCheckedChange={setShowHijriDate} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showEventNotifications">عرض إشعارات الأحداث</Label>
                  <Switch
                    id="showEventNotifications"
                    checked={showEventNotifications}
                    onCheckedChange={setShowEventNotifications}
                  />
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات أخرى</h3>
                <div className="space-y-2">
                  <Label htmlFor="firstDayOfWeek">أول يوم في الأسبوع</Label>
                  <Select
                    value={firstDayOfWeek}
                    onValueChange={(value: "sunday" | "saturday" | "monday") => setFirstDayOfWeek(value)}
                  >
                    <SelectTrigger className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                      <SelectValue placeholder="اختر أول يوم في الأسبوع" />
                    </SelectTrigger>
                    <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                      <SelectItem value="sunday">الأحد</SelectItem>
                      <SelectItem value="saturday">السبت</SelectItem>
                      <SelectItem value="monday">الإثنين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSettings(false)}>حفظ الإعدادات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

