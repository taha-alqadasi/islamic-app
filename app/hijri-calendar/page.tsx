"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, CalendarIcon } from "lucide-react"

// Islamic events with their Hijri dates
const islamicEvents = [
  { name: "رأس السنة الهجرية", day: 1, month: 1 },
  { name: "عاشوراء", day: 10, month: 1 },
  { name: "المولد النبوي الشريف", day: 12, month: 3 },
  { name: "بداية رجب", day: 1, month: 7 },
  { name: "ليلة الإسراء والمعراج", day: 27, month: 7 },
  { name: "بداية شعبان", day: 1, month: 8 },
  { name: "ليلة النصف من شعبان", day: 15, month: 8 },
  { name: "بداية رمضان", day: 1, month: 9 },
  { name: "ليلة القدر (المحتملة)", day: 27, month: 9 },
  { name: "عيد الفطر", day: 1, month: 10 },
  { name: "بداية ذي الحجة", day: 1, month: 12 },
  { name: "يوم عرفة", day: 9, month: 12 },
  { name: "عيد الأضحى", day: 10, month: 12 },
]

// Hijri month names in Arabic
const hijriMonths = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
]

// Days of the week in Arabic
const weekDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

export default function HijriCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hijriYear, setHijriYear] = useState(1445)
  const [hijriMonth, setHijriMonth] = useState(0) // 0-indexed (0 = Muharram)
  const [calendarDays, setCalendarDays] = useState<
    Array<{ day: number | null; gregorian: Date | null; events: string[] }>
  >([])

  // Function to convert Gregorian to Hijri date (simplified approximation)
  const gregorianToHijri = (date: Date) => {
    // This is a simplified approximation
    // For a real app, use a proper Hijri calendar library
    const gregorianYear = date.getFullYear()
    const gregorianMonth = date.getMonth()
    const gregorianDay = date.getDate()

    // Approximate conversion (this is not accurate for a real app)
    // In a real app, use a library like hijri-date, moment-hijri, or a proper API
    const estimatedHijriYear = Math.floor((gregorianYear - 622) * (33 / 32))
    const estimatedHijriMonth = (gregorianMonth + 1) % 12
    const estimatedHijriDay = gregorianDay

    // For demo purposes only - in a real app use a proper conversion
    return {
      year: estimatedHijriYear,
      month: estimatedHijriMonth,
      day: estimatedHijriDay,
    }
  }

  // Function to convert Hijri to Gregorian date (simplified approximation)
  const hijriToGregorian = (year: number, month: number, day: number) => {
    // This is a simplified approximation
    // For a real app, use a proper Hijri calendar library

    // Approximate conversion (this is not accurate for a real app)
    // In a real app, use a library like hijri-date, moment-hijri, or a proper API
    const estimatedGregorianYear = Math.floor(year * (32 / 33) + 622)
    const estimatedGregorianMonth = month - 1
    const estimatedGregorianDay = day

    // For demo purposes only - in a real app use a proper conversion
    return new Date(estimatedGregorianYear, estimatedGregorianMonth, estimatedGregorianDay)
  }

  // Function to get the first day of the Hijri month
  const getFirstDayOfMonth = (year: number, month: number) => {
    // Convert to Gregorian
    const gregorianDate = hijriToGregorian(year, month + 1, 1)
    // Get day of week (0 = Sunday, 6 = Saturday)
    return gregorianDate.getDay()
  }

  // Function to get the number of days in a Hijri month
  const getDaysInMonth = (year: number, month: number) => {
    // In a real app, this would be calculated properly based on the Hijri calendar rules
    // Hijri months alternate between 29 and 30 days, with adjustments
    return month % 2 === 0 ? 30 : 29
  }

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(hijriYear, hijriMonth)
    const daysInMonth = getDaysInMonth(hijriYear, hijriMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, gregorian: null, events: [] })
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const gregorianDate = hijriToGregorian(hijriYear, hijriMonth + 1, i)

      // Check for Islamic events on this day
      const events = islamicEvents
        .filter((event) => event.day === i && event.month === hijriMonth + 1)
        .map((event) => event.name)

      days.push({ day: i, gregorian: gregorianDate, events })
    }

    // Fill the remaining cells to complete the grid (6 rows x 7 columns)
    const remainingCells = 42 - days.length
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, gregorian: null, events: [] })
    }

    setCalendarDays(days)
  }

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    if (hijriMonth === 0) {
      setHijriMonth(11)
      setHijriYear(hijriYear - 1)
    } else {
      setHijriMonth(hijriMonth - 1)
    }
  }

  // Function to navigate to the next month
  const goToNextMonth = () => {
    if (hijriMonth === 11) {
      setHijriMonth(0)
      setHijriYear(hijriYear + 1)
    } else {
      setHijriMonth(hijriMonth + 1)
    }
  }

  // Function to go to today
  const goToToday = () => {
    const today = new Date()
    const hijriDate = gregorianToHijri(today)
    setHijriYear(hijriDate.year)
    setHijriMonth(hijriDate.month - 1)
  }

  // Update calendar when month or year changes
  useEffect(() => {
    generateCalendarDays()
  }, [hijriYear, hijriMonth])

  // Initialize with current date on component mount
  useEffect(() => {
    goToToday()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">التقويم الهجري</h1>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <CardTitle className="text-xl">
              {hijriMonths[hijriMonth]} {hijriYear} هـ
            </CardTitle>

            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  min-h-[80px] p-2 border rounded-md text-center 
                  ${day.day ? "bg-background" : "bg-muted/30"} 
                  ${day.events.length > 0 ? "border-primary/50" : "border-border"}
                `}
              >
                {day.day && (
                  <>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-medium">{day.day}</span>
                      {day.gregorian && (
                        <span className="text-xs text-muted-foreground mt-1">
                          {day.gregorian.getDate()}/{day.gregorian.getMonth() + 1}
                        </span>
                      )}
                    </div>

                    {day.events.length > 0 && (
                      <div className="mt-1">
                        {day.events.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="text-xs bg-primary/10 text-primary rounded px-1 py-0.5 mt-1 truncate"
                            title={event}
                          >
                            {event}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button onClick={goToToday} variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              اليوم
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المناسبات الإسلامية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {islamicEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center">
                  {event.day}
                </div>
                <div>
                  <div className="font-medium">{event.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.day} {hijriMonths[event.month - 1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

