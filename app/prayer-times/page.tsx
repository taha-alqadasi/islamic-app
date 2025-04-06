"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Bell, Calendar, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Prayer times calculation methods
const calculationMethods = [
  { id: "mwl", name: "رابطة العالم الإسلامي" },
  { id: "isna", name: "جمعية أمريكا الشمالية الإسلامية" },
  { id: "egypt", name: "الهيئة المصرية العامة للمساحة" },
  { id: "makkah", name: "جامعة أم القرى بمكة المكرمة" },
  { id: "karachi", name: "جامعة العلوم الإسلامية بكراتشي" },
]

// Mock prayer times data
const mockPrayerTimes = {
  fajr: "04:35",
  sunrise: "06:05",
  dhuhr: "12:20",
  asr: "15:45",
  maghrib: "18:35",
  isha: "20:05",
}

export default function PrayerTimesPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const [calculationMethod, setCalculationMethod] = useState("mwl")
  const [prayerTimes, setPrayerTimes] = useState(mockPrayerTimes)
  const [nextPrayer, setNextPrayer] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthlyTimes, setMonthlyTimes] = useState<Array<any>>([])

  // Prayer names in Arabic
  const prayerNames = {
    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
  }

  // Function to get user's location
  const getUserLocation = async () => {
    setLoading(true)
    setError(null)

    try {
      // Check if geolocation is available
      if (!navigator.geolocation) {
        throw new Error("خدمة تحديد الموقع غير متوفرة في متصفحك")
      }

      // Get user's position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      // In a real app, we would use reverse geocoding to get the location name
      // For this demo, we'll just use the coordinates
      setLocation({
        lat: latitude,
        lng: longitude,
        name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      })

      // In a real app, we would fetch prayer times based on the location
      // For this demo, we'll just use mock data
      calculatePrayerTimes(latitude, longitude)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("حدث خطأ أثناء تحديد موقعك")
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to calculate prayer times (mock implementation)
  const calculatePrayerTimes = (lat: number, lng: number) => {
    // In a real app, we would calculate prayer times based on location and method
    // For this demo, we'll just use mock data with slight variations

    // Add some variation based on location and calculation method
    const variation = (lat * lng) % 60

    setPrayerTimes({
      fajr: adjustTime(mockPrayerTimes.fajr, variation % 15),
      sunrise: adjustTime(mockPrayerTimes.sunrise, (variation + 5) % 15),
      dhuhr: adjustTime(mockPrayerTimes.dhuhr, (variation + 10) % 15),
      asr: adjustTime(mockPrayerTimes.asr, (variation + 15) % 15),
      maghrib: adjustTime(mockPrayerTimes.maghrib, (variation + 20) % 15),
      isha: adjustTime(mockPrayerTimes.isha, (variation + 25) % 15),
    })

    // Generate monthly times
    generateMonthlyTimes()
  }

  // Helper function to adjust time by minutes
  const adjustTime = (timeStr: string, minutes: number) => {
    const [hours, mins] = timeStr.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, mins + minutes)
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  // Function to generate monthly prayer times (mock implementation)
  const generateMonthlyTimes = () => {
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    const monthData = []

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i)

      // Generate slight variations for each day
      const variation = i % 10

      monthData.push({
        date: date,
        day: i,
        fajr: adjustTime(mockPrayerTimes.fajr, variation),
        sunrise: adjustTime(mockPrayerTimes.sunrise, variation + 1),
        dhuhr: adjustTime(mockPrayerTimes.dhuhr, variation + 2),
        asr: adjustTime(mockPrayerTimes.asr, variation + 3),
        maghrib: adjustTime(mockPrayerTimes.maghrib, variation + 4),
        isha: adjustTime(mockPrayerTimes.isha, variation + 5),
      })
    }

    setMonthlyTimes(monthData)
  }

  // Function to calculate next prayer and time remaining
  const calculateNextPrayer = () => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    const prayers = [
      { name: "fajr", time: prayerTimes.fajr },
      { name: "sunrise", time: prayerTimes.sunrise },
      { name: "dhuhr", time: prayerTimes.dhuhr },
      { name: "asr", time: prayerTimes.asr },
      { name: "maghrib", time: prayerTimes.maghrib },
      { name: "isha", time: prayerTimes.isha },
    ]

    // Find the next prayer
    let nextPrayerObj = null

    for (const prayer of prayers) {
      if (prayer.time > currentTime) {
        nextPrayerObj = prayer
        break
      }
    }

    // If no next prayer found, it means all prayers for today have passed
    // So the next prayer is Fajr of tomorrow
    if (!nextPrayerObj) {
      nextPrayerObj = { name: "fajr", time: prayerTimes.fajr }
    }

    setNextPrayer(nextPrayerObj.name)

    // Calculate time remaining
    const [nextHours, nextMinutes] = nextPrayerObj.time.split(":").map(Number)
    const nextPrayerDate = new Date()
    nextPrayerDate.setHours(nextHours, nextMinutes, 0)

    // If next prayer is Fajr of tomorrow
    if (nextPrayerObj.name === "fajr" && nextPrayerDate < now) {
      nextPrayerDate.setDate(nextPrayerDate.getDate() + 1)
    }

    const diffMs = nextPrayerDate.getTime() - now.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    setTimeRemaining(`${diffHrs} ساعة و ${diffMins} دقيقة`)
  }

  // Toggle notification for a prayer
  const toggleNotification = (prayer: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [prayer]: !notifications[prayer],
    })
  }

  // Initialize with user location on component mount
  useEffect(() => {
    getUserLocation()

    // Update current date and next prayer every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date())
      if (location) {
        calculateNextPrayer()
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Calculate next prayer when prayer times change
  useEffect(() => {
    if (location) {
      calculateNextPrayer()
    }
  }, [prayerTimes])

  // Update prayer times when calculation method changes
  useEffect(() => {
    if (location) {
      calculatePrayerTimes(location.lat, location.lng)
    }
  }, [calculationMethod])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">مواقيت الصلاة</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            الموقع
          </CardTitle>
          <CardDescription>تحديد موقعك لحساب مواقيت الصلاة بدقة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>خطأ</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2">
              <Button onClick={getUserLocation} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري تحديد الموقع...
                  </>
                ) : (
                  <>
                    <MapPin className="ml-2 h-4 w-4" />
                    تحديد موقعي
                  </>
                )}
              </Button>

              <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="طريقة الحساب" />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {location && (
              <div className="bg-primary/10 p-3 rounded-md text-center">
                <p className="font-medium">تم تحديد موقعك</p>
                <p className="text-sm text-muted-foreground">{location.name}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            مواقيت الصلاة اليوم
          </CardTitle>
          <CardDescription>
            {currentDate.toLocaleDateString("ar-SA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nextPrayer && timeRemaining && (
            <div className="bg-primary/10 p-4 rounded-md mb-6 text-center">
              <p className="text-lg font-medium">
                الصلاة القادمة: {prayerNames[nextPrayer as keyof typeof prayerNames]}
              </p>
              <p className="text-3xl font-bold my-2">{prayerTimes[nextPrayer as keyof typeof prayerTimes]}</p>
              <p className="text-sm">متبقي: {timeRemaining}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <div
                key={prayer}
                className={`p-4 rounded-md border text-center ${
                  nextPrayer === prayer ? "bg-primary/10 border-primary" : ""
                }`}
              >
                <p className="font-medium">{prayerNames[prayer as keyof typeof prayerNames]}</p>
                <p className="text-2xl font-bold my-1">{time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monthly">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">مواقيت الشهر</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                مواقيت الصلاة الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 text-right">اليوم</th>
                      <th className="border p-2 text-center">الفجر</th>
                      <th className="border p-2 text-center">الشروق</th>
                      <th className="border p-2 text-center">الظهر</th>
                      <th className="border p-2 text-center">العصر</th>
                      <th className="border p-2 text-center">المغرب</th>
                      <th className="border p-2 text-center">العشاء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTimes.slice(0, 10).map((day) => (
                      <tr key={day.day} className={day.day === currentDate.getDate() ? "bg-primary/10" : ""}>
                        <td className="border p-2 text-right font-medium">{day.day}</td>
                        <td className="border p-2 text-center">{day.fajr}</td>
                        <td className="border p-2 text-center">{day.sunrise}</td>
                        <td className="border p-2 text-center">{day.dhuhr}</td>
                        <td className="border p-2 text-center">{day.asr}</td>
                        <td className="border p-2 text-center">{day.maghrib}</td>
                        <td className="border p-2 text-center">{day.isha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إشعارات الصلاة
              </CardTitle>
              <CardDescription>تفعيل وتعطيل إشعارات مواقيت الصلاة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(notifications).map(
                  ([prayer, enabled]) =>
                    prayer !== "sunrise" && (
                      <div key={prayer} className="flex items-center justify-between">
                        <Label htmlFor={`${prayer}-notification`} className="flex items-center gap-2">
                          <span>{prayerNames[prayer as keyof typeof prayerNames]}</span>
                          <span className="text-sm text-muted-foreground">
                            {prayerTimes[prayer as keyof typeof prayerTimes]}
                          </span>
                        </Label>
                        <Switch
                          id={`${prayer}-notification`}
                          checked={enabled}
                          onCheckedChange={() => toggleNotification(prayer as keyof typeof notifications)}
                        />
                      </div>
                    ),
                )}

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    ملاحظة: يجب السماح للتطبيق بإرسال الإشعارات في إعدادات المتصفح أو الجهاز.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

