"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Sun,
  Moon,
  Share2,
  Heart,
  Check,
  Bell,
  BellOff,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Star,
  Filter,
  Trash2,
  Printer,
  Download,
  Sparkles,
  Volume2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTheme } from "@/lib/theme-context"

// بيانات الأذكار
const morningAdhkar = [
  {
    id: 1,
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.",
    source: "رواه مسلم",
    count: 1,
    fadl: "من قالها حين يصبح أدى شكر يومه",
    category: "أذكار الصباح",
    audio: "/audio/morning_1.mp3",
  },
  {
    id: 2,
    text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.",
    source: "رواه الترمذي",
    count: 1,
    fadl: "من قالها موقناً بها حين يصبح ثم مات من يومه دخل الجنة",
    category: "أذكار الصباح",
    audio: "/audio/morning_2.mp3",
  },
  {
    id: 3,
    text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",
    source: "رواه البخاري",
    count: 1,
    fadl: "من قالها موقناً بها حين يصبح فمات من يومه قبل أن يمسي فهو من أهل الجنة",
    category: "أذكار الصباح",
    audio: "/audio/morning_3.mp3",
  },
  {
    id: 4,
    text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ.",
    source: "رواه أبو داود",
    count: 4,
    fadl: "من قالها أربع مرات حين يصبح أعتقه الله من النار",
    category: "أذكار الصباح",
    audio: "/audio/morning_4.mp3",
  },
  {
    id: 5,
    text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.",
    source: "رواه أبو داود",
    count: 1,
    fadl: "من قالها حين يصبح فقد أدى شكر يومه",
    category: "أذكار الصباح",
    audio: "/audio/morning_5.mp3",
  },
  {
    id: 6,
    text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ.",
    source: "رواه أبو داود",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يصبح وحين يمسي كان حقاً على الله أن يرضيه يوم القيامة",
    category: "أذكار الصباح",
    audio: "/audio/morning_6.mp3",
  },
  {
    id: 7,
    text: "حَسْبِيَ اللهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
    source: "رواه أبو داود",
    count: 7,
    fadl: "من قالها حين يصبح وحين يمسي سبع مرات كفاه الله ما أهمه من أمر الدنيا والآخرة",
    category: "أذكار الصباح",
    audio: "/audio/morning_7.mp3",
  },
  {
    id: 8,
    text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
    source: "رواه أبو داود والترمذي",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يصبح وحين يمسي لم يضره شيء",
    category: "أذكار الصباح",
    audio: "/audio/morning_8.mp3",
  },
  {
    id: 9,
    text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.",
    source: "رواه أحمد والترمذي والنسائي وأبو داود",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يصبح وثلاث مرات حين يمسي كان حقاً على الله أن يرضيه يوم القيامة",
    category: "أذكار الصباح",
    audio: "/audio/morning_9.mp3",
  },
  {
    id: 10,
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.",
    source: "رواه أبو داود وابن ماجه",
    count: 1,
    fadl: "من قالها حين يصبح وحين يمسي كفاه الله ما أهمه",
    category: "أذكار الصباح",
    audio: "/audio/morning_10.mp3",
  },
]

const eveningAdhkar = [
  {
    id: 1,
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.",
    source: "رواه مسلم",
    count: 1,
    fadl: "من قالها حين يمسي أدى شكر ليلته",
    category: "أذكار المساء",
    audio: "/audio/evening_1.mp3",
  },
  {
    id: 2,
    text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.",
    source: "رواه الترمذي",
    count: 1,
    fadl: "من قالها موقناً بها حين يمسي ثم مات من ليلته دخل الجنة",
    category: "أذكار المساء",
    audio: "/audio/evening_2.mp3",
  },
  {
    id: 3,
    text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.",
    source: "رواه البخاري",
    count: 1,
    fadl: "من قالها موقناً بها حين يمسي فمات من ليلته قبل أن يصبح فهو من أهل الجنة",
    category: "أذكار المساء",
    audio: "/audio/evening_3.mp3",
  },
  {
    id: 4,
    text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ.",
    source: "رواه أبو داود",
    count: 4,
    fadl: "من قالها أربع مرات حين يمسي أعتقه الله من النار",
    category: "أذكار المساء",
    audio: "/audio/evening_4.mp3",
  },
  {
    id: 5,
    text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.",
    source: "رواه أبو داود",
    count: 1,
    fadl: "من قالها حين يمسي فقد أدى شكر ليلته",
    category: "أذكار المساء",
    audio: "/audio/evening_5.mp3",
  },
  {
    id: 6,
    text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ.",
    source: "رواه أبو داود",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يمسي وحين يصبح كان حقاً على الله أن يرضيه يوم القيامة",
    category: "أذكار المساء",
    audio: "/audio/evening_6.mp3",
  },
  {
    id: 7,
    text: "حَسْبِيَ اللهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.",
    source: "رواه أبو داود",
    count: 7,
    fadl: "من قالها حين يمسي وحين يصبح سبع مرات كفاه الله ما أهمه من أمر الدنيا والآخرة",
    category: "أذكار المساء",
    audio: "/audio/evening_7.mp3",
  },
  {
    id: 8,
    text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
    source: "رواه أبو داود والترمذي",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يمسي وحين يصبح لم يضره شيء",
    category: "أذكار المساء",
    audio: "/audio/evening_8.mp3",
  },
  {
    id: 9,
    text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.",
    source: "رواه أحمد والترمذي والنسائي وأبو داود",
    count: 3,
    fadl: "من قالها ثلاث مرات حين يمسي وثلاث مرات حين يصبح كان حقاً على الله أن يرضيه يوم القيامة",
    category: "أذكار المساء",
    audio: "/audio/evening_9.mp3",
  },
  {
    id: 10,
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.",
    source: "رواه أبو داود وابن ماجه",
    count: 1,
    fadl: "من قالها حين يمسي وحين يصبح كفاه الله ما أهمه",
    category: "أذكار المساء",
    audio: "/audio/evening_10.mp3",
  },
]

