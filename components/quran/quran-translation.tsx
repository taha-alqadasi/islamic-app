"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface QuranTranslationProps {
  verseKey: string
  verseText?: string
}

export function QuranTranslation({ verseKey, verseText }: QuranTranslationProps) {
  const [translation, setTranslation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTranslation, setSelectedTranslation] = useState<string>("ar_muyassar")

  // Mock translation data
  const translationData = {
    ar_muyassar: "الترجمة العربية الميسرة: ترجمة مبسطة للآية الكريمة باللغة العربية المعاصرة.",
    en_sahih:
      "Sahih International: This is an English translation of the verse that aims to convey the meaning accurately.",
    fr_hamidullah: "Hamidullah: Traduction française du verset qui vise à transmettre le sens avec précision.",
    tr_diyanet: "Diyanet İşleri: Ayetin anlamını doğru bir şekilde iletmeyi amaçlayan Türkçe çevirisi.",
    ur_jalandhry: "جالندہری: آیت کا اردو ترجمہ جو معنی کو درستگی سے پہنچانے کا مقصد رکھتا ہے۔",
  }

  useEffect(() => {
    // Simulate API call to get translation
    setLoading(true)
    setTimeout(() => {
      setTranslation(translationData[selectedTranslation as keyof typeof translationData])
      setLoading(false)
    }, 800)
  }, [selectedTranslation, verseKey])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-lg font-medium">ترجمة الآية</h3>
        <div className="w-full sm:w-auto">
          <Label htmlFor="translation-select" className="sr-only">
            اختر الترجمة
          </Label>
          <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
            <SelectTrigger id="translation-select" className="w-full sm:w-[180px]">
              <SelectValue placeholder="اختر الترجمة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar_muyassar">العربية الميسرة</SelectItem>
              <SelectItem value="en_sahih">English (Sahih)</SelectItem>
              <SelectItem value="fr_hamidullah">Français (Hamidullah)</SelectItem>
              <SelectItem value="tr_diyanet">Türkçe (Diyanet)</SelectItem>
              <SelectItem value="ur_jalandhry">اردو (جالندہری)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div>
              {verseText && <p className="text-right font-quran text-lg mb-4 pb-4 border-b">{verseText}</p>}
              <p
                className={`leading-relaxed ${selectedTranslation.startsWith("ar") || selectedTranslation.startsWith("ur") ? "text-right" : "text-left"}`}
              >
                {translation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

