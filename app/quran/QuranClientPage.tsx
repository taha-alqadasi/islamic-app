"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Book, Moon, Sun, Maximize, Minimize, Filter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// استيراد المكونات الجديدة
import QuranReader from "@/components/quran/quran-reader"
import QuranSettings from "@/components/quran/quran-settings"
import AudioPlayer from "@/components/quran/quran-audio-player"
import SurahList from "@/components/quran/surah-list"
import BookmarkList from "@/components/quran/bookmark-list"
import SearchResults from "@/components/quran/quran-search"

// استيراد البيانات
import { quranSurahs, surahFatiha, surahBaqarah, surahIkhlas, surahNas } from "@/data/quran-data"
import { quranReciters, quranTranslations } from "@/data/quran-settings"

export default function QuranClientPage() {
  // State for current surah and verse
  const [currentSurah, setCurrentSurah] = useState(surahFatiha)
  const [currentVerse, setCurrentVerse] = useState(0) // 0 means show all verses
  const [fullScreenMode, setFullScreenMode] = useState(false)

  // State for audio player
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedReciter, setSelectedReciter] = useState(quranReciters[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [repeatVerse, setRepeatVerse] = useState(false)
  const [repeatCount, setRepeatCount] = useState(1)
  const [currentRepeatCount, setCurrentRepeatCount] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState(false)

  // State for UI
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeTab, setActiveTab] = useState("surahs")
  const [showTajweed, setShowTajweed] = useState(false)
  const [selectedTafsir, setSelectedTafsir] = useState("1")
  const [showVerseNumbers, setShowVerseNumbers] = useState(true)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const [readingHistory, setReadingHistory] = useState<any[]>([])
  const [showAudioVisualizer, setShowAudioVisualizer] = useState(false)
  const [verseTimings, setVerseTimings] = useState<{ [key: number]: { start: number; end: number } }>({})
  const [selectedTranslation, setSelectedTranslation] = useState(quranTranslations[0].id)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showTafsir, setShowTafsir] = useState(false)
  const [showTransliteration, setShowTransliteration] = useState(false)
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [fontSize, setFontSize] = useState(24)
  const [bookmarks, setBookmarks] = useState([
    { id: 1, surahId: 1, verseId: 5, name: "الفاتحة - آية 5", date: "2023-12-01" },
    { id: 2, surahId: 2, verseId: 3, name: "البقرة - آية 3", date: "2023-12-05" },
  ])
  const [lastRead, setLastRead] = useState([
    { id: 1, surahId: 1, verseId: 1, name: "الفاتحة", date: "2023-12-10" },
    { id: 2, surahId: 2, verseId: 1, name: "البقرة", date: "2023-12-09" },
  ])
  const [favorites, setFavorites] = useState<number[]>([])
  const [nightMode, setNightMode] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [readingPosition, setReadingPosition] = useState(0)
  const [showJumpToVerseDialog, setShowJumpToVerseDialog] = useState(false)
  const [jumpToVerseNumber, setJumpToVerseNumber] = useState("")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filterType, setFilterType] = useState<string[]>(["مكية", "مدنية"])

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Effect to handle audio progress updates
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setAudioProgress(audioRef.current.currentTime)
          setAudioDuration(audioRef.current.duration || 0)
        }
      }, 1000)
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying])

  // Effect to handle audio end
  useEffect(() => {
    const handleAudioEnd = () => {
      setCurrentRepeatCount((prev) => prev + 1)

      if (repeatVerse && currentVerse > 0 && currentRepeatCount < repeatCount - 1) {
        // Repeat the current verse
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((err) => {
            console.error("Error playing audio:", err)
            simulateAudioPlayback()
          })
        }
      } else if (autoPlay) {
        // Reset repeat counter
        setCurrentRepeatCount(0)

        // Play next verse or surah
        if (currentVerse < currentSurah.text.length) {
          setCurrentVerse((prev) => prev + 1)
        } else {
          // Find next surah
          const nextSurahId = currentSurah.id + 1
          const nextSurah = getNextSurah(nextSurahId)
          setCurrentSurah(nextSurah)
          setCurrentVerse(1)
        }
      } else {
        setIsPlaying(false)
        setCurrentRepeatCount(0)
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd)
      }
    }
  }, [autoPlay, repeatVerse, currentVerse, currentSurah, repeatCount, currentRepeatCount])

  // Track reading position
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
        setReadingPosition(progress)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // تحسين دالة محاكاة تشغيل الصوت لتزامن أفضل مع الآيات
  const simulateAudioPlayback = () => {
    // تحديد مدة كل آية (بالثواني) - في التطبيق الحقيقي ستكون هذه المدد مختلفة لكل آية
    const versesDurations = currentSurah.text.map(() => Math.floor(Math.random() * 5) + 3) // 3-8 ثانية لكل آية

    // إنشاء توقيتات الآيات للتزامن
    const timings: { [key: number]: { start: number; end: number } } = {}
    let cumulativeTime = 0

    versesDurations.forEach((duration, index) => {
      timings[index + 1] = {
        start: cumulativeTime,
        end: cumulativeTime + duration,
      }
      cumulativeTime += duration
    })

    setVerseTimings(timings)

    // إجمالي مدة السورة
    const totalDuration = versesDurations.reduce((sum, duration) => sum + duration, 0)

    // تعيين المدة الإجمالية
    setAudioDuration(totalDuration)

    // إذا كان هناك مؤقت نشط، قم بإلغائه
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // تحديد الآية الحالية ووقت البدء
    let currentVerseIndex = currentVerse > 0 ? currentVerse - 1 : 0
    let elapsedTime = 0

    // حساب الوقت المنقضي حتى الآية الحالية
    for (let i = 0; i < currentVerseIndex; i++) {
      elapsedTime += versesDurations[i]
    }

    // تعيين وقت البدء
    setAudioProgress(elapsedTime)

    // إنشاء مؤقت لتحديث التقدم
    progressIntervalRef.current = setInterval(() => {
      setAudioProgress((prevProgress) => {
        const newProgress = prevProgress + 0.1 // زيادة بمقدار 0.1 ثانية

        // تحديد الآية الحالية بناءً على التوقيتات
        let newVerseIndex = 1
        for (const [verseNum, timing] of Object.entries(timings)) {
          if (newProgress >= timing.start && newProgress < timing.end) {
            newVerseIndex = Number.parseInt(verseNum)
            break
          }
        }

        // إذا تغيرت الآية، قم بتحديث الآية الحالية وتمرير الشاشة إليها
        if (newVerseIndex !== currentVerseIndex) {
          currentVerseIndex = newVerseIndex
          setCurrentVerse(newVerseIndex)

          // تمرير إلى الآية الحالية إذا كان التمرير التلقائي مفعلاً
          if (autoScrollEnabled) {
            const verseElement = document.getElementById(`verse-${newVerseIndex}`)
            if (verseElement) {
              verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }
        }

        // إذا وصلنا إلى نهاية السورة
        if (newProgress >= totalDuration) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
          }

          // تنفيذ نفس منطق انتهاء الصوت
          if (repeatVerse && currentVerse > 0 && currentRepeatCount < repeatCount - 1) {
            setCurrentRepeatCount((prev) => prev + 1)
            simulateAudioPlayback()
            return 0
          } else if (autoPlay) {
            setCurrentRepeatCount(0)

            if (currentVerse < currentSurah.text.length) {
              setCurrentVerse((prev) => prev + 1)
            } else {
              // انتقل إلى السورة التالية
              const nextSurahId = currentSurah.id + 1
              if (nextSurahId <= 114) {
                const nextSurah = getNextSurah(nextSurahId)
                setCurrentSurah(nextSurah)
                setCurrentVerse(1)
              } else {
                // وصلنا إلى نهاية القرآن
                setIsPlaying(false)
              }
            }

            setTimeout(() => simulateAudioPlayback(), 500)
            return 0
          } else {
            setIsPlaying(false)
            setCurrentRepeatCount(0)
            return 0
          }
        }

        return newProgress
      })
    }, 100) // تحديث كل 100 مللي ثانية للحصول على تجربة أكثر سلاسة
  }

  // الحصول على السورة التالية
  const getNextSurah = (surahId: number) => {
    if (surahId === 2) return surahBaqarah
    if (surahId === 112) return surahIkhlas
    if (surahId === 114) return surahNas

    // للسور الأخرى التي لم نضفها بعد
    return {
      ...surahFatiha,
      id: surahId,
      name: quranSurahs.find((s) => s.id === surahId)?.name || "",
      nameEn: quranSurahs.find((s) => s.id === surahId)?.nameEn || "",
      verses: quranSurahs.find((s) => s.id === surahId)?.verses || 0,
      type: quranSurahs.find((s) => s.id === surahId)?.type || "مكية",
    }
  }

  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setIsPlaying(false)
    } else {
      // إذا كان المستخدم يعرض كل الآيات، ابدأ من الآية الأولى
      if (currentVerse === 0) {
        setCurrentVerse(1)
      }

      if (audioRef.current && audioLoaded) {
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err)
          simulateAudioPlayback()
        })
        setIsPlaying(true)
      } else {
        setAudioError(true)
        setIsPlaying(true)
        simulateAudioPlayback()
      }
    }
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    const newProgress = value[0]
    setAudioProgress(newProgress)

    if (audioRef.current && audioLoaded) {
      audioRef.current.currentTime = newProgress
    } else {
      // If we're simulating playback, restart the interval from the new position
      if (isPlaying && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        simulateAudioPlayback()
      }
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  // Handle playback speed change
  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }

  // Handle previous verse
  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse((prev) => prev - 1)
    } else if (currentSurah.id > 1) {
      // Go to previous surah, last verse
      const prevSurahId = currentSurah.id - 1
      const prevSurah = getNextSurah(prevSurahId)
      setCurrentSurah(prevSurah)
      setCurrentVerse(prevSurah.text.length - 1)
    }

    // Reset repeat counter
    setCurrentRepeatCount(0)
  }

  // Handle next verse
  const handleNextVerse = () => {
    if (currentVerse < currentSurah.text.length) {
      setCurrentVerse((prev) => prev + 1)
    } else if (currentSurah.id < quranSurahs.length) {
      // Go to next surah, first verse
      const nextSurahId = currentSurah.id + 1
      const nextSurah = getNextSurah(nextSurahId)
      setCurrentSurah(nextSurah)
      setCurrentVerse(1)
    }

    // Reset repeat counter
    setCurrentRepeatCount(0)
  }

  // تحديث دالة تغيير السورة لتدعم جميع السور
  const handleSurahChange = (surahId: string) => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      const surahIdNum = Number.parseInt(surahId)
      const newSurah = getNextSurah(surahIdNum)

      setCurrentSurah(newSurah)
      setCurrentVerse(0) // Show all verses
      setIsLoading(false)

      // Update last read
      const newLastRead = [
        {
          id: Date.now(),
          surahId: newSurah.id,
          verseId: 1,
          name: newSurah.name,
          date: new Date().toISOString().split("T")[0],
        },
        ...lastRead.filter((item) => item.surahId !== newSurah.id).slice(0, 4),
      ]
      setLastRead(newLastRead)

      // Reset audio state
      setIsPlaying(false)
      setAudioProgress(0)
      setCurrentRepeatCount(0)

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }, 1000)
  }

  // Handle reciter change
  const handleReciterChange = (reciterId: string) => {
    setSelectedReciter(Number.parseInt(reciterId))
    // In a real app, we would load the audio file for the selected reciter
    if (isPlaying) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    // Reset audio state
    setAudioProgress(0)
    setCurrentRepeatCount(0)
  }

  // Handle translation change
  const handleTranslationChange = (translationId: string) => {
    setSelectedTranslation(Number.parseInt(translationId))
  }

  // إضافة دالة البحث المتقدم
  const handleAdvancedSearch = () => {
    if (!searchQuery.trim()) return

    // في تطبيق حقيقي، سنقوم بالبحث في القرآن الكريم
    setIsLoading(true)

    // محاكاة البحث
    setTimeout(() => {
      // تنفيذ البحث وعرض النتائج
      const searchResults = [
        { surahId: 1, verseId: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", matchType: "كلمة مطابقة" },
        { surahId: 2, verseId: 3, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", matchType: "كلمة مطابقة" },
        { surahId: 112, verseId: 2, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", matchType: "كلمة مطابقة" },
      ]

      // عرض نتائج البحث في نافذة منبثقة
      setSearchResults(searchResults)
      setShowSearchResults(true)
      setIsLoading(false)
    }, 1000)
  }

  // Toggle bookmark
  const toggleBookmark = (surahId: number, verseId: number) => {
    const existingBookmark = bookmarks.find((b) => b.surahId === surahId && b.verseId === verseId)

    if (existingBookmark) {
      // Remove bookmark
      setBookmarks(bookmarks.filter((b) => b.id !== existingBookmark.id))
    } else {
      // Add bookmark
      const surahName = quranSurahs.find((s) => s.id === surahId)?.name || ""
      const newBookmark = {
        id: Date.now(),
        surahId,
        verseId,
        name: `${surahName} - آية ${verseId}`,
        date: new Date().toISOString().split("T")[0],
      }
      setBookmarks([newBookmark, ...bookmarks])
    }
  }

  // Toggle favorite
  const toggleFavorite = (surahId: number) => {
    if (favorites.includes(surahId)) {
      setFavorites(favorites.filter((id) => id !== surahId))
    } else {
      setFavorites([...favorites, surahId])
    }
  }

  // Copy verse text
  const copyVerseText = (verseId: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(verseId)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  // Share verse
  const shareVerse = (verse: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${currentSurah.name} - آية ${verse.id}`,
          text: `${verse.text}\n\n${verse.translation}`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyVerseText(verse.id, `${verse.text}\n\n${verse.translation}`)
    }
  }

  // Format time for audio player
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Get verse element by ID
  const scrollToVerse = (verseId: number) => {
    setCurrentVerse(verseId)
    const verseElement = document.getElementById(`verse-${verseId}`)
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  // Check if a verse is bookmarked
  const isBookmarked = (surahId: number, verseId: number) => {
    return bookmarks.some((b) => b.surahId === surahId && b.verseId === verseId)
  }

  // Handle download surah audio
  const handleDownloadSurah = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          alert("تم تنزيل السورة بنجاح")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Handle jump to verse
  const handleJumpToVerse = () => {
    const verseNum = Number.parseInt(jumpToVerseNumber)
    if (!isNaN(verseNum) && verseNum > 0 && verseNum <= currentSurah.text.length) {
      scrollToVerse(verseNum)
      setShowJumpToVerseDialog(false)
    } else {
      alert(`الرجاء إدخال رقم آية صحيح بين 1 و ${currentSurah.text.length}`)
    }
  }

  // Toggle full screen reading mode
  const toggleFullScreenMode = () => {
    setFullScreenMode(!fullScreenMode)
  }

  // إضافة نمط للنبض عند تشغيل الآية
  const pulseAnimationStyle = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(var(--primary), 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(var(--primary), 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(var(--primary), 0);
      }
    }
    
    .pulse-animation {
      animation: pulse 2s infinite;
    }
    
    @keyframes highlight {
      0% {
        background-color: rgba(var(--primary), 0.1);
      }
      50% {
        background-color: rgba(var(--primary), 0.3);
      }
      100% {
        background-color: rgba(var(--primary), 0.1);
      }
    }
    
    .highlight-animation {
      animation: highlight 2s infinite;
    }
  `

  // تحسين الوضع الليلي في القرآن وجعل الخط أكثر وضوحاً مع الأيقونات

  // تحسين أنماط CSS للوضع الليلي
  const darkModeStyles = `
  .dark-mode {
    --bg-primary: #121212;
    --bg-secondary: #1e1e1e;
    --bg-tertiary: #2a2a2a;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --border-color: #333333;
    --highlight-bg: rgba(255, 255, 255, 0.05);
    --highlight-border: rgba(255, 255, 255, 0.1);
    --scrollbar-thumb: #555555;
    --scrollbar-track: #333333;
  }

  .dark-mode .quran-text {
    color: #f8f8f8;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
    letter-spacing: 0.03em;
  }

  .dark-mode .verse-container {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
  }

  .dark-mode .verse-container:hover {
    background-color: var(--bg-tertiary);
  }

  .dark-mode .icon-button {
    color: var(--text-secondary);
    background-color: var(--bg-tertiary);
  }

  .dark-mode .icon-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .dark-mode ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .dark-mode ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
    border-radius: 4px;
  }

  .dark-mode ::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track);
  }
  
  /* تحسين قراءة النص في الوضع الليلي */
  .dark-mode .quran-verse {
    font-weight: 500;
    line-height: 2.2;
  }
  
  /* تحسين وضوح الأيقونات في الوضع الليلي */
  .dark-mode .lucide-icon {
    stroke-width: 2.2;
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3));
  }
`

  return (
    <>
      <style jsx global>
        {pulseAnimationStyle}
      </style>
      <style jsx global>
        {darkModeStyles}
      </style>
      <div
        className={`container mx-auto px-4 py-8 ${nightMode ? "dark-mode bg-gray-900 text-gray-100" : ""} ${fullScreenMode ? "h-screen overflow-hidden" : ""}`}
        dir="rtl"
      >
        <h1 className={`text-3xl font-bold mb-6 text-center ${fullScreenMode ? "hidden" : ""}`}>القرآن الكريم</h1>

        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${fullScreenMode ? "h-full" : ""}`}>
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${fullScreenMode ? "hidden" : ""}`}>
            <Card className={`sticky top-20 ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  القرآن الكريم
                </CardTitle>
                <CardDescription className={nightMode ? "text-gray-400" : ""}>
                  اقرأ واستمع إلى القرآن الكريم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* نافذة البحث المتقدم */}
                  <div className="relative">
                    <div className="flex gap-2">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث في القرآن الكريم"
                        className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAdvancedSearch()
                          }
                        }}
                      />
                      <Button variant="default" onClick={handleAdvancedSearch}>
                        <Search className="h-4 w-4 mr-2" />
                        بحث
                      </Button>
                    </div>

                    {/* نافذة نتائج البحث */}
                    <SearchResults
                      showSearchResults={showSearchResults}
                      setShowSearchResults={setShowSearchResults}
                      searchResults={searchResults}
                      searchQuery={searchQuery}
                      nightMode={nightMode}
                      handleSurahChange={handleSurahChange}
                      scrollToVerse={scrollToVerse}
                      quranSurahs={quranSurahs}
                    />
                  </div>

                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="surahs">السور</TabsTrigger>
                      <TabsTrigger value="juz">الأجزاء</TabsTrigger>
                      <TabsTrigger value="bookmarks">العلامات</TabsTrigger>
                    </TabsList>

                    <TabsContent value="surahs" className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">قائمة السور</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFilterDialog(true)}
                          className="flex items-center gap-1 text-xs"
                        >
                          <Filter className="h-3 w-3" />
                          تصفية
                        </Button>
                      </div>
                      <SurahList
                        quranSurahs={quranSurahs.filter((surah) => filterType.includes(surah.type))}
                        currentSurah={currentSurah}
                        handleSurahChange={handleSurahChange}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        nightMode={nightMode}
                      />
                    </TabsContent>

                    <TabsContent value="juz" className="mt-4">
                      <ScrollArea className="h-[calc(100vh-300px)]">
                        <div className="space-y-1 pr-3">
                          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                            <div
                              key={juz}
                              className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted"
                              onClick={() => {
                                // في تطبيق حقيقي، سننتقل إلى الجزء المحدد
                                alert(`سيتم الانتقال إلى الجزء ${juz}`)
                              }}
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center
</cut_off_point>

 text-primary text-sm ml-2"
                                >
                                  {juz}
                                </div>
                                <div>
                                  <p className="font-medium">الجزء {juz}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {juz === 1
                                      ? "البقرة 1-141"
                                      : juz === 2
                                        ? "البقرة 142-252"
                                        : juz === 3
                                          ? "البقرة 253 - آل عمران 92"
                                          : "جزء " + juz}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="bookmarks" className="mt-4">
                      <BookmarkList
                        bookmarks={bookmarks}
                        currentSurah={currentSurah}
                        handleSurahChange={handleSurahChange}
                        scrollToVerse={scrollToVerse}
                        toggleBookmark={toggleBookmark}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className={`lg:col-span-3 ${fullScreenMode ? "col-span-4" : ""}`}>
            <Card className={`${nightMode ? "bg-gray-800 text-gray-100" : ""} ${fullScreenMode ? "h-full" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    {currentSurah.name}
                    <Badge variant="outline" className="ml-2">
                      {currentSurah.type}
                    </Badge>
                  </CardTitle>
                  <CardDescription className={nightMode ? "text-gray-400" : ""}>
                    {currentSurah.nameEn} • {currentSurah.verses} آية
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={toggleFullScreenMode}>
                          {fullScreenMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fullScreenMode ? "إنهاء وضع ملء الشاشة" : "وضع ملء الشاشة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setNightMode(!nightMode)}>
                          {nightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{nightMode ? "وضع النهار" : "وضع الليل"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Dialog open={showJumpToVerseDialog} onOpenChange={setShowJumpToVerseDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
                      <DialogHeader>
                        <DialogTitle>الانتقال إلى آية</DialogTitle>
                        <DialogDescription className={nightMode ? "text-gray-400" : ""}>
                          أدخل رقم الآية التي تريد الانتقال إليها
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          type="number"
                          min="1"
                          max={currentSurah.verses}
                          value={jumpToVerseNumber}
                          onChange={(e) => setJumpToVerseNumber(e.target.value)}
                          placeholder={`أدخل رقم الآية (1-${currentSurah.verses})`}
                          className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleJumpToVerse}>انتقال</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <QuranSettings
                    nightMode={nightMode}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    showTafsir={showTafsir}
                    setShowTafsir={setShowTafsir}
                    showTransliteration={showTransliteration}
                    setShowTransliteration={setShowTransliteration}
                    showWordByWord={showWordByWord}
                    setShowWordByWord={setShowWordByWord}
                    showTajweed={showTajweed}
                    setShowTajweed={setShowTajweed}
                    showVerseNumbers={showVerseNumbers}
                    setShowVerseNumbers={setShowVerseNumbers}
                    autoScrollEnabled={autoScrollEnabled}
                    setAutoScrollEnabled={setAutoScrollEnabled}
                    selectedTafsir={selectedTafsir}
                    setSelectedTafsir={setSelectedTafsir}
                    selectedTranslation={selectedTranslation}
                    handleTranslationChange={handleTranslationChange}
                    quranTranslations={quranTranslations}
                    showAudioVisualizer={showAudioVisualizer}
                    setShowAudioVisualizer={setShowAudioVisualizer}
                  />
                </div>
              </CardHeader>
              <CardContent ref={contentRef} className={fullScreenMode ? "h-[calc(100vh-200px)] overflow-auto" : ""}>
                {/* مؤشر تقدم القراءة */}
                <div className="fixed top-0 left-0 w-full h-1 z-50">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${readingPosition}%` }}
                  />
                </div>

                {isLoading ? (
                  // Loading skeleton
                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <QuranReader
                    currentSurah={currentSurah}
                    currentVerse={currentVerse}
                    isPlaying={isPlaying}
                    showVerseNumbers={showVerseNumbers}
                    isBookmarked={isBookmarked}
                    toggleBookmark={toggleBookmark}
                    copyVerseText={copyVerseText}
                    copied={copied}
                    shareVerse={shareVerse}
                    simulateAudioPlayback={simulateAudioPlayback}
                    setCurrentVerse={setCurrentVerse}
                    showTajweed={showTajweed}
                    fontSize={fontSize}
                    showWordByWord={showWordByWord}
                    showTransliteration={showTransliteration}
                    showTranslation={showTranslation}
                    showTafsir={showTafsir}
                    autoScrollEnabled={autoScrollEnabled}
                  />
                )}
              </CardContent>
              {!fullScreenMode && (
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    {currentVerse > 0 ? `آية ${currentVerse} من ${currentSurah.verses}` : `${currentSurah.verses} آية`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentVerse(0)}>
                      عرض كل الآيات
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowJumpToVerseDialog(true)}>
                      انتقال إلى آية
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>

            {/* Audio player */}
            <AudioPlayer
              nightMode={nightMode}
              fullScreenMode={fullScreenMode}
              selectedReciter={selectedReciter}
              handleReciterChange={handleReciterChange}
              quranReciters={quranReciters}
              showPlaylist={showPlaylist}
              setShowPlaylist={setShowPlaylist}
              showAudioVisualizer={showAudioVisualizer}
              isPlaying={isPlaying}
              handlePreviousVerse={handlePreviousVerse}
              togglePlayPause={togglePlayPause}
              handleNextVerse={handleNextVerse}
              audioProgress={audioProgress}
              audioDuration={audioDuration}
              formatTime={formatTime}
              handleSeek={handleSeek}
              toggleMute={toggleMute}
              isMuted={isMuted}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
              repeatVerse={repeatVerse}
              setRepeatVerse={setRepeatVerse}
              repeatCount={repeatCount}
              setRepeatCount={setRepeatCount}
              playbackSpeed={playbackSpeed}
              handlePlaybackSpeedChange={handlePlaybackSpeedChange}
              handleDownloadSurah={handleDownloadSurah}
              isDownloading={isDownloading}
              downloadProgress={downloadProgress}
              currentSurah={currentSurah}
              currentVerse={currentVerse}
              setCurrentVerse={setCurrentVerse}
              simulateAudioPlayback={simulateAudioPlayback}
              audioRef={audioRef}
              audioLoaded={audioLoaded}
              audioError={audioError}
            />
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
          <DialogHeader>
            <DialogTitle>تصفية السور</DialogTitle>
            <DialogDescription className={nightMode ? "text-gray-400" : ""}>
              اختر نوع السور التي تريد عرضها
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="makki"
                checked={filterType.includes("مكية")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "مكية"])
                  } else {
                    setFilterType(filterType.filter((type) => type !== "مكية"))
                  }
                }}
              />
              <label
                htmlFor="makki"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                السور المكية
              </label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="madani"
                checked={filterType.includes("مدنية")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "مدنية"])
                  } else {
                    setFilterType(filterType.filter((type) => type !== "مدنية"))
                  }
                }}
              />
              <label
                htmlFor="madani"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                السور المدنية
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowFilterDialog(false)}>تطبيق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )

  // تحسين عرض الآيات لتكون أكثر وضوحاً
  const playVerseAudio = (verseId) => {
    if (isPlaying && currentVerse === verseId) {
      // إيقاف الصوت إذا كان يعمل بالفعل لنفس الآية
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setIsPlaying(false)
    } else {
      // تعيين الآية الحالية
      setCurrentVerse(verseId)

      // محاولة تشغيل الصوت
      if (audioRef.current && audioLoaded) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((err) => {
          console.error("Error playing audio:", err)
          simulateAudioPlayback()
        })
        setIsPlaying(true)
      } else {
        setAudioError(true)
        setIsPlaying(true)
        simulateAudioPlayback()
      }
    }
  }

  return (
    <>
      <style jsx global>
        {pulseAnimationStyle}
      </style>
      <style jsx global>
        {darkModeStyles}
      </style>
      <div
        className={`container mx-auto px-4 py-8 ${nightMode ? "dark-mode bg-gray-900 text-gray-100" : ""} ${fullScreenMode ? "h-screen overflow-hidden" : ""}`}
        dir="rtl"
      >
        <h1 className={`text-3xl font-bold mb-6 text-center ${fullScreenMode ? "hidden" : ""}`}>القرآن الكريم</h1>

        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${fullScreenMode ? "h-full" : ""}`}>
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${fullScreenMode ? "hidden" : ""}`}>
            <Card className={`sticky top-20 ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  القرآن الكريم
                </CardTitle>
                <CardDescription className={nightMode ? "text-gray-400" : ""}>
                  اقرأ واستمع إلى القرآن الكريم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* نافذة البحث المتقدم */}
                  <div className="relative">
                    <div className="flex gap-2">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث في القرآن الكريم"
                        className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAdvancedSearch()
                          }
                        }}
                      />
                      <Button variant="default" onClick={handleAdvancedSearch}>
                        <Search className="h-4 w-4 mr-2" />
                        بحث
                      </Button>
                    </div>

                    {/* نافذة نتائج البحث */}
                    <SearchResults
                      showSearchResults={showSearchResults}
                      setShowSearchResults={setShowSearchResults}
                      searchResults={searchResults}
                      searchQuery={searchQuery}
                      nightMode={nightMode}
                      handleSurahChange={handleSurahChange}
                      scrollToVerse={scrollToVerse}
                      quranSurahs={quranSurahs}
                    />
                  </div>

                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="surahs">السور</TabsTrigger>
                      <TabsTrigger value="juz">الأجزاء</TabsTrigger>
                      <TabsTrigger value="bookmarks">العلامات</TabsTrigger>
                    </TabsList>

                    <TabsContent value="surahs" className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">قائمة السور</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFilterDialog(true)}
                          className="flex items-center gap-1 text-xs"
                        >
                          <Filter className="h-3 w-3" />
                          تصفية
                        </Button>
                      </div>
                      <SurahList
                        quranSurahs={quranSurahs.filter((surah) => filterType.includes(surah.type))}
                        currentSurah={currentSurah}
                        handleSurahChange={handleSurahChange}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        nightMode={nightMode}
                      />
                    </TabsContent>

                    <TabsContent value="juz" className="mt-4">
                      <ScrollArea className="h-[calc(100vh-300px)]">
                        <div className="space-y-1 pr-3">
                          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                            <div
                              key={juz}
                              className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted"
                              onClick={() => {
                                // في تطبيق حقيقي، سننتقل إلى الجزء المحدد
                                alert(`سيتم الانتقال إلى الجزء ${juz}`)
                              }}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm ml-2">
                                  {juz}
                                </div>
                                <div>
                                  <p className="font-medium">الجزء {juz}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {juz === 1
                                      ? "البقرة 1-141"
                                      : juz === 2
                                        ? "البقرة 142-252"
                                        : juz === 3
                                          ? "البقرة 253 - آل عمران 92"
                                          : "جزء " + juz}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="bookmarks" className="mt-4">
                      <BookmarkList
                        bookmarks={bookmarks}
                        currentSurah={currentSurah}
                        handleSurahChange={handleSurahChange}
                        scrollToVerse={scrollToVerse}
                        toggleBookmark={toggleBookmark}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className={`lg:col-span-3 ${fullScreenMode ? "col-span-4" : ""}`}>
            <Card className={`${nightMode ? "bg-gray-800 text-gray-100" : ""} ${fullScreenMode ? "h-full" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    {currentSurah.name}
                    <Badge variant="outline" className="ml-2">
                      {currentSurah.type}
                    </Badge>
                  </CardTitle>
                  <CardDescription className={nightMode ? "text-gray-400" : ""}>
                    {currentSurah.nameEn} • {currentSurah.verses} آية
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={toggleFullScreenMode}>
                          {fullScreenMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{fullScreenMode ? "إنهاء وضع ملء الشاشة" : "وضع ملء الشاشة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setNightMode(!nightMode)}>
                          {nightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{nightMode ? "وضع النهار" : "وضع الليل"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Dialog open={showJumpToVerseDialog} onOpenChange={setShowJumpToVerseDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
                      <DialogHeader>
                        <DialogTitle>الانتقال إلى آية</DialogTitle>
                        <DialogDescription className={nightMode ? "text-gray-400" : ""}>
                          أدخل رقم الآية التي تريد الانتقال إليها
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          type="number"
                          min="1"
                          max={currentSurah.verses}
                          value={jumpToVerseNumber}
                          onChange={(e) => setJumpToVerseNumber(e.target.value)}
                          placeholder={`أدخل رقم الآية (1-${currentSurah.verses})`}
                          className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleJumpToVerse}>انتقال</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <QuranSettings
                    nightMode={nightMode}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    showTafsir={showTafsir}
                    setShowTafsir={setShowTafsir}
                    showTransliteration={showTransliteration}
                    setShowTransliteration={setShowTransliteration}
                    showWordByWord={showWordByWord}
                    setShowWordByWord={setShowWordByWord}
                    showTajweed={showTajweed}
                    setShowTajweed={setShowTajweed}
                    showVerseNumbers={showVerseNumbers}
                    setShowVerseNumbers={setShowVerseNumbers}
                    autoScrollEnabled={autoScrollEnabled}
                    setAutoScrollEnabled={setAutoScrollEnabled}
                    selectedTafsir={selectedTafsir}
                    setSelectedTafsir={setSelectedTafsir}
                    selectedTranslation={selectedTranslation}
                    handleTranslationChange={handleTranslationChange}
                    quranTranslations={quranTranslations}
                    showAudioVisualizer={showAudioVisualizer}
                    setShowAudioVisualizer={setShowAudioVisualizer}
                  />
                </div>
              </CardHeader>
              <CardContent ref={contentRef} className={fullScreenMode ? "h-[calc(100vh-200px)] overflow-auto" : ""}>
                {/* مؤشر تقدم القراءة */}
                <div className="fixed top-0 left-0 w-full h-1 z-50">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${readingPosition}%` }}
                  />
                </div>

                {isLoading ? (
                  // Loading skeleton
                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <QuranReader
                    currentSurah={currentSurah}
                    currentVerse={currentVerse}
                    isPlaying={isPlaying}
                    showVerseNumbers={showVerseNumbers}
                    isBookmarked={isBookmarked}
                    toggleBookmark={toggleBookmark}
                    copyVerseText={copyVerseText}
                    copied={copied}
                    shareVerse={shareVerse}
                    simulateAudioPlayback={simulateAudioPlayback}
                    setCurrentVerse={setCurrentVerse}
                    showTajweed={showTajweed}
                    fontSize={fontSize}
                    showWordByWord={showWordByWord}
                    showTransliteration={showTransliteration}
                    showTranslation={showTranslation}
                    showTafsir={showTafsir}
                    autoScrollEnabled={autoScrollEnabled}
                  />
                )}
              </CardContent>
              {!fullScreenMode && (
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    {currentVerse > 0 ? `آية ${currentVerse} من ${currentSurah.verses}` : `${currentSurah.verses} آية`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentVerse(0)}>
                      عرض كل الآيات
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowJumpToVerseDialog(true)}>
                      انتقال إلى آية
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>

            {/* Audio player */}
            <AudioPlayer
              nightMode={nightMode}
              fullScreenMode={fullScreenMode}
              selectedReciter={selectedReciter}
              handleReciterChange={handleReciterChange}
              quranReciters={quranReciters}
              showPlaylist={showPlaylist}
              setShowPlaylist={setShowPlaylist}
              showAudioVisualizer={showAudioVisualizer}
              isPlaying={isPlaying}
              handlePreviousVerse={handlePreviousVerse}
              togglePlayPause={togglePlayPause}
              handleNextVerse={handleNextVerse}
              audioProgress={audioProgress}
              audioDuration={audioDuration}
              formatTime={formatTime}
              handleSeek={handleSeek}
              toggleMute={toggleMute}
              isMuted={isMuted}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
              repeatVerse={repeatVerse}
              setRepeatVerse={setRepeatVerse}
              repeatCount={repeatCount}
              setRepeatCount={setRepeatCount}
              playbackSpeed={playbackSpeed}
              handlePlaybackSpeedChange={handlePlaybackSpeedChange}
              handleDownloadSurah={handleDownloadSurah}
              isDownloading={isDownloading}
              downloadProgress={downloadProgress}
              currentSurah={currentSurah}
              currentVerse={currentVerse}
              setCurrentVerse={setCurrentVerse}
              simulateAudioPlayback={simulateAudioPlayback}
              audioRef={audioRef}
              audioLoaded={audioLoaded}
              audioError={audioError}
            />
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
          <DialogHeader>
            <DialogTitle>تصفية السور</DialogTitle>
            <DialogDescription className={nightMode ? "text-gray-400" : ""}>
              اختر نوع السور التي تريد عرضها
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="makki"
                checked={filterType.includes("مكية")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "مكية"])
                  } else {
                    setFilterType(filterType.filter((type) => type !== "مكية"))
                  }
                }}
              />
              <label
                htmlFor="makki"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                السور المكية
              </label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="madani"
                checked={filterType.includes("مدنية")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterType([...filterType, "مدنية"])
                  } else {
                    setFilterType(filterType.filter((type) => type !== "مدنية"))
                  }
                }}
              />
              <label
                htmlFor="madani"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                السور المدنية
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowFilterDialog(false)}>تطبيق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