const otherAdhkar = [
  {
    id: 1,
    text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ.",
    source: "رواه البخاري ومسلم",
    count: 100,
    fadl: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن",
    category: "أذكار عامة",
    audio: "/audio/other_1.mp3",
  },
  {
    id: 2,
    text: "لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
    source: "رواه البخاري ومسلم",
    count: 100,
    fadl: "من قالها في يوم مائة مرة كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة، وكانت له حرزاً من الشيطان يومه ذلك حتى يمسي",
    category: "أذكار عامة",
    audio: "/audio/other_2.mp3",
  },
  {
    id: 3,
    text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ.",
    source: "رواه البخاري ومسلم",
    count: 100,
    fadl: "من قالها في اليوم مائة مرة غفرت ذنوبه وإن كانت مثل زبد البحر",
    category: "أذكار عامة",
    audio: "/audio/other_3.mp3",
  },
  {
    id: 4,
    text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.",
    source: "رواه البخاري ومسلم",
    count: 10,
    fadl: "من صلى علي صلاة صلى الله عليه بها عشراً",
    category: "أذكار عامة",
    audio: "/audio/other_4.mp3",
  },
  {
    id: 5,
    text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ.",
    source: "رواه البخاري ومسلم",
    count: 100,
    fadl: "كنز من كنوز الجنة",
    category: "أذكار عامة",
    audio: "/audio/other_5.mp3",
  },
  {
    id: 6,
    text: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ.",
    source: "رواه مسلم",
    count: 100,
    fadl: "أحب الكلام إلى الله أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر",
    category: "أذكار عامة",
    audio: "/audio/other_6.mp3",
  },
  {
    id: 7,
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.",
    source: "رواه ابن ماجه",
    count: 1,
    fadl: "دعاء يقال بعد السلام من صلاة الفجر",
    category: "أذكار عامة",
    audio: "/audio/other_7.mp3",
  },
  {
    id: 8,
    text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.",
    source: "رواه أبو داود والنسائي",
    count: 1,
    fadl: "دعاء يقال دبر كل صلاة",
    category: "أذكار عامة",
    audio: "/audio/other_8.mp3",
  },
  {
    id: 9,
    text: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ.",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "دعاء يقال في الصلاة",
    category: "أذكار عامة",
    audio: "/audio/other_9.mp3",
  },
  {
    id: 10,
    text: "اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي.",
    source: "رواه مسلم",
    count: 1,
    fadl: "دعاء جامع للخير",
    category: "أذكار عامة",
    audio: "/audio/other_10.mp3",
  },
]

const sleepAdhkar = [
  {
    id: 1,
    text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.",
    source: "رواه البخاري",
    count: 1,
    fadl: "من قالها عند النوم كان كمن أحيا الليل",
    category: "أذكار النوم",
    audio: "/audio/sleep_1.mp3",
  },
  {
    id: 2,
    text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.",
    source: "رواه أبو داود",
    count: 3,
    fadl: "كان النبي صلى الله عليه وسلم يقولها عند النوم",
    category: "أذكار النوم",
    audio: "/audio/sleep_2.mp3",
  },
  {
    id: 3,
    text: "سُبْحَانَ اللهِ (33 مرة)، وَالْحَمْدُ لِلَّهِ (33 مرة)، وَاللهُ أَكْبَرُ (34 مرة).",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "خير لكما من خادم، تسبحان وتحمدان وتكبران إذا أخذتما مضاجعكما ثلاثاً وثلاثين، فهو خير لكما من خادم",
    category: "أذكار النوم",
    audio: "/audio/sleep_3.mp3",
  },
  {
    id: 4,
    text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ.",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "من قالها ثم مات من ليلته مات على الفطرة",
    category: "أذكار النوم",
    audio: "/audio/sleep_4.mp3",
  },
  {
    id: 5,
    text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ.",
    source: "رواه مسلم",
    count: 1,
    fadl: "كان النبي صلى الله عليه وسلم يقولها عند النوم",
    category: "أذكار النوم",
    audio: "/audio/sleep_5.mp3",
  },
]

