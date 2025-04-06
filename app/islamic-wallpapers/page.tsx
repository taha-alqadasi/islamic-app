"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Search,
  Download,
  Heart,
  Share2,
  Moon,
  Sun,
  Filter,
  Grid,
  Layers,
  Smartphone,
  Monitor,
  Palette,
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

// قائمة الخلفيات الإسلامية (محاكاة)
const wallpapers = [
  {
    id: 1,
    title: "الكعبة المشرفة",
    description: "صورة للكعبة المشرفة في المسجد الحرام",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "مكة",
    tags: ["الكعبة", "مكة", "المسجد الحرام"],
    resolution: "1920x1080",
    type: "mobile",
    color: "dark",
    downloads: 1250,
  },
  {
    id: 2,
    title: "المسجد النبوي",
    description: "صورة للمسجد النبوي الشريف في المدينة المنورة",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "المدينة",
    tags: ["المسجد النبوي", "المدينة المنورة"],
    resolution: "1920x1080",
    type: "desktop",
    color: "light",
    downloads: 980,
  },
  {
    id: 3,
    title: "المسجد الأقصى",
    description: "صورة للمسجد الأقصى المبارك في القدس",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "القدس",
    tags: ["المسجد الأقصى", "القدس", "فلسطين"],
    resolution: "1920x1080",
    type: "desktop",
    color: "light",
    downloads: 850,
  },
  {
    id: 4,
    title: "آية الكرسي",
    description: "خلفية تحتوي على آية الكرسي بخط جميل",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "آيات قرآنية",
    tags: ["آية الكرسي", "قرآن", "خط عربي"],
    resolution: "1080x1920",
    type: "mobile",
    color: "dark",
    downloads: 2100,
  },
  {
    id: 5,
    title: "سورة الإخلاص",
    description: "خلفية تحتوي على سورة الإخلاص بخط جميل",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "آيات قرآنية",
    tags: ["سورة الإخلاص", "قرآن", "خط عربي"],
    resolution: "1080x1920",
    type: "mobile",
    color: "light",
    downloads: 1800,
  },
  {
    id: 6,
    title: "أسماء الله الحسنى",
    description: "خلفية تحتوي على أسماء الله الحسنى",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "أسماء الله الحسنى",
    tags: ["أسماء الله الحسنى", "خط عربي"],
    resolution: "1920x1080",
    type: "desktop",
    color: "dark",
    downloads: 1650,
  },
  {
    id: 7,
    title: "هلال رمضان",
    description: "خلفية رمضانية مع هلال وزخارف إسلامية",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "رمضان",
    tags: ["رمضان", "هلال", "زخارف إسلامية"],
    resolution: "1080x1920",
    type: "mobile",
    color: "dark",
    downloads: 1950,
  },
  {
    id: 8,
    title: "فانوس رمضان",
    description: "خلفية رمضانية مع فانوس تقليدي",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "رمضان",
    tags: ["رمضان", "فانوس"],
    resolution: "1920x1080",
    type: "desktop",
    color: "dark",
    downloads: 1450,
  },
  {
    id: 9,
    title: "مسجد وهلال",
    description: "خلفية لمسجد مع هلال في ليلة صافية",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "مساجد",
    tags: ["مسجد", "هلال", "ليل"],
    resolution: "1080x1920",
    type: "mobile",
    color: "dark",
    downloads: 1200,
  },
  {
    id: 10,
    title: "زخارف إسلامية",
    description: "خلفية بزخارف إسلامية هندسية",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "زخارف إسلامية",
    tags: ["زخارف إسلامية", "هندسي"],
    resolution: "1920x1080",
    type: "desktop",
    color: "light",
    downloads: 1350,
  },
  {
    id: 11,
    title: "دعاء السفر",
    description: "خلفية تحتوي على دعاء السفر",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "أدعية",
    tags: ["دعاء", "سفر", "خط عربي"],
    resolution: "1080x1920",
    type: "mobile",
    color: "light",
    downloads: 980,
  },
  {
    id: 12,
    title: "دعاء الصباح",
    description: "خلفية تحتوي على دعاء الصباح",
    imageUrl: "/placeholder.svg?height=600&width=400",
    category: "أدعية",
    tags: ["دعاء", "صباح", "خط عربي"],
    resolution: "1920x1080",
    type: "desktop",
    color: "light",
    downloads: 1050,
  },
]

