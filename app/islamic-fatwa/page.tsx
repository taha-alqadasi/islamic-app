"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Search,
  Filter,
  BookOpen,
  MessageSquare,
  History,
  Heart,
  Share2,
  Copy,
  Check,
  Moon,
  Sun,
  Settings,
  Send,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  FileText,
  HelpCircle,
} from "lucide-react"

// بيانات الفتاوى (محاكاة)
const fatwasData = [
  {
    id: 1,
    question: "ما حكم صلاة الجماعة في المسجد؟",
    answer:
      "صلاة الجماعة في المسجد واجبة على الرجال القادرين، وهي من شعائر الإسلام الظاهرة. قال النبي صلى الله عليه وسلم: «صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة». وقد هم النبي صلى الله عليه وسلم بتحريق بيوت من يتخلفون عن صلاة الجماعة. وهي سنة مؤكدة للنساء والمسافرين والمرضى.",
    category: "صلاة",
    scholar: "الشيخ ابن باز",
    date: "2020-05-15",
    views: 12500,
    likes: 450,
    dislikes: 10,
    tags: ["صلاة", "جماعة", "مسجد"],
    isFavorite: false,
    source: "فتاوى اللجنة الدائمة",
    sourceUrl: "https://example.com/fatwa/1",
  },
  {
    id: 2,
    question: "ما حكم صيام الست من شوال؟",
    answer:
      "صيام ستة أيام من شوال بعد رمضان سنة مستحبة، وليست واجبة. قال النبي صلى الله عليه وسلم: «من صام رمضان ثم أتبعه ستاً من شوال كان كصيام الدهر». ويجوز صيامها متتابعة أو متفرقة في أي وقت من شهر شوال، والأفضل المبادرة بها بعد عيد الفطر مباشرة.",
    category: "صيام",
    scholar: "الشيخ ابن عثيمين",
    date: "2019-06-10",
    views: 18700,
    likes: 620,
    dislikes: 5,
    tags: ["صيام", "شوال", "تطوع"],
    isFavorite: true,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/2",
  },
  {
    id: 3,
    question: "ما حكم التعامل بالفوائد البنكية؟",
    answer:
      "الفوائد البنكية هي من الربا المحرم شرعاً، سواء كانت قليلة أو كثيرة. قال الله تعالى: {يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِنْ كُنْتُمْ مُؤْمِنِينَ}. وقد أجمع علماء الأمة على تحريم الربا بجميع أنواعه وصوره. ويجب على المسلم أن يتعامل مع البنوك الإسلامية التي تلتزم بأحكام الشريعة الإسلامية.",
    category: "معاملات",
    scholar: "الشيخ ابن باز",
    date: "2021-02-20",
    views: 25300,
    likes: 830,
    dislikes: 45,
    tags: ["ربا", "بنوك", "معاملات"],
    isFavorite: false,
    source: "فتاوى اللجنة الدائمة",
    sourceUrl: "https://example.com/fatwa/3",
  },
  {
    id: 4,
    question: "ما حكم لبس الذهب للنساء؟",
    answer:
      "يجوز للنساء لبس الذهب والفضة والتحلي بهما، سواء كان ذلك في اليدين أو الرجلين أو الرقبة أو الأذنين أو غير ذلك من أجزاء البدن. وقد ثبت عن النبي صلى الله عليه وسلم أنه قال: «أحل الذهب والحرير لإناث أمتي، وحرم على ذكورها». ويستثنى من ذلك ما كان فيه تشبه بالكفار أو إسراف أو خيلاء.",
    category: "لباس وزينة",
    scholar: "الشيخ ابن عثيمين",
    date: "2018-11-05",
    views: 19800,
    likes: 720,
    dislikes: 15,
    tags: ["ذهب", "زينة", "نساء"],
    isFavorite: true,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/4",
  },
  {
    id: 5,
    question: "ما حكم الاحتفال بالمولد النبوي؟",
    answer:
      "الاحتفال بالمولد النبوي بدعة محدثة لم يفعلها النبي صلى الله عليه وسلم ولا صحابته الكرام ولا التابعون لهم بإحسان في القرون المفضلة. وقد قال النبي صلى الله عليه وسلم: «من أحدث في أمرنا هذا ما ليس منه فهو رد». وخير الهدي هدي محمد صلى الله عليه وسلم، وشر الأمور محدثاتها، وكل بدعة ضلالة. ومحبة النبي صلى الله عليه وسلم تكون باتباع سنته والتمسك بهديه، لا بإحداث بدع لم يشرعها.",
    category: "عقيدة",
    scholar: "الشيخ ابن باز",
    date: "2020-10-18",
    views: 22100,
    likes: 780,
    dislikes: 120,
    tags: ["مولد", "بدعة", "احتفال"],
    isFavorite: false,
    source: "مجموع فتاوى ابن باز",
    sourceUrl: "https://example.com/fatwa/5",
  },
  {
    id: 6,
    question: "ما حكم التصوير الفوتوغرافي؟",
    answer:
      "اختلف العلماء المعاصرون في حكم التصوير الفوتوغرافي، فمنهم من يرى أنه داخل في عموم النهي عن التصوير، ومنهم من يرى أنه لا يدخل في النهي لأنه مجرد حبس للظل وليس فيه مضاهاة لخلق الله. والراجح جواز التصوير الفوتوغرافي للحاجة والمصلحة، كصور الهويات وجوازات السفر والصور التعليمية والطبية ونحوها. أما ما كان لغير حاجة أو كان فيه محذور شرعي كتصوير العورات أو ما يؤدي إلى الفتنة فهو محرم.",
    category: "آداب",
    scholar: "الشيخ ابن عثيمين",
    date: "2017-07-30",
    views: 15600,
    likes: 520,
    dislikes: 80,
    tags: ["تصوير", "فوتوغرافي", "آداب"],
    isFavorite: false,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/6",
  },
  {
    id: 7,
    question: "ما حكم الأضحية؟",
    answer:
      "الأضحية سنة مؤكدة في حق القادر عليها، وقيل واجبة. قال النبي صلى الله عليه وسلم: «من كان له سعة ولم يضح فلا يقربن مصلانا». وتجزئ الأضحية الواحدة عن الرجل وأهل بيته. ووقتها يبدأ بعد صلاة العيد يوم النحر ويستمر إلى غروب شمس اليوم الثالث من أيام التشريق. ويشترط في الأضحية أن تكون من بهيمة الأنعام (الإبل، البقر، الغنم) وأن تبلغ السن المعتبرة شرعاً وأن تكون سليمة من العيوب.",
    category: "عبادات",
    scholar: "الشيخ ابن باز",
    date: "2022-06-25",
    views: 14200,
    likes: 490,
    dislikes: 8,
    tags: ["أضحية", "عيد", "ذبح"],
    isFavorite: true,
    source: "فتاوى اللجنة الدائمة",
    sourceUrl: "https://example.com/fatwa/7",
  },
  {
    id: 8,
    question: "ما حكم الغيبة؟",
    answer:
      "الغيبة من كبائر الذنوب، وهي ذكرك أخاك بما يكره. قال الله تعالى: {وَلَا يَغْتَبْ بَعْضُكُمْ بَعْضًا أَيُحِبُّ أَحَدُكُمْ أَنْ يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ}. وقد شبه الله الغيبة بأكل لحم الميت للدلالة على شناعتها وقبحها. ويجب على المسلم أن يحفظ لسانه عن الغيبة والنميمة وسائر آفات اللسان. وتجوز الغيبة للمصلحة الشرعية في حالات محددة كالتحذير من أهل البدع والفسق والظلم.",
    category: "أخلاق",
    scholar: "الشيخ ابن عثيمين",
    date: "2019-03-12",
    views: 17300,
    likes: 610,
    dislikes: 5,
    tags: ["غيبة", "لسان", "أخلاق"],
    isFavorite: false,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/8",
  },
  {
    id: 9,
    question: "ما حكم التأمين الصحي؟",
    answer:
      "اختلف العلماء المعاصرون في حكم التأمين الصحي، فمنهم من يرى تحريمه لما فيه من الغرر والجهالة والربا، ومنهم من يرى جوازه للحاجة والمصلحة. والراجح أن التأمين الصحي التعاوني الذي تقوم به الدولة أو المؤسسات غير الربحية جائز، أما التأمين التجاري الذي تقوم به شركات التأمين التجارية فهو محرم لما فيه من المحاذير الشرعية. ويجوز للمضطر الاشتراك في التأمين الصحي إذا ألزمته به الدولة أو جهة العمل ولم يجد بديلاً مباحاً.",
    category: "معاملات",
    scholar: "الشيخ ابن باز",
    date: "2021-09-08",
    views: 20100,
    likes: 680,
    dislikes: 90,
    tags: ["تأمين", "صحة", "معاملات"],
    isFavorite: false,
    source: "فتاوى اللجنة الدائمة",
    sourceUrl: "https://example.com/fatwa/9",
  },
  {
    id: 10,
    question: "ما حكم الاستماع إلى الأغاني والموسيقى؟",
    answer:
      "الراجح من أقوال أهل العلم تحريم الأغاني والموسيقى، لما ورد من الأحاديث في ذلك، ولما تؤدي إليه من المفاسد والصد عن ذكر الله. قال النبي صلى الله عليه وسلم: «ليكونن من أمتي أقوام يستحلون الحر والحرير والخمر والمعازف». والمعازف هي آلات اللهو والطرب. ويستثنى من ذلك الدف في الأعراس والمناسبات للنساء خاصة، وكذلك الأناشيد الإسلامية التي ليس فيها موسيقى ولا تشبه الغناء المحرم.",
    category: "آداب",
    scholar: "الشيخ ابن باز",
    date: "2020-01-15",
    views: 28500,
    likes: 920,
    dislikes: 150,
    tags: ["أغاني", "موسيقى", "آداب"],
    isFavorite: true,
    source: "مجموع فتاوى ابن باز",
    sourceUrl: "https://example.com/fatwa/10",
  },
  {
    id: 11,
    question: "ما حكم التعامل مع البنوك الربوية في بلاد غير المسلمين؟",
    answer:
      "لا يجوز التعامل بالربا مع البنوك الربوية سواء في بلاد المسلمين أو في بلاد غير المسلمين، لأن الربا محرم في جميع الأحوال. قال الله تعالى: {وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا}. ويجب على المسلم أن يبحث عن البدائل الشرعية كالبنوك الإسلامية. وإذا لم يجد بديلاً واضطر للتعامل مع البنوك الربوية للضرورة كفتح حساب جارٍ بدون فوائد، فلا حرج عليه بشرط ألا يتعامل بالربا أخذاً أو عطاءً.",
    category: "معاملات",
    scholar: "الشيخ ابن عثيمين",
    date: "2018-05-20",
    views: 19700,
    likes: 650,
    dislikes: 30,
    tags: ["ربا", "بنوك", "معاملات", "غربة"],
    isFavorite: false,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/11",
  },
  {
    id: 12,
    question: "ما حكم صلاة المرأة في المسجد؟",
    answer:
      "يجوز للمرأة أن تصلي في المسجد، وقد كان النساء يصلين في مسجد النبي صلى الله عليه وسلم. لكن صلاتها في بيتها أفضل، لقول النبي صلى الله عليه وسلم: «لا تمنعوا إماء الله مساجد الله، وبيوتهن خير لهن». ويشترط لخروج المرأة إلى المسجد أن تخرج غير متبرجة ولا متطيبة، وأن يكون ذلك بإذن زوجها، وألا يترتب على خروجها فتنة أو محذور شرعي.",
    category: "صلاة",
    scholar: "الشيخ ابن باز",
    date: "2019-08-14",
    views: 16800,
    likes: 580,
    dislikes: 12,
    tags: ["صلاة", "مسجد", "نساء"],
    isFavorite: false,
    source: "فتاوى اللجنة الدائمة",
    sourceUrl: "https://example.com/fatwa/12",
  },
  {
    id: 13,
    question: "ما حكم التبرع بالأعضاء؟",
    answer:
      "اختلف العلماء المعاصرون في حكم التبرع بالأعضاء، والراجح جواز التبرع بالأعضاء بشروط: أن يكون المتبرع بالغاً عاقلاً مختاراً، وأن يكون التبرع بعضو لا تتوقف عليه الحياة كالكلية مع بقاء الأخرى، وأن يغلب على الظن نجاح العملية ونفعها للمتبرع له، وألا يكون في ذلك إهانة للمتبرع أو تشويه له، وألا يكون ذلك بمقابل مادي. أما التبرع بالأعضاء بعد الوفاة فيجوز بشرط أن يكون المتبرع قد أوصى بذلك قبل وفاته، وأن يكون في ذلك إنقاذ لحياة إنسان محترم.",
    category: "طب",
    scholar: "الشيخ ابن عثيمين",
    date: "2020-11-30",
    views: 14900,
    likes: 510,
    dislikes: 70,
    tags: ["تبرع", "أعضاء", "طب"],
    isFavorite: false,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/13",
  },
  {
    id: 14,
    question: "ما حكم الاحتفال بعيد الأم؟",
    answer:
      "الاحتفال بعيد الأم من الأعياد المحدثة التي لم تكن معروفة في عهد النبي صلى الله عليه وسلم ولا في عهد الصحابة والتابعين. والأعياد في الإسلام توقيفية، فلا يجوز إحداث أعياد جديدة. وبر الوالدين واجب في كل وقت وليس في يوم معين من السنة. ومع ذلك، فإن تقديم الهدايا للأم وإكرامها في هذا اليوم من غير اعتقاد أنه عيد شرعي ومن غير مشابهة للكفار في احتفالاتهم، فلا بأس به من باب البر والإحسان.",
    category: "عقيدة",
    scholar: "الشيخ ابن باز",
    date: "2017-03-21",
    views: 21300,
    likes: 730,
    dislikes: 110,
    tags: ["عيد", "أم", "احتفال"],
    isFavorite: false,
    source: "مجموع فتاوى ابن باز",
    sourceUrl: "https://example.com/fatwa/14",
  },
  {
    id: 15,
    question: "ما حكم التعامل بالبيتكوين والعملات الرقمية؟",
    answer:
      "اختلف العلماء المعاصرون في حكم التعامل بالبيتكوين والعملات الرقمية، والراجح عدم جواز التعامل بها لما فيها من الغرر والجهالة والمخاطرة الكبيرة، ولأنها غير مدعومة من جهة رسمية، ولما فيها من المضاربات المحرمة شرعاً. كما أنها قد تستخدم في تمويل الأنشطة غير المشروعة. ويجب على المسلم أن يتعامل بالعملات المعتمدة رسمياً وأن يبتعد عن المعاملات المشبوهة والمحرمة.",
    category: "معاملات",
    scholar: "الشيخ ابن عثيمين",
    date: "2022-01-10",
    views: 23500,
    likes: 800,
    dislikes: 130,
    tags: ["بيتكوين", "عملات", "رقمية"],
    isFavorite: true,
    source: "مجموع فتاوى ورسائل ابن عثيمين",
    sourceUrl: "https://example.com/fatwa/15",
  },
]