const wakeupAdhkar = [
  {
    id: 1,
    text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ.",
    source: "رواه البخاري",
    count: 1,
    fadl: "كان النبي صلى الله عليه وسلم يقولها عند الاستيقاظ من النوم",
    category: "أذكار الاستيقاظ",
    audio: "/audio/wakeup_1.mp3",
  },
  {
    id: 2,
    text: "لَا إِلَٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي.",
    source: "رواه البخاري",
    count: 1,
    fadl: "من قالها غفر له، فإن دعا استجيب له، فإن توضأ وصلى قبلت صلاته",
    category: "أذكار الاستيقاظ",
    audio: "/audio/wakeup_2.mp3",
  },
  {
    id: 3,
    text: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ.",
    source: "رواه الترمذي",
    count: 1,
    fadl: "كان النبي صلى الله عليه وسلم يقولها عند الاستيقاظ من النوم",
    category: "أذكار الاستيقاظ",
    audio: "/audio/wakeup_3.mp3",
  },
]

const prayerAdhkar = [
  {
    id: 1,
    text: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ.",
    source: "رواه أبو داود والترمذي",
    count: 1,
    fadl: "دعاء الاستفتاح في الصلاة",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_1.mp3",
  },
  {
    id: 2,
    text: "سُبْحَانَ رَبِّيَ الْعَظِيمِ.",
    source: "رواه أبو داود والترمذي",
    count: 3,
    fadl: "تقال في الركوع",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_2.mp3",
  },
  {
    id: 3,
    text: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ.",
    source: "رواه البخاري",
    count: 1,
    fadl: "تقال عند الرفع من الركوع",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_3.mp3",
  },
  {
    id: 4,
    text: "سُبْحَانَ رَبِّيَ الْأَعْلَى.",
    source: "رواه أبو داود والترمذي",
    count: 3,
    fadl: "تقال في السجود",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_4.mp3",
  },
  {
    id: 5,
    text: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي.",
    source: "رواه أبو داود وابن ماجه",
    count: 1,
    fadl: "تقال بين السجدتين",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_5.mp3",
  },
  {
    id: 6,
    text: "التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ، وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "التشهد في الصلاة",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_6.mp3",
  },
  {
    id: 7,
    text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "الصلاة على النبي في التشهد",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_7.mp3",
  },
  {
    id: 8,
    text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.",
    source: "رواه البخاري ومسلم",
    count: 1,
    fadl: "دعاء بعد التشهد الأخير قبل السلام",
    category: "أذكار الصلاة",
    audio: "/audio/prayer_8.mp3",
  },
]

// تجميع كل الأذكار
const allAdhkar = [...morningAdhkar, ...eveningAdhkar, ...otherAdhkar, ...sleepAdhkar, ...wakeupAdhkar, ...prayerAdhkar]

// تصنيفات الأذكار
const adhkarCategories = [
  { id: "morning", name: "أذكار الصباح", icon: <Sun className="h-5 w-5" /> },
  { id: "evening", name: "أذكار المساء", icon: <Moon className="h-5 w-5" /> },
  { id: "general", name: "أذكار عامة", icon: <Heart className="h-5 w-5" /> },
  { id: "sleep", name: "أذكار النوم", icon: <Moon className="h-5 w-5" /> },
  { id: "wakeup", name: "أذكار الاستيقاظ", icon: <Sun className="h-5 w-5" /> },
  { id: "prayer", name: "أذكار الصلاة", icon: <Sparkles className="h-5 w-5" /> },
]

