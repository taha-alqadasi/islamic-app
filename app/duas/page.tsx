"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Search, Copy, Check, Share2, BookOpen, Clock, Calendar, Star, Bookmark } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for dua categories
const duaCategories = [
  { id: "morning", name: "أذكار الصباح", icon: <Clock className="h-5 w-5" /> },
  { id: "evening", name: "أذكار المساء", icon: <Clock className="h-5 w-5" /> },
  { id: "prayer", name: "أدعية الصلاة", icon: <BookOpen className="h-5 w-5" /> },
  { id: "quran", name: "أدعية قرآنية", icon: <BookOpen className="h-5 w-5" /> },
  { id: "prophetic", name: "أدعية نبوية", icon: <Star className="h-5 w-5" /> },
  { id: "daily", name: "أدعية الحياة اليومية", icon: <Calendar className="h-5 w-5" /> },
  { id: "occasions", name: "أدعية المناسبات", icon: <Calendar className="h-5 w-5" /> },
  { id: "travel", name: "أدعية السفر", icon: <Calendar className="h-5 w-5" /> },
  { id: "health", name: "أدعية الصحة والشفاء", icon: <Calendar className="h-5 w-5" /> },
  { id: "forgiveness", name: "أدعية الاستغفار", icon: <BookOpen className="h-5 w-5" /> },
]

