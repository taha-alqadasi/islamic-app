"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface QuranWordByWordProps {
  verseKey: string
}

interface Word {
  text: string
  translation: string
  transliteration: string
  partOfSpeech: string
}

export function QuranWordByWord({ verseKey }: QuranWordByWordProps) {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")

  // Mock word-by-word data
  const mockWords: Word[] = [
    { text: "بِسْمِ", translation: "In the name", transliteration: "bismi", partOfSpeech: "اسم مجرور" },
    { text: "اللَّهِ", translation: "of Allah", transliteration: "allahi", partOfSpeech: "لفظ الجلالة مجرور" },
    { text: "الرَّحْمَٰنِ", translation: "the Most Gracious", transliteration: "alrrahmani", partOfSpeech: "صفة مجرورة" },
    { text: "الرَّحِيمِ", translation: "the Most Merciful", transliteration: "alrraheemi", partOfSpeech: "صفة مجرورة" },
    { text: "الْحَمْدُ", translation: "All praise", transliteration: "alhamdu", partOfSpeech: "مبتدأ مرفوع" },
    { text: "لِلَّهِ", translation: "is to Allah", transliteration: "lillahi", partOfSpeech: "جار ومجرور" },
    { text: "رَبِّ", translation: "Lord", transliteration: "rabbi", partOfSpeech: "مضاف إليه مجرور" },
    { text: "الْعَالَمِينَ", translation: "of the worlds", transliteration: "al'alameen", partOfSpeech: "مضاف إليه مجرور" },
  ]

  useEffect(() => {
    // Simulate API call to get word-by-word data
    setLoading(true)
    setTimeout(() => {
      setWords(mockWords)
      setLoading(false)
    }, 1000)
  }, [verseKey])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-lg font-medium">ترجمة كلمة بكلمة</h3>
        <div className="w-full sm:w-auto">
          <Label htmlFor="language-select" className="sr-only">
            اختر اللغة
          </Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger id="language-select" className="w-full sm:w-[180px]">
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="ur">اردو</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {words.map((word, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[100px]">
                  <span className="font-quran text-xl mb-2">{word.text}</span>
                  <span className="text-xs text-muted-foreground mb-1">{word.transliteration}</span>
                  <span className="text-sm font-medium">{word.translation}</span>
                  <span className="text-xs text-primary mt-1">{word.partOfSpeech}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

