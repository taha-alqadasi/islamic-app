"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SurahListProps {
  quranSurahs: any[]
  currentSurah: any
  handleSurahChange: (surahId: string) => void
  toggleFavorite: (surahId: number) => void
  favorites: number[]
  nightMode: boolean
}

export default function SurahList({
  quranSurahs,
  currentSurah,
  handleSurahChange,
  toggleFavorite,
  favorites,
  nightMode,
}: SurahListProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredSurahs = quranSurahs.filter(
    (surah) =>
      surah.name.includes(searchTerm) ||
      surah.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.id.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث عن سورة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-8 ${nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}`}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-1 pr-3">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                currentSurah.id === surah.id
                  ? "bg-primary text-primary-foreground"
                  : nightMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
              }`}
              onClick={() => handleSurahChange(surah.id.toString())}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ml-2 ${
                    currentSurah.id === surah.id ? "bg-primary-foreground text-primary" : "bg-primary/10 text-primary"
                  }`}
                >
                  {surah.id}
                </div>
                <div>
                  <p className="font-medium">{surah.name}</p>
                  <div className="flex items-center">
                    <p className="text-xs text-muted-foreground">{surah.nameEn}</p>
                    <Badge
                      variant="outline"
                      className={`mr-1 text-[10px] ${currentSurah.id === surah.id ? "border-primary-foreground" : ""}`}
                    >
                      {surah.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mr-1">{surah.verses} آية</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(surah.id)
                }}
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorites.includes(surah.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

