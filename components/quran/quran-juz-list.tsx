"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface JuzData {
  id: number
  name: string
  startSurah: number
  startAyah: number
  endSurah: number
  endAyah: number
}

interface QuranJuzListProps {
  nightMode: boolean
  onJuzSelect: (juzId: number, startSurah: number, startAyah: number) => void
}

export default function QuranJuzList({ nightMode, onJuzSelect }: QuranJuzListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock Juz data
  const juzData: JuzData[] = [
    { id: 1, name: "الجزء الأول", startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141 },
    { id: 2, name: "الجزء الثاني", startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252 },
    { id: 3, name: "الجزء الثالث", startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92 },
    { id: 4, name: "الجزء الرابع", startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23 },
    { id: 5, name: "الجزء الخامس", startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147 },
    { id: 6, name: "الجزء السادس", startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81 },
    { id: 7, name: "الجزء السابع", startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110 },
    { id: 8, name: "الجزء الثامن", startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87 },
    { id: 9, name: "الجزء التاسع", startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40 },
    { id: 10, name: "الجزء العاشر", startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92 },
    { id: 11, name: "الجزء الحادي عشر", startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5 },
    { id: 12, name: "الجزء الثاني عشر", startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52 },
    { id: 13, name: "الجزء الثالث عشر", startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52 },
    { id: 14, name: "الجزء الرابع عشر", startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128 },
    { id: 15, name: "الجزء الخامس عشر", startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74 },
    { id: 16, name: "الجزء السادس عشر", startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135 },
    { id: 17, name: "الجزء السابع عشر", startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78 },
    { id: 18, name: "الجزء الثامن عشر", startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20 },
    { id: 19, name: "الجزء التاسع عشر", startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55 },
    { id: 20, name: "الجزء العشرون", startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45 },
    { id: 21, name: "الجزء الحادي والعشرون", startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30 },
    { id: 22, name: "الجزء الثاني والعشرون", startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27 },
    { id: 23, name: "الجزء الثالث والعشرون", startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31 },
    { id: 24, name: "الجزء الرابع والعشرون", startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46 },
    { id: 25, name: "الجزء الخامس والعشرون", startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37 },
    { id: 26, name: "الجزء السادس والعشرون", startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30 },
    { id: 27, name: "الجزء السابع والعشرون", startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29 },
    { id: 28, name: "الجزء الثامن والعشرون", startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12 },
    { id: 29, name: "الجزء التاسع والعشرون", startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50 },
    { id: 30, name: "الجزء الثلاثون", startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6 },
  ]

  // Filter juz based on search term
  const filteredJuz = juzData.filter((juz) => juz.name.includes(searchTerm) || juz.id.toString().includes(searchTerm))

  // Get surah name based on surah number
  const getSurahName = (surahNumber: number) => {
    const surahNames = [
      "الفاتحة",
      "البقرة",
      "آل عمران",
      "النساء",
      "المائدة",
      "الأنعام",
      "الأعراف",
      "الأنفال",
      "التوبة",
      "يونس",
      "هود",
      "يوسف",
      "الرعد",
      "إبراهيم",
      "الحجر",
      "النحل",
      "الإسراء",
      "الكهف",
      "مريم",
      "طه",
      "الأنبياء",
      "الحج",
      "المؤمنون",
      "النور",
      "الفرقان",
      "الشعراء",
      "النمل",
      "القصص",
      "العنكبوت",
      "الروم",
      "لقمان",
      "السجدة",
      "الأحزاب",
      "سبأ",
      "فاطر",
      "يس",
      "الصافات",
      "ص",
      "الزمر",
      "غافر",
      "فصلت",
      "الشورى",
      "الزخرف",
      "الدخان",
      "الجاثية",
      "الأحقاف",
      "محمد",
      "الفتح",
      "الحجرات",
      "ق",
      "الذاريات",
      "الطور",
      "النجم",
      "القمر",
      "الرحمن",
      "الواقعة",
      "الحديد",
      "المجادلة",
      "الحشر",
      "الممتحنة",
      "الصف",
      "الجمعة",
      "المنافقون",
      "التغابن",
      "الطلاق",
      "التحريم",
      "الملك",
      "القلم",
      "الحاقة",
      "المعارج",
      "نوح",
      "الجن",
      "المزمل",
      "المدثر",
      "القيامة",
      "الإنسان",
      "المرسلات",
      "النبأ",
      "النازعات",
      "عبس",
      "التكوير",
      "الانفطار",
      "المطففين",
      "الانشقاق",
      "البروج",
      "الطارق",
      "الأعلى",
      "الغاشية",
      "الفجر",
      "البلد",
      "الشمس",
      "الليل",
      "الضحى",
      "الشرح",
      "التين",
      "العلق",
      "القدر",
      "البينة",
      "الزلزلة",
      "العاديات",
      "القارعة",
      "التكاثر",
      "العصر",
      "الهمزة",
      "الفيل",
      "قريش",
      "الماعون",
      "الكوثر",
      "الكافرون",
      "النصر",
      "المسد",
      "الإخلاص",
      "الفلق",
      "الناس",
    ]

    return surahNames[surahNumber - 1] || `سورة ${surahNumber}`
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث عن جزء..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-8 ${nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}`}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-1 pr-3">
          {filteredJuz.map((juz) => (
            <div
              key={juz.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                nightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => onJuzSelect(juz.id, juz.startSurah, juz.startAyah)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm ml-2">
                  {juz.id}
                </div>
                <div>
                  <p className="font-medium">{juz.name}</p>
                  <div className="flex items-center flex-wrap gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getSurahName(juz.startSurah)} {juz.startAyah}
                    </Badge>
                    <span className="text-xs text-muted-foreground">إلى</span>
                    <Badge variant="outline" className="text-xs">
                      {getSurahName(juz.endSurah)} {juz.endAyah}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

