"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, Copy, Check, Share2, Play, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuranTafsir } from "./quran-tafsir"
import { QuranTranslation } from "./quran-translation"
import { QuranWordByWord } from "./quran-word-by-word"
import { QuranTajweed } from "./quran-tajweed"

interface VerseActionsProps {
  verse: any
  surahId: number
  isBookmarked: (surahId: number, verseId: number) => boolean
  toggleBookmark: (surahId: number, verseId: number) => void
  copyVerseText: (verseId: number, text: string) => void
  copied: number | null
  shareVerse: (verse: any) => void
  simulateAudioPlayback: () => void
  setCurrentVerse: (verse: number) => void
  showTajweed: boolean
  showTranslation: boolean
  showTafsir: boolean
  showWordByWord: boolean
  showTransliteration: boolean
  nightMode: boolean
}

export default function VerseActions({
  verse,
  surahId,
  isBookmarked,
  toggleBookmark,
  copyVerseText,
  copied,
  shareVerse,
  simulateAudioPlayback,
  setCurrentVerse,
  showTajweed,
  showTranslation,
  showTafsir,
  showWordByWord,
  showTransliteration,
  nightMode,
}: VerseActionsProps) {
  const [activeTab, setActiveTab] = React.useState("tafsir")
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <div className="flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => toggleBookmark(surahId, verse.id)}>
              <Bookmark className={`h-4 w-4 ${isBookmarked(surahId, verse.id) ? "fill-current text-primary" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isBookmarked(surahId, verse.id) ? "إزالة العلامة المرجعية" : "إضافة علامة مرجعية"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => copyVerseText(verse.id, verse.text)}>
              {copied === verse.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied === verse.id ? "تم النسخ" : "نسخ الآية"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => shareVerse(verse)}>
              <Share2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>مشاركة الآية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCurrentVerse(verse.id)
                simulateAudioPlayback()
              }}
            >
              <Play className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>استماع للآية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className={`max-w-3xl ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}>
          <DialogHeader>
            <DialogTitle className="text-right">
              {verse.surahName} - آية {verse.id}
            </DialogTitle>
            <DialogDescription className={`text-right ${nightMode ? "text-gray-400" : ""}`}>
              تفاصيل الآية والتفسير والترجمة
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <p className="text-right font-quran text-2xl leading-loose mb-6">{verse.text}</p>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tafsir">التفسير</TabsTrigger>
                <TabsTrigger value="translation">الترجمة</TabsTrigger>
                <TabsTrigger value="wordByWord">كلمة بكلمة</TabsTrigger>
                <TabsTrigger value="tajweed">التجويد</TabsTrigger>
              </TabsList>

              <TabsContent value="tafsir" className="mt-4">
                <QuranTafsir verseKey={`${surahId}:${verse.id}`} verseText={verse.text} />
              </TabsContent>

              <TabsContent value="translation" className="mt-4">
                <QuranTranslation verseKey={`${surahId}:${verse.id}`} verseText={verse.text} />
              </TabsContent>

              <TabsContent value="wordByWord" className="mt-4">
                <QuranWordByWord verseKey={`${surahId}:${verse.id}`} />
              </TabsContent>

              <TabsContent value="tajweed" className="mt-4">
                <QuranTajweed verseKey={`${surahId}:${verse.id}`} verseText={verse.text} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

