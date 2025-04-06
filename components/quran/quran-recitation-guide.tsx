"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface TajweedRule {
  id: string
  name: string
  arabicName: string
  description: string
  example: string
  audioUrl?: string
}

const tajweedRules: TajweedRule[] = [
  {
    id: "idgham",
    name: "Idgham (Merging)",
    arabicName: "الإدغام",
    description:
      "When noon saakin (ن) or tanween meets one of the letters (ي ن م و ل ر), the noon or tanween is merged into the following letter.",
    example: "مِن نَّعِيمٍ",
    audioUrl: "/audio/tajweed/idgham.mp3",
  },
  {
    id: "ikhfa",
    name: "Ikhfa (Hiding)",
    arabicName: "الإخفاء",
    description:
      "When noon saakin (ن) or tanween is followed by any of the 15 letters of Ikhfa, the noon sound is hidden and pronounced with a nasal sound.",
    example: "مِن قَبْلِ",
    audioUrl: "/audio/tajweed/ikhfa.mp3",
  },
  {
    id: "iqlab",
    name: "Iqlab (Conversion)",
    arabicName: "الإقلاب",
    description:
      "When noon saakin (ن) or tanween is followed by the letter ba (ب), the noon is converted to a meem sound.",
    example: "مِنۢ بَعْدِ",
    audioUrl: "/audio/tajweed/iqlab.mp3",
  },
  {
    id: "izhar",
    name: "Izhar (Clear Pronunciation)",
    arabicName: "الإظهار",
    description:
      "When noon saakin (ن) or tanween is followed by any of the throat letters (ء ه ع ح غ خ), the noon is pronounced clearly without any merging or hiding.",
    example: "مِنْ عِلْمٍ",
    audioUrl: "/audio/tajweed/izhar.mp3",
  },
  {
    id: "madd",
    name: "Madd (Prolongation)",
    arabicName: "المد",
    description:
      "Extending the sound of the letters alif (ا), waw (و), and ya (ي) when they have a sukoon and are preceded by their respective short vowels.",
    example: "قَالَ",
    audioUrl: "/audio/tajweed/madd.mp3",
  },
]

export default function QuranRecitationGuide() {
  const [activeTab, setActiveTab] = useState("tajweed")
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayAudio = (ruleId: string) => {
    if (isPlaying === ruleId) {
      setIsPlaying(null)
    } else {
      setIsPlaying(ruleId)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-indigo-100 dark:border-indigo-900 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl text-indigo-700 dark:text-indigo-400">
          دليل تلاوة القرآن الكريم
        </CardTitle>
        <CardDescription className="text-center">تعلم أحكام التجويد وقواعد القراءة الصحيحة</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tajweed" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="tajweed" className="text-sm">
              أحكام التجويد
            </TabsTrigger>
            <TabsTrigger value="makharij" className="text-sm">
              مخارج الحروف
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-sm">
              نصائح للقراءة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tajweed" className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              التجويد هو علم يُعنى بتحسين تلاوة القرآن الكريم وإعطاء كل حرف حقه ومستحقه من الصفات والمخارج.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {tajweedRules.map((rule) => (
                <AccordionItem key={rule.id} value={rule.id}>
                  <AccordionTrigger className="text-right">
                    <span className="flex items-center justify-between w-full">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm">{rule.name}</span>
                      <span className="font-arabic text-base">{rule.arabicName}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700 dark:text-gray-300">{rule.description}</p>
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-md">
                        <p className="font-arabic text-right text-lg">{rule.example}</p>
                      </div>
                      {rule.audioUrl && (
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePlayAudio(rule.id)}
                            className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
                          >
                            {isPlaying === rule.id ? (
                              <>
                                <Pause className="h-4 w-4 mr-1" />
                                <span>إيقاف</span>
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                <span>استماع للمثال</span>
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="makharij">
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-400">سيتم إضافة محتوى مخارج الحروف قريباً...</p>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-right">الاستعاذة والبسملة</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-right">
                  ابدأ دائماً بالاستعاذة (أعوذ بالله من الشيطان الرجيم) ثم البسملة (بسم الله الرحمن الرحيم) قبل قراءة
                  القرآن.
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-right">الترتيل</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-right">
                  اقرأ القرآن بترتيل وتأنٍ، كما قال تعالى: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا".
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-right">الخشوع والتدبر</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-right">
                  اقرأ بخشوع وتدبر لمعاني الآيات، فالغاية من القراءة هي فهم كلام الله والعمل به.
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-right">الاستماع للقراء</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-right">
                  استمع للقراء المتقنين لتحسين تلاوتك ومعرفة النطق الصحيح للحروف والكلمات.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
        <Button variant="ghost" size="sm" onClick={toggleMute} className="text-gray-600 dark:text-gray-400">
          {isMuted ? (
            <>
              <VolumeX className="h-4 w-4 mr-1" />
              <span className="text-sm">تفعيل الصوت</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 mr-1" />
              <span className="text-sm">كتم الصوت</span>
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
        >
          عرض المزيد من الدروس
        </Button>
      </CardFooter>
    </Card>
  )
}

