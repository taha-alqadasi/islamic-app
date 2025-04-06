"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Award, BarChart2, TrendingUp, X, Star, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ReadingStats {
  totalPagesRead: number
  totalSurahsCompleted: number
  totalJuzCompleted: number
  totalReadingTime: number
  totalDays: number
  currentStreak: number
  longestStreak: number
  lastReadDate: string
  completionPercentage: number
  readingHistory: {
    date: string
    pagesRead: number
    timeSpent: number
    surahsRead: string[]
  }[]
  surahProgress: {
    surahId: number
    surahName: string
    totalVerses: number
    versesRead: number
    lastRead: string
  }[]
  achievements: {
    id: number
    title: string
    description: string
    icon: string
    type: "gold" | "silver" | "bronze"
    completed: boolean
    progress: number
    total: number
  }[]
  goals: {
    id: number
    title: string
    target: number
    current: number
    unit: string
    deadline?: string
  }[]
}

interface QuranReadingStatsProps {
  onClose: () => void
  nightMode: boolean
}

export default function QuranReadingStats({ onClose, nightMode }: QuranReadingStatsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock reading stats data
  const stats: ReadingStats = {
    totalPagesRead: 124,
    totalSurahsCompleted: 15,
    totalJuzCompleted: 3,
    totalReadingTime: 1850, // minutes
    totalDays: 30,
    currentStreak: 7,
    longestStreak: 14,
    lastReadDate: "2023-12-10",
    completionPercentage: 19,
    readingHistory: [
      {
        date: "2023-12-10",
        pagesRead: 5,
        timeSpent: 25,
        surahsRead: ["الفاتحة", "البقرة (1-20)"],
      },
      {
        date: "2023-12-09",
        pagesRead: 8,
        timeSpent: 40,
        surahsRead: ["البقرة (21-35)"],
      },
      {
        date: "2023-12-08",
        pagesRead: 6,
        timeSpent: 30,
        surahsRead: ["البقرة (36-50)"],
      },
    ],
    surahProgress: [
      {
        surahId: 1,
        surahName: "الفاتحة",
        totalVerses: 7,
        versesRead: 7,
        lastRead: "2023-12-10",
      },
      {
        surahId: 2,
        surahName: "البقرة",
        totalVerses: 286,
        versesRead: 50,
        lastRead: "2023-12-08",
      },
      {
        surahId: 3,
        surahName: "آل عمران",
        totalVerses: 200,
        versesRead: 25,
        lastRead: "2023-12-05",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "إكمال سورة البقرة",
        description: "قراءة سورة البقرة كاملة",
        icon: "book",
        type: "gold",
        completed: false,
        progress: 50,
        total: 286,
      },
      {
        id: 2,
        title: "قارئ مواظب",
        description: "قراءة القرآن لمدة 7 أيام متتالية",
        icon: "calendar",
        type: "silver",
        completed: true,
        progress: 7,
        total: 7,
      },
      {
        id: 3,
        title: "قارئ نشط",
        description: "قراءة أكثر من 100 صفحة",
        icon: "book",
        type: "bronze",
        completed: true,
        progress: 124,
        total: 100,
      },
      {
        id: 4,
        title: "حافظ الجزء الأول",
        description: "إكمال حفظ الجزء الأول من القرآن",
        icon: "star",
        type: "gold",
        completed: false,
        progress: 15,
        total: 20,
      },
    ],
    goals: [
      {
        id: 1,
        title: "قراءة جزء يومياً",
        target: 30,
        current: 12,
        unit: "جزء",
      },
      {
        id: 2,
        title: "ختم القرآن في رمضان",
        target: 604,
        current: 124,
        unit: "صفحة",
        deadline: "2024-04-10",
      },
      {
        id: 3,
        title: "حفظ سورة البقرة",
        target: 286,
        current: 50,
        unit: "آية",
      },
    ],
  }

  // Format minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours} ساعة و ${mins} دقيقة`
  }

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null

    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Card
        className={`w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col ${nightMode ? "bg-gray-800 text-gray-100 border-gray-700" : ""}`}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              إحصائيات القراءة
            </CardTitle>
            <CardDescription className={nightMode ? "text-gray-400" : ""}>
              تتبع تقدمك في قراءة القرآن الكريم
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/10">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="progress">التقدم</TabsTrigger>
              <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
              <TabsTrigger value="history">السجل</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      القراءة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">الصفحات المقروءة:</span>
                        <Badge variant="outline">{stats.totalPagesRead}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">السور المكتملة:</span>
                        <Badge variant="outline">{stats.totalSurahsCompleted}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">الأجزاء المكتملة:</span>
                        <Badge variant="outline">{stats.totalJuzCompleted}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">نسبة الإكمال:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={stats.completionPercentage} className="w-20 h-2" />
                          <Badge variant="outline">{stats.completionPercentage}%</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      الوقت
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">إجمالي وقت القراءة:</span>
                        <Badge variant="outline">{formatTime(stats.totalReadingTime)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">متوسط وقت القراءة اليومي:</span>
                        <Badge variant="outline">
                          {formatTime(Math.round(stats.totalReadingTime / stats.totalDays))}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">آخر قراءة:</span>
                        <Badge variant="outline">{stats.lastReadDate}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      المواظبة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">أيام القراءة:</span>
                        <Badge variant="outline">{stats.totalDays} يوم</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">التتابع الحالي:</span>
                        <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                          {stats.currentStreak} أيام
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">أطول تتابع:</span>
                        <Badge variant="outline">{stats.longestStreak} يوم</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      الأهداف
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.goals.slice(0, 2).map((goal) => (
                        <div key={goal.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{goal.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {goal.current}/{goal.target} {goal.unit}
                            </span>
                          </div>
                          <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                          {goal.deadline && (
                            <div className="text-xs text-right text-muted-foreground">
                              متبقي: {getDaysRemaining(goal.deadline)} يوم
                            </div>
                          )}
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                        عرض كل الأهداف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  آخر الإنجازات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {stats.achievements
                    .filter((a) => a.completed)
                    .slice(0, 3)
                    .map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`overflow-hidden ${nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={`
                            ${
                              achievement.type === "gold"
                                ? "bg-yellow-500"
                                : achievement.type === "silver"
                                  ? "bg-gray-400"
                                  : "bg-amber-600"
                            }
                          `}
                            >
                              {achievement.type === "gold"
                                ? "ذهبية"
                                : achievement.type === "silver"
                                  ? "فضية"
                                  : "برونزية"}
                            </Badge>
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  تقدم السور
                </h3>
                <div className="space-y-4">
                  <AnimatePresence>
                    {stats.surahProgress.map((surah, index) => (
                      <motion.div
                        key={surah.surahId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {surah.surahName} ({surah.versesRead}/{surah.totalVerses})
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((surah.versesRead / surah.totalVerses) * 100)}%
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={(surah.versesRead / surah.totalVerses) * 100} className="h-2" />
                          {surah.versesRead === surah.totalVerses && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1"
                            >
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                          )}
                        </div>
                        <div className="text-xs text-right text-muted-foreground">آخر قراءة: {surah.lastRead}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  التقدم العام
                </h3>
                <Card className={`p-4 ${nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">إجمالي القرآن</span>
                      <span>{stats.completionPercentage}%</span>
                    </div>
                    <Progress value={stats.completionPercentage} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      لقد أكملت {stats.totalJuzCompleted} جزء و {stats.totalSurahsCompleted} سورة من القرآن الكريم
                    </p>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  أهدافي
                </h3>
                <div className="space-y-4">
                  {stats.goals.map((goal) => (
                    <Card key={goal.id} className={`p-4 ${nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge variant={goal.current >= goal.target ? "default" : "outline"}>
                            {goal.current}/{goal.target} {goal.unit}
                          </Badge>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>التقدم: {Math.round((goal.current / goal.target) * 100)}%</span>
                          {goal.deadline && <span>متبقي: {getDaysRemaining(goal.deadline)} يوم</span>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`overflow-hidden ${nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${
                              achievement.completed
                                ? achievement.type === "gold"
                                  ? "bg-yellow-500"
                                  : achievement.type === "silver"
                                    ? "bg-gray-400"
                                    : "bg-amber-600"
                                : "bg-gray-200 dark:bg-gray-700"
                            }
                          `}
                          >
                            {achievement.icon === "book" && (
                              <BookOpen
                                className={`h-5 w-5 ${achievement.completed ? "text-white" : "text-gray-500"}`}
                              />
                            )}
                            {achievement.icon === "calendar" && (
                              <Calendar
                                className={`h-5 w-5 ${achievement.completed ? "text-white" : "text-gray-500"}`}
                              />
                            )}
                            {achievement.icon === "star" && (
                              <Star className={`h-5 w-5 ${achievement.completed ? "text-white" : "text-gray-500"}`} />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>

                        {achievement.completed ? (
                          <Badge className="w-full justify-center py-1">تم الإنجاز</Badge>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>التقدم</span>
                              <span>
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">سجل القراءة</h3>
                {stats.readingHistory.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`p-4 ${nightMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <div>
                          <h4 className="font-semibold">{entry.date}</h4>
                          <p className="text-sm text-muted-foreground">قرأت: {entry.surahsRead.join("، ")}</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">الصفحات</p>
                            <p className="font-semibold">{entry.pagesRead}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">الوقت</p>
                            <p className="font-semibold">{entry.timeSpent} دقيقة</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

