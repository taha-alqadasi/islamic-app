"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  Heart,
  Share2,
  BookOpen,
  Info,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Filter,
  Sparkles,
  Minus,
  Plus,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// قائمة الأسماء الحسنى
const asmaAlhusna = [
  {
    id: 1,
    name: "الله",
    transliteration: "Allah",
    meaning: "الله سبحانه وتعالى، الذات الإلهية الجامعة لصفات الكمال كلها",
    benefits: "اسم الله الأعظم الذي إذا دعي به أجاب، وإذا سئل به أعطى",
    category: "الذات",
  },
  {
    id: 2,
    name: "الرحمن",
    transliteration: "Ar-Rahman",
    meaning: "ذو الرحمة الواسعة التي وسعت كل شيء",
    benefits: "من أكثر من ذكره وسع الله عليه في رزقه وعافيته",
    category: "الرحمة",
  },
  {
    id: 3,
    name: "الرحيم",
    transliteration: "Ar-Raheem",
    meaning: "الذي يوصل الرحمة لمن يشاء من عباده",
    benefits: "من أكثر من ذكره رحمه الله ورحمه الناس",
    category: "الرحمة",
  },
  {
    id: 4,
    name: "الملك",
    transliteration: "Al-Malik",
    meaning: "المتصرف في خلقه بما يشاء، المالك للدنيا والآخرة",
    benefits: "من أكثر من ذكره أغناه الله وأعزه",
    category: "الملك",
  },
  {
    id: 5,
    name: "القدوس",
    transliteration: "Al-Quddus",
    meaning: "المنزه عن كل عيب ونقص وعن كل ما لا يليق بكماله",
    benefits: "من أكثر من ذكره طهر الله قلبه",
    category: "الكمال",
  },
  {
    id: 6,
    name: "السلام",
    transliteration: "As-Salam",
    meaning: "السالم من كل عيب ونقص، الذي يسلم عباده المؤمنين من كل آفة",
    benefits: "من أكثر من ذكره سلمه الله من الآفات والأمراض",
    category: "الكمال",
  },
  {
    id: 7,
    name: "المؤمن",
    transliteration: "Al-Mu'min",
    meaning: "الذي صدق عباده وعده، والذي يؤمن عباده من عذابه",
    benefits: "من أكثر من ذكره أمنه الله من الخوف والفزع",
    category: "الأمان",
  },
  {
    id: 8,
    name: "المهيمن",
    transliteration: "Al-Muhaymin",
    meaning: "الرقيب على خلقه، الشاهد على أعمالهم، الحافظ لهم",
    benefits: "من أكثر من ذكره حفظه الله في نفسه وأهله وماله",
    category: "الحفظ",
  },
  {
    id: 9,
    name: "العزيز",
    transliteration: "Al-Aziz",
    meaning: "القوي الغالب الذي لا يغلبه شيء، العظيم القدر",
    benefits: "من أكثر من ذكره أعزه الله وقواه",
    category: "القوة",
  },
  {
    id: 10,
    name: "الجبار",
    transliteration: "Al-Jabbar",
    meaning: "العالي فوق خلقه، القاهر لهم، الذي يجبر الكسير ويغني الفقير",
    benefits: "من أكثر من ذكره جبر الله قلبه وأغناه",
    category: "القوة",
  },
  {
    id: 11,
    name: "المتكبر",
    transliteration: "Al-Mutakabbir",
    meaning: "المتعالي عن صفات الخلق، المتنزه عن كل ما لا يليق به",
    benefits: "من أكثر من ذكره رفعه الله وأعلى شأنه",
    category: "العظمة",
  },
  {
    id: 12,
    name: "الخالق",
    transliteration: "Al-Khaliq",
    meaning: "الموجد للأشياء من العدم على غير مثال سابق",
    benefits: "من أكثر من ذكره فتح الله له أبواب الإبداع",
    category: "الخلق",
  },
  {
    id: 13,
    name: "البارئ",
    transliteration: "Al-Bari'",
    meaning: "الذي خلق الخلق بلا تفاوت ولا اضطراب",
    benefits: "من أكثر من ذكره شفاه الله من الأمراض",
    category: "الخلق",
  },
  {
    id: 14,
    name: "المصور",
    transliteration: "Al-Musawwir",
    meaning: "الذي صور جميع الموجودات ورتبها فأعطى كل شيء منها صورة خاصة",
    benefits: "من أكثر من ذكره حسن الله صورته الظاهرة والباطنة",
    category: "الخلق",
  },
  {
    id: 15,
    name: "الغفار",
    transliteration: "Al-Ghaffar",
    meaning: "كثير المغفرة والستر على عباده",
    benefits: "من أكثر من ذكره غفر الله له ذنوبه وستر عيوبه",
    category: "المغفرة",
  },
  {
    id: 16,
    name: "القهار",
    transliteration: "Al-Qahhar",
    meaning: "الذي قهر جميع الخلق بقدرته",
    benefits: "من أكثر من ذكره أعانه الله على قهر نفسه وهواه",
    category: "القوة",
  },
  {
    id: 17,
    name: "الوهاب",
    transliteration: "Al-Wahhab",
    meaning: "كثير العطاء والهبات بلا عوض ولا سؤال",
    benefits: "من أكثر من ذكره فتح الله له أبواب الرزق",
    category: "العطاء",
  },
  {
    id: 18,
    name: "الرزاق",
    transliteration: "Ar-Razzaq",
    meaning: "الذي يخلق الأرزاق ويوصلها إلى جميع خلقه",
    benefits: "من أكثر من ذكره وسع الله عليه في رزقه",
    category: "العطاء",
  },
  {
    id: 19,
    name: "الفتاح",
    transliteration: "Al-Fattah",
    meaning: "الذي يفتح أبواب الرحمة والرزق لعباده، والحاكم بين عباده بالحق",
    benefits: "من أكثر من ذكره فتح الله له أبواب الخير",
    category: "النصر",
  },
  {
    id: 20,
    name: "العليم",
    transliteration: "Al-Alim",
    meaning: "الذي أحاط علمه بكل شيء ظاهراً وباطناً، دقيقاً وجليلاً",
    benefits: "من أكثر من ذكره فتح الله له أبواب العلم والمعرفة",
    category: "العلم",
  },
  {
    id: 21,
    name: "القابض",
    transliteration: "Al-Qabid",
    meaning: "الذي يقبض الرزق عمن يشاء بحكمته",
    benefits: "من أكثر من ذكره أغناه الله بالقناعة",
    category: "التصرف",
  },
  {
    id: 22,
    name: "الباسط",
    transliteration: "Al-Basit",
    meaning: "الذي يبسط الرزق لمن يشاء من عباده",
    benefits: "من أكثر من ذكره وسع الله عليه في رزقه",
    category: "التصرف",
  },
  {
    id: 23,
    name: "الخافض",
    transliteration: "Al-Khafid",
    meaning: "الذي يخفض من شاء من الجبابرة والمتكبرين",
    benefits: "من أكثر من ذكره أمنه الله من الظالمين",
    category: "التصرف",
  },
  {
    id: 24,
    name: "الرافع",
    transliteration: "Ar-Rafi'",
    meaning: "الذي يرفع المؤمنين بالطاعات والدرجات",
    benefits: "من أكثر من ذكره رفع الله قدره ومنزلته",
    category: "التصرف",
  },
  {
    id: 25,
    name: "المعز",
    transliteration: "Al-Mu'izz",
    meaning: "الذي يهب العزة لمن يشاء من عباده",
    benefits: "من أكثر من ذكره أعزه الله في الدنيا والآخرة",
    category: "التصرف",
  },
  {
    id: 26,
    name: "المذل",
    transliteration: "Al-Muzill",
    meaning: "الذي يذل من يشاء من عباده",
    benefits: "من أكثر من ذكره أذل الله أعداءه",
    category: "التصرف",
  },
  {
    id: 27,
    name: "السميع",
    transliteration: "As-Sami'",
    meaning: "الذي يسمع جميع الأصوات الخفية والجلية",
    benefits: "من أكثر من ذكره استجاب الله دعاءه",
    category: "الإدراك",
  },
  {
    id: 28,
    name: "البصير",
    transliteration: "Al-Basir",
    meaning: "الذي يرى جميع المبصرات وإن دقت وصغرت",
    benefits: "من أكثر من ذكره فتح الله بصيرته",
    category: "الإدراك",
  },
  {
    id: 29,
    name: "الحكم",
    transliteration: "Al-Hakam",
    meaning: "الذي يحكم بين عباده بالعدل، ولا معقب لحكمه",
    benefits: "من أكثر من ذكره ألهمه الله الحكمة في أموره",
    category: "الحكم",
  },
  {
    id: 30,
    name: "العدل",
    transliteration: "Al-'Adl",
    meaning: "العادل في حكمه وقضائه، المنزه عن الظلم والجور",
    benefits: "من أكثر من ذكره عدل في أحكامه وأقواله",
    category: "الحكم",
  },
  // ... يمكن إضافة باقي الأسماء الحسنى
]

