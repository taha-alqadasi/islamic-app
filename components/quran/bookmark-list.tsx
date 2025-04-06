"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Bookmark, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface BookmarkListProps {
  bookmarks: any[]
  currentSurah: any
  handleSurahChange: (surahId: string) => void
  scrollToVerse: (verseId: number) => void
  toggleBookmark: (surahId: number, verseId: number) => void
}

export default function BookmarkList({
  bookmarks,
  currentSurah,
  handleSurahChange,
  scrollToVerse,
  toggleBookmark,
}: BookmarkListProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBookmarkClick = (bookmark: any) => {
    if (bookmark.surahId !== currentSurah.id) {
      handleSurahChange(bookmark.surahId.toString())
      // We need a small delay to allow the surah to load before scrolling to the verse
      setTimeout(() => {
        scrollToVerse(bookmark.verseId)
      }, 1500)
    } else {
      scrollToVerse(bookmark.verseId)
    }
  }

  return (
    <div className="space-y-3">
      {bookmarks.length === 0 ? (
        <div className="text-center py-8">
          <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">لا توجد علامات مرجعية</h3>
          <p className="text-sm text-muted-foreground mt-1">أضف علامات مرجعية للآيات للوصول إليها بسرعة في المستقبل</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">العلامات المرجعية ({bookmarks.length})</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              تصدير
            </Button>
          </div>

          <Separator />

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {filteredBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleBookmarkClick(bookmark)}
                >
                  <div className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-2 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{bookmark.name}</p>
                      <p className="text-xs text-muted-foreground">{bookmark.date}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(bookmark.surahId, bookmark.verseId)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  )
}

