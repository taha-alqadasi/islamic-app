"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  RefreshCw,
  Music,
  Download,
  Heart,
  BookOpen,
  Search,
  Moon,
  Sun,
  Info,
  ListMusic,
  Shuffle,
  Clock,
  X,
  Check,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for Quran surahs
const quranSurahs = [
  { id: 1, name: "الفاتحة", nameEn: "Al-Fatiha", verses: 7, type: "مكية", duration: "0:58" },
  { id: 2, name: "البقرة", nameEn: "Al-Baqarah", verses: 286, type: "مدنية", duration: "2:02:30" },
  { id: 3, name: "آل عمران", nameEn: "Aal-Imran", verses: 200, type: "مدنية", duration: "1:03:20" },
  { id: 4, name: "النساء", nameEn: "An-Nisa", verses: 176, type: "مدنية", duration: "1:36:45" },
  { id: 5, name: "المائدة", nameEn: "Al-Ma'idah", verses: 120, type: "مدنية", duration: "49:30" },
  { id: 6, name: "الأنعام", nameEn: "Al-An'am", verses: 165, type: "مكية", duration: "55:12" },
  { id: 7, name: "الأعراف", nameEn: "Al-A'raf", verses: 206, type: "مكية", duration: "1:05:23" },
  { id: 8, name: "الأنفال", nameEn: "Al-Anfal", verses: 75, type: "مدنية", duration: "30:45" },
  { id: 9, name: "التوبة", nameEn: "At-Tawbah", verses: 129, type: "مدنية", duration: "43:12" },
  { id: 10, name: "يونس", nameEn: "Yunus", verses: 109, type: "مكية", duration: "38:20" },
  { id: 11, name: "هود", nameEn: "Hud", verses: 123, type: "مكية", duration: "42:15" },
  { id: 12, name: "يوسف", nameEn: "Yusuf", verses: 111, type: "مكية", duration: "39:45" },
  { id: 13, name: "الرعد", nameEn: "Ar-Ra'd", verses: 43, type: "مدنية", duration: "19:30" },
  { id: 14, name: "إبراهيم", nameEn: "Ibrahim", verses: 52, type: "مكية", duration: "22:10" },
  { id: 15, name: "الحجر", nameEn: "Al-Hijr", verses: 99, type: "مكية", duration: "17:45" },
  { id: 16, name: "النحل", nameEn: "An-Nahl", verses: 128, type: "مكية", duration: "41:20" },
  { id: 17, name: "الإسراء", nameEn: "Al-Isra", verses: 111, type: "مكية", duration: "36:15" },
  { id: 18, name: "الكهف", nameEn: "Al-Kahf", verses: 110, type: "مكية", duration: "37:30" },
  { id: 19, name: "مريم", nameEn: "Maryam", verses: 98, type: "مكية", duration: "26:45" },
  { id: 20, name: "طه", nameEn: "Ta-Ha", verses: 135, type: "مكية", duration: "34:20" },
  { id: 21, name: "الأنبياء", nameEn: "Al-Anbiya", verses: 112, type: "مكية", duration: "35:10" },
  { id: 22, name: "الحج", nameEn: "Al-Hajj", verses: 78, type: "مدنية", duration: "31:45" },
  { id: 23, name: "المؤمنون", nameEn: "Al-Mu'minun", verses: 118, type: "مكية", duration: "29:30" },
  { id: 24, name: "النور", nameEn: "An-Nur", verses: 64, type: "مدنية", duration: "28:15" },
  { id: 25, name: "الفرقان", nameEn: "Al-Furqan", verses: 77, type: "مكية", duration: "25:40" },
  { id: 26, name: "الشعراء", nameEn: "Ash-Shu'ara", verses: 227, type: "مكية", duration: "33:20" },
  { id: 27, name: "النمل", nameEn: "An-Naml", verses: 93, type: "مكية", duration: "27:15" },
  { id: 28, name: "القصص", nameEn: "Al-Qasas", verses: 88, type: "مكية", duration: "30:45" },
  { id: 29, name: "العنكبوت", nameEn: "Al-Ankabut", verses: 69, type: "مكية", duration: "23:30" },
  { id: 30, name: "الروم", nameEn: "Ar-Rum", verses: 60, type: "مكية", duration: "21:15" },
]

