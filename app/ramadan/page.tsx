"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Moon, Calendar, Star, CheckCircle, BookOpen, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Get current Hijri year (approximate)
const currentHijriYear = new Date().getFullYear() - 622 + Math.floor((new Date().getMonth() + 1) / 12)

// Mock data for Ramadan days
const generateRamadanDays = () => {
  const days = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 10) // Just for demo purposes

  for (let i = 1; i <= 30; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i - 1)

    days.push({
      day: i,
      date: date,
      fasted: i < 11, // For demo, mark first 10 days as fasted
      quranPages: i < 11 ? Math.floor(Math.random() * 20) + 5 : 0,
      taraweehPrayed: i < 11 ? Math.random() > 0.2 : false,
      tahajjudPrayed: i < 11 ? Math.random() > 0.6 : false,
      sadaqahGiven: i < 11 ? Math.random() > 0.5 : false,
      duasMade: i < 11 ? Math.random() > 0.3 : false,
    })
  }

  return days
}

// Mock data for Ramadan goals
const defaultGoals = {
  quranKhatma: 1,
  dailyQuranPages: 20,
  taraweehDays: 30,
  tahajjudDays: 15,
  sadaqahDays: 10,
  duaList: ["الهداية", "المغفرة", "الشفاء للمرضى", "النجاح في الحياة"],
}

// Mock data for good deeds
const goodDeeds = [
  { id: "quran", name: "قراءة القرآن", icon: BookOpen, points: 10 },
  { id: "taraweeh", name: "صلاة التراويح", icon: Moon, points: 15 },
  { id: "tahajjud", name: "صلاة التهجد", icon: Star, points: 20 },
  { id: "sadaqah", name: "الصدقة", icon: CheckCircle, points: 10 },
  { id: "dua", name: "الدعاء", icon: CheckCircle, points: 5 },
  { id: "dhikr", name: "الذكر", icon: CheckCircle, points: 5 },
  { id: "iftar", name: "إفطار صائم", icon: CheckCircle, points: 25 },
]

