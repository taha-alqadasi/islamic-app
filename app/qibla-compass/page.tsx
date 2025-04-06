"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  Compass,
  MapPin,
  RotateCcw,
  Map,
  Settings,
  Moon,
  Sun,
  AlertTriangle,
  Info,
  Share2,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function QiblaCompassPage() {
  // حالة التطبيق
  const [activeTab, setActiveTab] = useState("compass")
  const [darkMode, setDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  // حالة البوصلة
  const [hasCompass, setHasCompass] = useState(false)
  const [compassHeading, setCompassHeading] = useState(0)
  const [qiblaDirection, setQiblaDirection] = useState(0)
  const [qiblaOffset, setQiblaOffset] = useState(0)
  const [accuracy, setAccuracy<"high" | "low" | \"unavailable">] = useState("unavailable")
  const [calibrationNeeded, setCalibrationNeeded] = useState(false)

  // حالة الموقع
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null)
  const [showLocationAlert, setShowLocationAlert] = useState(false)
  const [manualLocation, setManualLocation] = useState({ lat: "", lng: "" })
  const [distance, setDistance] = useState<number | null>(null)

  // إعدادات
  const [useAnimation, setUseAnimation] = useState(true)
  const [showDirection, setShowDirection] = useState(true)
  const [showDistance, setShowDistance] = useState(true)
  const [showDegrees, setShowDegrees] = useState(true)
  const [compassSize, setCompassSize] = useState(300)
  const [compassColor, setCompassColor] = useState("blue")

  // المراجع
  const compassRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const qiblaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // الإحداثيات الثابتة للكعبة المشرفة
  const KAABA_LAT = 21.4225
  const KAABA_LNG = 39.8262

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("qibla_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setUseAnimation(settings.useAnimation ?? true)
          setShowDirection(settings.showDirection ?? true)
          setShowDistance(settings.showDistance ?? true)
          setShowDegrees(settings.showDegrees ?? true)
          setCompassSize(settings.compassSize ?? 300)
          setCompassColor(settings.compassColor ?? "blue")
        }

        // تحميل الموقع
        const savedLocation = localStorage.getItem("qibla_location")
        if (savedLocation) {
          setLocation(JSON.parse(savedLocation))
        } else {
          setShowLocationAlert(true)
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
    checkCompassSupport()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "qibla_settings",
      JSON.stringify({
        darkMode,
        useAnimation,
        showDirection,
        showDistance,
        showDegrees,
        compassSize,
        compassColor,
      }),
    )
  }, [darkMode, useAnimation, showDirection, showDistance, showDegrees, compassSize, compassColor])

  useEffect(() => {
    if (location) {
      localStorage.setItem("qibla_location", JSON.stringify(location))
      calculateQiblaDirection(location.lat, location.lng)
      calculateDistance(location.lat, location.lng, KAABA_LAT, KAABA_LNG)
    }
  }, [location])

  // التحقق من دعم البوصلة
  const checkCompassSupport = () => {
    if (window.DeviceOrientationEvent) {
      // للأجهزة الحديثة التي تتطلب إذن
      if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === "function") {
        setHasCompass(true)
        // سنطلب الإذن عند النقر على زر البدء
      } else {
        // للأجهزة القديمة التي لا تتطلب إذن
        setHasCompass(true)
        window.addEventListener("deviceorientation", handleDeviceOrientation)
      }
    } else {
      setHasCompass(false)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }

  // تحسين دالة طلب إذن استخدام البوصلة
  const requestCompassPermission = async () => {
    try {
      if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === "function") {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleDeviceOrientation)
          setHasCompass(true)
          setAccuracy("high")
          return true
        } else {
          alert("لم يتم منح الإذن لاستخدام البوصلة. لن تتمكن من استخدام ميزة تحديد اتجاه القبلة بدقة.")
          setAccuracy("unavailable")
          return false
        }
      } else {
        // للأجهزة التي لا تتطلب إذن
        window.addEventListener("deviceorientation", handleDeviceOrientation)
        setHasCompass(true)
        return true
      }
    } catch (error) {
      console.error("Error requesting compass permission:", error)
      alert("حدث خطأ أثناء طلب إذن استخدام البوصلة. يرجى التأكد من أن جهازك يدعم هذه الميزة.")
      setAccuracy("unavailable")
      return false
    }
  }

  // تحسين معالجة بيانات البوصلة
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    // الحصول على اتجاه البوصلة
    let heading = event.webkitCompassHeading || event.alpha || 0

    // تحويل القيمة إلى درجات من 0 إلى 360
    if (event.alpha && !event.webkitCompassHeading) {
      heading = 360 - heading
    }

    // تطبيق تصفية لتنعيم حركة البوصلة
    const filteredHeading = applyHeadingFilter(heading)

    // تحديد دقة البوصلة
    if (event.webkitCompassAccuracy !== undefined) {
      if (event.webkitCompassAccuracy > 10) {
        setAccuracy("low")
        setCalibrationNeeded(true)
      } else if (event.webkitCompassAccuracy < 0) {
        setAccuracy("unavailable")
      } else {
        setAccuracy("high")
        setCalibrationNeeded(false)
      }
    } else {
      // تقدير الدقة بناءً على استقرار القراءات
      estimateAccuracy(filteredHeading)
    }

    // تحديث اتجاه البوصلة
    setCompassHeading(filteredHeading)

    // حساب الفرق بين اتجاه البوصلة واتجاه القبلة
    const offset = (qiblaDirection - filteredHeading + 360) % 360
    setQiblaOffset(offset)

    // تحديث الرسومات
    updateCompassGraphics(filteredHeading)
  }

  // إضافة دالة لتصفية وتنعيم قراءات البوصلة
  const headingBuffer: number[] = []
  const MAX_BUFFER_SIZE = 5

  const applyHeadingFilter = (newHeading: number): number => {
    // إضافة القراءة الجديدة إلى المخزن المؤقت
    headingBuffer.push(newHeading)

    // الحفاظ على حجم المخزن المؤقت
    if (headingBuffer.length > MAX_BUFFER_SIZE) {
      headingBuffer.shift()
    }

    // حساب المتوسط المرجح للقراءات
    if (headingBuffer.length === 0) return newHeading

    let sum = 0
    let weightSum = 0

    for (let i = 0; i < headingBuffer.length; i++) {
      const weight = i + 1 // القراءات الأحدث لها وزن أكبر
      sum += headingBuffer[i] * weight
      weightSum += weight
    }

    return sum / weightSum
  }

  // إضافة دالة لتقدير دقة البوصلة
  const lastHeadings: number[] = []
  const MAX_HEADING_SAMPLES = 10

  const estimateAccuracy = (heading: number) => {
    lastHeadings.push(heading)
    if (lastHeadings.length > MAX_HEADING_SAMPLES) {
      lastHeadings.shift()
    }

    if (lastHeadings.length < 5) return // نحتاج إلى عدة قراءات للتقييم

    // حساب الانحراف المعياري للقراءات
    const mean = lastHeadings.reduce((sum, val) => sum + val, 0) / lastHeadings.length
    const variance = lastHeadings.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / lastHeadings.length
    const stdDev = Math.sqrt(variance)

    // تقييم الدقة بناءً على الانحراف المعياري
    if (stdDev < 5) {
      setAccuracy("high")
      setCalibrationNeeded(false)
    } else if (stdDev < 15) {
      setAccuracy("low")
      setCalibrationNeeded(true)
    } else {
      setAccuracy("low")
      setCalibrationNeeded(true)
    }
  }

  // تحديث رسومات البوصلة
  const updateCompassGraphics = (heading: number) => {
    if (compassRef.current && needleRef.current && qiblaRef.current) {
      // تحديث البوصلة
      if (useAnimation) {
        compassRef.current.style.transform = `rotate(${heading}deg)`
      } else {
        compassRef.current.style.transform = `rotate(${Math.round(heading)}deg)`
      }

      // تحديث مؤشر القبلة
      const qiblaRotation = (qiblaDirection - heading + 360) % 360
      qiblaRef.current.style.transform = `rotate(${qiblaRotation}deg)`
    }

    // تحديث الرسم على الكانفاس
    drawCompassCanvas()
  }

  // رسم البوصلة على الكانفاس
  const drawCompassCanvas = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // تحديد حجم الكانفاس
    const size = compassSize
    canvas.width = size
    canvas.height = size

    // حساب نصف القطر والمركز
    const radius = size / 2 - 10
    const centerX = size / 2
    const centerY = size / 2

    // مسح الكانفاس
    ctx.clearRect(0, 0, size, size)

    // رسم الدائرة الخارجية
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = darkMode ? "#ffffff" : "#000000"
    ctx.lineWidth = 2
    ctx.stroke()

    // رسم الاتجاهات الرئيسية
    const directions = [
      { angle: 0, label: "N" },
      { angle: 90, label: "E" },
      { angle: 180, label: "S" },
      { angle: 270, label: "W" },
    ]

    directions.forEach(({ angle, label }) => {
      // حساب موقع النص
      const radians = ((angle - compassHeading + 360) % 360) * (Math.PI / 180)
      const textX = centerX + (radius - 20) * Math.sin(radians)
      const textY = centerY - (radius - 20) * Math.cos(radians)

      // رسم النص
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = darkMode ? "#ffffff" : "#000000"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, textX, textY)

      // رسم علامة الاتجاه
      const markerStartX = centerX + (radius - 40) * Math.sin(radians)
      const markerStartY = centerY - (radius - 40) * Math.cos(radians)
      const markerEndX = centerX + radius * Math.sin(radians)
      const markerEndY = centerY - radius * Math.cos(radians)

      ctx.beginPath()
      ctx.moveTo(markerStartX, markerStartY)
      ctx.lineTo(markerEndX, markerEndY)
      ctx.strokeStyle = darkMode ? "#ffffff" : "#000000"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // رسم الدرجات
    if (showDegrees) {
      for (let i = 0; i < 360; i += 15) {
        const radians = ((i - compassHeading + 360) % 360) * (Math.PI / 180)
        const startX = centerX + (radius - 10) * Math.sin(radians)
        const startY = centerY - (radius - 10) * Math.cos(radians)
        const endX = centerX + radius * Math.sin(radians)
        const endY = centerY - radius * Math.cos(radians)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = darkMode ? "#888888" : "#888888"
        ctx.lineWidth = 1
        ctx.stroke()

        // رسم أرقام الدرجات كل 45 درجة
        if (i % 45 === 0) {
          const textX = centerX + (radius - 30) * Math.sin(radians)
          const textY = centerY - (radius - 30) * Math.cos(radians)

          ctx.font = "12px Arial"
          ctx.fillStyle = darkMode ? "#aaaaaa" : "#666666"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(i.toString(), textX, textY)
        }
      }
    }

    // رسم مؤشر الشمال
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 10)
    ctx.lineTo(centerX - 10, centerY + 10)
    ctx.lineTo(centerX + 10, centerY + 10)
    ctx.closePath()
    ctx.fillStyle = "red"
    ctx.fill()

    // رسم مؤشر القبلة
    const qiblaRadians = ((qiblaDirection - compassHeading + 360) % 360) * (Math.PI / 180)
    const qiblaX = centerX + radius * Math.sin(qiblaRadians)
    const qiblaY = centerY - radius * Math.cos(qiblaRadians)

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(qiblaX, qiblaY)
    ctx.strokeStyle = getCompassColorValue()
    ctx.lineWidth = 3
    ctx.stroke()

    // رسم نقطة القبلة
    ctx.beginPath()
    ctx.arc(qiblaX, qiblaY, 8, 0, 2 * Math.PI)
    ctx.fillStyle = getCompassColorValue()
    ctx.fill()

    // رسم الكعبة عند نقطة القبلة
    ctx.font = "14px Arial"
    ctx.fillStyle = getCompassColorValue()
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // حساب موقع النص بحيث يكون خارج الدائرة
    const textDistance = 20
    const textX = qiblaX + textDistance * Math.sin(qiblaRadians)
    const textY = qiblaY - textDistance * Math.cos(qiblaRadians)

    ctx.fillText("الكعبة", textX, textY)
  }

  // تحسين دالة حساب اتجاه القبلة
  const calculateQiblaDirection = (lat: number, lng: number) => {
    // تحويل الإحداثيات إلى راديان
    const latRad = (lat * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180
    const kaabaLngRad = (KAABA_LNG * Math.PI) / 180

    // حساب اتجاه القبلة باستخدام صيغة المثلثات الكروية
    const y = Math.sin(kaabaLngRad - lngRad)
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad)

    // تحويل النتيجة إلى درجات
    let qibla = Math.atan2(y, x) * (180 / Math.PI)
    qibla = (qibla + 360) % 360

    setQiblaDirection(qibla)

    // تحديث معلومات الاتجاه النصية
    updateDirectionText(qibla)

    return qibla
  }

  // حساب المسافة إلى الكعبة
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // نصف قطر الأرض بالكيلومتر
    const R = 6371

    // تحويل الإحداثيات إلى راديان
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    setDistance(distance)
    return distance
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

  // تعيين الموقع يدوياً
  const setManualLocationHandler = () => {
    const lat = Number.parseFloat(manualLocation.lat)
    const lng = Number.parseFloat(manualLocation.lng)

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert("يرجى إدخال إحداثيات صحيحة")
      return
    }

    setLocation({
      lat,
      lng,
      name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    })
  }

  // إضافة متغير حالة للتحميل
  const [isLoading, setIsLoading] = useState(false)

  // تحسين دالة بدء استخدام البوصلة
  const startCompass = async () => {
    setIsLoading(true)

    try {
      const granted = await requestCompassPermission()
      if (!granted) {
        alert("يجب السماح باستخدام البوصلة لتحديد اتجاه القبلة بدقة. يمكنك استخدام الخريطة بدلاً من ذلك.")
      } else {
        // إذا تم منح الإذن، تحقق من وجود موقع
        if (!location) {
          alert("يرجى تحديد موقعك أولاً لحساب اتجاه القبلة.")
          setShowLocationAlert(true)
        } else {
          // إعادة حساب اتجاه القبلة
          calculateQiblaDirection(location.lat, location.lng)
        }
      }
    } catch (error) {
      console.error("Error starting compass:", error)
      alert("حدث خطأ أثناء تشغيل البوصلة. يرجى التأكد من أن جهازك يدعم هذه الميزة.")
    } finally {
      setIsLoading(false)
    }
  }

  // إعادة ضبط البوصلة
  const resetCompass = () => {
    if (location) {
      calculateQiblaDirection(location.lat, location.lng)
    }
  }

  // مشاركة اتجاه القبلة
  const shareQiblaDirection = () => {
    if (!location) return

    const shareText = `اتجاه القبلة من موقعي: ${qiblaDirection.toFixed(2)} درجة`

    if (navigator.share) {
      navigator
        .share({
          title: "اتجاه القبلة",
          text: shareText,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("تم نسخ اتجاه القبلة إلى الحافظة")
      })
    }
  }

  // تبديل وضع ملء الشاشة
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
      setFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setFullscreen(false)
      }
    }
  }

  // الحصول على قيمة لون البوصلة
  const getCompassColorValue = () => {
    switch (compassColor) {
      case "blue":
        return "#3b82f6"
      case "green":
        return "#10b981"
      case "red":
        return "#ef4444"
      case "purple":
        return "#8b5cf6"
      case "orange":
        return "#f97316"
      default:
        return "#3b82f6"
    }
  }

  // إضافة دالة لتحديث معلومات الاتجاه النصية
  const [directionText, setDirectionText] = useState("")

  const updateDirectionText = (qiblaAngle: number) => {
    // تحويل الزاوية إلى اتجاه نصي
    let direction = ""

    if (qiblaAngle >= 337.5 || qiblaAngle < 22.5) {
      direction = "شمال"
    } else if (qiblaAngle >= 22.5 && qiblaAngle < 67.5) {
      direction = "شمال شرق"
    } else if (qiblaAngle >= 67.5 && qiblaAngle < 112.5) {
      direction = "شرق"
    } else if (qiblaAngle >= 112.5 && qiblaAngle < 157.5) {
      direction = "جنوب شرق"
    } else if (qiblaAngle >= 157.5 && qiblaAngle < 202.5) {
      direction = "جنوب"
    } else if (qiblaAngle >= 202.5 && qiblaAngle < 247.5) {
      direction = "جنوب غرب"
    } else if (qiblaAngle >= 247.5 && qiblaAngle < 292.5) {
      direction = "غرب"
    } else if (qiblaAngle >= 292.5 && qiblaAngle < 337.5) {
      direction = "شمال غرب"
    }

    setDirectionText(`اتجاه القبلة: ${direction} (${qiblaAngle.toFixed(1)}°)`)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">بوصلة القبلة الذكية</h1>

        {/* تنبيه الموقع */}
        {showLocationAlert && (
          <Alert variant="warning" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>تنبيه</AlertTitle>
            <AlertDescription>
              لم يتم تحديد موقعك بعد. يرجى تحديد موقعك لحساب اتجاه القبلة.
              <Button variant="outline" size="sm" className="mt-2" onClick={getUserLocation}>
                <MapPin className="h-4 w-4 mr-1" />
                تحديد موقعي
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="compass" className="flex items-center gap-1">
              <Compass className="h-4 w-4" />
              <span>البوصلة</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1">
              <Map className="h-4 w-4" />
              <span>الخريطة</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم البوصلة */}
          <TabsContent value="compass" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>البوصلة الذكية</CardTitle>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowInfo(true)}
                            className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>معلومات</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleFullscreen}
                            className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                          >
                            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{fullscreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

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

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowSettings(true)}
                            className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>الإعدادات</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                {location && <CardDescription>موقعك: {location.name}</CardDescription>}
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                {/* عرض البوصلة */}
                <div className="relative mb-6" style={{ width: `${compassSize}px`, height: `${compassSize}px` }}>
                  <canvas ref={canvasRef} width={compassSize} height={compassSize} className="absolute top-0 left-0" />

                  <div
                    ref={compassRef}
                    className="absolute top-0 left-0 w-full h-full transition-transform"
                    style={{
                      transitionDuration: useAnimation ? "200ms" : "0ms",
                    }}
                  >
                    {/* محتوى البوصلة يتم رسمه على الكانفاس */}
                  </div>

                  <div ref={needleRef} className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    {/* إبرة البوصلة */}
                  </div>

                  <div
                    ref={qiblaRef}
                    className="absolute top-0 left-0 w-full h-full transition-transform"
                    style={{
                      transitionDuration: useAnimation ? "200ms" : "0ms",
                    }}
                  >
                    {/* مؤشر القبلة */}
                  </div>
                </div>

                {/* تحسين عرض معلومات القبلة */}
                {location && (
                  <div className="text-center space-y-2">
                    {showDirection && (
                      <div>
                        <p className="text-lg font-medium">
                          {directionText || `اتجاه القبلة: ${qiblaDirection.toFixed(1)}°`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {qiblaOffset < 10 ? (
                            <span className="text-green-500 dark:text-green-400">أنت تواجه القبلة</span>
                          ) : (
                            `انحرف ${qiblaOffset.toFixed(1)}° ${qiblaOffset <= 180 ? "يميناً" : "يساراً"} للوصول للقبلة`
                          )}
                        </p>
                      </div>
                    )}

                    {showDistance && distance !== null && (
                      <p className="text-sm">المسافة إلى الكعبة: {distance.toFixed(0)} كم</p>
                    )}

                    {accuracy !== "unavailable" && (
                      <Badge
                        variant={accuracy === "high" ? "default" : "outline"}
                        className={`mt-2 ${
                          accuracy === "high"
                            ? "bg-green-500"
                            : accuracy === "low"
                              ? "border-yellow-500 text-yellow-500"
                              : ""
                        }`}
                      >
                        دقة البوصلة: {accuracy === "high" ? "عالية" : "منخفضة"}
                      </Badge>
                    )}

                    {calibrationNeeded && (
                      <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
                        <p>يرجى معايرة البوصلة بتحريك الجهاز على شكل رقم 8</p>
                      </div>
                    )}
                  </div>
                )}

                {/* تحسين أزرار التحكم */}
                <div className="flex gap-4 mt-6">
                  {!hasCompass ? (
                    <Alert variant="warning" className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>تنبيه</AlertTitle>
                      <AlertDescription>جهازك لا يدعم البوصلة. يمكنك استخدام الخريطة بدلاً من ذلك.</AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <Button onClick={startCompass} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            جاري التحميل...
                          </>
                        ) : (
                          <>
                            <Compass className="h-4 w-4 ml-2" />
                            بدء البوصلة
                          </>
                        )}
                      </Button>

                      <Button variant="outline" onClick={resetCompass}>
                        <RotateCcw className="h-4 w-4 ml-2" />
                        إعادة ضبط
                      </Button>

                      <Button variant="outline" onClick={shareQiblaDirection}>
                        <Share2 className="h-4 w-4 ml-2" />
                        مشاركة
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم الخريطة */}
          <TabsContent value="map" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>تحديد الموقع</CardTitle>
                <CardDescription>حدد موقعك لحساب اتجاه القبلة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <Button onClick={getUserLocation}>
                    <MapPin className="h-4 w-4 mr-2" />
                    استخدام موقعي الحالي
                  </Button>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">إدخال الموقع يدوياً</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">خط العرض</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="0.0001"
                          min="-90"
                          max="90"
                          placeholder="مثال: 24.7136"
                          value={manualLocation.lat}
                          onChange={(e) => setManualLocation({ ...manualLocation, lat: e.target.value })}
                          className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">خط الطول</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="0.0001"
                          min="-180"
                          max="180"
                          placeholder="مثال: 46.6753"
                          value={manualLocation.lng}
                          onChange={(e) => setManualLocation({ ...manualLocation, lng: e.target.value })}
                          className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                        />
                      </div>
                    </div>
                    <Button className="mt-4" onClick={setManualLocationHandler}>
                      تعيين الموقع
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">معلومات الكعبة المشرفة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">خط العرض</p>
                        <p className="text-lg">{KAABA_LAT}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">خط الطول</p>
                        <p className="text-lg">{KAABA_LNG}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة الإعدادات */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>إعدادات البوصلة</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص إعدادات بوصلة القبلة
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المظهر</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">الوضع الليلي</Label>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="space-y-2">
                  <Label>لون البوصلة</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["blue", "green", "red", "purple", "orange"].map((color) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer ${
                          compassColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: getCompassColorValue() }}
                        onClick={() => setCompassColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>حجم البوصلة</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCompassSize(Math.max(compassSize - 20, 200))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[compassSize]}
                      min={200}
                      max={400}
                      step={20}
                      onValueChange={(value) => setCompassSize(value[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCompassSize(Math.min(compassSize + 20, 400))}
                      className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات العرض</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showDirection">عرض اتجاه القبلة</Label>
                  <Switch id="showDirection" checked={showDirection} onCheckedChange={setShowDirection} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showDistance">عرض المسافة إلى الكعبة</Label>
                  <Switch id="showDistance" checked={showDistance} onCheckedChange={setShowDistance} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showDegrees">عرض الدرجات</Label>
                  <Switch id="showDegrees" checked={showDegrees} onCheckedChange={setShowDegrees} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="useAnimation">تفعيل الحركة السلسة</Label>
                  <Switch id="useAnimation" checked={useAnimation} onCheckedChange={setUseAnimation} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSettings(false)}>حفظ الإعدادات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة المعلومات */}
        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>معلومات عن بوصلة القبلة</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                كيفية استخدام بوصلة القبلة
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">كيفية الاستخدام</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>اسمح للتطبيق بالوصول إلى موقعك وبوصلة جهازك</li>
                  <li>انقر على زر "بدء البوصلة" لتفعيل البوصلة</li>
                  <li>وجه جهازك في اتجاهات مختلفة حتى يشير السهم الأزرق إلى اتجاه القبلة</li>
                  <li>عندما يكون السهم الأزرق في الأعلى، فأنت تواجه القبلة</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">معايرة البوصلة</h3>
                <p>إذا كانت دقة البوصلة منخفضة، قم بمعايرة البوصلة عن طريق تحريك جهازك على شكل رقم 8 في الهواء.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">ملاحظات</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>تعمل البوصلة بشكل أفضل في الأماكن المفتوحة بعيداً عن المجالات المغناطيسية</li>
                  <li>قد تختلف دقة البوصلة من جهاز لآخر</li>
                  <li>يمكنك استخدام الخريطة لتحديد موقعك يدوياً إذا لم تعمل البوصلة بشكل صحيح</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowInfo(false)}>فهمت</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