// Mock data for Quran reciters
const quranReciters = [
  { id: 1, name: "عبد الباسط عبد الصمد", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "عبد الباسط عبد الصمد", style: "مجود", image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "محمود خليل الحصري", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "محمود خليل الحصري", style: "مجود", image: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "محمد صديق المنشاوي", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "محمد صديق المنشاوي", style: "مجود", image: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "ماهر المعيقلي", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 8, name: "سعد الغامدي", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 9, name: "عبد الرحمن السديس", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "مشاري راشد العفاسي", style: "مرتل", image: "/placeholder.svg?height=50&width=50" },
]

// Mock data for playlists
const initialPlaylists = [
  { id: 1, name: "المفضلة", surahs: [1, 18, 36, 55, 67, 78] },
  { id: 2, name: "للاستماع اليومي", surahs: [1, 2, 18, 36, 67] },
  {
    id: 3,
    name: "سور قصيرة",
    surahs: [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
  },
]

export default function QuranPlayerPage() {
  // State for player
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSurah, setCurrentSurah] = useState(quranSurahs[0])
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedReciter, setSelectedReciter] = useState(quranReciters[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none")
  const [shuffleMode, setShuffleMode] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [nightMode, setNightMode] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([1, 36, 112])
  const [playlists, setPlaylists] = useState(initialPlaylists)
  const [activePlaylist, setActivePlaylist] = useState<number | null>(null)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([1, 36, 2])
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [showSpeedControl, setShowSpeedControl] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showReciterInfo, setShowReciterInfo] = useState(false)
  const [audioError, setAudioError] = useState(false)

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

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
      if (repeatMode === "one") {
        // Repeat the current surah
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((err) => {
            console.error("Error playing audio:", err)
            simulateAudioPlayback()
          })
        }
      } else if (autoPlay || repeatMode === "all") {
        // Play next surah
        playNextSurah()
      } else {
        setIsPlaying(false)
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
  }, [autoPlay, repeatMode])

  // Simulate audio playback for demo purposes
  const simulateAudioPlayback = () => {
    // Simulate audio progress for demo purposes
    let simulatedProgress = 0
    const simulatedDuration = 60 // 60 seconds total duration

    setAudioDuration(simulatedDuration)

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    progressIntervalRef.current = setInterval(() => {
      simulatedProgress += 1
      if (simulatedProgress > simulatedDuration) {
        // Simulate audio ending
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }

        if (repeatMode === "one") {
          simulatedProgress = 0
          simulateAudioPlayback()
        } else if (autoPlay || repeatMode === "all") {
          playNextSurah()
        } else {
          setIsPlaying(false)
        }
      } else {
        setAudioProgress(simulatedProgress)
      }
    }, 1000)
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
      // Add to recently played
      if (!recentlyPlayed.includes(currentSurah.id)) {
        setRecentlyPlayed((prev) => [currentSurah.id, ...prev.slice(0, 9)])
      } else {
        // Move to top if already in list
        setRecentlyPlayed((prev) => [currentSurah.id, ...prev.filter((id) => id !== currentSurah.id)])
      }

      // Simulate playback without alert
      setAudioError(true)
      setIsPlaying(true)
      simulateAudioPlayback()
    }
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    const newProgress = value[0]
    setAudioProgress(newProgress)

    // If we're simulating playback, restart the interval from the new position
    if (isPlaying && progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      simulateAudioPlayback()
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
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0
    }
  }

  // Handle playback speed change
  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }

  // Play previous surah
  const playPreviousSurah = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (shuffleMode) {
        // Play random surah
        const randomIndex = Math.floor(Math.random() * quranSurahs.length)
        setCurrentSurah(quranSurahs[randomIndex])
      } else if (activePlaylist !== null) {
        // Get current playlist
        const playlist = playlists.find((p) => p.id === activePlaylist)
        if (playlist) {
          const currentIndex = playlist.surahs.indexOf(currentSurah.id)
          if (currentIndex > 0) {
            // Play previous surah in playlist
            const prevSurahId = playlist.surahs[currentIndex - 1]
            const prevSurah = quranSurahs.find((s) => s.id === prevSurahId)
            if (prevSurah) setCurrentSurah(prevSurah)
          } else {
            // Wrap to end of playlist
            const lastSurahId = playlist.surahs[playlist.surahs.length - 1]
            const lastSurah = quranSurahs.find((s) => s.id === lastSurahId)
            if (lastSurah) setCurrentSurah(lastSurah)
          }
        }
      } else {
        // Play previous surah in order
        const currentIndex = quranSurahs.findIndex((s) => s.id === currentSurah.id)
        if (currentIndex > 0) {
          setCurrentSurah(quranSurahs[currentIndex - 1])
        } else {
          // Wrap to end
          setCurrentSurah(quranSurahs[quranSurahs.length - 1])
        }
      }

      setIsLoading(false)
      setAudioProgress(0)

      // If already playing, start the new surah
      if (isPlaying) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        simulateAudioPlayback()
      }
    }, 1000)
  }

  // Play next surah
  const playNextSurah = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (shuffleMode) {
        // Play random surah
        const randomIndex = Math.floor(Math.random() * quranSurahs.length)
        setCurrentSurah(quranSurahs[randomIndex])
      } else if (activePlaylist !== null) {
        // Get current playlist
        const playlist = playlists.find((p) => p.id === activePlaylist)
        if (playlist) {
          const currentIndex = playlist.surahs.indexOf(currentSurah.id)
          if (currentIndex < playlist.surahs.length - 1) {
            // Play next surah in playlist
            const nextSurahId = playlist.surahs[currentIndex + 1]
            const nextSurah = quranSurahs.find((s) => s.id === nextSurahId)
            if (nextSurah) setCurrentSurah(nextSurah)
          } else {
            // Wrap to beginning of playlist
            const firstSurahId = playlist.surahs[0]
            const firstSurah = quranSurahs.find((s) => s.id === firstSurahId)
            if (firstSurah) setCurrentSurah(firstSurah)
          }
        }
      } else {
        // Play next surah in order
        const currentIndex = quranSurahs.findIndex((s) => s.id === currentSurah.id)
        if (currentIndex < quranSurahs.length - 1) {
          setCurrentSurah(quranSurahs[currentIndex + 1])
        } else {
          // Wrap to beginning
          setCurrentSurah(quranSurahs[0])
        }
      }

      setIsLoading(false)
      setAudioProgress(0)

      // If already playing, start the new surah
      if (isPlaying) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        simulateAudioPlayback()
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
  }

  // Toggle repeat mode
  const toggleRepeatMode = () => {
    if (repeatMode === "none") {
      setRepeatMode("one")
    } else if (repeatMode === "one") {
      setRepeatMode("all")
    } else {
      setRepeatMode("none")
    }
  }

  // Toggle shuffle mode
  const toggleShuffleMode = () => {
    setShuffleMode(!shuffleMode)
  }

  // Toggle favorite
  const toggleFavorite = (surahId: number) => {
    if (favorites.includes(surahId)) {
      setFavorites(favorites.filter((id) => id !== surahId))
    } else {
      setFavorites([...favorites, surahId])
    }
  }

  // Handle download surah
  const handleDownloadSurah = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          alert(`تم تنزيل سورة ${currentSurah.name} بنجاح`)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Create new playlist
  const createNewPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        surahs: [currentSurah.id],
      }
      setPlaylists([...playlists, newPlaylist])
      setNewPlaylistName("")
      alert(`تم إنشاء قائمة تشغيل "${newPlaylistName}" وإضافة سورة ${currentSurah.name} إليها`)
    }
  }

  // Add to playlist
  const addToPlaylist = (playlistId: number) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        // Check if surah is already in playlist
        if (!playlist.surahs.includes(currentSurah.id)) {
          return {
            ...playlist,
            surahs: [...playlist.surahs, currentSurah.id],
          }
        }
      }
      return playlist
    })

    setPlaylists(updatedPlaylists)
    setShowAddToPlaylist(false)
    alert(`تم إضافة سورة ${currentSurah.name} إلى قائمة التشغيل`)
  }

  // Remove from playlist
  const removeFromPlaylist = (playlistId: number, surahId: number) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          surahs: playlist.surahs.filter((id) => id !== surahId),
        }
      }
      return playlist
    })

    setPlaylists(updatedPlaylists)
  }

  // Delete playlist
  const deletePlaylist = (playlistId: number) => {
    if (confirm("هل أنت متأكد من حذف قائمة التشغيل هذه؟")) {
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId))
      if (activePlaylist === playlistId) {
        setActivePlaylist(null)
      }
    }
  }

  // Play surah
  const playSurah = (surahId: number) => {
    const surah = quranSurahs.find((s) => s.id === surahId)
    if (surah) {
      setCurrentSurah(surah)
      setAudioProgress(0)
      setIsPlaying(true)

      // Add to recently played
      if (!recentlyPlayed.includes(surahId)) {
        setRecentlyPlayed((prev) => [surahId, ...prev.slice(0, 9)])
      } else {
        // Move to top if already in list
        setRecentlyPlayed((prev) => [surahId, ...prev.filter((id) => id !== surahId)])
      }

      // Simulate playback
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      simulateAudioPlayback()
    }
  }

  // Play playlist
  const playPlaylist = (playlistId: number) => {
    const playlist = playlists.find((p) => p.id === playlistId)
    if (playlist && playlist.surahs.length > 0) {
      setActivePlaylist(playlistId)

      // Play first surah in playlist
      const firstSurahId = playlist.surahs[0]
      const firstSurah = quranSurahs.find((s) => s.id === firstSurahId)
      if (firstSurah) {
        setCurrentSurah(firstSurah)
        setAudioProgress(0)
        setIsPlaying(true)

        // Simulate playback
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        simulateAudioPlayback()
      }
    }
  }

  // Format time for audio player
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Filter surahs based on search query
  const filteredSurahs = quranSurahs.filter(
    (surah) => surah.name.includes(searchQuery) || surah.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get surahs for current tab
  const getSurahsForTab = () => {
    switch (activeTab) {
      case "favorites":
        return quranSurahs.filter((surah) => favorites.includes(surah.id))
      case "recent":
        return recentlyPlayed.map((id) => quranSurahs.find((s) => s.id === id)).filter(Boolean) as typeof quranSurahs
      case "all":
      default:
        return filteredSurahs
    }
  }

  // Get current reciter
  const currentReciter = quranReciters.find((r) => r.id === selectedReciter)

  return (
    <div className={`container mx-auto px-4 py-8 ${nightMode ? "bg-gray-900 text-gray-100" : ""}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">مشغل القرآن الكريم</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className={`sticky top-20 ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                القرآن الكريم
              </CardTitle>
              <CardDescription className={nightMode ? "text-gray-400" : ""}>
                استمع إلى تلاوات القرآن الكريم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن سورة"
                    className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">الكل</TabsTrigger>
                    <TabsTrigger value="favorites">المفضلة</TabsTrigger>
                    <TabsTrigger value="recent">الأخيرة</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-1 pr-3">
                        {filteredSurahs.map((surah) => (
                          <div
                            key={surah.id}
                            className={`
                              flex items-center justify-between p-2 rounded-md cursor-pointer
                              ${currentSurah.id === surah.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                            `}
                            onClick={() => playSurah(surah.id)}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm ml-2">
                                {surah.id}
                              </div>
                              <div>
                                <p className="font-medium">{surah.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {surah.nameEn} • {surah.duration}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(surah.id)
                              }}
                              className={favorites.includes(surah.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="favorites" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {favorites.length === 0 ? (
                          <div className="text-center py-8">
                            <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                            <p className="mt-4 text-muted-foreground">لم تقم بإضافة أي سور إلى المفضلة بعد</p>
                          </div>
                        ) : (
                          getSurahsForTab().map((surah) => (
                            <div
                              key={surah.id}
                              className={`
                                flex items-center justify-between p-2 rounded-md cursor-pointer
                                ${currentSurah.id === surah.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                              `}
                              onClick={() => playSurah(surah.id)}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm ml-2">
                                  {surah.id}
                                </div>
                                <div>
                                  <p className="font-medium">{surah.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {surah.nameEn} • {surah.duration}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(surah.id)
                                }}
                                className="text-red-500"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="recent" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {recentlyPlayed.length === 0 ? (
                          <div className="text-center py-8">
                            <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                            <p className="mt-4 text-muted-foreground">لم تقم بتشغيل أي سور بعد</p>
                          </div>
                        ) : (
                          getSurahsForTab().map((surah) => (
                            <div
                              key={surah.id}
                              className={`
                                flex items-center justify-between p-2 rounded-md cursor-pointer
                                ${currentSurah.id === surah.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                              `}
                              onClick={() => playSurah(surah.id)}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm ml-2">
                                  {surah.id}
                                </div>
                                <div>
                                  <p className="font-medium">{surah.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {surah.nameEn} • {surah.duration}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(surah.id)
                                }}
                                className={favorites.includes(surah.id) ? "text-red-500" : ""}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">قوائم التشغيل</h3>
                  <div className="space-y-1">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className={`
                          flex items-center justify-between p-2 rounded-md cursor-pointer
                          ${activePlaylist === playlist.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                        `}
                        onClick={() => playPlaylist(playlist.id)}
                      >
                        <div className="flex items-center">
                          <Music className="h-4 w-4 mr-2" />
                          <span>{playlist.name}</span>
                          <span className="text-xs text-muted-foreground mr-1">({playlist.surahs.length})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            deletePlaylist(playlist.id)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="اسم قائمة التشغيل الجديدة"
                      className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                    />
                    <Button variant="outline" size="sm" onClick={createNewPlaylist}>
                      إنشاء
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Card className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Music className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      سورة {currentSurah.name}
                      <Badge variant="outline" className="mr-2">
                        {currentSurah.type}
                      </Badge>
                      {favorites.includes(currentSurah.id) && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                    </CardTitle>
                    <CardDescription className={nightMode ? "text-gray-400" : ""}>
                      {currentSurah.nameEn} • {currentSurah.verses} آية • {currentSurah.duration}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
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

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}>
                          <ListMusic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>إضافة إلى قائمة تشغيل</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleFavorite(currentSurah.id)}
                          className={favorites.includes(currentSurah.id) ? "text-red-500" : ""}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{favorites.includes(currentSurah.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleDownloadSurah} disabled={isDownloading}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تنزيل السورة</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {showAddToPlaylist && (
                <div className="mt-4 p-3 border rounded-md">
                  <h3 className="font-medium mb-2">إضافة إلى قائمة تشغيل</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => addToPlaylist(playlist.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          <span>{playlist.name}</span>
                        </div>
                        {playlist.surahs.includes(currentSurah.id) && <Check className="h-4 w-4 text-green-500" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="إنشاء قائمة تشغيل جديدة"
                      className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                    />
                    <Button variant="outline" size="sm" onClick={createNewPlaylist}>
                      إنشاء
                    </Button>
                  </div>
                </div>
              )}

              {isDownloading && (
                <div className="mt-4">
                  <p className="text-sm mb-1">جاري تنزيل سورة {currentSurah.name}...</p>
                  <Progress value={downloadProgress} className="h-2" />
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={currentReciter?.image || "/placeholder.svg?height=50&width=50"}
                    alt={currentReciter?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{currentReciter?.name}</p>
                  <p className="text-sm text-muted-foreground">{currentReciter?.style}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowReciterInfo(!showReciterInfo)}>
                  <Info className="h-4 w-4 mr-1" />
                  معلومات القارئ
                </Button>
              </div>

              {showReciterInfo && (
                <div className="mb-6 p-4 bg-muted/20 rounded-md">
                  <h3 className="font-medium mb-2">نبذة عن القارئ</h3>
                  <p className="text-sm">
                    {currentReciter?.name} من أشهر قراء القرآن الكريم. اشتهر بصوته العذب وأدائه المميز للتلاوة{" "}
                    {currentReciter?.style === "مرتل" ? "المرتلة" : "المجودة"} للقرآن الكريم.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={playPreviousSurah} disabled={isLoading}>
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="default"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={togglePlayPause}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <Button variant="outline" size="icon" onClick={playNextSurah} disabled={isLoading}>
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm">{formatTime(audioProgress)}</span>
                    <Slider
                      value={[audioProgress]}
                      max={audioDuration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      disabled={!audioDuration || isLoading}
                      className="flex-1"
                    />
                    <span className="text-sm">{formatTime(audioDuration)}</span>
                  </div>

                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowVolumeControl(!showVolumeControl)}
                      onBlur={() => setTimeout(() => setShowVolumeControl(false), 200)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    {showVolumeControl && (
                      <div className="absolute bottom-full right-0 mb-2 p-2 bg-background border rounded-md shadow-md w-32">
                        <Slider value={[isMuted ? 0 : volume]} max={100} step={1} onValueChange={handleVolumeChange} />
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSpeedControl(!showSpeedControl)}
                      onBlur={() => setTimeout(() => setShowSpeedControl(false), 200)}
                    >
                      <span className="text-xs font-medium">{playbackSpeed}x</span>
                    </Button>

                    {showSpeedControl && (
                      <div className="absolute bottom-full right-0 mb-2 p-2 bg-background border rounded-md shadow-md w-32">
                        <div className="grid grid-cols-3 gap-1">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                            <Button
                              key={speed}
                              variant={playbackSpeed === speed ? "default" : "outline"}
                              size="sm"
                              className="text-xs"
                              onClick={() => handlePlaybackSpeedChange(speed)}
                            >
                              {speed}x
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={repeatMode !== "none" ? "default" : "outline"}
                      size="sm"
                      onClick={toggleRepeatMode}
                      className="flex items-center gap-1"
                    >
                      <Repeat className="h-4 w-4" />
                      {repeatMode === "none" ? "تكرار" : repeatMode === "one" ? "تكرار السورة" : "تكرار الكل"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={shuffleMode ? "default" : "outline"}
                      size="sm"
                      onClick={toggleShuffleMode}
                      className="flex items-center gap-1"
                    >
                      <Shuffle className="h-4 w-4" />
                      عشوائي
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select value={selectedReciter.toString()} onValueChange={handleReciterChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="اختر القارئ" />
                      </SelectTrigger>
                      <SelectContent className={nightMode ? "bg-gray-800 text-gray-100" : ""}>
                        {quranReciters.map((reciter) => (
                          <SelectItem key={reciter.id} value={reciter.id.toString()}>
                            {reciter.name} ({reciter.style})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => setShowPlaylist(!showPlaylist)}>
                  <ListMusic className="h-4 w-4 mr-2" />
                  {showPlaylist ? "إخفاء قائمة التشغيل" : "عرض قائمة التشغيل"}
                </Button>

                {showPlaylist && (
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium mb-2">
                      {activePlaylist !== null
                        ? `قائمة التشغيل: ${playlists.find((p) => p.id === activePlaylist)?.name}`
                        : "كل السور"}
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {(activePlaylist !== null
                        ? playlists
                            .find((p) => p.id === activePlaylist)
                            ?.surahs.map((id) => quranSurahs.find((s) => s.id === id))
                            .filter(Boolean)
                        : quranSurahs
                      ).map((surah) => (
                        <div
                          key={surah.id}
                          className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${currentSurah.id === surah.id ? "bg-primary/10" : "hover:bg-muted/50"}`}
                          onClick={() => playSurah(surah.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                              {surah.id}
                            </div>
                            <div>
                              <p className="font-medium">{surah.name}</p>
                              <p className="text-xs text-muted-foreground">{surah.duration}</p>
                            </div>
                          </div>
                          {currentSurah.id === surah.id && isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src="/placeholder.mp3" // This is a placeholder that won't actually load
                preload="none"
                onError={() => {
                  // Silent error handling - we're handling this in the togglePlayPause function
                  console.log("Audio source not available - this is expected in the demo")
                  setAudioError(true)
                }}
                hidden
              />

              {/* Demo notice */}
              <div className={`mt-6 p-3 rounded-md ${isPlaying ? "bg-primary/10" : ""} transition-colors duration-300`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isPlaying && <RefreshCw className="h-4 w-4 animate-spin text-primary" />}
                  <h3 className="font-medium text-primary">وضع المحاكاة نشط</h3>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  هذه نسخة تجريبية لا تحتوي على ملفات صوتية حقيقية. يتم حاليًا محاكاة تشغيل الصوت لأغراض العرض التوضيحي.
                </p>
                <p className="text-sm text-center text-muted-foreground mt-1">
                  في التطبيق الكامل، ستتمكن من الاستماع إلى تلاوات القرآن الكريم من مختلف القراء بجودة عالية.
                </p>
                {audioError && (
                  <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded text-sm text-center">
                    <p>لم يتم العثور على ملف الصوت. يتم استخدام المحاكاة بدلاً من ذلك.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

