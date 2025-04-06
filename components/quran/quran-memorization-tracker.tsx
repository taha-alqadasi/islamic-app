"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MemorizationProgress {
  surahId: number
  surahName: string
  arabicName: string
  totalVerses: number
  memorizedVerses: number
  lastReviewed?: string
  strength: "weak" | "medium" | "strong"
}

const initialProgress: MemorizationProgress[] = [
  {
    surahId: 1,
    surahName: "Al-Fatihah",
    arabicName: "الفاتحة",
    totalVerses: 7,
    memorizedVerses: 7,
    lastReviewed: "2023-04-10",
    strength: "strong",
  },
  {
    surahId: 36,
    surahName: "Ya-Sin",
    arabicName: "يس",
    totalVerses: 83,
    memorizedVerses: 45,
    lastReviewed: "2023-04-12",
    strength: "medium",
  },
  {
    surahId: 55,
    surahName: "Ar-Rahman",
    arabicName: "الرحمن",
    totalVerses: 78,
    memorizedVerses: 30,
    lastReviewed: "2023-04-08",
    strength: "weak",
  },
  {
    surahId: 67,
    surahName: "Al-Mulk",
    arabicName: "الملك",
    totalVerses: 30,
    memorizedVerses: 20,
    lastReviewed: "2023-04-11",
    strength: "medium",
  },
  {
    surahId: 112,
    surahName: "Al-Ikhlas",
    arabicName: "الإخلاص",
    totalVerses: 4,
    memorizedVerses: 4,
    lastReviewed: "2023-04-12",
    strength: "strong",
  },
]

export default function QuranMemorizationTracker() {
  const [progress, setProgress] = useState<MemorizationProgress[]>(initialProgress)
  const [activeTab, setActiveTab] = useState("current")
  const { toast } = useToast()

  const totalMemorizedVerses = progress.reduce((sum, surah) => sum + surah.memorizedVerses, 0)
  const totalVerses = progress.reduce((sum, surah) => sum + surah.totalVerses, 0)
  const overallProgress = Math.round((totalMemorizedVerses / totalVerses) * 100)

  const handleUpdateProgress = (surahId: number, increment: boolean) => {
    setProgress((prev) =>
      prev.map((surah) => {
        if (surah.surahId === surahId) {
          const newMemorizedVerses = increment
            ? Math.min(surah.memorizedVerses + 1, surah.totalVerses)
            : Math.max(surah.memorizedVerses - 1, 0)

          return {
            ...surah,
            memorizedVerses: newMemorizedVerses,
            lastReviewed: new Date().toISOString().split("T")[0],
          }
        }
        return surah
      }),
    )

    toast({
      title: increment ? "تم تحديث التقدم" : "تم تعديل التقدم",
      description: increment ? "تم إضافة آية جديدة إلى حفظك" : "تم تعديل عدد الآيات المحفوظة",
    })
  }

  const handleMarkReviewed = (surahId: number) => {
    setProgress((prev) =>
      prev.map((surah) => {
        if (surah.surahId === surahId) {
          return {
            ...surah,
            lastReviewed: new Date().toISOString().split("T")[0],
            strength: surah.strength === "weak" ? "medium" : "strong",
          }
        }
        return surah
      }),
    )

    toast({
      title: "تم تحديث المراجعة",
      description: "تم تسجيل مراجعتك بنجاح",
    })
  }

  const getStrengthColor = (strength: "weak" | "medium" | "strong") => {
    switch (strength) {
      case "weak":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "strong":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getReviewStatus = (lastReviewed?: string) => {
    if (!lastReviewed) return { status: "never", text: "لم تتم المراجعة بعد" }

    const lastDate = new Date(lastReviewed)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 1) return { status: "recent", text: "تمت المراجعة اليوم" }
    if (diffDays <= 3) return { status: "good", text: `تمت المراجعة منذ ${diffDays} أيام` }
    if (diffDays <= 7) return { status: "warning", text: `تمت المراجعة منذ ${diffDays} أيام` }
    return { status: "overdue", text: `تمت المراجعة منذ ${diffDays} يوم` }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl text-purple-700 dark:text-purple-400">
          متابعة حفظ القرآن الكريم
        </CardTitle>
        <CardDescription className="text-center">تتبع تقدمك في حفظ القرآن الكريم ومراجعته</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">التقدم الإجمالي</span>
            <span className="text-sm font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
            <span>{totalMemorizedVerses} آية محفوظة</span>
            <span>من أصل {totalVerses} آية</span>
          </div>
        </div>

        <div className="flex items-center justify-around py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {progress.filter((s) => s.memorizedVerses === s.totalVerses).length}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">سور مكتملة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{progress.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">سور قيد الحفظ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {
                progress.filter((s) => {
                  const reviewStatus = getReviewStatus(s.lastReviewed)
                  return reviewStatus.status === "overdue" || reviewStatus.status === "warning"
                }).length
              }
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">تحتاج للمراجعة</div>
          </div>
        </div>

        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="current">السور الحالية</TabsTrigger>
            <TabsTrigger value="stats">إحصائيات</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {progress.map((surah) => {
              const percentComplete = Math.round((surah.memorizedVerses / surah.totalVerses) * 100)
              const reviewStatus = getReviewStatus(surah.lastReviewed)

              return (
                <Card key={surah.surahId} className="bg-white shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {surah.surahName} ({surah.arabicName})
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getStrengthColor(surah.strength)}`}>{surah.strength}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {reviewStatus.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">التقدم</span>
                        <span className="text-xs font-medium">{percentComplete}%</span>
                      </div>
                      <Progress value={percentComplete} className="h-2" />
                      <div className="flex justify-between text-gray-500 dark:text-gray-500 text-xxs mt-1">
                        <span>{surah.memorizedVerses} آية</span>
                        <span>من أصل {surah.totalVerses} آية</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>آخر مراجعة: {surah.lastReviewed || "لم تتم المراجعة"}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleUpdateProgress(surah.surahId, false)}>
                        <Clock className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleUpdateProgress(surah.surahId, true)}>
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleMarkReviewed(surah.surahId)}>
                        تحديث المراجعة
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>إجمالي الآيات المحفوظة</CardTitle>
                  <CardDescription>عدد الآيات التي تم حفظها حتى الآن</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMemorizedVerses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>التقدم الإجمالي</CardTitle>
                  <CardDescription>نسبة التقدم في حفظ القرآن الكريم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>السور المكتملة</CardTitle>
                  <CardDescription>عدد السور التي تم حفظها بالكامل</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {progress.filter((s) => s.memorizedVerses === s.totalVerses).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>السور قيد الحفظ</CardTitle>
                  <CardDescription>عدد السور التي يتم العمل على حفظها حاليًا</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{progress.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تحتاج للمراجعة</CardTitle>
                  <CardDescription>عدد السور التي تحتاج إلى مراجعة قريبة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      progress.filter((s) => {
                        const reviewStatus = getReviewStatus(s.lastReviewed)
                        return reviewStatus.status === "overdue" || reviewStatus.status === "warning"
                      }).length
                    }
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>متوسط قوة الحفظ</CardTitle>
                  <CardDescription>متوسط قوة الحفظ لجميع السور</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {/* TODO: Implement average strength calculation */}
                    غير متوفر
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

