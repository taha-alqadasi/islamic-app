"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  RotateCcw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Settings,
  Moon,
  Sun,
  Check,
  Heart,
  Share2,
  Download,
  Hand,
  Bookmark,
  History,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// الأذكار المقترحة
const suggestedAdhkar = [
  {
    id: 1,
    name: "سبحان الله",
    count: 33,
    color: "bg-green-500",
    category: "تسبيح",
  },
  {
    id: 2,
    name: "الحمد لله",
    count: 33,
    color: "bg-blue-500",
    category: "تحميد",
  },
  {
    id: 3,
    name: "الله أكبر",
    count: 33,
    color: "bg-purple-500",
    category: "تكبير",
  },
  {
    id: 4,
    name: "لا إله إلا الله",
    count: 100,
    color: "bg-red-500",
    category: "تهليل",
  },
  {
    id: 5,
    name: "أستغفر الله",
    count: 100,
    color: "bg-yellow-500",
    category: "استغفار",
  },
  {
    id: 6,
    name: "سبحان الله وبحمده",
    count: 100,
    color: "bg-teal-500",
    category: "تسبيح",
  },
  {
    id: 7,
    name: "لا حول ولا قوة إلا بالله",
    count: 100,
    color: "bg-indigo-500",
    category: "حوقلة",
  },
  {
    id: 8,
    name: "اللهم صل على محمد",
    count: 10,
    color: "bg-pink-500",
    category: "صلاة على النبي",
  },
  {
    id: 9,
    name: "سبحان الله وبحمده سبحان الله العظيم",
    count: 100,
    color: "bg-emerald-500",
    category: "تسبيح",
  },
  {
    id: 10,
    name: "سبحان الله والحمد لله ولا إله إلا الله والله أكبر",
    count: 25,
    color: "bg-cyan-500",
    category: "تسبيح",
  },
]

// تصنيفات الأذكار
const categories = [
  { id: "all", name: "الكل" },
  { id: "tasbih", name: "تسبيح" },
  { id: "tahmid", name: "تحميد" },
  { id: "takbir", name: "تكبير" },
  { id: "tahlil", name: "تهليل" },
  { id: "istighfar", name: "استغفار" },
  { id: "hawqala", name: "حوقلة" },
  { id: "salawat", name: "صلاة على النبي" },
  { id: "custom", name: "مخصص" },
]

// أصوات التسبيح
const tasbihSounds = [
  { id: "click", name: "نقرة" },
  { id: "beads", name: "حبات السبحة" },
  { id: "soft", name: "صوت ناعم" },
  { id: "digital", name: "رقمي" },
  { id: "none", name: "بدون صوت" },
]

// ألوان السبحة
const tasbihColors = [
  { id: "green", name: "أخضر", value: "bg-green-500" },
  { id: "blue", name: "أزرق", value: "bg-blue-500" },
  { id: "purple", name: "بنفسجي", value: "bg-purple-500" },
  { id: "red", name: "أحمر", value: "bg-red-500" },
  { id: "yellow", name: "أصفر", value: "bg-yellow-500" },
  { id: "teal", name: "فيروزي", value: "bg-teal-500" },
  { id: "indigo", name: "نيلي", value: "bg-indigo-500" },
  { id: "pink", name: "وردي", value: "bg-pink-500" },
  { id: "emerald", name: "زمردي", value: "bg-emerald-500" },
  { id: "cyan", name: "سماوي", value: "bg-cyan-500" },
]