export default function RamadanPage() {
  const [ramadanDays, setRamadanDays] = useState(generateRamadanDays())
  const [goals, setGoals] = useState(defaultGoals)
  const [editingGoals, setEditingGoals] = useState(false)
  const [tempGoals, setTempGoals] = useState(defaultGoals)
  const [newDua, setNewDua] = useState("")
  const [currentDay, setCurrentDay] = useState(11) // For demo purposes
  const [completedDeeds, setCompletedDeeds] = useState<string[]>([])
  const [points, setPoints] = useState(0)

  // Calculate progress
  const calculateProgress = () => {
    const fastedDays = ramadanDays.filter((day) => day.fasted).length
    const fastedProgress = (fastedDays / 30) * 100

    const quranPages = ramadanDays.reduce((total, day) => total + day.quranPages, 0)
    const quranPagesGoal = goals.dailyQuranPages * 30
    const quranProgress = Math.min((quranPages / quranPagesGoal) * 100, 100)

    const taraweehDays = ramadanDays.filter((day) => day.taraweehPrayed).length
    const taraweehProgress = (taraweehDays / goals.taraweehDays) * 100

    const tahajjudDays = ramadanDays.filter((day) => day.tahajjudPrayed).length
    const tahajjudProgress = (tahajjudDays / goals.tahajjudDays) * 100

    const sadaqahDays = ramadanDays.filter((day) => day.sadaqahGiven).length
    const sadaqahProgress = (sadaqahDays / goals.sadaqahDays) * 100

    return {
      fasted: fastedProgress,
      quran: quranProgress,
      taraweeh: taraweehProgress,
      tahajjud: tahajjudProgress,
      sadaqah: sadaqahProgress,
    }
  }

  const progress = calculateProgress()

  // Update day status
  const updateDayStatus = (day: number, field: string, value: any) => {
    const updatedDays = [...ramadanDays]
    const dayIndex = updatedDays.findIndex((d) => d.day === day)

    if (dayIndex !== -1) {
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        [field]: value,
      }

      setRamadanDays(updatedDays)
    }
  }

  // Save goals
  const saveGoals = () => {
    setGoals(tempGoals)
    setEditingGoals(false)
  }

  // Add new dua
  const addDua = () => {
    if (newDua.trim()) {
      setTempGoals({
        ...tempGoals,
        duaList: [...tempGoals.duaList, newDua.trim()],
      })
      setNewDua("")
    }
  }

  // Remove dua
  const removeDua = (index: number) => {
    const updatedDuaList = [...tempGoals.duaList]
    updatedDuaList.splice(index, 1)
    setTempGoals({
      ...tempGoals,
      duaList: updatedDuaList,
    })
  }

  // Toggle deed completion
  const toggleDeed = (deedId: string) => {
    if (completedDeeds.includes(deedId)) {
      setCompletedDeeds(completedDeeds.filter((id) => id !== deedId))

      // Subtract points
      const deed = goodDeeds.find((d) => d.id === deedId)
      if (deed) {
        setPoints(points - deed.points)
      }
    } else {
      setCompletedDeeds([...completedDeeds, deedId])

      // Add points
      const deed = goodDeeds.find((d) => d.id === deedId)
      if (deed) {
        setPoints(points + deed.points)
      }
    }
  }

  // Calculate total possible points for today
  const totalPossiblePoints = goodDeeds.reduce((total, deed) => total + deed.points, 0)

  // Calculate streak (consecutive days with fasting)
  const calculateStreak = () => {
    let streak = 0
    for (let i = 0; i < currentDay; i++) {
      if (ramadanDays[i].fasted) {
        streak++
      } else {
        streak = 0
      }
    }
    return streak
  }

  const streak = calculateStreak()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">تتبع رمضان {currentHijriYear} هـ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              اليوم الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">{currentDay}</div>
              <p className="text-muted-foreground">من رمضان {currentHijriYear} هـ</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              أيام الصيام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">{ramadanDays.filter((day) => day.fasted).length}/30</div>
              <Progress value={progress.fasted} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              النقاط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">{points}</div>
              <p className="text-muted-foreground">سلسلة الصيام: {streak} يوم</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracker">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracker">متابعة الصيام</TabsTrigger>
          <TabsTrigger value="goals">الأهداف</TabsTrigger>
          <TabsTrigger value="today">أعمال اليوم</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>متابعة الصيام والعبادات</CardTitle>
              <CardDescription>سجل صيامك وعباداتك خلال شهر رمضان المبارك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-right">اليوم</th>
                      <th className="border p-2 text-center">التاريخ</th>
                      <th className="border p-2 text-center">الصيام</th>
                      <th className="border p-2 text-center">القرآن</th>
                      <th className="border p-2 text-center">التراويح</th>
                      <th className="border p-2 text-center">التهجد</th>
                      <th className="border p-2 text-center">الصدقة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ramadanDays.slice(0, currentDay + 5).map((day) => (
                      <tr key={day.day} className={day.day === currentDay ? "bg-primary/10" : ""}>
                        <td className="border p-2 text-right font-medium">{day.day}</td>
                        <td className="border p-2 text-center">
                          {day.date.toLocaleDateString("ar-SA", { day: "numeric", month: "numeric" })}
                        </td>
                        <td className="border p-2 text-center">
                          <Checkbox
                            checked={day.fasted}
                            onCheckedChange={(checked) => updateDayStatus(day.day, "fasted", checked)}
                            disabled={day.day > currentDay}
                          />
                        </td>
                        <td className="border p-2 text-center">
                          {day.day <= currentDay ? (
                            <Input
                              type="number"
                              min="0"
                              value={day.quranPages}
                              onChange={(e) =>
                                updateDayStatus(day.day, "quranPages", Number.parseInt(e.target.value) || 0)
                              }
                              className="w-16 mx-auto text-center"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="border p-2 text-center">
                          <Checkbox
                            checked={day.taraweehPrayed}
                            onCheckedChange={(checked) => updateDayStatus(day.day, "taraweehPrayed", checked)}
                            disabled={day.day > currentDay}
                          />
                        </td>
                        <td className="border p-2 text-center">
                          <Checkbox
                            checked={day.tahajjudPrayed}
                            onCheckedChange={(checked) => updateDayStatus(day.day, "tahajjudPrayed", checked)}
                            disabled={day.day > currentDay}
                          />
                        </td>
                        <td className="border p-2 text-center">
                          <Checkbox
                            checked={day.sadaqahGiven}
                            onCheckedChange={(checked) => updateDayStatus(day.day, "sadaqahGiven", checked)}
                            disabled={day.day > currentDay}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>أهداف رمضان</CardTitle>
                {!editingGoals ? (
                  <Button variant="outline" onClick={() => setEditingGoals(true)}>
                    تعديل الأهداف
                  </Button>
                ) : (
                  <Button variant="default" onClick={saveGoals}>
                    حفظ الأهداف
                  </Button>
                )}
              </div>
              <CardDescription>حدد أهدافك لشهر رمضان المبارك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {editingGoals ? (
                  // Edit mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quranKhatma">عدد ختمات القرآن المستهدفة</Label>
                        <Input
                          id="quranKhatma"
                          type="number"
                          min="0"
                          value={tempGoals.quranKhatma}
                          onChange={(e) =>
                            setTempGoals({ ...tempGoals, quranKhatma: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="dailyQuranPages">عدد صفحات القرآن اليومية</Label>
                        <Input
                          id="dailyQuranPages"
                          type="number"
                          min="0"
                          value={tempGoals.dailyQuranPages}
                          onChange={(e) =>
                            setTempGoals({ ...tempGoals, dailyQuranPages: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="taraweehDays">عدد أيام صلاة التراويح</Label>
                        <Input
                          id="taraweehDays"
                          type="number"
                          min="0"
                          max="30"
                          value={tempGoals.taraweehDays}
                          onChange={(e) =>
                            setTempGoals({ ...tempGoals, taraweehDays: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="tahajjudDays">عدد أيام صلاة التهجد</Label>
                        <Input
                          id="tahajjudDays"
                          type="number"
                          min="0"
                          max="30"
                          value={tempGoals.tahajjudDays}
                          onChange={(e) =>
                            setTempGoals({ ...tempGoals, tahajjudDays: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="sadaqahDays">عدد أيام الصدقة</Label>
                        <Input
                          id="sadaqahDays"
                          type="number"
                          min="0"
                          max="30"
                          value={tempGoals.sadaqahDays}
                          onChange={(e) =>
                            setTempGoals({ ...tempGoals, sadaqahDays: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>قائمة الأدعية</Label>
                      <div className="flex gap-2 mb-2">
                        <Input value={newDua} onChange={(e) => setNewDua(e.target.value)} placeholder="أضف دعاء جديد" />
                        <Button variant="outline" onClick={addDua}>
                          إضافة
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {tempGoals.duaList.map((dua, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                            <span>{dua}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeDua(index)}>
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">قراءة القرآن</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>ختمات القرآن:</span>
                            <span className="font-medium">{goals.quranKhatma}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>الصفحات اليومية:</span>
                            <span className="font-medium">{goals.dailyQuranPages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>التقدم:</span>
                            <span className="font-medium">
                              {ramadanDays.reduce((total, day) => total + day.quranPages, 0)} /{" "}
                              {goals.dailyQuranPages * 30} صفحة
                            </span>
                          </div>
                          <Progress value={progress.quran} />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">الصلاة</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>أيام التراويح:</span>
                            <span className="font-medium">
                              {ramadanDays.filter((day) => day.taraweehPrayed).length} / {goals.taraweehDays}
                            </span>
                          </div>
                          <Progress value={progress.taraweeh} />

                          <div className="flex justify-between mt-2">
                            <span>أيام التهجد:</span>
                            <span className="font-medium">
                              {ramadanDays.filter((day) => day.tahajjudPrayed).length} / {goals.tahajjudDays}
                            </span>
                          </div>
                          <Progress value={progress.tahajjud} />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">الصدقة</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>أيام الصدقة:</span>
                            <span className="font-medium">
                              {ramadanDays.filter((day) => day.sadaqahGiven).length} / {goals.sadaqahDays}
                            </span>
                          </div>
                          <Progress value={progress.sadaqah} />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">الأدعية</h3>
                        <div className="space-y-2">
                          {goals.duaList.map((dua, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              {dua}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>أعمال اليوم {currentDay} من رمضان</CardTitle>
              <CardDescription>سجل أعمالك الصالحة لهذا اليوم واكسب النقاط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goodDeeds.map((deed) => {
                  const Icon = deed.icon
                  const isCompleted = completedDeeds.includes(deed.id)

                  return (
                    <div key={deed.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isCompleted ? "bg-primary/20" : "bg-muted"}`}>
                          <Icon className={`h-5 w-5 ${isCompleted ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className="font-medium">{deed.name}</p>
                          <p className="text-sm text-muted-foreground">{deed.points} نقطة</p>
                        </div>
                      </div>
                      <Checkbox checked={isCompleted} onCheckedChange={() => toggleDeed(deed.id)} />
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">النقاط المكتسبة اليوم</p>
                <p className="text-xl font-bold">
                  {points} / {totalPossiblePoints}
                </p>
              </div>
              <Progress value={(points / totalPossiblePoints) * 100} className="w-1/2" />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

