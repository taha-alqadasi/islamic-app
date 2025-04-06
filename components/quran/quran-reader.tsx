"use client"
import { Info } from "lucide-react"
import VerseActions from "./quran-verse"

interface QuranReaderProps {
  currentSurah: any
  currentVerse: number
  isPlaying: boolean
  showVerseNumbers: boolean
  isBookmarked: (surahId: number, verseId: number) => boolean
  toggleBookmark: (surahId: number, verseId: number) => void
  copyVerseText: (verseId: number, text: string) => void
  copied: number | null
  shareVerse: (verse: any) => void
  simulateAudioPlayback: () => void
  setCurrentVerse: (verse: number) => void
  showTajweed: boolean
  fontSize: number
  showWordByWord: boolean
  showTransliteration: boolean
  showTranslation: boolean
  showTafsir: boolean
  autoScrollEnabled: boolean
}

export default function QuranReader({
  currentSurah,
  currentVerse,
  isPlaying,
  showVerseNumbers,
  isBookmarked,
  toggleBookmark,
  copyVerseText,
  copied,
  shareVerse,
  simulateAudioPlayback,
  setCurrentVerse,
  showTajweed,
  fontSize,
  showWordByWord,
  showTransliteration,
  showTranslation,
  showTafsir,
  autoScrollEnabled,
}: QuranReaderProps) {
  // تحسين دالة عرض الآيات مع دعم التجويد
  const renderVerse = (verse: any) => {
    // تحديد ما إذا كانت الآية الحالية قيد التشغيل
    const isCurrentlyPlaying = isPlaying && currentVerse === verse.id

    // تحديد ما إذا كانت الآية مميزة (إما قيد التشغيل أو محددة)
    const isHighlighted = currentVerse === verse.id

    // تطبيق نمط التجويد (في تطبيق حقيقي، سيتم استخدام ترميز خاص للتجويد)
    const renderTajweedText = (text: string) => {
      if (!showTajweed) return text

      // هذا مجرد مثال بسيط - في التطبيق الحقيقي سيتم استخدام ترميز خاص للتجويد
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: text
              .replace(/اللَّهِ/g, '<span class="text-red-500">اللَّهِ</span>')
              .replace(/الرَّحْمَٰنِ/g, '<span class="text-blue-500">الرَّحْمَٰنِ</span>')
              .replace(/الرَّحِيمِ/g, '<span class="text-green-500">الرَّحِيمِ</span>'),
          }}
        />
      )
    }

    return (
      <div
        key={verse.id}
        id={`verse-${verse.id}`}
        className={`p-4 rounded-lg transition-all duration-300 ${
          isHighlighted
            ? isCurrentlyPlaying
              ? "bg-primary/20 pulse-animation border-r-4 border-primary"
              : "bg-primary/10 border-r-4 border-primary"
            : "hover:bg-muted/50"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {showVerseNumbers && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                {verse.id}
              </div>
            )}
            {isCurrentlyPlaying && (
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse delay-75"></div>
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse delay-150"></div>
              </div>
            )}
          </div>
          <VerseActions
            verse={verse}
            surahId={currentSurah.id}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            copyVerseText={copyVerseText}
            copied={copied}
            shareVerse={shareVerse}
            simulateAudioPlayback={simulateAudioPlayback}
            setCurrentVerse={setCurrentVerse}
            showTajweed={showTajweed}
            showTranslation={showTranslation}
            showTafsir={showTafsir}
            showWordByWord={showWordByWord}
            showTransliteration={showTransliteration}
            nightMode={false}
          />
        </div>

        <p className="text-right leading-loose mb-4 font-quran" style={{ fontSize: `${fontSize}px` }}>
          {showTajweed ? renderTajweedText(verse.text) : verse.text}
        </p>

        {/* Word by word translation */}
        {showWordByWord && verse.wordByWord && (
          <div className="mb-4 bg-muted/20 p-3 rounded-md">
            <div className="flex flex-wrap gap-3 justify-center">
              {verse.wordByWord.map((word: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="font-quran text-lg">{word.arabic}</span>
                  <span className="text-xs text-muted-foreground">{word.translation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showTransliteration && (
          <div className="mb-4 text-muted-foreground">
            <p className="italic">{verse.transliteration}</p>
          </div>
        )}

        {showTranslation && (
          <div className="mb-4">
            <p>{verse.translation}</p>
          </div>
        )}

        {showTafsir && (
          <div className="mt-4 p-3 bg-muted/30 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4" />
              <h4 className="font-medium">التفسير</h4>
            </div>
            <p className="text-sm">{verse.tafsir}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Bismillah */}
      {currentSurah.bismillah && currentSurah.id !== 1 && currentSurah.id !== 9 && (
        <div className="text-center mb-8">
          <p className="text-2xl font-quran">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      )}

      {/* مؤشر تقدم قراءة السورة */}
      <div className="mt-4 mb-6 bg-muted/20 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{
            width: `${(currentVerse / currentSurah.text.length) * 100}%`,
          }}
        />
      </div>

      {/* Verses */}
      {currentVerse === 0 ? (
        // عرض كل الآيات
        <div className="space-y-4">{currentSurah.text.map((verse: any) => renderVerse(verse))}</div>
      ) : (
        // عرض آية واحدة فقط
        <div className="space-y-4">
          {currentSurah.text.filter((verse: any) => verse.id === currentVerse).map((verse: any) => renderVerse(verse))}
        </div>
      )}
    </div>
  )
}

