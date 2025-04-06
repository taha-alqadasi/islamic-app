"use client"
import { Button } from "@/components/ui/button"
import { Settings, Type, Languages, BookOpen, FileText } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface QuranSettingsProps {
  nightMode: boolean
  fontSize: number
  setFontSize: (size: number) => void
  showTranslation: boolean
  setShowTranslation: (show: boolean) => void
  showTafsir: boolean
  setShowTafsir: (show: boolean) => void
  showTransliteration: boolean
  setShowTransliteration: (show: boolean) => void
  showWordByWord: boolean
  setShowWordByWord: (show: boolean) => void
  showTajweed: boolean
  setShowTajweed: (show: boolean) => void
  showVerseNumbers: boolean
  setShowVerseNumbers: (show: boolean) => void
  autoScrollEnabled: boolean
  setAutoScrollEnabled: (enabled: boolean) => void
  selectedTafsir: string
  setSelectedTafsir: (tafsir: string) => void
  selectedTranslation: number
  handleTranslationChange: (translation: string) => void
  quranTranslations: any[]
  showAudioVisualizer: boolean
  setShowAudioVisualizer: (show: boolean) => void
}

export default function QuranSettings({
  nightMode,
  fontSize,
  setFontSize,
  showTranslation,
  setShowTranslation,
  showTafsir,
  setShowTafsir,
  showTransliteration,
  setShowTransliteration,
  showWordByWord,
  setShowWordByWord,
  showTajweed,
  setShowTajweed,
  showVerseNumbers,
  setShowVerseNumbers,
  autoScrollEnabled,
  setAutoScrollEnabled,
  selectedTafsir,
  setSelectedTafsir,
  selectedTranslation,
  handleTranslationChange,
  quranTranslations,
  showAudioVisualizer,
  setShowAudioVisualizer,
}: QuranSettingsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`w-[300px] sm:w-[450px] overflow-y-auto ${nightMode ? "bg-gray-800 text-gray-100" : ""}`}
      >
        <SheetHeader>
          <SheetTitle className={nightMode ? "text-gray-100" : ""}>إعدادات القراءة</SheetTitle>
          <SheetDescription className={nightMode ? "text-gray-400" : ""}>
            قم بتخصيص تجربة قراءة القرآن الكريم
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="display" className="mt-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="display" className="text-xs sm:text-sm">
              <Type className="h-4 w-4 mr-1 hidden sm:inline-block" />
              العرض
            </TabsTrigger>
            <TabsTrigger value="translation" className="text-xs sm:text-sm">
              <Languages className="h-4 w-4 mr-1 hidden sm:inline-block" />
              الترجمة
            </TabsTrigger>
            <TabsTrigger value="recitation" className="text-xs sm:text-sm">
              <BookOpen className="h-4 w-4 mr-1 hidden sm:inline-block" />
              التلاوة
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1 hidden sm:inline-block" />
              متقدم
            </TabsTrigger>
          </TabsList>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="font-size" className="text-right">
                  حجم الخط: {fontSize}
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.min(40, fontSize + 2))}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              <Slider
                id="font-size"
                min={16}
                max={40}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>

            <Separator className={nightMode ? "bg-gray-700" : ""} />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">خيارات العرض</h3>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-verse-numbers" className="flex-1">
                  إظهار أرقام الآيات
                </Label>
                <Switch
                  id="show-verse-numbers"
                  checked={showVerseNumbers}
                  onCheckedChange={setShowVerseNumbers}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-tajweed" className="flex-1">
                  إظهار علامات التجويد
                </Label>
                <Switch
                  id="show-tajweed"
                  checked={showTajweed}
                  onCheckedChange={setShowTajweed}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-scroll" className="flex-1">
                  التمرير التلقائي مع التلاوة
                </Label>
                <Switch
                  id="auto-scroll"
                  checked={autoScrollEnabled}
                  onCheckedChange={setAutoScrollEnabled}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-audio-visualizer" className="flex-1">
                  إظهار مؤثرات الصوت
                </Label>
                <Switch
                  id="show-audio-visualizer"
                  checked={showAudioVisualizer}
                  onCheckedChange={setShowAudioVisualizer}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>
            </div>
          </TabsContent>

          {/* Translation Settings */}
          <TabsContent value="translation" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-translation" className="flex-1">
                  إظهار الترجمة
                </Label>
                <Switch
                  id="show-translation"
                  checked={showTranslation}
                  onCheckedChange={setShowTranslation}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              {showTranslation && (
                <div className="space-y-2">
                  <Label htmlFor="translation-select">اختر الترجمة</Label>
                  <Select
                    value={selectedTranslation.toString()}
                    onValueChange={handleTranslationChange}
                    id="translation-select"
                  >
                    <SelectTrigger className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                      <SelectValue placeholder="اختر الترجمة" />
                    </SelectTrigger>
                    <SelectContent className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                      {quranTranslations.map((translation) => (
                        <SelectItem key={translation.id} value={translation.id.toString()}>
                          {translation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Separator className={nightMode ? "bg-gray-700" : ""} />

              <div className="flex items-center justify-between">
                <Label htmlFor="show-transliteration" className="flex-1">
                  إظهار النطق الصوتي
                </Label>
                <Switch
                  id="show-transliteration"
                  checked={showTransliteration}
                  onCheckedChange={setShowTransliteration}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-word-by-word" className="flex-1">
                  إظهار ترجمة كلمة بكلمة
                </Label>
                <Switch
                  id="show-word-by-word"
                  checked={showWordByWord}
                  onCheckedChange={setShowWordByWord}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              <Separator className={nightMode ? "bg-gray-700" : ""} />

              <div className="flex items-center justify-between">
                <Label htmlFor="show-tafsir" className="flex-1">
                  إظهار التفسير
                </Label>
                <Switch
                  id="show-tafsir"
                  checked={showTafsir}
                  onCheckedChange={setShowTafsir}
                  className={nightMode ? "data-[state=checked]:bg-primary" : ""}
                />
              </div>

              {showTafsir && (
                <div className="space-y-2">
                  <Label htmlFor="tafsir-select">اختر التفسير</Label>
                  <Select value={selectedTafsir} onValueChange={setSelectedTafsir} id="tafsir-select">
                    <SelectTrigger className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                      <SelectValue placeholder="اختر التفسير" />
                    </SelectTrigger>
                    <SelectContent className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                      <SelectItem value="1">تفسير الميسر</SelectItem>
                      <SelectItem value="2">تفسير السعدي</SelectItem>
                      <SelectItem value="3">تفسير ابن كثير</SelectItem>
                      <SelectItem value="4">تفسير الطبري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Recitation Settings */}
          <TabsContent value="recitation" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">إعدادات التلاوة</h3>

              <div className="space-y-2">
                <Label htmlFor="auto-play-next">التشغيل التلقائي للآية التالية</Label>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="auto-play-next" className={nightMode ? "data-[state=checked]:bg-primary" : ""} />
                  <Label htmlFor="auto-play-next">تفعيل</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repeat-verse">تكرار الآية</Label>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="repeat-verse" className={nightMode ? "data-[state=checked]:bg-primary" : ""} />
                  <Label htmlFor="repeat-verse">تفعيل</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repeat-count">عدد مرات التكرار</Label>
                <Select defaultValue="1">
                  <SelectTrigger
                    id="repeat-count"
                    className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                  >
                    <SelectValue placeholder="عدد مرات التكرار" />
                  </SelectTrigger>
                  <SelectContent className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playback-speed">سرعة التلاوة</Label>
                <Select defaultValue="1">
                  <SelectTrigger
                    id="playback-speed"
                    className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}
                  >
                    <SelectValue placeholder="سرعة التلاوة" />
                  </SelectTrigger>
                  <SelectContent className={nightMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""}>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">إعدادات متقدمة</h3>

              <div className="space-y-2">
                <Label htmlFor="download-surah">تنزيل السورة للاستماع دون اتصال</Label>
                <Button variant="outline" className="w-full" id="download-surah">
                  تنزيل السورة الحالية
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clear-history">حذف سجل القراءة</Label>
                <Button variant="outline" className="w-full" id="clear-history">
                  حذف السجل
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-bookmarks">تصدير العلامات المرجعية</Label>
                <Button variant="outline" className="w-full" id="export-bookmarks">
                  تصدير
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="import-bookmarks">استيراد العلامات المرجعية</Label>
                <Button variant="outline" className="w-full" id="import-bookmarks">
                  استيراد
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button type="submit">حفظ الإعدادات</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