export default function AdhkarPage() {
  // استخدام سياق الثيم
  const { theme } = useTheme()

  // حالة التطبيق
  const [activeTab, setActiveTab] = useState("morning")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [completedAdhkar, setCompletedAdhkar] = useState<{ [key: number]: number }>({})
  const [showFadl, setShowFadl] = useState(true)
  const [showSource, setShowSource] = useState(true)
  const [fontSize, setFontSize] = useState(20)
  const [darkMode, setDarkMode] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [morningReminderTime, setMorningReminderTime] = useState("05:00")
  const [eveningReminderTime, setEveningReminderTime] = useState("17:00")
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [showCounter, setShowCounter] = useState(true)
  const [autoPlayAudio, setAutoPlayAudio] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null)
  const [customAdhkar, setCustomAdhkar] = useState<any[]>([])
  const [newCustomDhikr, setNewCustomDhikr] = useState({
    text: "",
    count: 1,
    category: "أذكار عامة",
  })
  const [showAddCustomDhikr, setShowAddCustomDhikr] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [adhkarProgress, setAdhkarProgress] = useState<{ [key: string]: number }>({
    morning: 0,
    evening: 0,
    general: 0,
    sleep: 0,
    wakeup: 0,
    prayer: 0,
  })
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [completedCategory, setCompletedCategory] = useState("")
  const [showAudioPermissionDialog, setShowAudioPermissionDialog] = useState(false)

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const loadSavedData = () => {
      try {
        // تحميل المفضلة
        const savedFavorites = localStorage.getItem("adhkar_favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }

        // تحميل الأذكار المكتملة
        const savedCompleted = localStorage.getItem("adhkar_completed")
        if (savedCompleted) {
          setCompletedAdhkar(JSON.parse(savedCompleted))
        }

        // تحميل الإعدادات
        const savedSettings = localStorage.getItem("adhkar_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setShowFadl(settings.showFadl ?? true)
          setShowSource(settings.showSource ?? true)
          setFontSize(settings.fontSize ?? 20)
          setDarkMode(settings.darkMode ?? false)
          setReminderEnabled(settings.reminderEnabled ?? false)
          setMorningReminderTime(settings.morningReminderTime ?? "05:00")
          setEveningReminderTime(settings.eveningReminderTime ?? "17:00")
          setVibrationEnabled(settings.vibrationEnabled ?? true)
          setShowCounter(settings.showCounter ?? true)
          setAutoPlayAudio(settings.autoPlayAudio ?? false)
        }

        // تحميل الأذكار المخصصة
        const savedCustomAdhkar = localStorage.getItem("adhkar_custom")
        if (savedCustomAdhkar) {
          setCustomAdhkar(JSON.parse(savedCustomAdhkar))
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }

    loadSavedData()
    calculateProgress()

    // تطبيق الوضع الداكن من الثيم العام
    const isDarkMode = theme.mode === "dark" || (theme.mode === "system" && theme.systemTheme === "dark")
    setDarkMode(isDarkMode)
  }, [theme])

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    localStorage.setItem("adhkar_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("adhkar_completed", JSON.stringify(completedAdhkar))
    calculateProgress()
  }, [completedAdhkar])

  useEffect(() => {
    localStorage.setItem(
      "adhkar_settings",
      JSON.stringify({
        showFadl,
        showSource,
        fontSize,
        darkMode,
        reminderEnabled,
        morningReminderTime,
        eveningReminderTime,
        vibrationEnabled,
        showCounter,
        autoPlayAudio,
      }),
    )
  }, [
    showFadl,
    showSource,
    fontSize,
    darkMode,
    reminderEnabled,
    morningReminderTime,
    eveningReminderTime,
    vibrationEnabled,
    showCounter,
    autoPlayAudio,
  ])

  useEffect(() => {
    localStorage.setItem("adhkar_custom", JSON.stringify(customAdhkar))
  }, [customAdhkar])

  // إيقاف الصوت عند تغيير الصفحة
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        setCurrentAudio(null)
        setIsPlaying(false)
        setCurrentPlayingId(null)
      }
    }
  }, [])

  // حساب نسبة الإنجاز
  const calculateProgress = () => {
    const progress: { [key: string]: number } = {
      morning: 0,
      evening: 0,
      general: 0,
      sleep: 0,
      wakeup: 0,
      prayer: 0,
    }

    // حساب نسبة الإنجاز لكل فئة
    const calculateCategoryProgress = (adhkar: any[], categoryKey: string) => {
      if (adhkar.length === 0) return 0

      let completed = 0
      let total = 0

      adhkar.forEach((dhikr) => {
        const completedCount = completedAdhkar[dhikr.id] || 0
        const requiredCount = dhikr.count || 1

        total += requiredCount
        completed += Math.min(completedCount, requiredCount)
      })

      return Math.round((completed / total) * 100)
    }

    progress.morning = calculateCategoryProgress(morningAdhkar, "morning")
    progress.evening = calculateCategoryProgress(eveningAdhkar, "evening")
    progress.general = calculateCategoryProgress(otherAdhkar, "general")
    progress.sleep = calculateCategoryProgress(sleepAdhkar, "sleep")
    progress.wakeup = calculateCategoryProgress(wakeupAdhkar, "wakeup")
    progress.prayer = calculateCategoryProgress(prayerAdhkar, "prayer")

    setAdhkarProgress(progress)

    // التحقق من اكتمال فئة
    const categoryMap = {
      morning: "أذكار الصباح",
      evening: "أذكار المساء",
      general: "أذكار عامة",
      sleep: "أذكار النوم",
      wakeup: "أذكار الاستيقاظ",
      prayer: "أذكار الصلاة",
    }

    Object.entries(progress).forEach(([key, value]) => {
      if (value === 100) {
        const categoryName = categoryMap[key as keyof typeof categoryMap]
        if (categoryName && key === activeTab) {
          setCompletedCategory(categoryName)
          setShowCompletionDialog(true)
        }
      }
    })
  }

  // الحصول على الأذكار حسب التصنيف النشط
  const getActiveAdhkar = () => {
    switch (activeTab) {
      case "morning":
        return morningAdhkar
      case "evening":
        return eveningAdhkar
      case "general":
        return otherAdhkar
      case "sleep":
        return sleepAdhkar
      case "wakeup":
        return wakeupAdhkar
      case "prayer":
        return prayerAdhkar
      case "favorites":
        return allAdhkar.filter((dhikr) => favorites.includes(dhikr.id))
      case "custom":
        return customAdhkar
      default:
        return morningAdhkar
    }
  }

  // البحث في الأذكار
  const filteredAdhkar = searchQuery
    ? allAdhkar.filter((dhikr) => dhikr.text.includes(searchQuery) || dhikr.category.includes(searchQuery))
    : getActiveAdhkar()

  // إضافة أو إزالة من المفضلة
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // زيادة عداد الذكر
  const incrementDhikrCount = (id: number, maxCount: number) => {
    setCompletedAdhkar((prev) => {
      const currentCount = prev[id] || 0
      const newCount = currentCount < maxCount ? currentCount + 1 : maxCount

      // اهتزاز عند الانتهاء
      if (newCount === maxCount && vibrationEnabled && "vibrate" in navigator) {
        navigator.vibrate(200)
      }

      return { ...prev, [id]: newCount }
    })
  }

  // إعادة تعيين عداد الذكر
  const resetDhikrCount = (id: number) => {
    setCompletedAdhkar((prev) => {
      const newState = { ...prev }
      delete newState[id]
      return newState
    })
  }

  // إعادة تعيين جميع الأذكار في الفئة الحالية
  const resetAllInCategory = () => {
    const currentAdhkar = getActiveAdhkar()
    setCompletedAdhkar((prev) => {
      const newState = { ...prev }
      currentAdhkar.forEach((dhikr) => {
        delete newState[dhikr.id]
      })
      return newState
    })
  }

  // تشغيل الصوت
  const playAudio = (dhikrId: number, audioUrl: string) => {
    // إذا كان هناك صوت يعمل حالياً، قم بإيقافه
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)

      // إذا كان نفس الذكر، فقط قم بإيقافه ولا تشغل صوتاً جديداً
      if (currentPlayingId === dhikrId) {
        setCurrentPlayingId(null)
        return
      }
    }

    // عرض نافذة طلب الإذن لتشغيل الصوت
    setShowAudioPermissionDialog(true)
    setCurrentPlayingId(dhikrId)
  }

  // تأكيد تشغيل الصوت بعد الموافقة
  const confirmPlayAudio = () => {
    setShowAudioPermissionDialog(false)

    try {
      // إنشاء سياق الصوت لتوليد صوت بسيط
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.type = "sine"
        oscillator.frequency.value = 440 // تردد بالهرتز (لا)
        gainNode.gain.value = 0.1 // صوت منخفض

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start()

        // إيقاف بعد ثانية واحدة
        setTimeout(() => {
          oscillator.stop()
          setIsPlaying(false)
          setCurrentAudio(null)
          setCurrentPlayingId(null)
        }, 1000)

        setIsPlaying(true)
        // نحاكي وجود كائن صوتي للحفاظ على الاتساق مع بقية الكود
        setCurrentAudio({ pause: () => oscillator.stop() } as HTMLAudioElement)
      }
    } catch (error) {
      console.error("Error creating audio context:", error)
      alert("حدث خطأ أثناء محاولة تشغيل الصوت.")
    }
  }

  // إلغاء تشغيل الصوت
  const cancelPlayAudio = () => {
    setShowAudioPermissionDialog(false)
    setCurrentPlayingId(null)
  }

  // إيقاف الصوت
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
      setCurrentPlayingId(null)
    }
  }

  // إضافة ذكر مخصص
  const addCustomDhikr = () => {
    if (newCustomDhikr.text.trim() === "") {
      alert("يرجى إدخال نص الذكر")
      return
    }

    const newDhikr = {
      id: Date.now(),
      text: newCustomDhikr.text,
      count: newCustomDhikr.count,
      category: newCustomDhikr.category,
      source: "ذكر مخصص",
      fadl: "",
      audio: "",
    }

    setCustomAdhkar([...customAdhkar, newDhikr])
    setNewCustomDhikr({
      text: "",
      count: 1,
      category: "أذكار عامة",
    })
    setShowAddCustomDhikr(false)
  }

  // حذف ذكر مخصص
  const deleteCustomDhikr = (id: number) => {
    setCustomAdhkar(customAdhkar.filter((dhikr) => dhikr.id !== id))
  }

  // تعيين التذكيرات
  const setReminders = () => {
    if (!reminderEnabled) return

    // في التطبيق الحقيقي، سيتم استخدام واجهة برمجة التطبيقات للإشعارات أو مكتبة مثل react-native-push-notification
    alert(`تم تعيين التذكيرات:
  - أذكار الصباح: ${morningReminderTime}
  - أذكار المساء: ${eveningReminderTime}`)

    setShowReminders(false)
  }

  // طباعة الأذكار
  const printAdhkar = () => {
    window.print()
  }

  // تنزيل الأذكار كملف نصي
  const downloadAdhkar = () => {
    const currentAdhkar = getActiveAdhkar()
    let content = `${adhkarCategories.find((cat) => cat.id === activeTab)?.name || "الأذكار"}

`

    currentAdhkar.forEach((dhikr) => {
      content += `${dhikr.text}
`
      if (showSource)
        content += `المصدر: ${dhikr.source}
`
      if (showFadl)
        content += `الفضل: ${dhikr.fadl}
`
      content += `عدد المرات: ${dhikr.count}

`
    })

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${adhkarCategories.find((cat) => cat.id === activeTab)?.name || "الأذكار"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // مشاركة الذكر
  const shareDhikr = (dhikr: any) => {
    const shareText = `${dhikr.text}
${dhikr.source}`

    // أولاً نحاول النسخ إلى الحافظة كطريقة أكثر توافقاً
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        // إذا نجح النسخ، نحاول المشاركة فقط إذا كنا في سياق آمن
        if (navigator.share && window.isSecureContext) {
          navigator
            .share({
              title: dhikr.category,
              text: shareText,
              url: window.location.href,
            })
            .catch((error) => {
              // إذا فشلت المشاركة، فقد نسخنا النص بالفعل، لذا نعرض رسالة
              console.log("المشاركة غير متاحة، ولكن تم نسخ النص", error)
              alert("تم نسخ الذكر إلى الحافظة")
            })
        } else {
          // إذا كانت واجهة برمجة تطبيقات الويب للمشاركة غير متوفرة، فإننا نبلغ أن النص قد تم نسخه
          alert("تم نسخ الذكر إلى الحافظة")
        }
      })
      .catch((error) => {
        console.error("خطأ في النسخ إلى الحافظة:", error)
        alert("لا يمكن نسخ النص. يرجى التحقق من أذونات المتصفح.")
      })
  }

  // تحديد ما إذا كان الوضع الداكن مفعلاً
  const isDarkMode = darkMode || theme.mode === "dark" || (theme.mode === "system" && theme.systemTheme === "dark")

  // الحصول على لون الثيم الرئيسي
  const getPrimaryColor = () => {
    const style = getComputedStyle(document.documentElement)
    return style.getPropertyValue("--primary-color") || "#3b82f6"
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark-theme bg-gray-900 text-gray-100" : "bg-gray-50"} rtl`}
      style={{
        fontFamily: "var(--font-family)",
        backgroundImage: "var(--bg-image)",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">الأذكار اليومية</h1>

        {/* شريط البحث والإعدادات */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="ابحث عن ذكر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pr-10 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" : ""}`}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : ""}
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "الوضع النهاري" : "الوضع الليلي"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowReminders(true)}
                    className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : ""}
                  >
                    {reminderEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>إعدادات التذكير</p>
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
                    className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : ""}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>الإعدادات</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : ""}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <DropdownMenuLabel>خيارات إضافية</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={printAdhkar}>
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة الأذكار
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAdhkar}>
                  <Download className="h-4 w-4 ml-2" />
                  تنزيل الأذكار
                </DropdownMenuItem>
                <DropdownMenuItem onClick={resetAllInCategory}>
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة تعيين العدادات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAddCustomDhikr(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة ذكر مخصص
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* تقدم الأذكار */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {Object.entries(adhkarProgress).map(([key, value]) => (
            <Card
              key={key}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""} ${
                activeTab === key ? "border-primary primary-border" : ""
              } ${theme.animations ? "transition-all hover:scale-105" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <div className="mb-2">{adhkarCategories.find((cat) => cat.id === key)?.icon}</div>
                  <h3 className="text-sm font-medium mb-2">{adhkarCategories.find((cat) => cat.id === key)?.name}</h3>
                  <Progress
                    value={value}
                    className="h-2 w-full"
                    style={
                      {
                        "--progress-background": "var(--primary-color)",
                      } as React.CSSProperties
                    }
                  />
                  <p className="text-xs mt-2">{value}%</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* علامات التبويب */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
            {adhkarCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">المفضلة</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden md:inline">المخصصة</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* قائمة الأذكار */}
        <div className="space-y-4">
          {filteredAdhkar.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">لا توجد أذكار في هذه الفئة</p>
              {activeTab === "custom" && (
                <Button onClick={() => setShowAddCustomDhikr(true)} className="mt-4">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة ذكر مخصص
                </Button>
              )}
              {activeTab === "favorites" && (
                <p className="text-sm text-gray-500 mt-2">يمكنك إضافة الأذكار إلى المفضلة بالضغط على أيقونة القلب</p>
              )}
            </div>
          ) : (
            filteredAdhkar.map((dhikr) => {
              const completedCount = completedAdhkar[dhikr.id] || 0
              const isCompleted = completedCount >= dhikr.count
              const progress = Math.min((completedCount / dhikr.count) * 100, 100)

              return (
                <Card
                  key={dhikr.id}
                  className={`dhikr-card ${isDarkMode ? "bg-gray-800 border-gray-700" : ""} ${
                    isCompleted ? "border-green-500" : ""
                  } ${theme.animations ? "transition-all hover:translate-y-[-2px]" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={isDarkMode ? "border-gray-700" : ""}>
                        {dhikr.category}
                      </Badge>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFavorite(dhikr.id)}
                                className={favorites.includes(dhikr.id) ? "text-red-500" : ""}
                              >
                                <Heart className={`h-4 w-4 ${favorites.includes(dhikr.id) ? "fill-current" : ""}`} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{favorites.includes(dhikr.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => shareDhikr(dhikr)}>
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>مشاركة</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => playAudio(dhikr.id, dhikr.audio)}>
                                {currentPlayingId === dhikr.id && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{currentPlayingId === dhikr.id && isPlaying ? "إيقاف الاستماع" : "الاستماع"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {activeTab === "custom" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => deleteCustomDhikr(dhikr.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>حذف</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="dhikr-text text-right leading-relaxed mb-4"
                      style={{
                        fontSize: `${fontSize}px`,
                        fontFamily: "var(--font-family)",
                      }}
                      dir="rtl"
                    >
                      {dhikr.text}
                    </p>

                    {showSource && (
                      <p className="dhikr-source text-sm text-gray-500 dark:text-gray-400 mb-2">{dhikr.source}</p>
                    )}

                    {showFadl && dhikr.fadl && (
                      <p className="dhikr-fadl text-sm text-gray-600 dark:text-gray-300 mb-4">{dhikr.fadl}</p>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="w-full sm:w-2/3">
                        <Progress
                          value={progress}
                          className="h-2"
                          style={
                            {
                              "--progress-background": "var(--primary-color)",
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        {showCounter && (
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => resetDhikrCount(dhikr.id)}
                              className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                              disabled={completedCount === 0}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <span className="mx-2 text-lg font-medium">
                              {completedCount}/{dhikr.count}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => incrementDhikrCount(dhikr.id, dhikr.count)}
                              className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                              disabled={isCompleted}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          className={`${isCompleted ? "bg-green-600 hover:bg-green-700" : ""} ${
                            isDarkMode && !isCompleted ? "bg-gray-800 border-gray-700" : ""
                          } ${theme.animations ? "transition-all hover:scale-105" : ""}`}
                          onClick={() => incrementDhikrCount(dhikr.id, dhikr.count)}
                          disabled={isCompleted}
                          style={isCompleted ? {} : { borderColor: "var(--primary-color)" }}
                        >
                          {isCompleted ? (
                            <>
                              <Check className="h-4 w-4 ml-2" />
                              تم
                            </>
                          ) : (
                            "تسبيح"
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>

      {/* نافذة الإعدادات */}
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="right" className={isDarkMode ? "bg-gray-900 text-gray-100" : ""}>
          <SheetHeader>
            <SheetTitle>الإعدادات</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">خيارات العرض</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="showFadl">عرض فضل الذكر</Label>
                <Switch id="showFadl" checked={showFadl} onCheckedChange={setShowFadl} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showSource">عرض المصدر</Label>
                <Switch id="showSource" checked={showSource} onCheckedChange={setShowSource} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showCounter">عرض العداد</Label>
                <Switch id="showCounter" checked={showCounter} onCheckedChange={setShowCounter} />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-medium">حجم الخط</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFontSize(Math.max(fontSize - 2, 14))}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Slider
                  value={[fontSize]}
                  min={14}
                  max={32}
                  step={2}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFontSize(Math.min(fontSize + 2, 32))}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-center" style={{ fontSize: `${fontSize}px` }}>
                حجم النص الحالي
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">الصوت والاهتزاز</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoPlayAudio">تشغيل الصوت تلقائياً</Label>
                <Switch id="autoPlayAudio" checked={autoPlayAudio} onCheckedChange={setAutoPlayAudio} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="vibrationEnabled">تفعيل الاهتزاز</Label>
                <Switch id="vibrationEnabled" checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">المظهر</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">الوضع الليلي</Label>
                <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={() => setShowSettings(false)}>حفظ الإعدادات</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* نافذة التذكيرات */}
      <Sheet open={showReminders} onOpenChange={setShowReminders}>
        <SheetContent side="right" className={isDarkMode ? "bg-gray-900 text-gray-100" : ""}>
          <SheetHeader>
            <SheetTitle>إعدادات التذكير</SheetTitle>
            <SheetDescription>ضبط مواعيد التذكير بالأذكار</SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="reminderEnabled">تفعيل التذكيرات</Label>
              <Switch id="reminderEnabled" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">مواعيد التذكير</h3>
              <div className="space-y-2">
                <Label htmlFor="morningTime">وقت أذكار الصباح</Label>
                <Input
                  id="morningTime"
                  type="time"
                  value={morningReminderTime}
                  onChange={(e) => setMorningReminderTime(e.target.value)}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                  disabled={!reminderEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eveningTime">وقت أذكار المساء</Label>
                <Input
                  id="eveningTime"
                  type="time"
                  value={eveningReminderTime}
                  onChange={(e) => setEveningReminderTime(e.target.value)}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                  disabled={!reminderEnabled}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">خيارات التذكير</h3>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="reminderSound"
                  checked={true}
                  disabled={!reminderEnabled}
                  className={isDarkMode ? "border-gray-700" : ""}
                />
                <Label htmlFor="reminderSound">تنبيه صوتي</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="reminderVibration"
                  checked={vibrationEnabled}
                  onCheckedChange={setVibrationEnabled}
                  disabled={!reminderEnabled}
                  className={isDarkMode ? "border-gray-700" : ""}
                />
                <Label htmlFor="reminderVibration">اهتزاز</Label>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={setReminders} disabled={!reminderEnabled}>
              حفظ إعدادات التذكير
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* نافذة إضافة ذكر مخصص */}
      <Dialog open={showAddCustomDhikr} onOpenChange={setShowAddCustomDhikr}>
        <DialogContent className={isDarkMode ? "bg-gray-900 text-gray-100" : ""}>
          <DialogHeader>
            <DialogTitle>إضافة ذكر مخصص</DialogTitle>
            <DialogDescription>أضف ذكراً مخصصاً إلى قائمة أذكارك</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dhikrText">نص الذكر</Label>
              <Textarea
                id="dhikrText"
                placeholder="أدخل نص الذكر هنا..."
                value={newCustomDhikr.text}
                onChange={(e) => setNewCustomDhikr({ ...newCustomDhikr, text: e.target.value })}
                className={`min-h-[100px] ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dhikrCount">عدد المرات</Label>
                <Input
                  id="dhikrCount"
                  type="number"
                  min="1"
                  value={newCustomDhikr.count}
                  onChange={(e) =>
                    setNewCustomDhikr({ ...newCustomDhikr, count: Math.max(1, Number.parseInt(e.target.value) || 1) })
                  }
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dhikrCategory">الفئة</Label>
                <Select
                  value={newCustomDhikr.category}
                  onValueChange={(value) => setNewCustomDhikr({ ...newCustomDhikr, category: value })}
                >
                  <SelectTrigger className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <SelectItem value="أذكار الصباح">أذكار الصباح</SelectItem>
                    <SelectItem value="أذكار المساء">أذكار المساء</SelectItem>
                    <SelectItem value="أذكار عامة">أذكار عامة</SelectItem>
                    <SelectItem value="أذكار النوم">أذكار النوم</SelectItem>
                    <SelectItem value="أذكار الاستيقاظ">أذكار الاستيقاظ</SelectItem>
                    <SelectItem value="أذكار الصلاة">أذكار الصلاة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCustomDhikr(false)}>
              إلغاء
            </Button>
            <Button onClick={addCustomDhikr}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة إكمال الأذكار */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className={isDarkMode ? "bg-gray-900 text-gray-100" : ""}>
          <DialogHeader>
            <DialogTitle>تهانينا! 🎉</DialogTitle>
            <DialogDescription>لقد أكملت جميع {completedCategory}</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-center text-lg mb-4">بارك الله فيك على المداومة على الأذكار. تقبل الله منك.</p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              استمر في المحافظة على الأذكار اليومية لتنال الأجر والثواب
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowCompletionDialog(false)}>حسناً</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة طلب إذن تشغيل الصوت */}
      <Dialog open={showAudioPermissionDialog} onOpenChange={setShowAudioPermissionDialog}>
        <DialogContent className={isDarkMode ? "bg-gray-900 text-gray-100" : ""}>
          <DialogHeader>
            <DialogTitle>تشغيل الصوت</DialogTitle>
            <DialogDescription>هل ترغب في تشغيل الصوت؟</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert className={isDarkMode ? "bg-gray-800" : ""}>
              <Volume2 className="h-4 w-4" />
              <AlertTitle>تنبيه</AlertTitle>
              <AlertDescription>سيتم تشغيل الصوت في المتصفح. تأكد من أن صوت جهازك مفعل.</AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelPlayAudio}>
              لا
            </Button>
            <Button onClick={confirmPlayAudio}>نعم</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Textarea({ id, placeholder, value, onChange, className }: any) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}