// تصنيفات الأسماء الحسنى
const categories = [
  { id: "all", name: "الكل" },
  { id: "الذات", name: "الذات" },
  { id: "الرحمة", name: "الرحمة" },
  { id: "الملك", name: "الملك" },
  { id: "الكمال", name: "الكمال" },
  { id: "الأمان", name: "الأمان" },
  { id: "الحفظ", name: "الحفظ" },
  { id: "القوة", name: "القوة" },
  { id: "العظمة", name: "العظمة" },
  { id: "الخلق", name: "الخلق" },
  { id: "المغفرة", name: "المغفرة" },
  { id: "العطاء", name: "العطاء" },
  { id: "النصر", name: "النصر" },
  { id: "العلم", name: "العلم" },
  { id: "التصرف", name: "التصرف" },
  { id: "الإدراك", name: "الإدراك" },
  { id: "الحكم", name: "الحكم" },
]

export default function AsmaAlhusnaPage() {
  // حالة التطبيق
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("grid")
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(20)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [showMeaning, setShowMeaning] = useState(true)
  const [showBenefits, setShowBenefits] = useState(true)
  const [selectedName, setSelectedName] = useState<any>(null)
  const [showNameDetails, setShowNameDetails] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("asma_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("asma_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setFontSize(settings.fontSize ?? 20)
          setShowTransliteration(settings.showTransliteration ?? true)
          setShowMeaning(settings.showMeaning ?? true)
          setShowBenefits(settings.showBenefits ?? true)
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem("asma_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(
      "asma_settings",
      JSON.stringify({
        darkMode,
        fontSize,
        showTransliteration,
        showMeaning,
        showBenefits,
      }),
    )
  }, [darkMode, fontSize, showTransliteration, showMeaning, showBenefits])

  // إيقاف الصوت عند تغيير الصفحة
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        setCurrentAudio(null)
        setIsPlaying(false)
      }
    }
  }, [])

  // الحصول على الأسماء حسب التصنيف
  const getFilteredNames = () => {
    let filteredNames = asmaAlhusna

    // تصفية حسب البحث
    if (searchQuery) {
      filteredNames = filteredNames.filter(
        (name) =>
          name.name.includes(searchQuery) ||
          name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          name.meaning.includes(searchQuery),
      )
    }

    // تصفية حسب التصنيف
    if (activeCategory !== "all") {
      filteredNames = filteredNames.filter((name) => name.category === activeCategory)
    }

    // تصفية حسب المفضلة
    if (activeTab === "favorites") {
      filteredNames = filteredNames.filter((name) => favorites.includes(name.id))
    }

    return filteredNames
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // تشغيل صوت الاسم
  const playNameAudio = (name: any) => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
    }

    // محاكاة تشغيل الصوت (في التطبيق الحقيقي سيتم استبدال هذا بتشغيل الملف الصوتي الفعلي)
    const audio = new Audio("/audio/name_sound.mp3")
    audio.play().catch((error) => {
      console.error("Error playing audio:", error)
      alert("لا يمكن تشغيل الصوت. يرجى التأكد من السماح بتشغيل الصوت في المتصفح.")
    })

    setCurrentAudio(audio)
    setIsPlaying(true)

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    })
  }

  // نسخ النص
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("تم نسخ النص بنجاح")
    })
  }

  // مشاركة الاسم
  const shareName = (name: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: `اسم الله ${name.name}`,
          text: `اسم الله ${name.name} - ${name.meaning}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      copyText(`اسم الله ${name.name} - ${name.meaning}`)
    }
  }

  // عرض تفاصيل الاسم
  const showDetails = (name: any) => {
    setSelectedName(name)
    setShowNameDetails(true)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">أسماء الله الحسنى</h1>

        {/* شريط البحث والإعدادات */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن اسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <DropdownMenuLabel>خيارات العرض</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="showTransliteration">عرض النطق</Label>
                    <Switch
                      id="showTransliteration"
                      checked={showTransliteration}
                      onCheckedChange={setShowTransliteration}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="showMeaning">عرض المعنى</Label>
                    <Switch id="showMeaning" checked={showMeaning} onCheckedChange={setShowMeaning} />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="showBenefits">عرض الفوائد</Label>
                    <Switch id="showBenefits" checked={showBenefits} onCheckedChange={setShowBenefits} />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>حجم الخط</DropdownMenuLabel>
                <div className="p-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFontSize(Math.max(fontSize - 2, 16))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[fontSize]}
                      min={16}
                      max={32}
                      step={2}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFontSize(Math.min(fontSize + 2, 32))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="grid">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>شبكة</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="list">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>قائمة</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>المفضلة</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* تصنيفات الأسماء */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 rtl:space-x-reverse">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={darkMode && activeCategory !== category.id ? "bg-gray-800 border-gray-700" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* عرض الأسماء */}
        <div className="mb-6">
          {getFilteredNames().length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">لا توجد أسماء مطابقة للبحث</p>
            </div>
          ) : activeTab === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getFilteredNames().map((name) => (
                <Card
                  key={name.id}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : ""} hover:shadow-md transition-shadow`}
                  onClick={() => showDetails(name)}
                >
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-center" style={{ fontSize: `${fontSize + 4}px` }}>
                      {name.name}
                    </CardTitle>
                    {showTransliteration && (
                      <CardDescription className={darkMode ? "text-gray-400" : ""}>
                        {name.transliteration}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="text-center">
                    {showMeaning && (
                      <p className="mb-2" style={{ fontSize: `${fontSize - 2}px` }}>
                        {name.meaning}
                      </p>
                    )}
                    {showBenefits && (
                      <p className="text-sm text-muted-foreground" style={{ fontSize: `${fontSize - 4}px` }}>
                        {name.benefits}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(name.id)
                      }}
                      className={favorites.includes(name.id) ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                      {name.category}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredNames().map((name) => (
                <Card
                  key={name.id}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : ""} hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle style={{ fontSize: `${fontSize + 2}px` }}>{name.name}</CardTitle>
                        {showTransliteration && (
                          <CardDescription className={darkMode ? "text-gray-400" : ""}>
                            {name.transliteration}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(name.id)}
                          className={favorites.includes(name.id) ? "text-red-500" : ""}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => playNameAudio(name)}>
                          {isPlaying && currentAudio ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => shareName(name)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showMeaning && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">المعنى:</h4>
                        <p style={{ fontSize: `${fontSize - 2}px` }}>{name.meaning}</p>
                      </div>
                    )}
                    {showBenefits && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">الفوائد:</h4>
                        <p className="text-sm text-muted-foreground" style={{ fontSize: `${fontSize - 4}px` }}>
                          {name.benefits}
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                      {name.category}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => showDetails(name)}>
                      <Info className="h-4 w-4 mr-1" />
                      التفاصيل
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* نافذة تفاصيل الاسم */}
        <Dialog open={showNameDetails} onOpenChange={setShowNameDetails}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            {selectedName && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">{selectedName.name}</DialogTitle>
                  <DialogDescription className="text-center">{selectedName.transliteration}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="text-center mb-4">
                    <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                      {selectedName.category}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">المعنى:</h3>
                    <p className="text-base">{selectedName.meaning}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">الفوائد:</h3>
                    <p className="text-base">{selectedName.benefits}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">الذكر:</h3>
                    <p className="text-base text-center mb-2">سبحان الله {selectedName.name}</p>
                    <p className="text-base text-center mb-2">يا {selectedName.name}</p>
                    <p className="text-base text-center">اللهم إني أسألك باسمك {selectedName.name}</p>
                  </div>
                </div>
                <DialogFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={() => toggleFavorite(selectedName.id)}>
                      <Heart
                        className={`h-4 w-4 mr-1 ${favorites.includes(selectedName.id) ? "fill-current text-red-500" : ""}`}
                      />
                      {favorites.includes(selectedName.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                    </Button>
                    <Button className="flex-1" onClick={() => playNameAudio(selectedName)}>
                      {isPlaying ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
                      {isPlaying ? "إيقاف" : "استماع"}
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

