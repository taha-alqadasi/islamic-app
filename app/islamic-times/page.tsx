"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  CalendarIcon,
  Clock,
  Moon,
  Sun,
  Settings,
  MapPin,
  CalendarIcon as CalendarIconComponent,
  Search,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sunrise,
  Sunset,
  CloudMoon,
  CloudSun,
  Compass,
  ChurchIcon as Mosque,
  Utensils,
  Droplets,
  Star,
  Bookmark,
  Share2,
  Download,
  Printer,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

// بيانات المواقيت (محاكاة)
const prayerTimesData = {
  fajr: "04:23",
  sunrise: "05:52",
  dhuhr: "12:30",
  asr: "16:15",
  maghrib: "19:08",
  isha: "20:38",
}

// بيانات الأشهر الهجرية (محاكاة)
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

// بيانات المواقيت الشرعية (محاكاة)
const islamicTimesData = [
  {
    id: 1,
    title: "وقت صلاة الفجر",
    description: "يبدأ وقت صلاة الفجر من طلوع الفجر الصادق إلى طلوع الشمس.",
    category: "صلاة",
    icon: <Sunrise className="h-6 w-6" />,
    time: "من طلوع الفجر الصادق إلى طلوع الشمس",
    importance: "فرض",
    notes: "يستحب تأخير صلاة الفجر قليلاً حتى يتبين الفجر، ويكره النوم قبلها والحديث بعدها.",
  },
  {
    id: 2,
    title: "وقت صلاة الظهر",
    description: "يبدأ وقت صلاة الظهر من زوال الشمس إلى أن يصير ظل كل شيء مثله.",
    category: "صلاة",
    icon: <Sun className="h-6 w-6" />,
    time: "من زوال الشمس إلى أن يصير ظل كل شيء مثله",
    importance: "فرض",
    notes: "يستحب تأخير صلاة الظهر في شدة الحر إلى أن يبرد الوقت، ويستحب تعجيلها في غير ذلك.",
  },
  {
    id: 3,
    title: "وقت صلاة العصر",
    description: "يبدأ وقت صلاة العصر من أن يصير ظل كل شيء مثله إلى غروب الشمس.",
    category: "صلاة",
    icon: <CloudSun className="h-6 w-6" />,
    time: "من أن يصير ظل كل شيء مثله إلى غروب الشمس",
    importance: "فرض",
    notes: "يستحب تعجيل صلاة العصر ما لم تصفر الشمس، ويكره تأخيرها إلى اصفرار الشمس.",
  },
  {
    id: 4,
    title: "وقت صلاة المغرب",
    description: "يبدأ وقت صلاة المغرب من غروب الشمس إلى غياب الشفق الأحمر.",
    category: "صلاة",
    icon: <Sunset className="h-6 w-6" />,
    time: "من غروب الشمس إلى غياب الشفق الأحمر",
    importance: "فرض",
    notes: "يستحب تعجيل صلاة المغرب، ويكره تأخيرها إلى غياب الشفق.",
  },
  {
    id: 5,
    title: "وقت صلاة العشاء",
    description: "يبدأ وقت صلاة العشاء من غياب الشفق الأحمر إلى طلوع الفجر الصادق.",
    category: "صلاة",
    icon: <CloudMoon className="h-6 w-6" />,
    time: "من غياب الشفق الأحمر إلى طلوع الفجر الصادق",
    importance: "فرض",
    notes: "يستحب تأخير صلاة العشاء إلى ثلث الليل الأول، ويكره النوم قبلها والحديث بعدها.",
  },
  {
    id: 6,
    title: "وقت صيام رمضان",
    description: "يبدأ وقت صيام رمضان من طلوع الفجر الصادق إلى غروب الشمس.",
    category: "صيام",
    icon: <Utensils className="h-6 w-6" />,
    time: "من طلوع الفجر الصادق إلى غروب الشمس",
    importance: "فرض",
    notes: "يستحب تعجيل الفطر وتأخير السحور، ويكره الوصال في الصيام.",
  },
  {
    id: 7,
    title: "وقت الحج",
    description: "يبدأ وقت الحج من شهر شوال إلى العاشر من ذي الحجة، ويوم عرفة هو التاسع من ذي الحجة.",
    category: "حج",
    icon: <Mosque className="h-6 w-6" />,
    time: "من شهر شوال إلى العاشر من ذي الحجة",
    importance: "فرض",
    notes: "الوقوف بعرفة ركن من أركان الحج، ومن فاته الوقوف بعرفة فاته الحج.",
  },
  {
    id: 8,
    title: "وقت العمرة",
    description:
      "وقت العمرة طوال العام، ولكن يكره الإحرام بها في خمسة أيام: يوم عرفة، ويوم النحر، وأيام التشريق الثلاثة.",
    category: "عمرة",
    icon: <Compass className="h-6 w-6" />,
    time: "طوال العام",
    importance: "سنة",
    notes: "أفضل وقت للعمرة شهر رمضان، لقول النبي صلى الله عليه وسلم: «عمرة في رمضان تعدل حجة».",
  },
  {
    id: 9,
    title: "وقت الأضحية",
    description: "يبدأ وقت الأضحية من بعد صلاة عيد الأضحى يوم النحر إلى غروب شمس اليوم الثالث من أيام التشريق.",
    category: "أضحية",
    icon: <Droplets className="h-6 w-6" />,
    time: "من بعد صلاة عيد الأضحى إلى غروب شمس اليوم الثالث من أيام التشريق",
    importance: "سنة مؤكدة",
    notes: "يستحب أن يذبح الأضحية بنفسه، وأن يأكل منها ويهدي ويتصدق.",
  },
  {
    id: 10,
    title: "وقت صلاة الاستخارة",
    description: "وقت صلاة الاستخارة في أي وقت يجوز فيه صلاة النافلة، ويكره في أوقات النهي.",
    category: "صلاة",
    icon: <Star className="h-6 w-6" />,
    time: "في أي وقت يجوز فيه صلاة النافلة",
    importance: "سنة",
    notes: "يستحب أن يستخير الله تعالى في جميع أموره، وأن يستشير من يثق بدينه وعقله.",
  },
  {
    id: 11,
    title: "أوقات النهي عن الصلاة",
    description:
      "أوقات النهي عن الصلاة هي: بعد صلاة الفجر حتى ترتفع الشمس قيد رمح، وعند استواء الشمس حتى تزول، وبعد صلاة العصر حتى تغرب الشمس.",
    category: "صلاة",
    icon: <AlertTriangle className="h-6 w-6" />,
    time: "ثلاثة أوقات في اليوم",
    importance: "تحريم",
    notes: "يستثنى من النهي: قضاء الفوائت، وصلاة الجنازة، وسجود التلاوة، وتحية المسجد في المسجد الحرام والمسجد النبوي.",
  },
  {
    id: 12,
    title: "وقت زكاة الفطر",
    description: "يبدأ وقت إخراج زكاة الفطر من غروب شمس آخر يوم من رمضان، وينتهي بصلاة العيد.",
    category: "زكاة",
    icon: <Droplets className="h-6 w-6" />,
    time: "من غروب شمس آخر يوم من رمضان إلى صلاة العيد",
    importance: "واجب",
    notes: "يجوز تقديم زكاة الفطر قبل العيد بيوم أو يومين، والأفضل إخراجها يوم العيد قبل الصلاة.",
  },
  {
    id: 13,
    title: "وقت صلاة الكسوف",
    description: "يبدأ وقت صلاة الكسوف من بداية كسوف الشمس إلى انتهائه.",
    category: "صلاة",
    icon: <Sun className="h-6 w-6" />,
    time: "من بداية كسوف الشمس إلى انتهائه",
    importance: "سنة مؤكدة",
    notes: "يستحب أن تصلى صلاة الكسوف جماعة في المسجد، وأن يكثر فيها من الدعاء والاستغفار والصدقة.",
  },
  {
    id: 14,
    title: "وقت صلاة الخسوف",
    description: "يبدأ وقت صلاة الخسوف من بداية خسوف القمر إلى انتهائه.",
    category: "صلاة",
    icon: <Moon className="h-6 w-6" />,
    time: "من بداية خسوف القمر إلى انتهائه",
    importance: "سنة مؤكدة",
    notes: "صلاة الخسوف مثل صلاة الكسوف، ويستحب فيها ما يستحب في صلاة الكسوف.",
  },
  {
    id: 15,
    title: "وقت صلاة الاستسقاء",
    description: "وقت صلاة الاستسقاء في أي وقت يجوز فيه صلاة النافلة، ويكره في أوقات النهي.",
    category: "صلاة",
    icon: <Droplets className="h-6 w-6" />,
    time: "في أي وقت يجوز فيه صلاة النافلة",
    importance: "سنة",
    notes: "يستحب الخروج لصلاة الاستسقاء متواضعين متخشعين متضرعين، ويستحب أن يخرج معهم الشيوخ والصبيان.",
  },
]

