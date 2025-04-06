"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Moon, Sun, Volume2, VolumeX, Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface QuranReadingResponsiveProps {
  children?: React.ReactNode
}

export const QuranReadingResponsive: React.FC<QuranReadingResponsiveProps> = ({ 
  children 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Toggle sidebar based on screen size
  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white border-b'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-bold text-center">القرآن الكريم</h1>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
            >
              {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div 
            className={`${isMobile ? 'fixed inset-0 z-50 w-72' : 'w-72'} 
                        ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} 
                        p-4 overflow-y-auto transition-all duration-300 ease-in-out`}
          >
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            
            <div className="mt-8">
              <Tabs defaultValue="surahs">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="surahs">سور</TabsTrigger>
                  <TabsTrigger value="bookmarks">علامات</TabsTrigger>
                  <TabsTrigger value="search">بحث</TabsTrigger>
                  <TabsTrigger value="settings">إعدادات</TabsTrigger>
                </TabsList>
                <TabsContent value="surahs" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-center">قائمة السور</h3>
                      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {Array.from({ length: 10 }, (_, i) => (
                          <Button 
                            key={i} 
                            variant="ghost" 
                            className="w-full justify-between"
                            dir="rtl"
                          >
                            <span>{i + 1}. سورة {['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة'][i % 5]}</span>
                            <span className="text-sm opacity-70">{[7, 286, 200, 176, 120][i % 5]} آية</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="bookmarks" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-center">العلامات المرجعية</h3>
                      <div className="space-y-2">
                        {Array.from({ length: 3 }, (_, i) => (
                          <Button 
                            key={i} 
                            variant="ghost" 
                            className="w-full justify-between"
                            dir="rtl"
                          >
                            <span>سورة {['البقرة', 'الإخلاص', 'الفاتحة'][i]} - آية {[255, 1, 5][i]}</span>
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="search" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-center">بحث</h3>\

