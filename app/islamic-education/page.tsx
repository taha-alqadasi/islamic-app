"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  CheckCircle,
  Clock,
  Star,
  Search,
  Play,
  FileText,
  History,
  Bookmark,
} from "lucide-react"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "أساسيات العقيدة الإسلامية",
    description: "تعلم أساسيات العقيدة الإسلامية وأركان الإيمان الستة",
    level: "مبتدئ",
    duration: "8 أسابيع",
    lessons: 24,
    students: 1250,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. أحمد محمد",
    category: "عقيدة",
  },
  {
    id: 2,
    title: "فقه العبادات",
    description: "دراسة تفصيلية لأحكام الطهارة والصلاة والزكاة والصيام والحج",
    level: "متوسط",
    duration: "12 أسبوع",
    lessons: 36,
    students: 980,
    progress: 45,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. عبد الله العثيمين",
    category: "فقه",
  },
  {
    id: 3,
    title: "علوم القرآن",
    description: "مقدمة في علوم القرآن وتاريخه وتفسيره وإعجازه",
    level: "متقدم",
    duration: "10 أسابيع",
    lessons: 30,
    students: 750,
    progress: 20,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. محمد الشنقيطي",
    category: "قرآن",
  },
  {
    id: 4,
    title: "أصول الفقه",
    description: "دراسة قواعد استنباط الأحكام الشرعية من أدلتها التفصيلية",
    level: "متقدم",
    duration: "14 أسبوع",
    lessons: 42,
    students: 620,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. عبد الرحمن السديس",
    category: "فقه",
  },
  {
    id: 5,
    title: "السيرة النبوية",
    description: "دراسة حياة النبي محمد ﷺ من المولد إلى الوفاة",
    level: "مبتدئ",
    duration: "8 أسابيع",
    lessons: 24,
    students: 1450,
    progress: 75,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. صالح المغامسي",
    category: "سيرة",
  },
  {
    id: 6,
    title: "مصطلح الحديث",
    description: "دراسة قواعد نقد الحديث النبوي وتصحيحه وتضعيفه",
    level: "متوسط",
    duration: "9 أسابيع",
    lessons: 27,
    students: 580,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "د. محمد العريفي",
    category: "حديث",
  },
]

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "أهمية الصلاة في الإسلام",
    description: "تعرف على أهمية الصلاة ومكانتها في الإسلام وفضائلها وآثارها",
    author: "د. عائض القرني",
    date: "2023-10-15",
    readTime: "7 دقائق",
    category: "عبادات",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "فضل قراءة القرآن وآدابها",
    description: "تعرف على فضائل قراءة القرآن الكريم وآدابها وكيفية الاستفادة منها",
    author: "د. عمر عبد الكافي",
    date: "2023-09-28",
    readTime: "5 دقائق",
    category: "قرآن",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "الأخلاق في الإسلام",
    description: "نظرة شاملة عن منظومة الأخلاق في الإسلام وأهميتها في بناء المجتمع",
    author: "د. راتب النابلسي",
    date: "2023-11-05",
    readTime: "10 دقائق",
    category: "أخلاق",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "مقاصد الشريعة الإسلامية",
    description: "شرح مفصل لمقاصد الشريعة الإسلامية وأهميتها في فهم الأحكام الشرعية",
    author: "د. محمد الصلابي",
    date: "2023-10-22",
    readTime: "12 دقيقة",
    category: "شريعة",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "الصبر وفضله في الإسلام",
    description: "تعرف على فضل الصبر وأنواعه وثماره في حياة المسلم",
    author: "د. محمد راتب النابلسي",
    date: "2023-11-12",
    readTime: "8 دقائق",
    category: "أخلاق",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: "اختبار في أركان الإسلام",
    description: "اختبر معلوماتك حول أركان الإسلام الخمسة",
    questions: 10,
    time: "15 دقيقة",
    difficulty: "سهل",
    category: "عقيدة",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "اختبار في أحكام الصلاة",
    description: "اختبر معلوماتك حول أحكام الصلاة وشروطها وأركانها",
    questions: 15,
    time: "20 دقيقة",
    difficulty: "متوسط",
    category: "فقه",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "اختبار في السيرة النبوية",
    description: "اختبر معلوماتك حول سيرة النبي محمد ﷺ وغزواته",
    questions: 20,
    time: "25 دقيقة",
    difficulty: "متوسط",
    category: "سيرة",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "اختبار في علوم القرآن",
    description: "اختبر معلوماتك حول علوم القرآن وتاريخه وتفسيره",
    questions: 15,
    time: "20 دقيقة",
    difficulty: "صعب",
    category: "قرآن",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function IslamicEducationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter courses based on search query and category
  const filteredCourses = courses.filter(
    (course) =>
      (course.title.includes(searchQuery) || course.description.includes(searchQuery)) &&
      (selectedCategory === null || course.category === selectedCategory),
  )

  // Filter articles based on search query and category
  const filteredArticles = articles.filter(
    (article) =>
      (article.title.includes(searchQuery) || article.description.includes(searchQuery)) &&
      (selectedCategory === null || article.category === selectedCategory),
  )

  // Filter quizzes based on search query and category
  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      (quiz.title.includes(searchQuery) || quiz.description.includes(searchQuery)) &&
      (selectedCategory === null || quiz.category === selectedCategory),
  )

  // Get all unique categories
  const categories = [
    ...new Set([
      ...courses.map((course) => course.category),
      ...articles.map((article) => article.category),
      ...quizzes.map((quiz) => quiz.category),
    ]),
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">التعليم الإسلامي</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                التعليم الإسلامي
              </CardTitle>
              <CardDescription>تعلم وتعمق في العلوم الإسلامية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن دورة أو مقال..."
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="courses">الدورات</TabsTrigger>
                    <TabsTrigger value="articles">المقالات</TabsTrigger>
                    <TabsTrigger value="quizzes">الاختبارات</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">التصنيفات</h3>
                  <div className="space-y-1">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      الكل
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">إحصائيات التعلم</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>الدورات المكتملة</span>
                        <span>2/6</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>المقالات المقروءة</span>
                        <span>3/5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>الاختبارات المكتملة</span>
                        <span>1/4</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <TabsContent value="courses" className={activeTab === "courses" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">لم يتم العثور على دورات مطابقة لبحثك</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">{course.category}</Badge>
                      {course.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0">
                          <Progress value={course.progress} className="h-1 rounded-none" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{course.lessons} درس</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students} طالب</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        حفظ
                      </Button>
                      <Button>
                        {course.progress > 0 ? (
                          <>
                            <History className="h-4 w-4 ml-1" />
                            استكمال
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 ml-1" />
                            ابدأ الآن
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="articles" className={activeTab === "articles" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">لم يتم العثور على مقالات مطابقة لبحثك</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">{article.category}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        حفظ
                      </Button>
                      <Button>
                        <FileText className="h-4 w-4 ml-1" />
                        قراءة المقال
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className={activeTab === "quizzes" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredQuizzes.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">لم يتم العثور على اختبارات مطابقة لبحثك</p>
                </div>
              ) : (
                filteredQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={quiz.image || "/placeholder.svg"}
                        alt={quiz.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2">{quiz.category}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{quiz.title}</CardTitle>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.questions} سؤال</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.difficulty}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        حفظ
                      </Button>
                      <Button>
                        <Play className="h-4 w-4 ml-1" />
                        بدء الاختبار
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}