// بيانات المدن (محاكاة)
const citiesData = [
  { id: "riyadh", name: "الرياض", country: "المملكة العربية السعودية", timezone: "Asia/Riyadh" },
  { id: "makkah", name: "مكة المكرمة", country: "المملكة العربية السعودية", timezone: "Asia/Riyadh" },
  { id: "madinah", name: "المدينة المنورة", country: "المملكة العربية السعودية", timezone: "Asia/Riyadh" },
  { id: "jeddah", name: "جدة", country: "المملكة العربية السعودية", timezone: "Asia/Riyadh" },
  { id: "cairo", name: "القاهرة", country: "مصر", timezone: "Africa/Cairo" },
  { id: "alexandria", name: "الإسكندرية", country: "مصر", timezone: "Africa/Cairo" },
  { id: "dubai", name: "دبي", country: "الإمارات العربية المتحدة", timezone: "Asia/Dubai" },
  { id: "abudhabi", name: "أبو ظبي", country: "الإمارات العربية المتحدة", timezone: "Asia/Dubai" },
  { id: "doha", name: "الدوحة", country: "قطر", timezone: "Asia/Qatar" },
  { id: "kuwait", name: "الكويت", country: "الكويت", timezone: "Asia/Kuwait" },
  { id: "manama", name: "المنامة", country: "البحرين", timezone: "Asia/Bahrain" },
  { id: "muscat", name: "مسقط", country: "عمان", timezone: "Asia/Muscat" },
  { id: "amman", name: "عمان", country: "الأردن", timezone: "Asia/Amman" },
  { id: "damascus", name: "دمشق", country: "سوريا", timezone: "Asia/Damascus" },
  { id: "baghdad", name: "بغداد", country: "العراق", timezone: "Asia/Baghdad" },
  { id: "beirut", name: "بيروت", country: "لبنان", timezone: "Asia/Beirut" },
  { id: "jerusalem", name: "القدس", country: "فلسطين", timezone: "Asia/Jerusalem" },
  { id: "istanbul", name: "إسطنبول", country: "تركيا", timezone: "Europe/Istanbul" },
  { id: "casablanca", name: "الدار البيضاء", country: "المغرب", timezone: "Africa/Casablanca" },
  { id: "tunis", name: "تونس", country: "تونس", timezone: "Africa/Tunis" },
  { id: "algiers", name: "الجزائر", country: "الجزائر", timezone: "Africa/Algiers" },
  { id: "tripoli", name: "طرابلس", country: "ليبيا", timezone: "Africa/Tripoli" },
  { id: "khartoum", name: "الخرطوم", country: "السودان", timezone: "Africa/Khartoum" },
  { id: "sanaa", name: "صنعاء", country: "اليمن", timezone: "Asia/Aden" },
  { id: "mogadishu", name: "مقديشو", country: "الصومال", timezone: "Africa/Mogadishu" },
]

