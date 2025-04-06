"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Search, Play, Heart, Share2, Bookmark, Clock, User, Calendar } from "lucide-react"

// Mock data for prophet stories
const prophetStories = [
  {
    id: 1,
    title: "قصة نبي الله آدم عليه السلام",
    description: "قصة خلق آدم عليه السلام وإسكانه الجنة ثم هبوطه إلى الأرض",
    image: "/placeholder.svg?height=200&width=300",
    duration: "15 دقيقة",
    category: "قصص الأنبياء",
    ageGroup: "الكل",
    date: "2023-10-15",
    author: "د. عمر عبد الكافي",
  },
  {
    id: 2,
    title: "قصة نبي الله نوح عليه السلام",
    description: "قصة نوح عليه السلام ودعوته لقومه وبناء السفينة والطوفان",
    image: "/placeholder.svg?height=200&width=300",
    duration: "20 دقيقة",
    category: "قصص الأنبياء",
    ageGroup: "الكل",
    date: "2023-10-18",
    author: "د. طارق السويدان",
  },
  {
    id: 3,
    title: "قصة نبي الله إبراهيم عليه السلام",
    description: "قصة إبراهيم عليه السلام وتحطيمه للأصنام وإلقائه في النار وبناء الكعبة",
    image: "/placeholder.svg?height=200&width=300",
    duration: "25 دقيقة",
    category: "قصص الأنبياء",
    ageGroup: "الكل",
    date: "2023-10-22",
    author: "د. راغب السرجاني",
  },
  {
    id: 4,
    title: "قصة نبي الله موسى عليه السلام",
    description: "قصة موسى عليه السلام مع فرعون وخروجه ببني إسرائيل من مصر",
    image: "/placeholder.svg?height=200&width=300",
    duration: "30 دقيقة",
    category: "قصص الأنبياء",
    ageGroup: "الكل",
    date: "2023-10-25",
    author: "د. عمر عبد الكافي",
  },
  {
    id: 5,
    title: "قصة نبي الله يوسف عليه السلام",
    description: "قصة يوسف عليه السلام مع إخوته وصبره على البلاء وتوليه خزائن مصر",
    image: "/placeholder.svg?height=200&width=300",
    duration: "28 دقيقة",
    category: "قصص الأنبياء",
    ageGroup: "الكل",
    date: "2023-10-28",
    author: "د. طارق السويدان",
  },
]

// Mock data for companion stories
const companionStories = [
  {
    id: 1,
    title: "قصة أبي بكر الصديق رضي الله عنه",
    description: "قصة حياة أبي بكر الصديق رضي الله عنه وصحبته للنبي ﷺ وخلافته",
    image: "/placeholder.svg?height=200&width=300",
    duration: "18 دقيقة",
    category: "قصص الصحابة",
    ageGroup: "الكبار",
    date: "2023-11-02",
    author: "د. راغب السرجاني",
  },
  {
    id: 2,
    title: "قصة عمر بن الخطاب رضي الله عنه",
    description: "قصة حياة عمر بن الخطاب رضي الله عنه وإسلامه وخلافته وفتوحاته",
    image: "/placeholder.svg?height=200&width=300",
    duration: "22 دقيقة",
    category: "قصص الصحابة",
    ageGroup: "الكبار",
    date: "2023-11-05",
    author: "د. طارق السويدان",
  },
  {
    id: 3,
    title: "قصة عثمان بن عفان رضي الله عنه",
    description: "قصة حياة عثمان بن عفان رضي الله عنه وحيائه وكرمه وجمعه للقرآن",
    image: "/placeholder.svg?height=200&width=300",
    duration: "20 دقيقة",
    category: "قصص الصحابة",
    ageGroup: "الكبار",
    date: "2023-11-08",
    author: "د. عمر عبد الكافي",
  },
  {
    id: 4,
    title: "قصة علي بن أبي طالب رضي الله عنه",
    description: "قصة حياة علي بن أبي طالب رضي الله عنه وشجاعته وعلمه وخلافته",
    image: "/placeholder.svg?height=200&width=300",
    duration: "25 دقيقة",
    category: "قصص الصحابة",
    ageGroup: "الكبار",
    date: "2023-11-12",
    author: "د. راغب السرجاني",
  },
]

// Mock data for children stories
const childrenStories = [
  {
    id: 1,
    title: "قصة أصحاب الفيل",
    description: "قصة أصحاب الفيل وكيف حمى الله الكعبة من أبرهة وجيشه",
    image: "/placeholder.svg?height=200&width=300",
    duration: "10 دقائق",
    category: "قصص للأطفال",
    ageGroup: "الأطفال",
    date: "2023-11-15",
    author: "أ. سارة الجابري",
  },
  {
    id: 2,
    title: "قصة أصحاب الكهف",
    description: "قصة الفتية المؤمنين الذين لجأوا إلى الكهف فرارًا بدينهم",
    image: "/placeholder.svg?height=200&width=300",
    duration: "12 دقيقة",
    category: "قصص للأطفال",
    ageGroup: "الأطفال",
    date: "2023-11-18",
    author: "أ. محمد العوضي",
  },
  {
    id: 3,
    title: "قصة السيدة مريم عليها السلام",
    description: "قصة السيدة مريم عليها السلام وولادتها لعيسى عليه السلام",
    image: "/placeholder.svg?height=200&width=300",
    duration: "15 دقيقة",
    category: "قصص للأطفال",
    ageGroup: "الأطفال",
    date: "2023-11-22",
    author: "أ. سارة الجابري",
  },
  {
    id: 4,
    title: "قصة ذي القرنين",
    description: "قصة ذي القرنين الملك الصالح وبنائه للسد",
    image: "/placeholder.svg?height=200&width=300",
    duration: "14 دقيقة",
    category: "قصص للأطفال",
    ageGroup: "الأطفال",
    date: "2023-11-25",
    author: "أ. محمد العوضي",
  },
]

