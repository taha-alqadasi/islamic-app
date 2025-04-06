"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  Book,
  Search,
  Download,
  Share2,
  Heart,
  Star,
  Filter,
  History,
  Clock,
  Settings,
  Moon,
  Sun,
  ExternalLink,
  FileText,
  Layers,
  BookMarked,
} from "lucide-react"

// بيانات الكتب (محاكاة)
const booksData = [
  {
    id: 1,
    title: "صحيح البخاري",
    author: "محمد بن إسماعيل البخاري",
    category: "حديث",
    description: "أحد أصح كتب الحديث النبوي الشريف، ويعتبر ثاني أصح كتاب بعد القرآن الكريم.",
    pages: 1380,
    language: "العربية",
    year: 846,
    rating: 5,
    downloads: 25000,
    coverUrl: "/books/bukhari.jpg",
    fileUrl: "/books/bukhari.pdf",
    tags: ["حديث", "صحيح", "سنة"],
    isFavorite: false,
  },
  {
    id: 2,
    title: "صحيح مسلم",
    author: "مسلم بن الحجاج النيسابوري",
    category: "حديث",
    description: "أحد أصح كتب الحديث النبوي الشريف، ويعتبر من الكتب الستة في الحديث.",
    pages: 1200,
    language: "العربية",
    year: 875,
    rating: 5,
    downloads: 22000,
    coverUrl: "/books/muslim.jpg",
    fileUrl: "/books/muslim.pdf",
    tags: ["حديث", "صحيح", "سنة"],
    isFavorite: false,
  },
  {
    id: 3,
    title: "رياض الصالحين",
    author: "يحيى بن شرف النووي",
    category: "حديث",
    description: "كتاب يجمع أحاديث نبوية في الأخلاق والآداب والرقائق والزهد.",
    pages: 650,
    language: "العربية",
    year: 1270,
    rating: 4.9,
    downloads: 30000,
    coverUrl: "/books/riyadh.jpg",
    fileUrl: "/books/riyadh.pdf",
    tags: ["حديث", "أخلاق", "آداب"],
    isFavorite: true,
  },
  {
    id: 4,
    title: "تفسير ابن كثير",
    author: "إسماعيل بن عمر بن كثير",
    category: "تفسير",
    description: "من أشهر كتب التفسير بالمأثور، يعتمد على تفسير القرآن بالقرآن والسنة وأقوال الصحابة والتابعين.",
    pages: 2200,
    language: "العربية",
    year: 1373,
    rating: 4.9,
    downloads: 28000,
    coverUrl: "/books/ibn-kathir.jpg",
    fileUrl: "/books/ibn-kathir.pdf",
    tags: ["تفسير", "قرآن"],
    isFavorite: true,
  },
  {
    id: 5,
    title: "زاد المعاد في هدي خير العباد",
    author: "ابن قيم الجوزية",
    category: "سيرة",
    description: "كتاب في السيرة النبوية والفقه، يتناول هدي النبي صلى الله عليه وسلم في مختلف جوانب الحياة.",
    pages: 1600,
    language: "العربية",
    year: 1350,
    rating: 4.8,
    downloads: 18000,
    coverUrl: "/books/zad-al-maad.jpg",
    fileUrl: "/books/zad-al-maad.pdf",
    tags: ["سيرة", "فقه", "هدي النبي"],
    isFavorite: false,
  },
  {
    id: 6,
    title: "الرحيق المختوم",
    author: "صفي الرحمن المباركفوري",
    category: "سيرة",
    description: "كتاب في السيرة النبوية، حاز على جائزة رابطة العالم الإسلامي في السيرة النبوية.",
    pages: 450,
    language: "العربية",
    year: 1976,
    rating: 4.7,
    downloads: 35000,
    coverUrl: "/books/raheeq.jpg",
    fileUrl: "/books/raheeq.pdf",
    tags: ["سيرة", "تاريخ"],
    isFavorite: false,
  },
  {
    id: 7,
    title: "بلوغ المرام من أدلة الأحكام",
    author: "ابن حجر العسقلاني",
    category: "فقه",
    description: "كتاب يجمع أحاديث الأحكام الفقهية مع بيان درجتها وتخريجها.",
    pages: 480,
    language: "العربية",
    year: 1449,
    rating: 4.8,
    downloads: 20000,
    coverUrl: "/books/bulugh.jpg",
    fileUrl: "/books/bulugh.pdf",
    tags: ["فقه", "حديث", "أحكام"],
    isFavorite: false,
  },
  {
    id: 8,
    title: "الأربعون النووية",
    author: "يحيى بن شرف النووي",
    category: "حديث",
    description: "مجموعة من أربعين حديثاً نبوياً في أصول الدين والأخلاق والعبادات.",
    pages: 120,
    language: "العربية",
    year: 1270,
    rating: 4.9,
    downloads: 40000,
    coverUrl: "/books/nawawi40.jpg",
    fileUrl: "/books/nawawi40.pdf",
    tags: ["حديث", "أخلاق", "عبادات"],
    isFavorite: true,
  },
  {
    id: 9,
    title: "فقه السنة",
    author: "السيد سابق",
    category: "فقه",
    description: "كتاب يشرح الفقه الإسلامي بأسلوب ميسر معتمداً على الأدلة من الكتاب والسنة.",
    pages: 1200,
    language: "العربية",
    year: 1945,
    rating: 4.6,
    downloads: 32000,
    coverUrl: "/books/fiqh-sunnah.jpg",
    fileUrl: "/books/fiqh-sunnah.pdf",
    tags: ["فقه", "سنة", "أحكام"],
    isFavorite: false,
  },
  {
    id: 10,
    title: "حصن المسلم",
    author: "سعيد بن علي القحطاني",
    category: "أذكار",
    description: "كتاب يجمع الأذكار والأدعية المأثورة عن النبي صلى الله عليه وسلم.",
    pages: 250,
    language: "العربية",
    year: 1990,
    rating: 4.9,
    downloads: 50000,
    coverUrl: "/books/hisn.jpg",
    fileUrl: "/books/hisn.pdf",
    tags: ["أذكار", "أدعية"],
    isFavorite: true,
  },
  {
    id: 11,
    title: "مختصر منهاج القاصدين",
    author: "ابن قدامة المقدسي",
    category: "أخلاق",
    description: "كتاب في التزكية والأخلاق والسلوك، اختصره ابن قدامة من كتاب منهاج القاصدين للإمام الغزالي.",
    pages: 380,
    language: "العربية",
    year: 1223,
    rating: 4.7,
    downloads: 15000,
    coverUrl: "/books/minhaj.jpg",
    fileUrl: "/books/minhaj.pdf",
    tags: ["أخلاق", "تزكية", "سلوك"],
    isFavorite: false,
  },
  {
    id: 12,
    title: "العقيدة الواسطية",
    author: "ابن تيمية",
    category: "عقيدة",
    description: "رسالة في بيان عقيدة أهل السنة والجماعة، كتبها ابن تيمية لأهل واسط بالعراق.",
    pages: 120,
    language: "العربية",
    year: 1306,
    rating: 4.8,
    downloads: 22000,
    coverUrl: "/books/wasitiyyah.jpg",
    fileUrl: "/books/wasitiyyah.pdf",
    tags: ["عقيدة", "توحيد"],
    isFavorite: false,
  },
  {
    id: 13,
    title: "الداء والدواء",
    author: "ابن قيم الجوزية",
    category: "أخلاق",
    description: "كتاب يتناول أمراض القلوب وعلاجها، ويعرف أيضاً باسم الجواب الكافي لمن سأل عن الدواء الشافي.",
    pages: 350,
    language: "العربية",
    year: 1350,
    rating: 4.8,
    downloads: 17000,
    coverUrl: "/books/daa-dawaa.jpg",
    fileUrl: "/books/daa-dawaa.pdf",
    tags: ["أخلاق", "تزكية", "قلوب"],
    isFavorite: false,
  },
  {
    id: 14,
    title: "تفسير السعدي",
    author: "عبد الرحمن بن ناصر السعدي",
    category: "تفسير",
    description: "تفسير ميسر للقرآن الكريم، يركز على المعاني والهدايات القرآنية.",
    pages: 1400,
    language: "العربية",
    year: 1956,
    rating: 4.8,
    downloads: 25000,
    coverUrl: "/books/saadi.jpg",
    fileUrl: "/books/saadi.pdf",
    tags: ["تفسير", "قرآن"],
    isFavorite: false,
  },
  {
    id: 15,
    title: "سنن أبي داود",
    author: "أبو داود السجستاني",
    category: "حديث",
    description: "أحد كتب السنن الستة، يجمع أحاديث الأحكام والسنن.",
    pages: 1100,
    language: "العربية",
    year: 888,
    rating: 4.7,
    downloads: 18000,
    coverUrl: "/books/abu-dawood.jpg",
    fileUrl: "/books/abu-dawood.pdf",
    tags: ["حديث", "سنن", "أحكام"],
    isFavorite: false,
  },
]