// طرق حساب مواقيت الصلاة
const calculationMethods = [
  { id: "mwl", name: "رابطة العالم الإسلامي", description: "18° للفجر، 17° للعشاء" },
  { id: "isna", name: "جمعية أمريكا الشمالية الإسلامية", description: "15° للفجر، 15° للعشاء" },
  { id: "egypt", name: "الهيئة المصرية العامة للمساحة", description: "19.5° للفجر، 17.5° للعشاء" },
  { id: "makkah", name: "جامعة أم القرى", description: "18.5° للفجر، 90 دقيقة بعد المغرب للعشاء" },
  { id: "karachi", name: "جامعة العلوم الإسلامية، كراتشي", description: "18° للفجر، 18° للعشاء" },
  { id: "tehran", name: "معهد الجيوفيزياء، جامعة طهران", description: "17.7° للفجر، 14° للعشاء" },
  { id: "shia", name: "الشيعة الإثنا عشرية", description: "16° للفجر، 14° للعشاء" },
]

export default function IslamicTimesPage() {
  // حالة التطبيق
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("prayer-times")
  const [selectedCity, setSelectedCity] = useState("riyadh")
  const [selectedCalculationMethod, setSelectedCalculationMethod] = useState("mwl")
  const [date, setDate] = useState<Date>(new Date())
  const [hijriDate, setHijriDate] = useState({ day: 1, month: 9, year: 1445 })
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTimes, setFilteredTimes] = useState(islamicTimesData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  const [showTimeDetails, setShowTimeDetails] = useState(false)
  const [selectedTime, setSelectedTime] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  // إعدادات
  const [use24HourFormat, setUse24HourFormat] = useState(true)
  const [showSeconds, setShowSeconds] = useState(false)
  const [adjustForDST, setAdjustForDST] = useState(true)
  const [showHijriDate, setShowHijriDate] = useState(true)

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("islamic_times_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setUse24HourFormat(settings.use24HourFormat ?? true)
          setShowSeconds(settings.showSeconds ?? false)
          setAdjustForDST(settings.adjustForDST ?? true)
          setShowHijriDate(settings.showHijriDate ?? true)
          setSelectedCity(settings.selectedCity ?? "riyadh")
          setSelectedCalculationMethod(settings.selectedCalculationMethod ?? "mwl")
        }

        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("islamic_times_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
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
      "islamic_times_settings",
      JSON.stringify({
        darkMode,
        use24HourFormat,
        showSeconds,
        adjustForDST,
        showHijriDate,
        selectedCity,
        selectedCalculationMethod,
      }),
    )
  }, [darkMode, use24HourFormat, showSeconds, adjustForDST, showHijriDate, selectedCity, selectedCalculationMethod])

  useEffect(() => {
    localStorage.setItem("islamic_times_favorites", JSON.stringify(favorites))
  }, [favorites])

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    let result = [...islamicTimesData]

    // تطبيق البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (time) =>
          time.title.toLowerCase().includes(query) ||
          time.description.toLowerCase().includes(query) ||
          time.category.toLowerCase().includes(query) ||
          time.time.toLowerCase().includes(query) ||
          time.importance.toLowerCase().includes(query) ||
          time.notes.toLowerCase().includes(query),
      )
    }

    // تطبيق التصنيف
    if (selectedCategory !== "all") {
      result = result.filter((time) => time.category === selectedCategory)
    }

    setFilteredTimes(result)
  }, [searchQuery, selectedCategory])

  // تنسيق الوقت
  const formatTime = (time: string) => {
    if (!time) return ""

    const [hours, minutes] = time.split(":").map(Number)

    if (use24HourFormat) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${showSeconds ? ":00" : ""}`
    } else {
      const period = hours >= 12 ? "م" : "ص"
      const hours12 = hours % 12 || 12
      return `${hours12}:${minutes.toString().padStart(2, "0")}${showSeconds ? ":00" : ""} ${period}`
    }
  }

  // الحصول على اسم اليوم بالعربية
  const getArabicDayName = (date: Date) => {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    return days[date.getDay()]
  }

  // الحصول على اسم الشهر بالعربية
  const getArabicMonthName = (date: Date) => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ]
    return months[date.getMonth()]
  }

  // عرض تفاصيل الوقت الشرعي
  const viewTimeDetails = (time: any) => {
    setSelectedTime(time)
    setShowTimeDetails(true)
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (timeId: number) => {
    if (favorites.includes(timeId)) {
      setFavorites(favorites.filter((id) => id !== timeId))
    } else {
      setFavorites([...favorites, timeId])
    }
  }

  // مشاركة الوقت الشرعي
  const shareTime = (time: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: time.title,
          text: `${time.title}: ${time.description}\nالوقت: ${time.time}\nالأهمية: ${time.importance}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard
        .writeText(`${time.title}: ${time.description}\nالوقت: ${time.time}\nالأهمية: ${time.importance}`)
        .then(() => {
          alert("تم نسخ معلومات الوقت الشرعي إلى الحافظة")
        })
    }
  }

  // طباعة الوقت الشرعي
  const printTime = (time: any) => {
    const printContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center;">${time.title}</h1>
        <p style="text-align: center; font-size: 18px;">${time.description}</p>
        <hr style="margin: 20px 0;" />
        <div style="margin-bottom: 15px;">
          <strong>الوقت:</strong> ${time.time}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>التصنيف:</strong> ${time.category}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>الأهمية:</strong> ${time.importance}
        </div>
        <div style="margin-bottom: 15px;">
          <strong>ملاحظات:</strong> ${time.notes}
        </div>
      </div>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${time.title}</title>
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

  // تنزيل الوقت الشرعي كملف PDF
  const downloadTime = (time: any) => {
    alert(`جاري تنزيل معلومات الوقت الشرعي: ${time.title}`)
    // في التطبيق الحقيقي، سيتم تنفيذ عملية التنزيل كملف PDF هنا
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">المواقيت الشرعية</h1>
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
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="prayer-times" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>مواقيت الصلاة</span>
            </TabsTrigger>
            <TabsTrigger value="islamic-times" className="flex items-center gap-1">
              <CalendarIconComponent className="h-4 w-4" />
              <span>المواقيت الشرعية</span>
            </TabsTrigger>
            <TabsTrigger value="hijri-calendar" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>التقويم الهجري</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم مواقيت الصلاة */}
          <TabsContent value="prayer-times" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className={`${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {citiesData.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name} - {city.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-grow">
                <Select value={selectedCalculationMethod} onValueChange={setSelectedCalculationMethod}>
                  <SelectTrigger className={`${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <Settings className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="طريقة الحساب" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {calculationMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-right font-normal ${
                        darkMode ? "bg-gray-800 border-gray-700" : ""
                      }`}
                    >
                      <CalendarIcon className="h-4 w-4 ml-2" />
                      {format(date, "dd MMMM yyyy", { locale: ar })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`w-auto p-0 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      locale={ar}
                      className={darkMode ? "bg-gray-800" : ""}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>مواقيت الصلاة</CardTitle>
                      <CardDescription>
                        {getArabicDayName(date)} {date.getDate()} {getArabicMonthName(date)} {date.getFullYear()}
                      </CardDescription>
                      {showHijriDate && (
                        <CardDescription>
                          {hijriDate.day} {hijriMonths[hijriDate.month - 1].name} {hijriDate.year}هـ
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-right">
                      <CardTitle>{citiesData.find((city) => city.id === selectedCity)?.name}</CardTitle>
                      <CardDescription>{citiesData.find((city) => city.id === selectedCity)?.country}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Sunrise className="h-5 w-5 mr-3 text-amber-500" />
                        <span>الفجر</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.fajr)}</div>
                    </div>

                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 mr-3 text-amber-500" />
                        <span>الشروق</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.sunrise)}</div>
                    </div>

                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 mr-3 text-amber-500" />
                        <span>الظهر</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.dhuhr)}</div>
                    </div>

                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 mr-3 text-amber-500" />
                        <span>العصر</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.asr)}</div>
                    </div>

                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Sunset className="h-5 w-5 mr-3 text-amber-500" />
                        <span>المغرب</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.maghrib)}</div>
                    </div>

                    <div
                      className={`flex justify-between items-center p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <Moon className="h-5 w-5 mr-3 text-amber-500" />
                        <span>العشاء</span>
                      </div>
                      <div className="text-lg font-medium">{formatTime(prayerTimesData.isha)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    طريقة الحساب: {calculationMethods.find((method) => method.id === selectedCalculationMethod)?.name}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" />
                      طباعة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        shareTime({
                          title: "مواقيت الصلاة",
                          description: `مواقيت الصلاة في ${citiesData.find((city) => city.id === selectedCity)?.name}`,
                        })
                      }
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle>معلومات إضافية</CardTitle>
                  <CardDescription>معلومات مفيدة عن الصلاة والمواقيت</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">أوقات الصلاة</h3>
                      <p className="text-sm text-muted-foreground">
                        تختلف أوقات الصلاة من مكان لآخر حسب الموقع الجغرافي والفصل من السنة. وقد حدد الشرع أوقات الصلوات
                        الخمس بعلامات كونية واضحة.
                      </p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">طرق حساب المواقيت</h3>
                      <p className="text-sm text-muted-foreground">
                        تختلف طرق حساب مواقيت الصلاة باختلاف المذاهب والهيئات الإسلامية، وتعتمد على زوايا الشمس المختلفة
                        لتحديد وقت الفجر والعشاء.
                      </p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">أوقات النهي عن الصلاة</h3>
                      <p className="text-sm text-muted-foreground">
                        هناك ثلاثة أوقات نهى النبي صلى الله عليه وسلم عن الصلاة فيها: بعد صلاة الفجر حتى ترتفع الشمس،
                        وعند استواء الشمس حتى تزول، وبعد صلاة العصر حتى تغرب الشمس.
                      </p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">فضل الصلاة في وقتها</h3>
                      <p className="text-sm text-muted-foreground">
                        الصلاة في وقتها من أحب الأعمال إلى الله تعالى، كما قال النبي صلى الله عليه وسلم عندما سئل: أي
                        العمل أحب إلى الله؟ قال: «الصلاة على وقتها».
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("islamic-times")}>
                    عرض المزيد من المواقيت الشرعية
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* قسم المواقيت الشرعية */}
          <TabsContent value="islamic-times" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن وقت شرعي..."
                    className={`pl-10 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-grow">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="صلاة">صلاة</SelectItem>
                    <SelectItem value="صيام">صيام</SelectItem>
                    <SelectItem value="حج">حج</SelectItem>
                    <SelectItem value="عمرة">عمرة</SelectItem>
                    <SelectItem value="زكاة">زكاة</SelectItem>
                    <SelectItem value="أضحية">أضحية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTimes.map((time) => (
                <Card
                  key={time.id}
                  className={`h-full flex flex-col transition-all hover:shadow-md ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {time.icon}
                        <CardTitle className="text-lg mr-2">{time.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => toggleFavorite(time.id)}>
                        <Bookmark
                          className={`h-4 w-4 ${favorites.includes(time.id) ? "fill-primary text-primary" : ""}`}
                        />
                      </Button>
                    </div>
                    <CardDescription className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {time.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {time.importance}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{time.description}</p>

                    <div className={`mt-4 p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">{time.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="default" className="w-full" onClick={() => viewTimeDetails(time)}>
                      عرض التفاصيل
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* قسم التقويم الهجري */}
          <TabsContent value="hijri-calendar" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>التقويم الهجري</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>السنة الهجرية {hijriDate.year}هـ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hijriMonths.map((month) => (
                    <div
                      key={month.id}
                      className={`p-4 rounded-md ${
                        month.id === hijriDate.month
                          ? "bg-primary/10 border border-primary"
                          : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-100"
                      }`}
                    >
                      <h3 className="text-lg font-medium mb-2">{month.name}</h3>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>{month.days} يوم</span>
                        {month.id <= 4 ? (
                          <Badge variant="outline" className="text-xs">
                            مضى
                          </Badge>
                        ) : month.id === 5 ? (
                          <Badge variant="secondary" className="text-xs">
                            الشهر الحالي
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            قادم
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{month.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <Separator className={darkMode ? "bg-gray-700" : ""} />

                  <div>
                    <h3 className="text-lg font-medium mb-4">المناسبات الإسلامية القادمة</h3>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">ليلة القدر</span>
                          </div>
                          <Badge>27 رمضان</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          ليلة القدر خير من ألف شهر، يتحرى المسلمون قيامها في العشر الأواخر من رمضان.
                        </p>
                      </div>

                      <div className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">عيد الفطر</span>
                          </div>
                          <Badge>1 شوال</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          عيد الفطر هو أول أيام شهر شوال، ويأتي بعد انتهاء شهر رمضان المبارك.
                        </p>
                      </div>

                      <div className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">يوم عرفة</span>
                          </div>
                          <Badge>9 ذو الحجة</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          يوم عرفة هو اليوم التاسع من شهر ذي الحجة، وهو يوم الوقوف بعرفة للحجاج، ويستحب صيامه لغير
                          الحاج.
                        </p>
                      </div>

                      <div className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">عيد الأضحى</span>
                          </div>
                          <Badge>10 ذو الحجة</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          عيد الأضحى هو اليوم العاشر من شهر ذي الحجة، ويستمر أربعة أيام، وفيه تذبح الأضاحي.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة تفاصيل الوقت الشرعي */}
        <Dialog open={showTimeDetails} onOpenChange={setShowTimeDetails}>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            {selectedTime && (
              <>
                <DialogHeader>
                  <div className="flex items-center">
                    {selectedTime.icon}
                    <DialogTitle className="text-xl mr-2">{selectedTime.title}</DialogTitle>
                  </div>
                  <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{selectedTime.category}</Badge>
                      <Badge variant="outline">{selectedTime.importance}</Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">الوصف</h3>
                      <p className="text-muted-foreground">{selectedTime.description}</p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">الوقت</h3>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <p className="font-medium">{selectedTime.time}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">ملاحظات</h3>
                      <p className="text-muted-foreground">{selectedTime.notes}</p>
                    </div>

                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      <h3 className="text-lg font-medium mb-2">الأهمية الشرعية</h3>
                      <p className="text-muted-foreground">
                        {selectedTime.importance === "فرض" && "واجب على كل مسلم بالغ عاقل، ويأثم بتركه."}
                        {selectedTime.importance === "واجب" && "لازم شرعاً، ويأثم بتركه."}
                        {selectedTime.importance === "سنة مؤكدة" &&
                          "ما واظب عليه النبي صلى الله عليه وسلم ولم يتركه إلا نادراً."}
                        {selectedTime.importance === "سنة" && "ما فعله النبي صلى الله عليه وسلم ولم يواظب عليه."}
                        {selectedTime.importance === "تحريم" && "منهي عنه نهياً جازماً، ويأثم بفعله."}
                      </p>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleFavorite(selectedTime.id)}
                      className={favorites.includes(selectedTime.id) ? "text-primary" : ""}
                    >
                      <Bookmark
                        className={`h-4 w-4 mr-2 ${
                          favorites.includes(selectedTime.id) ? "fill-primary text-primary" : ""
                        }`}
                      />
                      {favorites.includes(selectedTime.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => shareTime(selectedTime)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" onClick={() => printTime(selectedTime)}>
                      <Printer className="h-4 w-4 mr-2" />
                      طباعة
                    </Button>
                    <Button variant="outline" onClick={() => downloadTime(selectedTime)}>
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
              <DialogTitle>إعدادات المواقيت الشرعية</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص تجربة المواقيت الشرعية
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
                <h3 className="text-lg font-medium">تنسيق الوقت</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="use24HourFormat">استخدام نظام 24 ساعة</Label>
                  <Switch id="use24HourFormat" checked={use24HourFormat} onCheckedChange={setUse24HourFormat} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showSeconds">عرض الثواني</Label>
                  <Switch id="showSeconds" checked={showSeconds} onCheckedChange={setShowSeconds} />
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات أخرى</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="adjustForDST">ضبط التوقيت الصيفي تلقائياً</Label>
                  <Switch id="adjustForDST" checked={adjustForDST} onCheckedChange={setAdjustForDST} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showHijriDate">عرض التاريخ الهجري</Label>
                  <Switch id="showHijriDate" checked={showHijriDate} onCheckedChange={setShowHijriDate} />
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