// تصنيفات الفتاوى
const categories = [
  { id: "all", name: "الكل" },
  { id: "salah", name: "صلاة" },
  { id: "fasting", name: "صيام" },
  { id: "transactions", name: "معاملات" },
  { id: "aqeedah", name: "عقيدة" },
  { id: "adab", name: "آداب" },
  { id: "worship", name: "عبادات" },
  { id: "ethics", name: "أخلاق" },
  { id: "medicine", name: "طب" },
  { id: "clothing", name: "لباس وزينة" },
]

// العلماء
const scholars = [
  { id: "all", name: "الكل" },
  { id: "ibn-baz", name: "الشيخ ابن باز" },
  { id: "ibn-uthaymeen", name: "الشيخ ابن عثيمين" },
  { id: "permanent-committee", name: "اللجنة الدائمة" },
  { id: "al-albani", name: "الشيخ الألباني" },
  { id: "al-fawzan", name: "الشيخ الفوزان" },
]

// خيارات الترتيب
const sortOptions = [
  { id: "newest", name: "الأحدث" },
  { id: "oldest", name: "الأقدم" },
  { id: "most-viewed", name: "الأكثر مشاهدة" },
  { id: "most-liked", name: "الأكثر إعجاباً" },
]

export default function IslamicFatwaPage() {
  // حالة التطبيق
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("browse")
  const [fatwas, setFatwas] = useState(fatwasData)
  const [filteredFatwas, setFilteredFatwas] = useState(fatwasData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedScholar, setSelectedScholar] = useState("all")
  const [selectedSort, setSelectedSort] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFatwa, setSelectedFatwa] = useState<any>(null)
  const [showFatwaDetails, setShowFatwaDetails] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)

  // إعدادات
  const [showSources, setShowSources] = useState(true)
  const [showDates, setShowDates] = useState(true)
  const [showStats, setShowStats] = useState(true)

  // نموذج السؤال الجديد
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "صلاة",
    name: "",
    email: "",
    agreeToTerms: false,
  })

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("fatwa_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setDarkMode(settings.darkMode ?? false)
          setShowSources(settings.showSources ?? true)
          setShowDates(settings.showDates ?? true)
          setShowStats(settings.showStats ?? true)
        }

        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("fatwa_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل الفتاوى المعروضة مؤخراً
        const savedRecentlyViewed = localStorage.getItem("fatwa_recently_viewed")
        if (savedRecentlyViewed) {
          setRecentlyViewed(JSON.parse(savedRecentlyViewed))
        }

        // تحديث حالة المفضلة في الفتاوى
        const updatedFatwas = fatwasData.map((fatwa) => ({
          ...fatwa,
          isFavorite: savedFavorites ? JSON.parse(savedFavorites).includes(fatwa.id) : fatwa.isFavorite,
        }))
        setFatwas(updatedFatwas)
        setFilteredFatwas(updatedFatwas)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
  }, [])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem(
      "fatwa_settings",
      JSON.stringify({
        darkMode,
        showSources,
        showDates,
        showStats,
      }),
    )
  }, [darkMode, showSources, showDates, showStats])

  useEffect(() => {
    localStorage.setItem("fatwa_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("fatwa_recently_viewed", JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    let result = [...fatwas]

    // تطبيق البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (fatwa) =>
          fatwa.question.toLowerCase().includes(query) ||
          fatwa.answer.toLowerCase().includes(query) ||
          fatwa.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // تطبيق التصنيف
    if (selectedCategory !== "all") {
      const categoryMap: { [key: string]: string } = {
        salah: "صلاة",
        fasting: "صيام",
        transactions: "معاملات",
        aqeedah: "عقيدة",
        adab: "آداب",
        worship: "عبادات",
        ethics: "أخلاق",
        medicine: "طب",
        clothing: "لباس وزينة",
      }
      result = result.filter((fatwa) => fatwa.category === categoryMap[selectedCategory])
    }

    // تطبيق فلتر العالم
    if (selectedScholar !== "all") {
      const scholarMap: { [key: string]: string } = {
        "ibn-baz": "الشيخ ابن باز",
        "ibn-uthaymeen": "الشيخ ابن عثيمين",
        "permanent-committee": "اللجنة الدائمة",
        "al-albani": "الشيخ الألباني",
        "al-fawzan": "الشيخ الفوزان",
      }
      result = result.filter((fatwa) => fatwa.scholar === scholarMap[selectedScholar])
    }

    // تطبيق الترتيب
    switch (selectedSort) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "most-viewed":
        result.sort((a, b) => b.views - a.views)
        break
      case "most-liked":
        result.sort((a, b) => b.likes - a.likes)
        break
      default:
        break
    }

    setFilteredFatwas(result)
  }, [fatwas, searchQuery, selectedCategory, selectedScholar, selectedSort])

  // عرض تفاصيل الفتوى
  const viewFatwaDetails = (fatwa: any) => {
    setSelectedFatwa(fatwa)
    setShowFatwaDetails(true)

    // إضافة الفتوى إلى قائمة المعروضة مؤخراً
    const updatedRecentlyViewed = [fatwa, ...recentlyViewed.filter((item) => item.id !== fatwa.id).slice(0, 9)]
    setRecentlyViewed(updatedRecentlyViewed)
  }

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (fatwaId: number) => {
    if (favorites.includes(fatwaId)) {
      setFavorites(favorites.filter((id) => id !== fatwaId))
    } else {
      setFavorites([...favorites, fatwaId])
    }

    // تحديث حالة المفضلة في الفتاوى
    const updatedFatwas = fatwas.map((fatwa) =>
      fatwa.id === fatwaId ? { ...fatwa, isFavorite: !fatwa.isFavorite } : fatwa,
    )
    setFatwas(updatedFatwas)
  }

  // نسخ الفتوى
  const copyFatwa = (fatwa: any) => {
    const textToCopy = `السؤال: ${fatwa.question}

الإجابة: ${fatwa.answer}

المصدر: ${fatwa.source} - ${fatwa.scholar}`

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(fatwa.id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  // مشاركة الفتوى
  const shareFatwa = (fatwa: any) => {
    if (navigator.share) {
      navigator
        .share({
          title: fatwa.question,
          text: `السؤال: ${fatwa.question}\n\nالإجابة: ${fatwa.answer}\n\nالمصدر: ${fatwa.source} - ${fatwa.scholar}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      copyFatwa(fatwa)
      alert("تم نسخ الفتوى إلى الحافظة")
    }
  }

  // إرسال سؤال جديد
  const submitQuestion = () => {
    if (!newQuestion.question.trim()) {
      alert("يرجى كتابة السؤال")
      return
    }

    if (!newQuestion.agreeToTerms) {
      alert("يرجى الموافقة على الشروط والأحكام")
      return
    }

    // في التطبيق الحقيقي، سيتم إرسال السؤال إلى الخادم
    alert("تم إرسال سؤالك بنجاح. سيتم الرد عليك في أقرب وقت ممكن.")
    setNewQuestion({
      question: "",
      category: "صلاة",
      name: "",
      email: "",
      agreeToTerms: false,
    })
    setShowAskQuestion(false)
  }

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">الفتاوى الإسلامية</h1>
          <div className="flex gap-2">
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="browse" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>تصفح</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>المفضلة</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span>السجل</span>
            </TabsTrigger>
            <TabsTrigger value="ask" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>اسأل</span>
            </TabsTrigger>
          </TabsList>

          {/* قسم التصفح */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن فتوى..."
                    className={`pl-10 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`w-[150px] ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedScholar} onValueChange={setSelectedScholar}>
                  <SelectTrigger className={`w-[150px] ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="العالم" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {scholars.map((scholar) => (
                      <SelectItem key={scholar.id} value={scholar.id}>
                        {scholar.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className={`w-[150px] ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <SelectValue placeholder="الترتيب" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`${showFilters ? "bg-primary/10" : ""} ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* عرض نتائج البحث */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">النتائج ({filteredFatwas.length})</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedScholar("all")
                      setSelectedSort("newest")
                    }}
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </div>
              </div>

              {filteredFatwas.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <h3 className="mt-4 text-lg font-medium">لا توجد نتائج</h3>
                  <p className="text-muted-foreground">
                    لم يتم العثور على فتاوى تطابق معايير البحث. جرب تغيير الفلاتر أو البحث عن شيء آخر.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFatwas.map((fatwa) => (
                    <Card
                      key={fatwa.id}
                      className={`transition-all hover:shadow-md ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{fatwa.question}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(fatwa.id)
                            }}
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(fatwa.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                        <CardDescription className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {fatwa.category}
                          </Badge>
                          {showSources && (
                            <Badge variant="outline" className="text-xs">
                              {fatwa.scholar}
                            </Badge>
                          )}
                          {showDates && (
                            <Badge variant="outline" className="text-xs">
                              {formatDate(fatwa.date)}
                            </Badge>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{fatwa.answer}</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {fatwa.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        {showStats && (
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{fatwa.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsDown className="h-3 w-3" />
                              <span>{fatwa.dislikes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              <span>{fatwa.views}</span>
                            </div>
                          </div>
                        )}
                        <Button variant="default" size="sm" onClick={() => viewFatwaDetails(fatwa)}>
                          عرض التفاصيل
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* قسم المفضلة */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>الفتاوى المفضلة</CardTitle>
                <CardDescription>الفتاوى التي قمت بإضافتها إلى المفضلة</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">لا توجد فتاوى مفضلة</h3>
                    <p className="text-muted-foreground">
                      لم تقم بإضافة أي فتاوى إلى المفضلة بعد. يمكنك إضافة الفتاوى إلى المفضلة بالنقر على أيقونة القلب.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fatwas
                      .filter((fatwa) => favorites.includes(fatwa.id))
                      .map((fatwa) => (
                        <Card
                          key={fatwa.id}
                          className={`transition-all hover:shadow-md ${
                            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                          }`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">{fatwa.question}</CardTitle>
                              <Button variant="ghost" size="icon" onClick={() => toggleFavorite(fatwa.id)}>
                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                              </Button>
                            </div>
                            <CardDescription className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {fatwa.category}
                              </Badge>
                              {showSources && (
                                <Badge variant="outline" className="text-xs">
                                  {fatwa.scholar}
                                </Badge>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{fatwa.answer}</p>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button variant="default" size="sm" onClick={() => viewFatwaDetails(fatwa)}>
                              عرض التفاصيل
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم السجل */}
          <TabsContent value="history" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>الفتاوى المعروضة مؤخراً</CardTitle>
                <CardDescription>الفتاوى التي قمت بعرضها مؤخراً</CardDescription>
              </CardHeader>
              <CardContent>
                {recentlyViewed.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">لا يوجد سجل</h3>
                    <p className="text-muted-foreground">لم تقم بعرض أي فتاوى بعد. ستظهر الفتاوى التي تعرضها هنا.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentlyViewed.map((fatwa) => (
                      <Card
                        key={fatwa.id}
                        className={`transition-all hover:shadow-md ${
                          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{fatwa.question}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(fatwa.id)}>
                              <Heart
                                className={`h-4 w-4 ${favorites.includes(fatwa.id) ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </Button>
                          </div>
                          <CardDescription className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {fatwa.category}
                            </Badge>
                            {showSources && (
                              <Badge variant="outline" className="text-xs">
                                {fatwa.scholar}
                              </Badge>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{fatwa.answer}</p>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="default" size="sm" onClick={() => viewFatwaDetails(fatwa)}>
                            عرض التفاصيل
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* قسم اسأل */}
          <TabsContent value="ask" className="space-y-6">
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle>اسأل عن فتوى</CardTitle>
                <CardDescription>يمكنك طرح سؤالك الشرعي وسيتم الرد عليه من قبل العلماء المختصين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-600 dark:text-yellow-400">ملاحظات مهمة</h3>
                      <ul className="list-disc list-inside text-sm mt-2 text-yellow-600/90 dark:text-yellow-400/90 space-y-1">
                        <li>يرجى البحث في الفتاوى الموجودة قبل طرح سؤالك، فقد تجد إجابة لسؤالك.</li>
                        <li>يرجى صياغة السؤال بوضوح وإيجاز، وتجنب الإطالة غير المفيدة.</li>
                        <li>قد يستغرق الرد على سؤالك بعض الوقت حسب عدد الأسئلة الواردة.</li>
                        <li>سيتم إرسال الإجابة إلى بريدك الإلكتروني، كما ستظهر في قسم "أسئلتي".</li>
                      </ul>
                    </div>
                  </div>

                  <Button variant="default" className="w-full" onClick={() => setShowAskQuestion(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    اطرح سؤالك الآن
                  </Button>

                  <Separator className={darkMode ? "bg-gray-700" : ""} />

                  <div>
                    <h3 className="text-lg font-medium mb-4">أسئلة شائعة</h3>
                    <div className="space-y-4">
                      {fatwas.slice(0, 5).map((fatwa) => (
                        <div
                          key={fatwa.id}
                          className={`p-4 rounded-md cursor-pointer transition-colors ${
                            darkMode ? "hover:bg-gray-700 bg-gray-800" : "hover:bg-gray-100 bg-gray-50"
                          }`}
                          onClick={() => viewFatwaDetails(fatwa)}
                        >
                          <div className="flex gap-3">
                            <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{fatwa.question}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {fatwa.category} • {fatwa.scholar}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نافذة تفاصيل الفتوى */}
        <Dialog open={showFatwaDetails} onOpenChange={setShowFatwaDetails}>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            {selectedFatwa && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedFatwa.question}</DialogTitle>
                  <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{selectedFatwa.category}</Badge>
                      <Badge variant="outline">{selectedFatwa.scholar}</Badge>
                      {showDates && <Badge variant="outline">{formatDate(selectedFatwa.date)}</Badge>}
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <div className="space-y-4">
                    <div className={`p-4 rounded-md ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                      <h3 className="text-lg font-medium mb-2">الإجابة</h3>
                      <p className="whitespace-pre-line">{selectedFatwa.answer}</p>
                    </div>

                    {showSources && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">المصدر</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={selectedFatwa.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {selectedFatwa.source}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">الوسوم</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedFatwa.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {showStats && (
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{selectedFatwa.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{selectedFatwa.dislikes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{selectedFatwa.views} مشاهدة</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleFavorite(selectedFatwa.id)}
                      className={favorites.includes(selectedFatwa.id) ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          favorites.includes(selectedFatwa.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {favorites.includes(selectedFatwa.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => shareFatwa(selectedFatwa)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" onClick={() => copyFatwa(selectedFatwa)}>
                      {copied === selectedFatwa.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          تم النسخ
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          نسخ
                        </>
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* نافذة الإعدادات */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className={darkMode ? "bg-gray-900 text-gray-100" : ""}>
            <DialogHeader>
              <DialogTitle>إعدادات الفتاوى</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                قم بتخصيص تجربة الفتاوى الإسلامية
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">المظهر</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">الوضع الليلي</Label>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>

              <Separator className={darkMode ? "bg-gray-700" : ""} />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات العرض</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showSources">عرض المصادر</Label>
                  <Switch id="showSources" checked={showSources} onCheckedChange={setShowSources} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showDates">عرض التواريخ</Label>
                  <Switch id="showDates" checked={showDates} onCheckedChange={setShowDates} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showStats">عرض الإحصائيات</Label>
                  <Switch id="showStats" checked={showStats} onCheckedChange={setShowStats} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSettings(false)}>حفظ الإعدادات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* نافذة طرح سؤال */}
        <Dialog open={showAskQuestion} onOpenChange={setShowAskQuestion}>
          <DialogContent className={`max-w-2xl ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
            <DialogHeader>
              <DialogTitle>اطرح سؤالك</DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                يرجى كتابة سؤالك بوضوح وإيجاز ليتم الرد عليه من قبل العلماء المختصين
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question">السؤال</Label>
                <Textarea
                  id="question"
                  placeholder="اكتب سؤالك هنا..."
                  rows={5}
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Select
                  value={newQuestion.category}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                >
                  <SelectTrigger className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <SelectValue placeholder="اختر تصنيف السؤال" />
                  </SelectTrigger>
                  <SelectContent className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    {categories
                      .filter((category) => category.id !== "all")
                      .map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم (اختياري)</Label>
                  <Input
                    id="name"
                    placeholder="الاسم"
                    value={newQuestion.name}
                    onChange={(e) => setNewQuestion({ ...newQuestion, name: e.target.value })}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={newQuestion.email}
                    onChange={(e) => setNewQuestion({ ...newQuestion, email: e.target.value })}
                    className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={newQuestion.agreeToTerms}
                  onCheckedChange={(checked) => setNewQuestion({ ...newQuestion, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm">
                  أوافق على الشروط والأحكام وسياسة الخصوصية
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAskQuestion(false)}>
                إلغاء
              </Button>
              <Button onClick={submitQuestion}>
                <Send className="h-4 w-4 mr-2" />
                إرسال السؤال
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

