"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SearchResultsProps {
  showSearchResults: boolean
  setShowSearchResults: (show: boolean) => void
  searchResults: any[]
  searchQuery: string
  nightMode: boolean
  handleSurahChange: (surahId: string) => void
  scrollToVerse: (verseId: number) => void
  quranSurahs: any[]
}

export default function SearchResults({
  showSearchResults,
  setShowSearchResults,
  searchResults,
  searchQuery,
  nightMode,
  handleSurahChange,
  scrollToVerse,
  quranSurahs,
}: SearchResultsProps) {
  if (!showSearchResults) return null

  const handleResultClick = (result: any) => {
    // Navigate to the surah and verse
    handleSurahChange(result.surahId.toString())

    // We need a small delay to allow the surah to load before scrolling to the verse
    setTimeout(() => {
      scrollToVerse(result.verseId)
      setShowSearchResults(false)
    }, 1500)
  }

  return (
    <Card
      className={`absolute top-full left-0 right-0 mt-1 z-50 max-h-[70vh] overflow-auto ${
        nightMode ? "bg-gray-800 text-gray-100 border-gray-700" : ""
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">
            نتائج البحث عن: <span className="text-primary">{searchQuery}</span>
          </h3>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowSearchResults(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد نتائج للبحث</p>
          </div>
        ) : (
          <div className="space-y-3">
            {searchResults.map((result, index) => {
              const surah = quranSurahs.find((s) => s.id === result.surahId)
              return (
                <div
                  key={index}
                  className="p-3 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {surah?.name} - آية {result.verseId}
                      </span>
                      <span className="text-xs text-muted-foreground mr-2">{result.matchType}</span>
                    </div>
                  </div>
                  <p className="text-right font-quran text-lg leading-relaxed">{result.text}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

