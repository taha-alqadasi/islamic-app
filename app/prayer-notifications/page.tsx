"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Bell, Clock, MapPin, Volume2, VolumeX, Moon, Sun, Save, AlertTriangle } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// أوقات الصلاة (محاكاة)
const prayerTimes = {
  fajr: "04:35",
  sunrise: "06:05",
  dhuhr: "12:20",
  asr: "15:45",
  maghrib: "18:35",
  isha: "20:05",
}

// أسماء الصلوات بالعربية
const prayerNames = {
  fajr: "الفجر",
  sunrise: "الشروق",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
}

// أصوات الأذان
const adhanSounds = [
  { id: "makkah", name: "أذان الحرم المكي" },
  { id: "madinah", name: "أذان المسجد النبوي" },
  { id: "alaqsa", name: "أذان المسجد الأقصى" },
  { id: "egypt", name: "أذان مصري" },
  { id: "custom", name: "أذان مخصص" },
]

// نغمات التنبيه
const notificationSounds = [
  { id: "beep", name: "صوت تنبيه" },
  { id: "bell", name: "جرس" },
  { id: "chime", name: "رنين" },
  { id: "melody", name: "لحن" },
  { id: "none", name: "بدون صوت" },
]

export default function PrayerNotificationsPage() {
  // حالة التطبيق
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<string>("default")
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("notifications")
  const [prayerNotifications, setPrayerNotifications] = useState({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    sunrise: false,
  })
  const [notificationTimes, setNotificationTimes] = useState({
    fajr: 15,
    dhuhr: 10,
    asr: 10,
    maghrib: 10,
    isha: 10,
    sunrise: 10,
  })
  const [adhanEnabled, setAdhanEnabled] = useState(true)
  const [selectedAdhan, setSelectedAdhan] = useState("makkah")
  const [adhanVolume, setAdhanVolume] = useState(80)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [notificationSound, setNotificationSound] = useState("beep")
  const [notificationVolume, setNotificationVolume] = useState(70)
  const [adhkarReminders, setAdhkarReminders] = useState({
    morning: true,
    evening: true,
  })
  const [adhkarTimes, setAdhkarTimes] = useState({
    morning: "05:30",
    evening: "17:30",
  })
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [showLocationAlert, setShowLocationAlert] = useState(false)

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("prayer_notification_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setNotificationsEnabled(settings.notificationsEnabled ?? false)
          setPrayerNotifications(
            settings.prayerNotifications ?? {
              fajr: true,
              dhuhr: true,
              asr: true,
              maghrib: true,
              isha: true,
              sunrise: false,
            },
          )
          setNotificationTimes(
            settings.notificationTimes ?? {
              fajr: 15,
              dhuhr: 10,
              asr: 10,
              maghrib: 10,
              isha: 10,
              sunrise: 10,
            },
          )
          setAdhanEnabled(settings.adhanEnabled ?? true)
          setSelectedAdhan(settings.selectedAdhan ?? "makkah")
          setAdhanVolume(settings.adhanVolume ?? 80)
          setVibrationEnabled(settings.vibrationEnabled ?? true)
          setNotificationSound(settings.notificationSound ?? "beep")
          setNotificationVolume(settings.notificationVolume ?? 70)
          setAdhkarReminders(
            settings.adhkarReminders ?? {
              morning: true,
              evening: true,
            },
          )
          setAdhkarTimes(
            settings.adhkarTimes ?? {
              morning: "05:30",
              evening: "17:30",
            },
          )
        }

        // تحميل الموقع
        const savedLocation = localStorage.getItem("prayer_location")
        if (savedLocation) {
          setLocation(JSON.parse(savedLocation))
        } else {
          setShowLocationAlert(true)
        }

        // التحقق من حالة الإذن
        checkNotificationPermission()
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "prayer_notification_settings",
      JSON.stringify({
        darkMode,
        notificationsEnabled,
        prayerNotifications,
        notificationTimes,
        adhanEnabled,
        selectedAdhan,
        adhanVolume,
        vibrationEnabled,
        notificationSound,
        notificationVolume,
        adhkarReminders,
        adhkarTimes,
      }),
    )
  }, [
    darkMode,
    notificationsEnabled,
    prayerNotifications,
    notificationTimes,
    adhanEnabled,
    selectedAdhan,
    adhanVolume,
    vibrationEnabled,
    notificationSound,
    notificationVolume,
    adhkarReminders,
    adhkarTimes,
  ])

  useEffect(() => {
    if (location) {
      localStorage.setItem("prayer_location", JSON.stringify(location))
    }
  }, [location])

  // إيقاف الصوت عند تغيير الصفحة
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        setCurrentAudio(null)
        setIsPlaying(false)
      }
    }
  }, [])

  // التحقق من إذن الإشعارات
  const checkNotificationPermission = () => {
    if (!("Notification" in window)) {
      setPermissionStatus("unsupported")
      return
    }

    setPermissionStatus(Notification.permission)
  }

  // طلب إذن الإشعارات
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("متصفحك لا يدعم الإشعارات")
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)

      if (permission === "granted") {
        setNotificationsEnabled(true)
        // إظهار إشعار تجريبي
        new Notification("تم تفعيل إشعارات الصلاة", {
          body: "ستتلقى إشعارات عند اقتراب مواعيد الصلاة",
          icon: "/icons/prayer-icon.png",
        })
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }

  // الحصول على موقع المستخدم
  const getUserLocation = async () => {
    try {
      // التحقق من دعم خدمة تحديد الموقع
      if (!navigator.geolocation) {
        throw new Error("خدمة تحديد الموقع غير متوفرة في متصفحك")
      }

      // الحصول على موقع المستخدم
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      // في تطبيق حقيقي، سنستخدم خدمة التعكس الجغرافي للحصول على اسم الموقع
      // لهذا العرض التوضيحي، سنستخدم الإحداثيات فقط
      setLocation({
        lat: latitude,
        lng: longitude,
        name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      })

      setShowLocationAlert(false)
    } catch (err) {
      console.error("Error getting location:", err)
      alert("حدث خطأ أثناء تحديد موقعك. يرجى التأكد من تفعيل خدمة تحديد الموقع.")
    }
  }

  // تشغيل صوت الأذان
  const playAdhan = () => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
      return
    }

    // محاكاة تشغيل الصوت (في التطبيق الحقيقي سيتم استبدال هذا بتشغيل الملف الصوتي الفعلي)
    const audio = new Audio("/audio/adhan.mp3")
    audio.volume = adhanVolume / 100
    audio.play().catch((error) => {
      console.error("Error playing audio:", error)
      alert("لا يمكن تشغيل الصوت. يرجى التأكد من السماح بتشغيل الصوت في المتصفح.")
    })

    setCurrentAudio(audio)
    setIsPlaying(true)

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    })
  }

  // تشغيل صوت التنبيه
  const playNotificationSound = () => {
    if (notificationSound === "none") return

    // محاكاة تشغيل الصوت (في التطبيق الحقيقي سيتم استبدال هذا بتشغيل الملف الصوتي الفعلي)
    const audio = new Audio("/audio/notification.mp3")
    audio.volume = notificationVolume / 100
    audio.play().catch((error) => {
      console.error("Error playing audio:", error)
    })

    // تفعيل الاهتزاز
    if (vibrationEnabled && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }

  // تغيير وقت التنبيه لصلاة معينة
  const handleNotificationTimeChange = (prayer: string, minutes: number) => {
    setNotificationTimes((prev) => ({
      ...prev,
      [prayer]: minutes,
    }))
  }

  // تغيير حالة تنبيه صلاة معينة
  const togglePrayerNotification = (prayer: string) => {
    setPrayerNotifications((prev) => ({
      ...prev,
      [prayer]: !prev[prayer as keyof typeof prev],
    }))
  }

  // حفظ الإعدادات
  const saveSettings = () => {
    alert("تم حفظ الإعدادات بنجاح")
  }

  // الحصول على الصلاة القادمة
  const getNextPrayer = () => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    // البحث عن الصلاة القادمة
    let nextPrayerName = ""
    let nextPrayerTime = ""

    for (const [prayer, time] of Object.entries(prayerTimes)) {
      if (prayer === "sunrise") continue // تخطي وقت الشروق
      if (time > currentTime) {
        nextPrayerName = prayer
        nextPrayerTime = time
        break
      }
    }

    // إذا لم يتم العثور على صلاة قادمة، فهذا يعني أن جميع صلوات اليوم قد مرت
    // لذا الصلاة القادمة هي صلاة الفجر غداً
    if (!nextPrayerName) {
      nextPrayerName = "fajr"
      nextPrayerTime = prayerTimes.fajr
    }

    return {
      name: prayerNames[nextPrayerName as keyof typeof prayerNames],
      time: nextPrayerTime,
    }
  }

  // حساب الوقت المتبقي للصلاة القادمة
  const getRemainingTime = () => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const nextPrayer = getNextPrayer()
    const [nextHours, nextMinutes] = nextPrayer.time.split(":").map(Number)
    let nextPrayerMinutes = nextHours * 60 + nextMinutes

    // إذا كانت الصلاة القادمة هي الفجر وقد مرت جميع صلوات اليوم
    if (nextPrayer.name === prayerNames.fajr && nextPrayerMinutes < currentTime) {
      nextPrayerMinutes += 24 * 60 // إضافة يوم كامل
    }

    const diffMinutes = nextPrayerMinutes - currentTime
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    return `${hours} ساعة و ${minutes} دقيقة`
  }

  const nextPrayer = getNextPrayer()
  const remainingTime = getRemainingTime()

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">إشعارات الصلاة</h1>

        {/* تنبيه الموقع */}
        {showLocationAlert && (
          <Alert variant="warning" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>تنبيه</AlertTitle>
            <AlertDescription>
              لم يتم تحديد موقعك بعد. يرجى تحديد موقعك للحصول على أوقات الصلاة الدقيقة.
              <Button variant="outline" size="sm" className="mt-2" onClick={getUserLocation}>
                <MapPin className="h-4 w-4 mr-1" />
                تحديد موقعي
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* معلومات الصلاة القادمة */}
        <Card className={`mb-6 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>الصلاة القادمة</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDarkMode(!darkMode)}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{darkMode ? "الوضع النهاري" : "الوضع الليلي"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>معلومات عن الصلاة القادمة والوقت المتبقي لها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{nextPrayer.name}</h3>
                <p className="text-muted-foreground">متبقي: {remainingTime}</p>
              </div>
              <div className="text-3xl font-bold">{nextPrayer.time}</div>
            </div>
          </CardContent>
        </Card>

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>الإشعارات</span>
            </TabsTrigger>
            <TabsTrigger value="adhan" className="flex items-center gap-1">
              <Volume2 className="h-4 w-4" />
              <span>الأذان</span>
            </TabsTrigger>
            <TabsTrigger value="adhkar" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>الأذكار</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم الإشعارات */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>تخصيص إشعارات الصلاة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications-enabled" className="text-base font-medium">
                      تفعيل الإشعارات
                    </Label>
                    <p className="text-sm text-muted-foreground">تلقي إشعارات عند اقتراب مواعيد الصلاة</p>
                  </div>
                  <Switch
                    id="notifications-enabled"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    disabled={permissionStatus !== "granted"}
                  />
                </div>

                {permissionStatus !== "granted" && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>تنبيه</AlertTitle>
                    <AlertDescription>
                      يجب السماح بالإشعارات لتلقي تنبيهات الصلاة.
                      <Button variant="outline" size="sm" className="mt-2" onClick={requestNotificationPermission}>
                        السماح بالإشعارات
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">إشعارات الصلوات</h3>
                  <div className="space-y-4">
                    {Object.entries(prayerNames).map(([prayer, name]) => (
                      <div key={prayer} className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={`prayer-${prayer}`} className="text-base">
                            {name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {prayerTimes[prayer as keyof typeof prayerTimes]}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Select
                            value={notificationTimes[prayer as keyof typeof notificationTimes].toString()}
                            onValueChange={(value) => handleNotificationTimeChange(prayer, Number.parseInt(value))}
                            disabled={!prayerNotifications[prayer as keyof typeof prayerNotifications]}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="وقت التنبيه" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 دقائق</SelectItem>
                              <SelectItem value="10">10 دقائق</SelectItem>
                              <SelectItem value="15">15 دقيقة</SelectItem>
                              <SelectItem value="20">20 دقيقة</SelectItem>
                              <SelectItem value="30">30 دقيقة</SelectItem>
                              <SelectItem value="45">45 دقيقة</SelectItem>
                              <SelectItem value="60">60 دقيقة</SelectItem>
                            </SelectContent>
                          </Select>
                          <Switch
                            id={`prayer-${prayer}`}
                            checked={prayerNotifications[prayer as keyof typeof prayerNotifications]}
                            onCheckedChange={() => togglePrayerNotification(prayer)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">إعدادات الصوت والاهتزاز</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notification-sound">صوت التنبيه</Label>
                      <Select id="notification-sound" value={notificationSound} onValueChange={setNotificationSound}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="اختر صوت التنبيه" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationSounds.map((sound) => (
                            <SelectItem key={sound.id} value={sound.id}>
                              {sound.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notification-volume">مستوى الصوت</Label>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={playNotificationSound}
                          className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Slider
                        id="notification-volume"
                        value={[notificationVolume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setNotificationVolume(value[0])}
                        disabled={notificationSound === "none"}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="vibration-enabled" className="text-base">
                          تفعيل الاهتزاز
                        </Label>
                        <p className="text-sm text-muted-foreground">اهتزاز الجهاز عند وصول الإشعار</p>
                      </div>
                      <Switch id="vibration-enabled" checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* قسم الأذان */}
          <TabsContent value="adhan" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>إعدادات الأذان</CardTitle>
                <CardDescription>تخصيص صوت الأذان وإعداداته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adhan-enabled" className="text-base font-medium">
                      تشغيل الأذان
                    </Label>
                    <p className="text-sm text-muted-foreground">تشغيل الأذان عند دخول وقت الصلاة</p>
                  </div>
                  <Switch id="adhan-enabled" checked={adhanEnabled} onCheckedChange={setAdhanEnabled} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="adhan-sound">صوت الأذان</Label>
                    <Select
                      id="adhan-sound"
                      value={selectedAdhan}
                      onValueChange={setSelectedAdhan}
                      disabled={!adhanEnabled}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="اختر صوت الأذان" />
                      </SelectTrigger>
                      <SelectContent>
                        {adhanSounds.map((sound) => (
                          <SelectItem key={sound.id} value={sound.id}>
                            {sound.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="adhan-volume">مستوى الصوت</Label>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={playAdhan}
                        disabled={!adhanEnabled}
                        className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                      >
                        {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Slider
                      id="adhan-volume"
                      value={[adhanVolume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setAdhanVolume(value[0])}
                      disabled={!adhanEnabled}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">الصلوات التي يُرفع فيها الأذان</h3>
                  <div className="space-y-4">
                    {Object.entries(prayerNames).map(([prayer, name]) => {
                      // تخطي وقت الشروق
                      if (prayer === "sunrise") return null

                      return (
                        <div key={prayer} className="flex items-center justify-between">
                          <Label htmlFor={`adhan-${prayer}`} className="text-base">
                            {name}
                          </Label>
                          <Switch
                            id={`adhan-${prayer}`}
                            checked={prayerNotifications[prayer as keyof typeof prayerNotifications]}
                            onCheckedChange={() => togglePrayerNotification(prayer)}
                            disabled={!adhanEnabled}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* قسم الأذكار */}
          <TabsContent value="adhkar" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>تذكير الأذكار</CardTitle>
                <CardDescription>إعدادات تذكير أذكار الصباح والمساء</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="morning-adhkar" className="text-base font-medium">
                      أذكار الصباح
                    </Label>
                    <p className="text-sm text-muted-foreground">تذكير بأذكار الصباح</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="time"
                      value={adhkarTimes.morning}
                      onChange={(e) => setAdhkarTimes((prev) => ({ ...prev, morning: e.target.value }))}
                      className="w-[120px]"
                      disabled={!adhkarReminders.morning}
                    />
                    <Switch
                      id="morning-adhkar"
                      checked={adhkarReminders.morning}
                      onCheckedChange={(checked) => setAdhkarReminders((prev) => ({ ...prev, morning: checked }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="evening-adhkar" className="text-base font-medium">
                      أذكار المساء
                    </Label>
                    <p className="text-sm text-muted-foreground">تذكير بأذكار المساء</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="time"
                      value={adhkarTimes.evening}
                      onChange={(e) => setAdhkarTimes((prev) => ({ ...prev, evening: e.target.value }))}
                      className="w-[120px]"
                      disabled={!adhkarReminders.evening}
                    />
                    <Switch
                      id="evening-adhkar"
                      checked={adhkarReminders.evening}
                      onCheckedChange={(checked) => setAdhkarReminders((prev) => ({ ...prev, evening: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">إعدادات التنبيه</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="adhkar-notification-sound">صوت التنبيه</Label>
                      <Select
                        id="adhkar-notification-sound"
                        value={notificationSound}
                        onValueChange={setNotificationSound}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="اختر صوت التنبيه" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationSounds.map((sound) => (
                            <SelectItem key={sound.id} value={sound.id}>
                              {sound.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="adhkar-vibration-enabled" className="text-base">
                          تفعيل الاهتزاز
                        </Label>
                        <p className="text-sm text-muted-foreground">اهتزاز الجهاز عند وصول تذكير الأذكار</p>
                      </div>
                      <Switch
                        id="adhkar-vibration-enabled"
                        checked={vibrationEnabled}
                        onCheckedChange={setVibrationEnabled}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

