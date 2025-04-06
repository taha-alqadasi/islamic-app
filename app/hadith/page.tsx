"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MessageSquareQuote, Search, BookOpen, Heart, Copy, Check, Share2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

// Mock data for hadith collections
const hadithCollections = [
  { id: "bukhari", name: "صحيح البخاري", count: 7563 },
  { id: "muslim", name: "صحيح مسلم", count: 5362 },
  { id: "tirmidhi", name: "جامع الترمذي", count: 3956 },
  { id: "abudawud", name: "سنن أبي داود", count: 5274 },
  { id: "nasai", name: "سنن النسائي", count: 5761 },
  { id: "ibnmajah", name: "سنن ابن ماجه", count: 4341 },
  { id: "malik", name: "موطأ مالك", count: 1851 },
  { id: "ahmad", name: "مسند أحمد", count: 26363 },
]

// Mock data for hadith categories
const hadithCategories = [
  { id: "faith", name: "الإيمان" },
  { id: "purification", name: "الطهارة" },
  { id: "prayer", name: "الصلاة" },
  { id: "zakat", name: "الزكاة" },
  { id: "fasting", name: "الصيام" },
  { id: "hajj", name: "الحج" },
  { id: "marriage", name: "النكاح" },
  { id: "business", name: "البيوع" },
  { id: "virtues", name: "الفضائل" },
  { id: "manners", name: "الآداب" },
]

// Mock data for hadiths
const mockHadiths = [
  {
    id: 1,
    collection: "bukhari",
    category: "faith",
    number: "1",
    arabic:
      "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللهُ عَنْهُ، قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: «إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ، فَهِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا، أَوْ امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إلَى مَا هَاجَرَ إلَيْهِ».",
    translation:
      'On the authority of Omar bin Al-Khattab, who said: I heard the Messenger of Allah ﷺ say: "Actions are only by intentions, and each person will have only what they intended. So whoever emigrated for Allah and His Messenger, then their emigration is for Allah and His Messenger. And whoever emigrated to obtain something of this world or to marry a woman, then their emigration is for whatever they emigrated for."',
    narrator: "عمر بن الخطاب",
    grade: "صحيح",
  },
  {
    id: 2,
    collection: "bukhari",
    category: "faith",
    number: "2",
    arabic: "عَنْ عَائِشَةَ رَضِيَ اللهُ عَنْهَا أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ: «مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ».",
    translation:
      'Narrated Aisha: Allah\'s Messenger ﷺ said, "Whoever innovates something in this matter of ours (i.e., Islam) that is not a part of it, will have it rejected."',
    narrator: "عائشة",
    grade: "صحيح",
  },
  {
    id: 3,
    collection: "muslim",
    category: "manners",
    number: "47",
    arabic:
      "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ».",
    translation:
      'Abu Huraira reported: The Messenger of Allah ﷺ said, "Whoever believes in Allah and the Last Day, let him speak goodness or remain silent. Whoever believes in Allah and the Last Day, let him honor his neighbor. Whoever believes in Allah and the Last Day, let him honor his guest."',
    narrator: "أبو هريرة",
    grade: "صحيح",
  },
  {
    id: 4,
    collection: "tirmidhi",
    category: "virtues",
    number: "1987",
    arabic:
      "عَنْ أَبِي ذَرٍّ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ لِي رَسُولُ اللَّهِ ﷺ: «اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ».",
    translation:
      'On the authority of Abu Dharr: The Messenger of Allah ﷺ said to me, "Fear Allah wherever you are, and follow a bad deed with a good deed to wipe it out, and treat people with good character."',
    narrator: "أبو ذر",
    grade: "حسن",
  },
  {
    id: 5,
    collection: "abudawud",
    category: "prayer",
    number: "1046",
    arabic: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ، فَأَكْثِرُوا الدُّعَاءَ».",
    translation:
      'Abu Huraira reported: The Messenger of Allah ﷺ said, "The closest a servant is to his Lord is when he is prostrating, so increase your supplications."',
    narrator: "أبو هريرة",
    grade: "صحيح",
  },
]