// تصنيفات الكتب
const categories = [
  { id: "all", name: "الكل" },
  { id: "hadith", name: "حديث" },
  { id: "tafsir", name: "تفسير" },
  { id: "fiqh", name: "فقه" },
  { id: "seerah", name: "سيرة" },
  { id: "aqeedah", name: "عقيدة" },
  { id: "akhlaq", name: "أخلاق" },
  { id: "adhkar", name: "أذكار" },
]

// خيارات الترتيب
const sortOptions = [
  { id: "popular", name: "الأكثر شعبية" },
  { id: "newest", name: "الأحدث" },
  { id: "oldest", name: "الأقدم" },
  { id: "title-asc", name: "العنوان (أ-ي)" },
  { id: "title-desc", name: "العنوان (ي-أ)" },
  { id: "rating", name: "التقييم" },
]

// اللغات المتاحة
const languages = [
  { id: "arabic", name: "العربية" },
  { id: "english", name: "الإنجليزية" },
  { id: "french", name: "الفرنسية" },
  { id: "urdu", name: "الأردية" },
  { id: "turkish", name: "التركية" },
]

export default function IslamicLibraryPage() {
  // حالة التطبيق
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("browse")
  const [books, setBooks] = useState(booksData)
  const [filteredBooks, setFilteredBooks] = useState(booksData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [showBookDetails, setShowBookDetails] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [readingList, setReadingList] = useState<number[]>([])
  const [showSettings, setShowSettings] = useState(false)

  // إعدادات
  const [showCovers, setShowCovers] = useState(true)
  const [showRatings, setShowRatings] = useState(true)
  const [showDescriptions, setShowDescriptions] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["arabic"])

  // فلاتر متقدمة
  const [filterAuthor, setFilterAuthor] = useState("")
  const [filterYearFrom, setFilterYearFrom] = useState("")
  const [filterYearTo, setFilterYearTo] = useState("")
  const [filterTags, setFilterTags] = useState<string[]>([])

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("library_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setShowCovers(settings.showCovers ?? true)
          setShowRatings(settings.showRatings ?? true)
          setShowDescriptions(settings.showDescriptions ?? true)
          setViewMode(settings.viewMode ?? "grid")
          setSelectedLanguages(settings.selectedLanguages ?? ["arabic"])
        }

        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("library_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل قائمة القراءة
        const savedReadingList = localStorage.getItem("library_reading_list")
        if (savedReadingList) {
          setReadingList(JSON.parse(savedReadingList))
        }

        // تحميل الكتب المعروضة مؤخراً
        const savedRecentlyViewed = localStorage.getItem("library_recently_viewed")
        if (savedRecentlyViewed) {
          setRecentlyViewed(JSON.parse(savedRecentlyViewed))
        }

        // تحديث حالة المفضلة في الكتب
        const updatedBooks = booksData.map((book) => ({
          ...book,
          isFavorite: savedFavorites ? JSON.parse(savedFavorites).includes(book.id) : book.isFavorite,
        }))
        setBooks(updatedBooks)
        setFilteredBooks(updatedBooks)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "library_settings",
      JSON.stringify({
        darkMode,
        showCovers,
        showRatings,
        showDescriptions,
        viewMode,
        selectedLanguages,
      }),
    )
  }, [darkMode, showCovers, showRatings, showDescriptions, viewMode, selectedLanguages])

  useEffect(() => {
    localStorage.setItem("library_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("library_reading_list", JSON.stringify(readingList))
  }, [readingList])

  useEffect(() => {
    localStorage.setItem("library_recently_viewed", JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    let result = [...books]

    // تطبيق البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query) ||
          book.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // تطبيق التصنيف
    if (selectedCategory !== "all") {
      const categoryMap: { [key: string]: string } = {
        hadith: "حديث",
        tafsir: "تفسير",
        fiqh: "فقه",
        seerah: "سيرة",
        aqeedah: "عقيدة",
        akhlaq: "أخلاق",
        adhkar: "أذكار",
      }
      result = result.filter((book) => book.category === categoryMap[selectedCategory])
    }

    // تطبيق فلتر المؤلف
    if (filterAuthor) {
      result = result.filter((book) => book.author.toLowerCase().includes(filterAuthor.toLowerCase()))
    }

    // تطبيق فلتر السنة
    if (filterYearFrom) {
      const yearFrom = Number.parseInt(filterYearFrom)
      if (!isNaN(yearFrom)) {
        result = result.filter((book) => book.year >= yearFrom)
      }
    }

    if (filterYearTo) {
      const yearTo = Number.parseInt(filterYearTo)
      if (!isNaN(yearTo)) {
        result = result.filter((book) => book.year <= yearTo)
      }
    }

    // تطبيق فلتر الوسوم
    if (filterTags.length > 0) {
      result = result.filter((book) => filterTags.some((tag) => book.tags.includes(tag)))
    }

    // تطبيق فلتر اللغة
    if (selectedLanguages.length > 0) {
      const languageMap: { [key: string]: string } = {
        arabic: "العربية",
        english: "الإنجليزية",
        french: "الفرنسية",
        urdu: "الأردية",
        turkish: "التركية",
      }

      result = result.filter((book) => selectedLanguages.some((lang) => book.language === languageMap[lang]))
    }

    // تطبيق الترتيب
    switch (selectedSort) {
      case "popular":
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case "newest":
        result.sort((a, b) => b.year - a.year)
        break
      case "oldest":
        result.sort((a, b) => a.year - b.year)
        break
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredBooks(result)
  }, [
    books,
    searchQuery,
    selectedCategory,
    selectedSort,
    filterAuthor,
    filterYearFrom,
    filterYearTo,
    filterTags,
    selectedLanguages,
  ])

  // عرض تفاصيل الكتاب
  const viewBookDetails = (book: any) => {
    setSelectedBook(book)
    setShowBookDetails(true)

    // إضافة الكتاب إلى قائمة المعروضة مؤخراً
    const updatedRecentlyViewed = [book, ...recentlyViewed.filter((item) => item.id !== book.id).slice(0, 9)]
    setRecentlyViewed(updatedRecentlyViewed)
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (bookId: number) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId))
    } else {
      setFavorites([...favorites, bookId])
    }

    // تحديث حالة المفضلة في الكتب
    const updatedBooks = books.map((book) => (book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book))
    setBooks(updatedBooks)
  }

  // إضافة أو إزالة من قائمة القراءة
  const toggleReadingList = (bookId: number) => {
    if (readingList.includes(bookId)) {
      setReadingList(readingList.filter((id) => id !== bookId))
    } else {
      setReadingList([...readingList, bookId])
    }
  }

  // تنزيل الكتاب
  const downloadBook = (book: any) => {
    alert(`جاري تنزيل كتاب: ${book.title}`)
    // في التطبيق الحقيقي، سيتم تنفيذ عملية التنزيل هنا
  }

  // مشاركة الكتاب
  const shareBook = (book: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `كتاب ${book.title} للمؤلف ${book.author}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard.writeText(`كتاب ${book.title} للمؤلف ${book.author} - ${window.location.href}`).then(() => {
        alert("تم نسخ رابط الكتاب إلى الحافظة")
      })
    }
  }

  // تغيير حالة الوسم في الفلتر
  const toggleTag = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }

  // تغيير حالة اللغة في الفلتر
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language))
    } else {
      setSelectedLanguages([...selectedLanguages, language])
    }
  }

  // الحصول على جميع الوسوم الفريدة
  const getAllTags = () => {
    const tags = new Set<string>()
    books.forEach((book) => {
      book.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }

  // عرض التقييم بالنجوم
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 half-star" />)
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />)
    }

    return <div className="flex">{stars}</div>
  }

  // عرض الكتب في وضع الشبكة
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <Card
          key={book.id}
          className={`h-full flex flex-col transition-all hover:shadow-md ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          {showCovers && (
            <div className="relative p-4 flex justify-center">
              <div className="relative w-32 h-48 bg-gray-100 dark:bg-gray-700 rounded shadow-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Book className="h-12 w-12" />
                </div>
                {/* في التطبيق الحقيقي، سيتم عرض صورة الغلاف هنا */}
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(book.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{favorites.includes(book.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleReadingList(book.id)
                        }}
                      >
                        <BookMarked
                          className={`h-4 w-4 ${readingList.includes(book.id) ? "fill-primary text-primary" : ""}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{readingList.includes(book.id) ? "إزالة من قائمة القراءة" : "إضافة إلى قائمة القراءة"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}

          <CardHeader className="pb-2 pt-2">
            <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
            <CardDescription className="line-clamp-1">{book.author}</CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            {showRatings && (
              <div className="flex items-center gap-2 mb-2">
                {renderRating(book.rating)}
                <span className="text-sm text-muted-foreground">{book.rating}</span>
              </div>
            )}

            {showDescriptions && <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>}

            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-xs">
                {book.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {book.pages} صفحة
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button variant="default" className="w-full" onClick={() => viewBookDetails(book)}>
              عرض التفاصيل
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  // عرض الكتب في وضع القائمة
  const renderListView = () => (
    <div className="space-y-4">
      {filteredBooks.map((book) => (
        <Card
          key={book.id}
          className={`transition-all hover:shadow-md ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row p-4 gap-4">
            {showCovers && (
              <div className="relative flex-shrink-0">
                <div className="w-24 h-36 bg-gray-100 dark:bg-gray-700 rounded shadow-md overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Book className="h-8 w-8" />
                  </div>
                  {/* في التطبيق الحقيقي، سيتم عرض صورة الغلاف هنا */}
                </div>
              </div>
            )}

            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>

                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(book.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{favorites.includes(book.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleReadingList(book.id)
                          }}
                        >
                          <BookMarked
                            className={`h-4 w-4 ${readingList.includes(book.id) ? "fill-primary text-primary" : ""}`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{readingList.includes(book.id) ? "إزالة من قائمة القراءة" : "إضافة إلى قائمة القراءة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {showRatings && (
                <div className="flex items-center gap-2 my-2">
                  {renderRating(book.rating)}
                  <span className="text-sm text-muted-foreground">{book.rating}</span>
                </div>
              )}

              {showDescriptions && (
                <p className="text-sm text-muted-foreground line-clamp-2 my-2">{book.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {book.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {book.pages} صفحة
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {book.language}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {book.year}
                </Badge>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="default" size="sm" onClick={() => viewBookDetails(book)}>
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">المكتبة الإسلامية</h1>
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
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="browse" className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span>تصفح</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>المفضلة</span>
            </TabsTrigger>
            <TabsTrigger value="reading-list" className="flex items-center gap-1">
              <BookMarked className="h-4 w-4" />
              <span>قائمة القراءة</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span>السجل</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم التصفح */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن كتاب، مؤلف، أو موضوع..."
                    className={`pl-10 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`w-[150px] ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className={`w-[150px] ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="الترتيب" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`${showFilters ? "bg-primary/10" : ""} ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                >
                  <Filter className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  {viewMode === "grid" ? <Layers className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* فلاتر متقدمة */}
            {showFilters && (
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle>فلاتر متقدمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="author">المؤلف</Label>
                        <Input
                          id="author"
                          placeholder="اسم المؤلف"
                          value={filterAuthor}
                          onChange={(e) => setFilterAuthor(e.target.value)}
                          className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="yearFrom">من سنة</Label>
                          <Input
                            id="yearFrom"
                            type="number"
                            placeholder="من سنة"
                            value={filterYearFrom}
                            onChange={(e) => setFilterYearFrom(e.target.value)}
                            className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearTo">إلى سنة</Label>
                          <Input
                            id="yearTo"
                            type="number"
                            placeholder="إلى سنة"
                            value={filterYearTo}
                            onChange={(e) => setFilterYearTo(e.target.value)}
                            className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>اللغة</Label>
                      <div className="space-y-2">
                        {languages.map((language) => (
                          <div key={language.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Checkbox
                              id={`language-${language.id}`}
                              checked={selectedLanguages.includes(language.id)}
                              onCheckedChange={() => toggleLanguage(language.id)}
                            />
                            <Label htmlFor={`language-${language.id}`}>{language.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>الوسوم</Label>
                      <ScrollArea className="h-[150px]">
                        <div className="space-y-2">
                          {getAllTags().map((tag) => (
                            <div key={tag} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox
                                id={`tag-${tag}`}
                                checked={filterTags.includes(tag)}
                                onCheckedChange={() => toggleTag(tag)}
                              />
                              <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterAuthor("")
                      setFilterYearFrom("")
                      setFilterYearTo("")
                      setFilterTags([])
                      setSelectedLanguages(["arabic"])
                    }}
                  >
                    إعادة ضبط
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>تطبيق</Button>
                </CardFooter>
              </Card>
            )}

            {/* عرض نتائج البحث */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">النتائج ({filteredBooks.length})</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedSort("popular")
                      setFilterAuthor("")
                      setFilterYearFrom("")
                      setFilterYearTo("")
                      setFilterTags([])
                      setSelectedLanguages(["arabic"])
                    }}
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </div>
              </div>

              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">لا توجد نتائج</h3>
                  <p className="text-muted-foreground">
                    لم يتم العثور على كتب تطابق معايير البحث. جرب تغيير الفلاتر أو البحث عن شيء آخر.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                renderGridView()
              ) : (
                renderListView()
              )}
            </div>
          </TabsContent>

          {/* قسم المفضلة */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>الكتب المفضلة</CardTitle>
                <CardDescription>الكتب التي قمت بإضافتها إلى المفضلة</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">لا توجد كتب مفضلة</h3>
                    <p className="text-muted-foreground">
                      لم تقم بإضافة أي كتب إلى المفضلة بعد. يمكنك إضافة الكتب إلى المفضلة بالنقر على أيقونة القلب.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {books
                      .filter((book) => favorites.includes(book.id))
                      .map((book) => (
                        <Card
                          key={book.id}
                          className={`transition-all hover:shadow-md ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex p-4 gap-4">
                            {showCovers && (
                              <div className="relative flex-shrink-0">
                                <div className="w-16 h-24 bg-gray-100 dark:bg-gray-600 rounded shadow-md overflow-hidden">
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <Book className="h-6 w-6" />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium">{book.title}</h3>
                                  <p className="text-sm text-muted-foreground">{book.author}</p>
                                </div>

                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(book.id)}>
                                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                </Button>
                              </div>

                              <div className="flex justify-end mt-2">
                                <Button variant="default" size="sm" onClick={() => viewBookDetails(book)}>
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم قائمة القراءة */}
          <TabsContent value="reading-list" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>قائمة القراءة</CardTitle>
                <CardDescription>الكتب التي تخطط لقراءتها</CardDescription>
              </CardHeader>
              <CardContent>
                {readingList.length === 0 ? (
                  <div className="text-center py-12">
                    <BookMarked className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">قائمة القراءة فارغة</h3>
                    <p className="text-muted-foreground">
                      لم تقم بإضافة أي كتب إلى قائمة القراءة بعد. يمكنك إضافة الكتب إلى قائمة القراءة بالنقر على أيقونة
                      الإشارة المرجعية.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {books
                      .filter((book) => readingList.includes(book.id))
                      .map((book) => (
                        <Card
                          key={book.id}
                          className={`transition-all hover:shadow-md ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex p-4 gap-4">
                            {showCovers && (
                              <div className="relative flex-shrink-0">
                                <div className="w-16 h-24 bg-gray-100 dark:bg-gray-600 rounded shadow-md overflow-hidden">
                                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <Book className="h-6 w-6" />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium">{book.title}</h3>
                                  <p className="text-sm text-muted-foreground">{book.author}</p>
                                </div>

                                <Button variant="ghost" size="icon" onClick={() => toggleReadingList(book.id)}>
                                  <BookMarked className="h-4 w-4 fill-primary text-primary" />
                                </Button>
                              </div>

                              <div className="flex justify-end mt-2">
                                <Button variant="default" size="sm" onClick={() => viewBookDetails(book)}>
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم السجل */}
          <TabsContent value="history" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>الكتب المعروضة مؤخراً</CardTitle>
                <CardDescription>الكتب التي قمت بعرضها مؤخراً</CardDescription>
              </CardHeader>
              <CardContent>
                {recentlyViewed.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">لا يوجد سجل</h3>
                    <p className="text-muted-foreground">لم تقم بعرض أي كتب بعد. ستظهر الكتب التي تعرضها هنا.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentlyViewed.map((book) => (
                      <Card
                        key={book.id}
                        className={`transition-all hover:shadow-md ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex p-4 gap-4">
                          {showCovers && (
                            <div className="relative flex-shrink-0">
                              <div className="w-16 h-24 bg-gray-100 dark:bg-gray-600 rounded shadow-md overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                  <Book className="h-6 w-6" />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{book.title}</h3>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                              </div>

                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(book.id)}>
                                  <Heart
                                    className={`h-4 w-4 ${
                                      favorites.includes(book.id) ? "fill-red-500 text-red-500" : ""
                                    }`}
                                  />
                                </Button>

                                <Button variant="ghost" size="icon" onClick={() => toggleReadingList(book.id)}>
                                  <BookMarked
                                    className={`h-4 w-4 ${
                                      readingList.includes(book.id) ? "fill-primary text-primary" : ""
                                    }`}
                                  />
                                </Button>
                              </div>
                            </div>

                            <div className="flex justify-end mt-2">
                              <Button variant="default" size="sm" onClick={() => viewBookDetails(book)}>
                                عرض التفاصيل
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة تفاصيل الكتاب */}
        <Dialog open={showBookDetails} onOpenChange={setShowBookDetails}>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            {selectedBook && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedBook.title}</DialogTitle>
                  <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                    {selectedBook.author}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-56 bg-gray-100 dark:bg-gray-700 rounded shadow-md overflow-hidden mb-4">
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <Book className="h-16 w-16" />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${
                          favorites.includes(selectedBook.id) ? "bg-red-500/10 text-red-500 border-red-500" : ""
                        } ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                        onClick={() => toggleFavorite(selectedBook.id)}
                      >
                        <Heart
                          className={`h-4 w-4 mr-1 ${
                            favorites.includes(selectedBook.id) ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        {favorites.includes(selectedBook.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                      </Button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${
                          readingList.includes(selectedBook.id) ? "bg-primary/10 text-primary border-primary" : ""
                        } ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                        onClick={() => toggleReadingList(selectedBook.id)}
                      >
                        <BookMarked
                          className={`h-4 w-4 mr-1 ${
                            readingList.includes(selectedBook.id) ? "fill-primary text-primary" : ""
                          }`}
                        />
                        {readingList.includes(selectedBook.id) ? "إزالة من قائمة القراءة" : "إضافة إلى قائمة القراءة"}
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">نبذة عن الكتاب</h3>
                      <p className="text-muted-foreground">{selectedBook.description}</p>
                    </div>

                    <Separator className={darkMode ? "bg-gray-700" : ""} />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">التصنيف</h4>
                        <p>{selectedBook.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">عدد الصفحات</h4>
                        <p>{selectedBook.pages} صفحة</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">سنة النشر</h4>
                        <p>{selectedBook.year}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">اللغة</h4>
                        <p>{selectedBook.language}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">التقييم</h4>
                        <div className="flex items-center gap-2">
                          {renderRating(selectedBook.rating)}
                          <span>{selectedBook.rating}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">عدد التنزيلات</h4>
                        <p>{selectedBook.downloads.toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator className={darkMode ? "bg-gray-700" : ""} />

                    <div>
                      <h3 className="text-lg font-medium mb-2">الوسوم</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBook.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => shareBook(selectedBook)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" onClick={() => window.open(selectedBook.fileUrl, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      قراءة
                    </Button>
                  </div>
                  <Button onClick={() => downloadBook(selectedBook)}>
                    <Download className="h-4 w-4 mr-2" />
                    تنزيل
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* نافذة الإعدادات */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>إعدادات المكتبة</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص تجربة المكتبة الإسلامية
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المظهر</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">الوضع الليلي</Label>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="viewMode">طريقة العرض</Label>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Label htmlFor="grid-view" className="cursor-pointer">
                      شبكة
                    </Label>
                    <Switch
                      id="grid-view"
                      checked={viewMode === "grid"}
                      onCheckedChange={(checked) => setViewMode(checked ? "grid" : "list")}
                    />
                    <Label htmlFor="list-view" className="cursor-pointer">
                      قائمة
                    </Label>
                  </div>
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات العرض</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showCovers">عرض أغلفة الكتب</Label>
                  <Switch id="showCovers" checked={showCovers} onCheckedChange={setShowCovers} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showRatings">عرض التقييمات</Label>
                  <Switch id="showRatings" checked={showRatings} onCheckedChange={setShowRatings} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showDescriptions">عرض الوصف</Label>
                  <Switch id="showDescriptions" checked={showDescriptions} onCheckedChange={setShowDescriptions} />
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">اللغات</h3>
                <div className="space-y-2">
                  {languages.map((language) => (
                    <div key={language.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={`settings-language-${language.id}`}
                        checked={selectedLanguages.includes(language.id)}
                        onCheckedChange={() => toggleLanguage(language.id)}
                      />
                      <Label htmlFor={`settings-language-${language.id}`}>{language.name}</Label>
                    </div>
                  ))}
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