// Mock data for duas
const mockDuas = [
  {
    id: 1,
    category: "morning",
    title: "دعاء الاستيقاظ من النوم",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translation: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    meaning: "الحمد لله الذي أعادنا للحياة بعد أن توفانا، وإليه البعث والنشور",
    source: "رواه البخاري",
    virtues: "من الأذكار المستحبة عند الاستيقاظ من النوم",
    repetitions: 1,
  },
  {
    id: 2,
    category: "morning",
    title: "دعاء لبس الثوب",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    translation: "الحمد لله الذي كساني هذا (الثوب) ورزقنيه من غير حول مني ولا قوة",
    transliteration:
      "Alhamdu lillahil-ladhi kasani hadha (aththawba) wa razaqanihi min ghayri hawlin minni wa la quwwatin",
    meaning: "الحمد لله الذي ألبسني هذا الثوب ورزقني إياه من غير حول مني ولا قوة",
    source: "رواه أبو داود والترمذي",
    virtues: "من قال هذا الذكر عند لبس ثوب جديد غفر له ما تقدم من ذنبه",
    repetitions: 1,
  },
  {
    id: 3,
    category: "morning",
    title: "دعاء دخول الخلاء",
    arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
    translation: "بسم الله، اللهم إني أعوذ بك من الخبث والخبائث",
    transliteration: "Bismillah, Allahumma inni a'udhu bika minal-khubthi wal-khaba-ith",
    meaning: "بسم الله، اللهم إني أستجير بك من الشياطين الذكور والإناث",
    source: "رواه البخاري ومسلم",
    virtues: "من الأذكار المستحبة عند دخول الخلاء",
    repetitions: 1,
  },
  {
    id: 4,
    category: "morning",
    title: "دعاء الخروج من الخلاء",
    arabic: "غُفْرَانَكَ",
    translation: "غفرانك",
    transliteration: "Ghufranaka",
    meaning: "أسألك يا الله المغفرة",
    source: "رواه أبو داود والترمذي وابن ماجه",
    virtues: "من الأذكار المستحبة عند الخروج من الخلاء",
    repetitions: 1,
  },
  {
    id: 5,
    category: "morning",
    title: "الذكر قبل الوضوء",
    arabic: "بِسْمِ اللَّهِ",
    translation: "بسم الله",
    transliteration: "Bismillah",
    meaning: "أبدأ باسم الله",
    source: "رواه أبو داود وابن ماجه وأحمد",
    virtues: "من الأذكار المستحبة قبل الوضوء",
    repetitions: 1,
  },
  {
    id: 6,
    category: "evening",
    title: "دعاء قبل النوم",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translation: "باسمك اللهم أموت وأحيا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    meaning: "باسمك يا الله أموت وأحيا",
    source: "رواه البخاري",
    virtues: "من الأذكار المستحبة قبل النوم",
    repetitions: 1,
  },
  {
    id: 7,
    category: "evening",
    title: "دعاء الاستيقاظ في الليل",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي",
    translation:
      "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير، الحمد لله، وسبحان الله، ولا إله إلا الله، والله أكبر، ولا حول ولا قوة إلا بالله العلي العظيم، رب اغفر لي",
    transliteration:
      "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. Alhamdu lillah, wa subhanallah, wa la ilaha illallah, wallahu akbar, wa la hawla wa la quwwata illa billahil-'aliyyil-'adhim, rabbighfir li",
    meaning:
      "لا معبود بحق إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير، الحمد لله، وسبحان الله، ولا إله إلا الله، والله أكبر، ولا حول ولا قوة إلا بالله العلي العظيم، رب اغفر لي",
    source: "رواه البخاري",
    virtues: "من دعا به استجيب له، فإن عزم فتوضأ ثم صلى قبلت صلاته",
    repetitions: 1,
  },
  {
    id: 8,
    category: "prayer",
    title: "دعاء الاستفتاح",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
    translation: "سبحانك اللهم وبحمدك، وتبارك اسمك، وتعالى جدك، ولا إله غيرك",
    transliteration: "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghairuk",
    meaning: "سبحانك يا الله وبحمدك، وتبارك اسمك، وتعالى جدك، ولا إله غيرك",
    source: "رواه أبو داود والترمذي وابن ماجه",
    virtues: "من الأدعية المستحبة في استفتاح الصلاة",
    repetitions: 1,
  },
  {
    id: 9,
    category: "prayer",
    title: "دعاء الركوع",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    translation: "سبحان ربي العظيم",
    transliteration: "Subhana rabbiyal-'adhim",
    meaning: "تنزيهاً لربي العظيم عن كل نقص",
    source: "رواه أبو داود والترمذي وابن ماجه",
    virtues: "من الأذكار الواجبة في الركوع",
    repetitions: 3,
  },
  {
    id: 10,
    category: "prayer",
    title: "دعاء الرفع من الركوع",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
    translation: "سمع الله لمن حمده، ربنا ولك الحمد",
    transliteration: "Sami'allahu liman hamidah, Rabbana wa lakal-hamd",
    meaning: "استجاب الله لمن حمده، ربنا ولك الحمد",
    source: "رواه البخاري",
    virtues: "من الأذكار الواجبة عند الرفع من الركوع",
    repetitions: 1,
  },
  {
    id: 11,
    category: "quran",
    title: "دعاء سيدنا آدم عليه السلام",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    translation: "ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin",
    meaning: "ربنا ظلمنا أنفسنا بالمعصية وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين",
    source: "سورة الأعراف: 23",
    virtues: "من أدعية القرآن المستجابة",
    repetitions: 1,
  },
  {
    id: 12,
    category: "quran",
    title: "دعاء سيدنا إبراهيم عليه السلام",
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    translation: "رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء",
    transliteration: "Rabbij'alni muqimas-salati wa min dhurriyyati, Rabbana wa taqabbal du'a'",
    meaning: "ربي اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعائي",
    source: "سورة إبراهيم: 40",
    virtues: "من أدعية القرآن المستجابة",
    repetitions: 1,
  },
  {
    id: 13,
    category: "prophetic",
    title: "سيد الاستغفار",
    arabic:
      "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    translation:
      "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت",
    transliteration:
      "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa anta",
    meaning:
      "اللهم أنت ربي لا معبود بحق إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أستجير بك من شر ما صنعت، أقر لك بنعمتك علي، وأقر بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت",
    source: "رواه البخاري",
    virtues: "من قالها موقناً بها حين يمسي فمات من ليلته دخل الجنة، ومن قالها موقناً بها حين يصبح فمات من يومه دخل الجنة",
    repetitions: 1,
  },
  {
    id: 14,
    category: "daily",
    title: "دعاء دخول المنزل",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    translation: "بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna",
    meaning: "باسم الله دخلنا، وباسم الله خرجنا، وعلى ربنا توكلنا",
    source: "رواه أبو داود",
    virtues: "من الأذكار المستحبة عند دخول المنزل",
    repetitions: 1,
  },
  {
    id: 15,
    category: "daily",
    title: "دعاء الخروج من المنزل",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    translation: "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
    meaning: "باسم الله، اعتمدت على الله، ولا حول ولا قوة إلا بالله",
    source: "رواه أبو داود والترمذي",
    virtues: "من قاله كفي وحفظ ووقي، وتنحى عنه الشيطان",
    repetitions: 1,
  },
]