export default function HadithPage() {
  const [activeTab, setActiveTab] = useState("collections")
  const [selectedCollection, setSelectedCollection] = useState<string>("bukhari")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [hadiths, setHadiths] = useState(mockHadiths)
  const [copied, setCopied] = useState<number | null>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle collection change
  const handleCollectionChange = (value: string) => {
    setSelectedCollection(value)
    setIsLoading(true)

    // In a real app, we would fetch hadiths from the selected collection
    // For this demo, we'll just filter the mock data
    setTimeout(() => {
      setHadiths(mockHadiths.filter((hadith) => hadith.collection === value))
      setIsLoading(false)
    }, 800)
  }

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setIsLoading(true)

    // In a real app, we would fetch hadiths from the selected category
    // For this demo, we'll just filter the mock data
    setTimeout(() => {
      setHadiths(mockHadiths.filter((hadith) => hadith.category === value))
      setIsLoading(false)
    }, 800)
  }

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // In a real app, we would search for hadiths containing the query
    // For this demo, we'll just filter the mock data
    setTimeout(() => {
      setHadiths(
        mockHadiths.filter(
          (hadith) =>
            hadith.arabic.includes(searchQuery) ||
            hadith.translation.includes(searchQuery) ||
            hadith.narrator.includes(searchQuery),
        ),
      )
      setIsLoading(false)
    }, 800)
  }

  // Toggle favorite status for a hadith
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Copy hadith text to clipboard
  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  // Share hadith
  const shareHadith = (hadith: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: "حديث شريف",
          text: `${hadith.arabic}\n\n${hadith.translation}\n\nالراوي: ${hadith.narrator} | الدرجة: ${hadith.grade}`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(
        hadith.id,
        `${hadith.arabic}\n\n${hadith.translation}\n\nالراوي: ${hadith.narrator} | الدرجة: ${hadith.grade}`,
      )
    }
  }

  // Get filtered hadiths based on active tab
  const getFilteredHadiths = () => {
    switch (activeTab) {
      case "collections":
        return hadiths.filter((hadith) => hadith.collection === selectedCollection)
      case "categories":
        return hadiths.filter((hadith) => hadith.category === selectedCategory)
      case "search":
        return hadiths
      case "favorites":
        return mockHadiths.filter((hadith) => favorites.includes(hadith.id))
      default:
        return hadiths
    }
  }

  const filteredHadiths = getFilteredHadiths()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">الأحاديث النبوية</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareQuote className="h-5 w-5" />
            الأحاديث النبوية الشريفة
          </CardTitle>
          <CardDescription>مجموعة من الأحاديث النبوية الصحيحة من مختلف كتب الحديث</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="collections" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="collections">كتب الحديث</TabsTrigger>
              <TabsTrigger value="categories">الأبواب</TabsTrigger>
              <TabsTrigger value="search">بحث</TabsTrigger>
              <TabsTrigger value="favorites">المفضلة</TabsTrigger>
            </TabsList>

            <TabsContent value="collections" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">اختر كتاب الحديث</label>
                  <Select value={selectedCollection} onValueChange={handleCollectionChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر كتاب الحديث" />
                    </SelectTrigger>
                    <SelectContent>
                      {hadithCollections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name} ({collection.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">اختر باب الحديث</label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر باب الحديث" />
                    </SelectTrigger>
                    <SelectContent>
                      {hadithCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="search" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الأحاديث النبوية"
                  />
                  <Button variant="outline" size="icon" onClick={handleSearch}>
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-4">
              {favorites.length === 0 && (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">لم تقم بإضافة أي أحاديث إلى المفضلة بعد</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredHadiths.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
            <p className="mt-4 text-muted-foreground">لا توجد أحاديث مطابقة للبحث</p>
          </div>
        ) : (
          // Hadiths content
          filteredHadiths.map((hadith) => (
            <Card key={hadith.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{hadithCollections.find((c) => c.id === hadith.collection)?.name}</Badge>
                    <Badge variant="secondary">{hadith.number}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(hadith.id)}
                    className={favorites.includes(hadith.id) ? "text-red-500" : ""}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-xl leading-relaxed text-right">{hadith.arabic}</p>
                  <p className="text-muted-foreground">{hadith.translation}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>الراوي: {hadith.narrator}</span>
                    <span>الدرجة: {hadith.grade}</span>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(hadith.id, `${hadith.arabic}\n\n${hadith.translation}`)}
                    >
                      {copied === hadith.id ? <Check className="h-4 w-4 ml-1" /> : <Copy className="h-4 w-4 ml-1" />}
                      {copied === hadith.id ? "تم النسخ" : "نسخ"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareHadith(hadith)}>
                      <Share2 className="h-4 w-4 ml-1" />
                      مشاركة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredHadiths.length > 0 && !isLoading && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