export default function TasbihPage() {
  // حالة التطبيق
  const [activeTab, setActiveTab] = useState("counter")
  const [darkMode, setDarkMode] = useState(false)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [soundEnabled, setSound] = useState(true)
  const [selectedSound, setSelectedSound] = useState("click")
  const [autoReset, setAutoReset] = useState(false)
  const [showTargetProgress, setShowTargetProgress] = useState(true)
  const [tasbihSize, setTasbihSize] = useState(200)
  const [selectedColor, setSelectedColor] = useState("green")
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [showEditCustom, setShowEditCustom] = useState(false)
  const [editingDhikr, setEditingDhikr] = useState<any>(null)

  // حالة السبحة
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [customTarget, setCustomTarget] = useState("33")
  const [selectedDhikr, setSelectedDhikr] = useState(suggestedAdhkar[0])
  const [customAdhkar, setCustomAdhkar] = useState<any[]>([])
  const [newCustomDhikr, setNewCustomDhikr] = useState({
    name: "",
    count: 33,
    color: "bg-green-500",
    category: "مخصص",
  })
  const [favorites, setFavorites] = useState<number[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  // المراجع
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("tasbih_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setVibrationEnabled(settings.vibrationEnabled ?? true)
          setSound(settings.soundEnabled ?? true)
          setSelectedSound(settings.selectedSound ?? "click")
          setAutoReset(settings.autoReset ?? false)
          setShowTargetProgress(settings.showTargetProgress ?? true)
          setTasbihSize(settings.tasbihSize ?? 200)
          setSelectedColor(settings.selectedColor ?? "green")
        }

        // تحميل الأذكار المخصصة
        const savedCustomAdhkar = localStorage.getItem("tasbih_custom_adhkar")
        if (savedCustomAdhkar) {
          setCustomAdhkar(JSON.parse(savedCustomAdhkar))
        }

        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("tasbih_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل السجل
        const savedHistory = localStorage.getItem("tasbih_history")
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory))
        }

        // تحميل الذكر الحالي
        const savedDhikr = localStorage.getItem("tasbih_current_dhikr")
        if (savedDhikr) {
          const dhikr = JSON.parse(savedDhikr)
          setSelectedDhikr(dhikr)
          setTarget(dhikr.count)
          setCustomTarget(dhikr.count.toString())
        }

        // تحميل العداد الحالي
        const savedCount = localStorage.getItem("tasbih_current_count")
        if (savedCount) {
          setCount(Number.parseInt(savedCount))
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
    initializeAudio()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "tasbih_settings",
      JSON.stringify({
        darkMode,
        vibrationEnabled,
        soundEnabled,
        selectedSound,
        autoReset,
        showTargetProgress,
        tasbihSize,
        selectedColor,
      }),
    )
  }, [
    darkMode,
    vibrationEnabled,
    soundEnabled,
    selectedSound,
    autoReset,
    showTargetProgress,
    tasbihSize,
    selectedColor,
  ])

  useEffect(() => {
    localStorage.setItem("tasbih_custom_adhkar", JSON.stringify(customAdhkar))
  }, [customAdhkar])

  useEffect(() => {
    localStorage.setItem("tasbih_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("tasbih_history", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem("tasbih_current_dhikr", JSON.stringify(selectedDhikr))
  }, [selectedDhikr])

  useEffect(() => {
    localStorage.setItem("tasbih_current_count", count.toString())
  }, [count])

  // تهيئة الصوت
  const initializeAudio = () => {
    audioRef.current = new Audio("/audio/click.mp3")
  }

  // تشغيل صوت التسبيح
  const playSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error)
      })
    }
  }

  // زيادة العداد
  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1

      // تشغيل الصوت
      playSound()

      // تفعيل الاهتزاز
      if (vibrationEnabled && "vibrate" in navigator) {
        navigator.vibrate(20)
      }

      // إذا وصل للهدف
      if (newCount === target) {
        // تفعيل اهتزاز أطول عند الوصول للهدف
        if (vibrationEnabled && "vibrate" in navigator) {
          navigator.vibrate([100, 50, 100])
        }

        // إضافة إلى السجل
        const historyEntry = {
          id: Date.now(),
          dhikr: selectedDhikr.name,
          count: newCount,
          target: target,
          date: new Date().toISOString(),
          completed: true,
        }
        setHistory([historyEntry, ...history.slice(0, 99)])

        // إعادة تعيين العداد إذا كان التعيين التلقائي مفعلاً
        if (autoReset) {
          setTimeout(() => {
            setCount(0)
          }, 1000)
        }
      }

      return newCount
    })
  }

  // إعادة تعيين العداد
  const resetCount = () => {
    // إضافة إلى السجل إذا كان العداد أكبر من 0
    if (count > 0) {
      const historyEntry = {
        id: Date.now(),
        dhikr: selectedDhikr.name,
        count: count,
        target: target,
        date: new Date().toISOString(),
        completed: count >= target,
      }
      setHistory([historyEntry, ...history.slice(0, 99)])
    }

    setCount(0)
  }

  // تغيير الهدف
  const changeTarget = () => {
    const newTarget = Number.parseInt(customTarget)
    if (!isNaN(newTarget) && newTarget > 0) {
      setTarget(newTarget)
      setSelectedDhikr({ ...selectedDhikr, count: newTarget })
    }
  }

  // اختيار ذكر
  const selectDhikr = (dhikr: any) => {
    // إضافة إلى السجل إذا كان العداد أكبر من 0
    if (count > 0) {
      const historyEntry = {
        id: Date.now(),
        dhikr: selectedDhikr.name,
        count: count,
        target: target,
        date: new Date().toISOString(),
        completed: count >= target,
      }
      setHistory([historyEntry, ...history.slice(0, 99)])
    }

    setSelectedDhikr(dhikr)
    setTarget(dhikr.count)
    setCustomTarget(dhikr.count.toString())
    setCount(0)
  }

  // إضافة ذكر مخصص
  const addCustomDhikr = () => {
    if (newCustomDhikr.name.trim() === "") {
      alert("يرجى إدخال اسم الذكر")
      return
    }

    const newDhikr = {
      id: Date.now(),
      name: newCustomDhikr.name,
      count: newCustomDhikr.count,
      color: newCustomDhikr.color,
      category: "مخصص",
    }

    setCustomAdhkar([...customAdhkar, newDhikr])
    setNewCustomDhikr({
      name: "",
      count: 33,
      color: "bg-green-500",
      category: "مخصص",
    })
    setShowAddCustom(false)
  }

  // تحرير ذكر مخصص
  const editCustomDhikr = () => {
    if (!editingDhikr) return

    const updatedAdhkar = customAdhkar.map((dhikr) => (dhikr.id === editingDhikr.id ? { ...editingDhikr } : dhikr))

    setCustomAdhkar(updatedAdhkar)

    // إذا كان الذكر المحرر هو المحدد حالياً، قم بتحديثه
    if (selectedDhikr.id === editingDhikr.id) {
      setSelectedDhikr(editingDhikr)
      setTarget(editingDhikr.count)
      setCustomTarget(editingDhikr.count.toString())
    }

    setShowEditCustom(false)
    setEditingDhikr(null)
  }

  // حذف ذكر مخصص
  const deleteCustomDhikr = (id: number) => {
    // إذا كان الذكر المحذوف هو المحدد حالياً، قم بتحديد الذكر الافتراضي
    if (selectedDhikr.id === id) {
      selectDhikr(suggestedAdhkar[0])
    }

    setCustomAdhkar(customAdhkar.filter((dhikr) => dhikr.id !== id))
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // مشاركة الذكر
  const shareDhikr = (dhikr: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: "سبحة إلكترونية",
          text: `أنا أسبح "${dhikr.name}" ${dhikr.count} مرة باستخدام تطبيق السبحة الإلكترونية`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard
        .writeText(`أنا أسبح "${dhikr.name}" ${dhikr.count} مرة باستخدام تطبيق السبحة الإلكترونية`)
        .then(() => {
          alert("تم نسخ النص إلى الحافظة")
        })
    }
  }

  // تنزيل السجل
  const downloadHistory = () => {
    let content = "سجل التسبيح\n\n"

    history.forEach((entry, index) => {
      content += `${index + 1}. ${entry.dhikr}: ${entry.count}/${entry.target} - ${new Date(entry.date).toLocaleString(
        "ar-SA",
      )}\n`
    })

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "سجل_التسبيح.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // مسح السجل
  const clearHistory = () => {
    if (confirm("هل أنت متأكد من مسح سجل التسبيح؟")) {
      setHistory([])
    }
  }

  // الحصول على الأذكار حسب التصنيف
  const getFilteredAdhkar = () => {
    const allAdhkar = [...suggestedAdhkar, ...customAdhkar]

    if (activeCategory === "all") {
      return allAdhkar
    } else if (activeCategory === "favorites") {
      return allAdhkar.filter((dhikr) => favorites.includes(dhikr.id))
    } else if (activeCategory === "custom") {
      return customAdhkar
    } else {
      const categoryMap: { [key: string]: string } = {
        tasbih: "تسبيح",
        tahmid: "تحميد",
        takbir: "تكبير",
        tahlil: "تهليل",
        istighfar: "استغفار",
        hawqala: "حوقلة",
        salawat: "صلاة على النبي",
      }
      return allAdhkar.filter((dhikr) => dhikr.category === categoryMap[activeCategory])
    }
  }

  // حساب نسبة التقدم
  const calculateProgress = () => {
    return Math.min((count / target) * 100, 100)
  }

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ar-SA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">السبحة الإلكترونية</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="counter" className="flex items-center gap-1">
              <Hand className="h-4 w-4" />
              <span>السبحة</span>
            </TabsTrigger>
            <TabsTrigger value="adhkar" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              <span>الأذكار</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span>السجل</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم السبحة */}
          <TabsContent value="counter" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{selectedDhikr.name}</CardTitle>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(selectedDhikr.id)}
                            className={favorites.includes(selectedDhikr.id) ? "text-red-500" : ""}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{favorites.includes(selectedDhikr.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => shareDhikr(selectedDhikr)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>مشاركة</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
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
                          <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
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
                <CardDescription>
                  الهدف: {count}/{target}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                {/* شريط التقدم */}
                {showTargetProgress && (
                  <div className="w-full mb-6">
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                )}

                {/* زر السبحة */}
                <div
                  ref={counterRef}
                  className={`${
                    tasbihColors.find((color) => color.id === selectedColor)?.value || "bg-green-500"
                  } rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 select-none`}
                  style={{ width: `${tasbihSize}px`, height: `${tasbihSize}px` }}
                  onClick={incrementCount}
                >
                  <div
                    className={`text-white text-4xl font-bold ${
                      tasbihSize > 250 ? "text-6xl" : tasbihSize > 150 ? "text-4xl" : "text-2xl"
                    }`}
                  >
                    {count}
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetCount}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newTarget = Math.max(1, Number.parseInt(customTarget) - 1)
                        setCustomTarget(newTarget.toString())
                      }}
                      className={darkMode ? "hover:bg-gray-700" : ""}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={customTarget}
                      onChange={(e) => setCustomTarget(e.target.value)}
                      className={`w-16 text-center ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newTarget = Number.parseInt(customTarget) + 1
                        setCustomTarget(newTarget.toString())
                      }}
                      className={darkMode ? "hover:bg-gray-700" : ""}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="default"
                    onClick={changeTarget}
                    className={darkMode ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    تعيين
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* الأذكار المقترحة */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>الأذكار المقترحة</CardTitle>
                <CardDescription>اختر ذكراً للتسبيح</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {suggestedAdhkar.slice(0, 5).map((dhikr) => (
                      <div
                        key={dhikr.id}
                        className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${
                          selectedDhikr.id === dhikr.id
                            ? "bg-primary/10 border border-primary"
                            : darkMode
                              ? "hover:bg-gray-700 border border-gray-700"
                              : "hover:bg-gray-100 border border-gray-200"
                        }`}
                        onClick={() => selectDhikr(dhikr)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${dhikr.color}`}></div>
                          <span>{dhikr.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                            {dhikr.count}
                          </Badge>
                          {favorites.includes(dhikr.id) && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("adhkar")}>
                  عرض المزيد من الأذكار
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* قسم الأذكار */}
          <TabsContent value="adhkar" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>قائمة الأذكار</CardTitle>
                  <Button variant="outline" onClick={() => setShowAddCustom(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة ذكر
                  </Button>
                </div>
                <CardDescription>اختر ذكراً للتسبيح أو أضف ذكراً مخصصاً</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 overflow-x-auto">
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
                    <Button
                      variant={activeCategory === "favorites" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory("favorites")}
                      className={darkMode && activeCategory !== "favorites" ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      المفضلة
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {getFilteredAdhkar().length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">لا توجد أذكار في هذه الفئة</p>
                      </div>
                    ) : (
                      getFilteredAdhkar().map((dhikr) => (
                        <div
                          key={dhikr.id}
                          className={`flex justify-between items-center p-3 rounded-md ${
                            selectedDhikr.id === dhikr.id
                              ? "bg-primary/10 border border-primary"
                              : darkMode
                                ? "hover:bg-gray-700 border border-gray-700"
                                : "hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <div
                            className="flex items-center gap-2 flex-1 cursor-pointer"
                            onClick={() => selectDhikr(dhikr)}
                          >
                            <div className={`w-4 h-4 rounded-full ${dhikr.color}`}></div>
                            <span>{dhikr.name}</span>
                            <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                              {dhikr.count}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(dhikr.id)}
                              className={favorites.includes(dhikr.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>

                            {dhikr.category === "مخصص" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingDhikr({ ...dhikr })
                                    setShowEditCustom(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteCustomDhikr(dhikr.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}

                            <Button variant="ghost" size="icon" onClick={() => selectDhikr(dhikr)}>
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم السجل */}
          <TabsContent value="history" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>سجل التسبيح</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={downloadHistory}>
                      <Download className="h-4 w-4 mr-2" />
                      تنزيل
                    </Button>
                    <Button variant="outline" onClick={clearHistory}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      مسح
                    </Button>
                  </div>
                </div>
                <CardDescription>سجل نشاطك في التسبيح</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {history.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">لا يوجد سجل للتسبيح</p>
                      </div>
                    ) : (
                      history.map((entry) => (
                        <div
                          key={entry.id}
                          className={`p-3 rounded-md ${
                            entry.completed
                              ? darkMode
                                ? "bg-green-900/20 border border-green-900/30"
                                : "bg-green-50 border border-green-200"
                              : darkMode
                                ? "border border-gray-700"
                                : "border border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{entry.dhikr}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {entry.count}/{entry.target} - {formatDate(entry.date)}
                              </p>
                            </div>
                            {entry.completed && <Badge className="bg-green-500">مكتمل</Badge>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة الإعدادات */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetContent side="left" className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <SheetHeader>
              <SheetTitle>إعدادات السبحة</SheetTitle>
              <SheetDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص تجربة السبحة الإلكترونية
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المظهر</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">الوضع الليلي</Label>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="space-y-2">
                  <Label>لون السبحة</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {tasbihColors.map((color) => (
                      <div
                        key={color.id}
                        className={`w-8 h-8 rounded-full ${color.value} cursor-pointer ${
                          selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        onClick={() => setSelectedColor(color.id)}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>حجم السبحة</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTasbihSize(Math.max(tasbihSize - 20, 100))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[tasbihSize]}
                      min={100}
                      max={300}
                      step={20}
                      onValueChange={(value) => setTasbihSize(value[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTasbihSize(Math.min(tasbihSize + 20, 300))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">الصوت والاهتزاز</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="soundEnabled">تفعيل الصوت</Label>
                  <Switch id="soundEnabled" checked={soundEnabled} onCheckedChange={setSound} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soundType">نوع الصوت</Label>
                  <Select value={selectedSound} onValueChange={setSelectedSound} disabled={!soundEnabled}>
                    <SelectTrigger className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                      <SelectValue placeholder="اختر نوع الصوت" />
                    </SelectTrigger>
                    <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                      {tasbihSounds.map((sound) => (
                        <SelectItem key={sound.id} value={sound.id}>
                          {sound.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vibrationEnabled">تفعيل الاهتزاز</Label>
                  <Switch id="vibrationEnabled" checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات العداد</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoReset">إعادة تعيين تلقائية عند الوصول للهدف</Label>
                  <Switch id="autoReset" checked={autoReset} onCheckedChange={setAutoReset} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showTargetProgress">عرض شريط التقدم</Label>
                  <Switch
                    id="showTargetProgress"
                    checked={showTargetProgress}
                    onCheckedChange={setShowTargetProgress}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button onClick={() => setShowSettings(false)}>حفظ الإعدادات</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* نافذة إضافة ذكر مخصص */}
        <Dialog open={showAddCustom} onOpenChange={setShowAddCustom}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>إضافة ذكر مخصص</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                أضف ذكراً مخصصاً إلى قائمة أذكارك
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="dhikrName">اسم الذكر</Label>
                <Input
                  id="dhikrName"
                  placeholder="أدخل اسم الذكر"
                  value={newCustomDhikr.name}
                  onChange={(e) => setNewCustomDhikr({ ...newCustomDhikr, name: e.target.value })}
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dhikrCount">عدد المرات</Label>
                <Input
                  id="dhikrCount"
                  type="number"
                  min="1"
                  value={newCustomDhikr.count}
                  onChange={(e) =>
                    setNewCustomDhikr({
                      ...newCustomDhikr,
                      count: Math.max(1, Number.parseInt(e.target.value) || 1),
                    })
                  }
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label>لون الذكر</Label>
                <div className="grid grid-cols-5 gap-2">
                  {tasbihColors.map((color) => (
                    <div
                      key={color.id}
                      className={`w-8 h-8 rounded-full ${color.value} cursor-pointer ${
                        newCustomDhikr.color === color.value ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      onClick={() => setNewCustomDhikr({ ...newCustomDhikr, color: color.value })}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCustom(false)}>
                إلغاء
              </Button>
              <Button onClick={addCustomDhikr}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة تحرير ذكر مخصص */}
        <Dialog open={showEditCustom} onOpenChange={setShowEditCustom}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>تحرير ذكر مخصص</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>قم بتعديل الذكر المخصص</DialogDescription>
            </DialogHeader>
            {editingDhikr && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="editDhikrName">اسم الذكر</Label>
                  <Input
                    id="editDhikrName"
                    placeholder="أدخل اسم الذكر"
                    value={editingDhikr.name}
                    onChange={(e) => setEditingDhikr({ ...editingDhikr, name: e.target.value })}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDhikrCount">عدد المرات</Label>
                  <Input
                    id="editDhikrCount"
                    type="number"
                    min="1"
                    value={editingDhikr.count}
                    onChange={(e) =>
                      setEditingDhikr({
                        ...editingDhikr,
                        count: Math.max(1, Number.parseInt(e.target.value) || 1),
                      })
                    }
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label>لون الذكر</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {tasbihColors.map((color) => (
                      <div
                        key={color.id}
                        className={`w-8 h-8 rounded-full ${color.value} cursor-pointer ${
                          editingDhikr.color === color.value ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        onClick={() => setEditingDhikr({ ...editingDhikr, color: color.value })}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditCustom(false)}>
                إلغاء
              </Button>
              <Button onClick={editCustomDhikr}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