// تصنيفات الخلفيات
const categories = [
  { id: "all", name: "الكل" },
  { id: "مكة", name: "مكة" },
  { id: "المدينة", name: "المدينة" },
  { id: "القدس", name: "القدس" },
  { id: "آيات قرآنية", name: "آيات قرآنية" },
  { id: "أسماء الله الحسنى", name: "أسماء الله الحسنى" },
  { id: "رمضان", name: "رمضان" },
  { id: "مساجد", name: "مساجد" },
  { id: "زخارف إسلامية", name: "زخارف إسلامية" },
  { id: "أدعية", name: "أدعية" },
]

export default function IslamicWallpapersPage() {
  // حالة التطبيق
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("grid")
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [selectedWallpaper, setSelectedWallpaper] = useState<any>(null)
  const [showWallpaperDetails, setShowWallpaperDetails] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [filterColor, setFilterColor] = useState("all")

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("wallpapers_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("wallpapers_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem("wallpapers_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(
      "wallpapers_settings",
      JSON.stringify({
        darkMode,
      }),
    )
  }, [darkMode])

  // الحصول على الخلفيات حسب التصنيف والبحث والفلتر
  const getFilteredWallpapers = () => {
    let filteredWallpapers = wallpapers

    // تصفية حسب البحث
    if (searchQuery) {
      filteredWallpapers = filteredWallpapers.filter(
        (wallpaper) =>
          wallpaper.title.includes(searchQuery) ||
          wallpaper.description.includes(searchQuery) ||
          wallpaper.tags.some((tag) => tag.includes(searchQuery)),
      )
    }

    // تصفية حسب التصنيف
    if (activeCategory !== "all") {
      filteredWallpapers = filteredWallpapers.filter((wallpaper) => wallpaper.category === activeCategory)
    }

    // تصفية حسب النوع
    if (filterType !== "all") {
      filteredWallpapers = filteredWallpapers.filter((wallpaper) => wallpaper.type === filterType)
    }

    // تصفية حسب اللون
    if (filterColor !== "all") {
      filteredWallpapers = filteredWallpapers.filter((wallpaper) => wallpaper.color === filterColor)
    }

    // تصفية حسب المفضلة
    if (activeTab === "favorites") {
      filteredWallpapers = filteredWallpapers.filter((wallpaper) => favorites.includes(wallpaper.id))
    }

    return filteredWallpapers
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // تنزيل الخلفية
  const downloadWallpaper = (wallpaper: any) => {
    // في التطبيق الحقيقي، سيتم تنزيل الصورة
    alert(`جاري تنزيل الخلفية: ${wallpaper.title}`)
  }

  // مشاركة الخلفية
  const shareWallpaper = (wallpaper: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: wallpaper.title,
          text: wallpaper.description,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard.writeText(`${wallpaper.title} - ${wallpaper.description}`).then(() => {
        alert("تم نسخ معلومات الخلفية إلى الحافظة")
      })
    }
  }

  // عرض تفاصيل الخلفية
  const showDetails = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper)
    setShowWallpaperDetails(true)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">خلفيات إسلامية</h1>

        {/* شريط البحث والإعدادات */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن خلفية..."
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
                <DropdownMenuLabel>تصفية الخلفيات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="space-y-2">
                    <Label htmlFor="filterType">نوع الجهاز</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger id="filterType" className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                        <SelectValue placeholder="اختر نوع الجهاز" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="mobile">جوال</SelectItem>
                        <SelectItem value="desktop">حاسوب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="filterColor">نمط الخلفية</Label>
                    <Select value={filterColor} onValueChange={setFilterColor}>
                      <SelectTrigger id="filterColor" className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                        <SelectValue placeholder="اختر نمط الخلفية" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="dark">داكن</SelectItem>
                        <SelectItem value="light">فاتح</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Grid className="h-4 w-4" />
                <span>شبكة</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="list">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
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

        {/* تصنيفات الخلفيات */}
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

        {/* عرض الخلفيات */}
        <div className="mb-6">
          {getFilteredWallpapers().length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">لا توجد خلفيات مطابقة للبحث</p>
            </div>
          ) : activeTab === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getFilteredWallpapers().map((wallpaper) => (
                <Card
                  key={wallpaper.id}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : ""} hover:shadow-md transition-shadow`}
                  onClick={() => showDetails(wallpaper)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={wallpaper.imageUrl || "/placeholder.svg"}
                      alt={wallpaper.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge variant="secondary" className={darkMode ? "bg-gray-700" : ""}>
                        {wallpaper.type === "mobile" ? (
                          <Smartphone className="h-3 w-3" />
                        ) : (
                          <Monitor className="h-3 w-3" />
                        )}
                      </Badge>
                      <Badge variant="secondary" className={darkMode ? "bg-gray-700" : ""}>
                        {wallpaper.color === "dark" ? "داكن" : "فاتح"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{wallpaper.title}</CardTitle>
                    <CardDescription className={darkMode ? "text-gray-400" : ""}>{wallpaper.category}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(wallpaper.id)
                      }}
                      className={favorites.includes(wallpaper.id) ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={darkMode ? "border-gray-700" : ""}>
                      {wallpaper.resolution}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredWallpapers().map((wallpaper) => (
                <Card
                  key={wallpaper.id}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : ""} hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/4 aspect-[3/4] md:aspect-square overflow-hidden">
                      <img
                        src={wallpaper.imageUrl || "/placeholder.svg"}
                        alt={wallpaper.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{wallpaper.title}</CardTitle>
                            <CardDescription className={darkMode ? "text-gray-400" : ""}>
                              {wallpaper.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="secondary" className={darkMode ? "bg-gray-700" : ""}>
                              {wallpaper.type === "mobile" ? (
                                <Smartphone className="h-3 w-3 mr-1" />
                              ) : (
                                <Monitor className="h-3 w-3 mr-1" />
                              )}
                              {wallpaper.type === "mobile" ? "جوال" : "حاسوب"}
                            </Badge>
                            <Badge variant="secondary" className={darkMode ? "bg-gray-700" : ""}>
                              <Palette className="h-3 w-3 mr-1" />
                              {wallpaper.color === "dark" ? "داكن" : "فاتح"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {wallpaper.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className={darkMode ? "border-gray-700" : ""}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">الدقة: {wallpaper.resolution}</p>
                            <p className="text-sm text-muted-foreground">التنزيلات: {wallpaper.downloads}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(wallpaper.id)}
                              className={favorites.includes(wallpaper.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => shareWallpaper(wallpaper)}>
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => downloadWallpaper(wallpaper)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* نافذة تفاصيل الخلفية */}
        <Dialog open={showWallpaperDetails} onOpenChange={setShowWallpaperDetails}>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            {selectedWallpaper && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedWallpaper.title}</DialogTitle>
                  <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                    {selectedWallpaper.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={selectedWallpaper.imageUrl || "/placeholder.svg"}
                      alt={selectedWallpaper.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">التصنيف</h3>
                      <p>{selectedWallpaper.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">الدقة</h3>
                      <p>{selectedWallpaper.resolution}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">النوع</h3>
                      <p>{selectedWallpaper.type === "mobile" ? "جوال" : "حاسوب"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">النمط</h3>
                      <p>{selectedWallpaper.color === "dark" ? "داكن" : "فاتح"}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-1">الوسوم</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWallpaper.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className={darkMode ? "border-gray-700" : ""}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">التنزيلات</h3>
                    <p>{selectedWallpaper.downloads}</p>
                  </div>
                </div>
                <DialogFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={() => toggleFavorite(selectedWallpaper.id)}>
                      <Heart
                        className={`h-4 w-4 mr-1 ${favorites.includes(selectedWallpaper.id) ? "fill-current text-red-500" : ""}`}
                      />
                      {favorites.includes(selectedWallpaper.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                    </Button>
                    <Button className="flex-1" onClick={() => shareWallpaper(selectedWallpaper)}>
                      <Share2 className="h-4 w-4 mr-1" />
                      مشاركة
                    </Button>
                    <Button className="flex-1" onClick={() => downloadWallpaper(selectedWallpaper)}>
                      <Download className="h-4 w-4 mr-1" />
                      تنزيل
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

