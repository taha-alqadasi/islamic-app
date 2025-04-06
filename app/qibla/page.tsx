"use client"

import { useState, useEffect } from "react"
import { Compass, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QiblaPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null)
  const [currentDirection, setCurrentDirection] = useState<number | null>(null)
  const [permission, setPermission] = useState<PermissionState | null>(null)

  // Constants for Kaaba coordinates
  const KAABA_LAT = 21.4225
  const KAABA_LNG = 39.8262

  // Function to calculate Qibla direction
  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Convert to radians
    const latRad = (lat * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180
    const kaabaLngRad = (KAABA_LNG * Math.PI) / 180

    // Calculate the angle
    const y = Math.sin(kaabaLngRad - lngRad)
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad)

    // Get the angle in degrees
    let qiblaAngle = Math.atan2(y, x) * (180 / Math.PI)

    // Normalize to 0-360
    qiblaAngle = (qiblaAngle + 360) % 360

    return qiblaAngle
  }

  // Function to get user's location and calculate Qibla direction
  const findQiblaDirection = async () => {
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
      const qiblaAngle = calculateQiblaDirection(latitude, longitude)
      setQiblaDirection(qiblaAngle)

      // Start watching device orientation if available
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation)
      } else {
        setError("جهازك لا يدعم مستشعر الاتجاه")
      }
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

  // Handle device orientation changes
  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setCurrentDirection(event.alpha)
    }
  }

  // Check for permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" as PermissionName })
          setPermission(result.state)

          result.addEventListener("change", () => {
            setPermission(result.state)
          })
        } catch (error) {
          console.error("Error checking permissions:", error)
        }
      }
    }

    checkPermissions()

    // Cleanup
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

  // Calculate the relative direction to Qibla
  const relativeQiblaDirection =
    qiblaDirection !== null && currentDirection !== null ? (qiblaDirection - currentDirection + 360) % 360 : null

  return (
    <div className="container mx-auto px-4 py-8 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">محدد اتجاه القبلة</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>اتجاه القبلة</CardTitle>
          <CardDescription>يساعدك هذا المحدد في معرفة اتجاه القبلة من موقعك الحالي</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {permission === "denied" && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>تم رفض الوصول إلى الموقع</AlertTitle>
              <AlertDescription>يرجى السماح للتطبيق بالوصول إلى موقعك لتحديد اتجاه القبلة</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>خطأ</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative mb-6 w-64 h-64">
            {/* Compass */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: currentDirection !== null ? `rotate(${currentDirection}deg)` : "none",
                transition: "transform 0.3s ease-out",
              }}
            >
              <Compass size={200} className="text-primary" />
            </div>

            {/* Qibla direction indicator */}
            {relativeQiblaDirection !== null && (
              <div
                className="absolute top-0 left-1/2 h-1/2 w-1 bg-green-500 origin-bottom"
                style={{
                  transform: `translateX(-50%) rotate(${relativeQiblaDirection}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              />
            )}

            {/* Center point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
          </div>

          {qiblaDirection !== null && (
            <div className="text-center mb-4">
              <p className="text-lg font-medium">اتجاه القبلة: {qiblaDirection.toFixed(1)}° من الشمال</p>
              {currentDirection !== null && (
                <p className="text-sm text-muted-foreground">اتجاهك الحالي: {currentDirection.toFixed(1)}°</p>
              )}
            </div>
          )}

          <Button onClick={findQiblaDirection} disabled={loading || permission === "denied"} className="w-full">
            {loading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري تحديد الموقع...
              </>
            ) : (
              "تحديد اتجاه القبلة"
            )}
          </Button>

          {qiblaDirection !== null && (
            <p className="mt-4 text-sm text-muted-foreground text-center">
              قم بتوجيه الجهاز بحيث يشير السهم الأخضر إلى الأعلى لتحديد اتجاه القبلة
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تعليمات الاستخدام</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>اضغط على زر "تحديد اتجاه القبلة" للسماح للتطبيق بالوصول إلى موقعك</li>
            <li>امسك الجهاز بشكل أفقي (مسطح)</li>
            <li>قم بتدوير الجهاز حتى يشير السهم الأخضر إلى الأعلى</li>
            <li>هذا هو اتجاه القبلة من موقعك الحالي</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            ملاحظة: دقة تحديد الاتجاه تعتمد على مستشعرات جهازك. للحصول على أفضل النتائج، قم بمعايرة بوصلة جهازك قبل
            الاستخدام.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

