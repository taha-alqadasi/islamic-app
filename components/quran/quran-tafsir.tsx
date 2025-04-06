"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface QuranTafsirProps {
  verseKey: string
  verseText?: string
}

export function QuranTafsir({ verseKey, verseText }: QuranTafsirProps) {
  const [tafsir, setTafsir] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTafsir, setSelectedTafsir] = useState<string>("muyassar")

  // Mock tafsir data
  const tafsirData = {
    muyassar: "تفسير الميسر: هذا تفسير مبسط للآية الكريمة يوضح معناها بشكل سهل وميسر للقارئ العادي.",
    saadi: "تفسير السعدي: يشرح الشيخ عبد الرحمن السعدي الآية بأسلوب سهل مع ربطها بالآيات الأخرى والأحاديث النبوية.",
    tabari:
      "تفسير الطبري: يعتبر من أقدم وأشمل التفاسير، حيث يذكر الإمام الطبري الروايات المختلفة في تفسير الآية مع الترجيح بينها.",
    kathir: "تفسير ابن كثير: يعتمد على تفسير القرآن بالقرآن والسنة النبوية، مع ذكر أقوال الصحابة والتابعين.",
    qurtubi: "تفسير القرطبي: يهتم بالأحكام الفقهية المستنبطة من الآيات، مع ذكر الخلافات الفقهية وأدلة كل قول.",
  }

  useEffect(() => {
    // Simulate API call to get tafsir
    setLoading(true)
    setTimeout(() => {
      setTafsir(tafsirData[selectedTafsir as keyof typeof tafsirData])
      setLoading(false)
    }, 1000)
  }, [selectedTafsir, verseKey])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-lg font-medium">تفسير الآية</h3>
        <div className="w-full sm:w-auto">
          <Label htmlFor="tafsir-select" className="sr-only">
            اختر التفسير
          </Label>
          <Select value={selectedTafsir} onValueChange={setSelectedTafsir}>
            <SelectTrigger id="tafsir-select" className="w-full sm:w-[180px]">
              <SelectValue placeholder="اختر التفسير" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="muyassar">تفسير الميسر</SelectItem>
              <SelectItem value="saadi">تفسير السعدي</SelectItem>
              <SelectItem value="tabari">تفسير الطبري</SelectItem>
              <SelectItem value="kathir">تفسير ابن كثير</SelectItem>
              <SelectItem value="qurtubi">تفسير القرطبي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div>
              {verseText && <p className="text-right font-quran text-lg mb-4 pb-4 border-b">{verseText}</p>}
              <p className="text-right leading-relaxed">{tafsir}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

