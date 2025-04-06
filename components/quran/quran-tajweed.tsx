"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface QuranTajweedProps {
  verseKey: string
  verseText?: string
}

interface TajweedRule {
  name: string
  color: string
  description: string
  example: string
}

export function QuranTajweed({ verseKey, verseText }: QuranTajweedProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [tajweedText, setTajweedText] = useState<string>("")

  // Mock tajweed rules
  const tajweedRules: TajweedRule[] = [
    {
      name: "إدغام",
      color: "bg-red-500",
      description: "هو إدخال حرف ساكن بحرف متحرك بحيث يصيران حرفاً واحداً مشدداً",
      example: "مِن رَّبِّهِمْ",
    },
    {
      name: "إخفاء",
      color: "bg-blue-500",
      description: "هو النطق بالحرف بصفة بين الإظهار والإدغام مع بقاء الغنة",
      example: "مِن قَبْلِكَ",
    },
    {
      name: "قلقلة",
      color: "bg-green-500",
      description: "هي اضطراب المخرج عند النطق بالحرف الساكن حتى يسمع له نبرة قوية",
      example: "قُلْ",
    },
    {
      name: "مد",
      color: "bg-yellow-500",
      description: "هو إطالة الصوت بحرف من حروف المد الثلاثة",
      example: "قَالُوا",
    },
    {
      name: "غنة",
      color: "bg-purple-500",
      description: "هي صوت له رنين يخرج من الخيشوم",
      example: "إِنَّ",
    },
  ]

  useEffect(() => {
    // Simulate API call to get tajweed text
    setLoading(true)
    setTimeout(() => {
      // This is a simplified example - in a real app, we would use proper tajweed markup
      if (verseText) {
        const coloredText = verseText
          .replace(/اللَّهِ/g, '<span class="text-red-500">اللَّهِ</span>')
          .replace(/الرَّحْمَٰنِ/g, '<span class="text-blue-500">الرَّحْمَٰنِ</span>')
          .replace(/الرَّحِيمِ/g, '<span class="text-green-500">الرَّحِيمِ</span>')
          .replace(/إِيَّاكَ/g, '<span class="text-yellow-500">إِيَّاكَ</span>')
          .replace(/نَعْبُدُ/g, '<span class="text-purple-500">نَعْبُدُ</span>')

        setTajweedText(coloredText)
      } else {
        setTajweedText(
          "بِسْمِ <span class='text-red-500'>اللَّهِ</span> <span class='text-blue-500'>الرَّحْمَٰنِ</span> <span class='text-green-500'>الرَّحِيمِ</span>",
        )
      }
      setLoading(false)
    }, 800)
  }, [verseKey, verseText])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">التجويد</h3>

      <Tabs defaultValue="tajweed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tajweed">النص بالتجويد</TabsTrigger>
          <TabsTrigger value="rules">قواعد التجويد</TabsTrigger>
        </TabsList>

        <TabsContent value="tajweed">
          <Card>
            <CardContent className="p-4">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
              ) : (
                <p
                  className="text-right font-quran text-2xl leading-loose"
                  dangerouslySetInnerHTML={{ __html: tajweedText }}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {tajweedRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge className={`${rule.color} mt-1`}>&nbsp;</Badge>
                    <div>
                      <h4 className="font-medium">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                      <p className="text-sm font-quran mt-1">مثال: {rule.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