export default function DuasPage() {
  const [activeTab, setActiveTab] = useState("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("morning")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const [duas, setDuas] = useState(mockDuas)
  const [copied, setCopied] = useState<number | null>(null)
  const [repetitionCounts, setRepetitionCounts] = useState<Record<number, number>>({})

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setIsLoading(true)

    // In a real app, we would fetch duas from the selected category
    // For this demo, we'll just filter the mock data
    setTimeout(() => {
      setDuas(mockDuas.filter((dua) => dua.category === categoryId))
      setIsLoading(false)
    }, 500)
  }

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setActiveTab("search")

    // In a real app, we would search for duas containing the query
    // For this demo, we'll just filter the mock data
    setTimeout(() => {
      setDuas(
        mockDuas.filter(
          (dua) =>
            dua.arabic.includes(searchQuery) ||
            dua.translation.includes(searchQuery) ||
            dua.title.includes(searchQuery) ||
            dua.meaning.includes(searchQuery),
        ),
      )
      setIsLoading(false)
    }, 500)
  }

  // Toggle favorite status for a dua
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Copy dua text to clipboard
  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  // Share dua (using clipboard instead of Web Share API)
  const shareDua = (dua: any) => {
    const shareText = `${dua.arabic}

${dua.translation}

${dua.meaning}

المصدر: ${dua.source}`

    // Use clipboard API directly instead of Web Share API
    copyToClipboard(dua.id, shareText)

    // Show feedback to user
    alert("تم نسخ الدعاء إلى الحافظة")
  }

  // Increment repetition count
  const incrementRepetition = (id: number, maxReps: number) => {
    setRepetitionCounts((prev) => {
      const currentCount = prev[id] || 0
      if (currentCount < maxReps) {
        return { ...prev, [id]: currentCount + 1 }
      }
      return prev
    })
  }

  // Reset repetition count
  const resetRepetition = (id: number) => {
    setRepetitionCounts((prev) => ({ ...prev, [id]: 0 }))
  }

  // Get filtered duas based on active tab
  const getFilteredDuas = () => {
    switch (activeTab) {
      case "categories":
        return duas.filter((dua) => dua.category === selectedCategory)
      case "search":
        return duas
      case "favorites":
        return mockDuas.filter((dua) => favorites.includes(dua.id))
      default:
        return duas
    }
  }

  const filteredDuas = getFilteredDuas()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">الأدعية والأذكار</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                الأقسام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الأدعية"
                    className="mb-2"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="categories" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="categories">الأقسام</TabsTrigger>
                    <TabsTrigger value="favorites">المفضلة</TabsTrigger>
                    <TabsTrigger value="search">البحث</TabsTrigger>
                  </TabsList>
                </Tabs>

                {activeTab === "categories" && (
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-1 pr-3">
                      {duaCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          <div className="flex items-center">
                            {category.icon}
                            <span className="mr-2">{category.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                )}

                {activeTab === "favorites" && favorites.length === 0 && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <p className="mt-4 text-muted-foreground">لم تقم بإضافة أي أدعية إلى المفضلة بعد</p>
                  </div>
                )}

                {activeTab === "search" && searchQuery === "" && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <p className="mt-4 text-muted-foreground">اكتب كلمة للبحث في الأدعية</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
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
            ) : filteredDuas.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <p className="mt-4 text-muted-foreground">لا توجد أدعية مطابقة للبحث</p>
              </div>
            ) : (
              // Duas content
              filteredDuas.map((dua) => (
                <Card key={dua.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <CardTitle>{dua.title}</CardTitle>
                        <Badge variant="outline">{duaCategories.find((c) => c.id === dua.category)?.name}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(dua.id)}
                        className={favorites.includes(dua.id) ? "text-red-500" : ""}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-md">
                        <p className="text-xl leading-relaxed text-right">{dua.arabic}</p>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="transliteration">
                          <AccordionTrigger>النطق</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{dua.transliteration}</p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="meaning">
                          <AccordionTrigger>المعنى</AccordionTrigger>
                          <AccordionContent>
                            <p>{dua.meaning}</p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="virtues">
                          <AccordionTrigger>الفضل</AccordionTrigger>
                          <AccordionContent>
                            <p>{dua.virtues}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>المصدر: {dua.source}</span>
                        <span>التكرار: {dua.repetitions} مرات</span>
                      </div>

                      {dua.repetitions > 1 && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{
                                  width: `${((repetitionCounts[dua.id] || 0) / dua.repetitions) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium">
                            {repetitionCounts[dua.id] || 0}/{dua.repetitions}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => incrementRepetition(dua.id, dua.repetitions)}
                            disabled={(repetitionCounts[dua.id] || 0) >= dua.repetitions}
                          >
                            +
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => resetRepetition(dua.id)}>
                            إعادة
                          </Button>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(dua.id, dua.arabic)}>
                          {copied === dua.id ? <Check className="h-4 w-4 ml-1" /> : <Copy className="h-4 w-4 ml-1" />}
                          {copied === dua.id ? "تم النسخ" : "نسخ"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => shareDua(dua)}>
                          <Share2 className="h-4 w-4 ml-1" />
                          مشاركة
                        </Button>
                        <Button variant="default" size="sm">
                          <Bookmark className="h-4 w-4 ml-1" />
                          حفظ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

