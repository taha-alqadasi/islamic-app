"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Heart, Bookmark, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Verse {
  arabic: string
  translation: string
  surah: string
  ayah: number
}

export default function QuranDailyVerse() {
  const [dailyVerse, setDailyVerse] = useState<Verse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  // Simulated fetch of daily verse
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDailyVerse = () => {
      setIsLoading(true)
      // Simulated API response
      setTimeout(() => {
        setDailyVerse({
          arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
          translation:
            "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be guided.",
          surah: "البقرة",
          ayah: 186,
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchDailyVerse()
  }, [])

  const handleShare = () => {
    if (navigator.share && dailyVerse) {
      navigator
        .share({
          title: `آية اليوم من سورة ${dailyVerse.surah}`,
          text: `${dailyVerse.arabic}\n\n${dailyVerse.translation}\n\n${dailyVerse.surah} ${dailyVerse.ayah}`,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      toast({
        title: "تم نسخ الآية",
        description: "تم نسخ الآية إلى الحافظة",
      })
    }
  }

  const handleCopy = () => {
    if (dailyVerse) {
      navigator.clipboard.writeText(
        `${dailyVerse.arabic}\n\n${dailyVerse.translation}\n\n${dailyVerse.surah} ${dailyVerse.ayah}`,
      )
      toast({
        title: "تم نسخ الآية",
        description: "تم نسخ الآية إلى الحافظة",
      })
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "تمت إزالة الآية من المفضلة" : "تمت إضافة الآية إلى المفضلة",
      description: isFavorite ? "تم إزالة الآية من قائمة المفضلة بنجاح" : "تم إضافة الآية إلى قائمة المفضلة بنجاح",
    })
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "تمت إزالة العلامة المرجعية" : "تمت إضافة العلامة المرجعية",
      description: isBookmarked ? "تم إزالة العلامة المرجعية بنجاح" : "تم إضافة العلامة المرجعية بنجاح",
    })
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-emerald-100 dark:border-emerald-900 shadow-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl text-emerald-700 dark:text-emerald-400">آية اليوم</CardTitle>
          <CardDescription>جار تحميل آية اليوم...</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  if (!dailyVerse) return null

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-emerald-100 dark:border-emerald-900 shadow-md transition-all hover:shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl text-emerald-700 dark:text-emerald-400">آية اليوم</CardTitle>
        <CardDescription className="text-sm">
          سورة {dailyVerse.surah} - الآية {dailyVerse.ayah}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-right text-xl md:text-2xl leading-relaxed font-arabic" dir="rtl">
          {dailyVerse.arabic}
        </p>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {dailyVerse.translation}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <Copy className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">نسخ</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className={`${isFavorite ? "text-red-500" : "text-gray-600 dark:text-gray-400"} hover:text-red-500`}
          >
            <Heart className="h-4 w-4 mr-1" fill={isFavorite ? "currentColor" : "none"} />
            <span className="hidden sm:inline">المفضلة</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBookmark}
            className={`${isBookmarked ? "text-blue-500" : "text-gray-600 dark:text-gray-400"} hover:text-blue-500`}
          >
            <Bookmark className="h-4 w-4 mr-1" fill={isBookmarked ? "currentColor" : "none"} />
            <span className="hidden sm:inline">حفظ</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