export default function IslamicStoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("prophets")
  const [favorites, setFavorites] = useState<number[]>([1, 5])
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null)

  // Get all stories
  const allStories = [...prophetStories, ...companionStories, ...childrenStories]

  // Filter stories based on search query and age group
  const getFilteredStories = () => {
    let stories: typeof prophetStories = []

    switch (activeTab) {
      case "prophets":
        stories = prophetStories
        break
      case "companions":
        stories = companionStories
        break
      case "children":
        stories = childrenStories
        break
      case "favorites":
        stories = allStories.filter((story) => favorites.includes(story.id))
        break
      default:
        stories = prophetStories
    }

    return stories.filter(
      (story) =>
        (story.title.includes(searchQuery) || story.description.includes(searchQuery)) &&
        (selectedAgeGroup === null || story.ageGroup === selectedAgeGroup),
    )
  }

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Get all unique age groups
  const ageGroups = [...new Set(allStories.map((story) => story.ageGroup))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">القصص الإسلامية</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                القصص الإسلامية
              </CardTitle>
              <CardDescription>استمتع بالقصص الإسلامية المفيدة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن قصة..."
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="prophets" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="prophets">الأنبياء</TabsTrigger>
                    <TabsTrigger value="companions">الصحابة</TabsTrigger>
                    <TabsTrigger value="children">للأطفال</TabsTrigger>
                    <TabsTrigger value="favorites">المفضلة</TabsTrigger>
                  </TabsList>

                  <TabsContent value="prophets" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {prophetStories.map((story) => (
                          <div
                            key={story.id}
                            className={`
                              flex items-center justify-between p-2 rounded-md cursor-pointer
                              hover:bg-muted
                            `}
                            onClick={() => {
                              /* Navigate to story */
                            }}
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-2">
                                <img
                                  src={story.image || "/placeholder.svg"}
                                  alt={story.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium line-clamp-1">{story.title}</p>
                                <p className="text-xs text-muted-foreground">{story.duration}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(story.id)
                              }}
                              className={favorites.includes(story.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="companions" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {companionStories.map((story) => (
                          <div
                            key={story.id}
                            className={`
                              flex items-center justify-between p-2 rounded-md cursor-pointer
                              hover:bg-muted
                            `}
                            onClick={() => {
                              /* Navigate to story */
                            }}
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-2">
                                <img
                                  src={story.image || "/placeholder.svg"}
                                  alt={story.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium line-clamp-1">{story.title}</p>
                                <p className="text-xs text-muted-foreground">{story.duration}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(story.id)
                              }}
                              className={favorites.includes(story.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="children" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {childrenStories.map((story) => (
                          <div
                            key={story.id}
                            className={`
                              flex items-center justify-between p-2 rounded-md cursor-pointer
                              hover:bg-muted
                            `}
                            onClick={() => {
                              /* Navigate to story */
                            }}
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-2">
                                <img
                                  src={story.image || "/placeholder.svg"}
                                  alt={story.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium line-clamp-1">{story.title}</p>
                                <p className="text-xs text-muted-foreground">{story.duration}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(story.id)
                              }}
                              className={favorites.includes(story.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="favorites" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2 pr-3">
                        {favorites.length === 0 ? (
                          <div className="text-center py-8">
                            <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                            <p className="mt-4 text-muted-foreground">لم تقم بإضافة أي قصص إلى المفضلة بعد</p>
                          </div>
                        ) : (
                          allStories
                            .filter((story) => favorites.includes(story.id))
                            .map((story) => (
                              <div
                                key={story.id}
                                className={`
                                  flex items-center justify-between p-2 rounded-md cursor-pointer
                                  hover:bg-muted
                                `}
                                onClick={() => {
                                  /* Navigate to story */
                                }}
                              >
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded-md overflow-hidden mr-2">
                                    <img
                                      src={story.image || "/placeholder.svg"}
                                      alt={story.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium line-clamp-1">{story.title}</p>
                                    <p className="text-xs text-muted-foreground">{story.duration}</p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(story.id)
                                  }}
                                  className="text-red-500"
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">تصفية حسب الفئة العمرية</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedAgeGroup === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedAgeGroup(null)}
                    >
                      الكل
                    </Button>
                    {ageGroups.map((ageGroup) => (
                      <Button
                        key={ageGroup}
                        variant={selectedAgeGroup === ageGroup ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedAgeGroup(ageGroup)}
                      >
                        {ageGroup}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredStories().length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <p className="mt-4 text-muted-foreground">لم يتم العثور على قصص مطابقة لبحثك</p>
              </div>
            ) : (
              getFilteredStories().map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{story.category}</Badge>
                    <Badge variant="outline" className="absolute top-2 left-2 bg-background">
                      {story.ageGroup}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>{story.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{story.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(story.date).toLocaleDateString("ar-SA")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleFavorite(story.id)}
                        className={favorites.includes(story.id) ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button>
                      <Play className="h-4 w-4 ml-1" />
                      استماع للقصة
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

