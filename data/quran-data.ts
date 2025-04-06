// Sample Quran data for demonstration purposes
// In a real application, this would be fetched from an API or database

export const quranSurahs = [
  { id: 1, name: "الفاتحة", nameEn: "Al-Fatiha", verses: 7, type: "مكية" },
  { id: 2, name: "البقرة", nameEn: "Al-Baqarah", verses: 286, type: "مدنية" },
  { id: 3, name: "آل عمران", nameEn: "Aal-Imran", verses: 200, type: "مدنية" },
  { id: 4, name: "النساء", nameEn: "An-Nisa", verses: 176, type: "مدنية" },
  { id: 5, name: "المائدة", nameEn: "Al-Ma'idah", verses: 120, type: "مدنية" },
  { id: 6, name: "الأنعام", nameEn: "Al-An'am", verses: 165, type: "مكية" },
  { id: 7, name: "الأعراف", nameEn: "Al-A'raf", verses: 206, type: "مكية" },
  { id: 8, name: "الأنفال", nameEn: "Al-Anfal", verses: 75, type: "مدنية" },
  { id: 9, name: "التوبة", nameEn: "At-Tawbah", verses: 129, type: "مدنية" },
  { id: 10, name: "يونس", nameEn: "Yunus", verses: 109, type: "مكية" },
  { id: 11, name: "هود", nameEn: "Hud", verses: 123, type: "مكية" },
  { id: 12, name: "يوسف", nameEn: "Yusuf", verses: 111, type: "مكية" },
  { id: 13, name: "الرعد", nameEn: "Ar-Ra'd", verses: 43, type: "مدنية" },
  { id: 14, name: "إبراهيم", nameEn: "Ibrahim", verses: 52, type: "مكية" },
  { id: 15, name: "الحجر", nameEn: "Al-Hijr", verses: 99, type: "مكية" },
  { id: 16, name: "النحل", nameEn: "An-Nahl", verses: 128, type: "مكية" },
  { id: 17, name: "الإسراء", nameEn: "Al-Isra", verses: 111, type: "مكية" },
  { id: 18, name: "الكهف", nameEn: "Al-Kahf", verses: 110, type: "مكية" },
  { id: 19, name: "مريم", nameEn: "Maryam", verses: 98, type: "مكية" },
  { id: 20, name: "طه", nameEn: "Ta-Ha", verses: 135, type: "مكية" },
  { id: 112, name: "الإخلاص", nameEn: "Al-Ikhlas", verses: 4, type: "مكية" },
  { id: 113, name: "الفلق", nameEn: "Al-Falaq", verses: 5, type: "مكية" },
  { id: 114, name: "الناس", nameEn: "An-Nas", verses: 6, type: "مكية" },
]

// Sample surah data
export const surahFatiha = {
  id: 1,
  name: "الفاتحة",
  nameEn: "Al-Fatiha",
  verses: 7,
  type: "مكية",
  text: [
    {
      id: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      transliteration: "Bismi Allahi alrrahmani alrraheemi",
      wordByWord: [
        { arabic: "بِسْمِ", translation: "In the name" },
        { arabic: "اللَّهِ", translation: "of Allah" },
        { arabic: "الرَّحْمَٰنِ", translation: "the Most Gracious" },
        { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
      ],
    },
    {
      id: 2,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      transliteration: "Alhamdu lillahi rabbi alAAalameena",
      wordByWord: [
        { arabic: "الْحَمْدُ", translation: "All praise" },
        { arabic: "لِلَّهِ", translation: "is to Allah" },
        { arabic: "رَبِّ", translation: "Lord" },
        { arabic: "الْعَالَمِينَ", translation: "of the worlds" },
      ],
    },
    {
      id: 3,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful.",
      transliteration: "Alrrahmani alrraheemi",
      wordByWord: [
        { arabic: "الرَّحْمَٰنِ", translation: "The Most Gracious" },
        { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
      ],
    },
    {
      id: 4,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense.",
      transliteration: "Maliki yawmi alddeeni",
      wordByWord: [
        { arabic: "مَالِكِ", translation: "Master" },
        { arabic: "يَوْمِ", translation: "of the Day" },
        { arabic: "الدِّينِ", translation: "of Judgment" },
      ],
    },
    {
      id: 5,
      text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help.",
      transliteration: "Iyyaka naAAbudu waiyyaka nastaAAeenu",
      wordByWord: [
        { arabic: "إِيَّاكَ", translation: "You alone" },
        { arabic: "نَعْبُدُ", translation: "we worship" },
        { arabic: "وَإِيَّاكَ", translation: "and You alone" },
        { arabic: "نَسْتَعِينُ", translation: "we ask for help" },
      ],
    },
    {
      id: 6,
      text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path.",
      transliteration: "Ihdina alssirata almustaqeema",
      wordByWord: [
        { arabic: "اهْدِنَا", translation: "Guide us" },
        { arabic: "الصِّرَاطَ", translation: "to the path" },
        { arabic: "الْمُسْتَقِيمَ", translation: "the straight" },
      ],
    },
    {
      id: 7,
      text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation:
        "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      transliteration: "Sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala alddalleena",
      wordByWord: [
        { arabic: "صِرَاطَ", translation: "The path" },
        { arabic: "الَّذِينَ", translation: "of those" },
        { arabic: "أَنْعَمْتَ", translation: "You have blessed" },
        { arabic: "عَلَيْهِمْ", translation: "upon them" },
        { arabic: "غَيْرِ", translation: "not" },
        { arabic: "الْمَغْضُوبِ", translation: "of those who earned wrath" },
        { arabic: "عَلَيْهِمْ", translation: "upon themselves" },
        { arabic: "وَلَا", translation: "and not" },
        { arabic: "الضَّالِّينَ", translation: "of those who went astray" },
      ],
    },
  ],
}

export const surahBaqarah = {
  id: 2,
  name: "البقرة",
  nameEn: "Al-Baqarah",
  verses: 286,
  type: "مدنية",
  text: [
    {
      id: 1,
      text: "الم",
      translation: "Alif, Lam, Meem.",
      transliteration: "Alif-lam-meem",
      wordByWord: [{ arabic: "الم", translation: "Alif Lam Meem" }],
    },
    {
      id: 2,
      text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
      translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
      transliteration: "Thalika alkitabu la rayba feehi hudan lilmuttaqeena",
      wordByWord: [
        { arabic: "ذَٰلِكَ", translation: "This is" },
        { arabic: "الْكِتَابُ", translation: "the Book" },
        { arabic: "لَا", translation: "no" },
        { arabic: "رَيْبَ", translation: "doubt" },
        { arabic: "فِيهِ", translation: "in it" },
        { arabic: "هُدًى", translation: "a guidance" },
        { arabic: "لِّلْمُتَّقِينَ", translation: "for the God-conscious" },
      ],
    },
    {
      id: 3,
      text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
      translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them.",
      transliteration: "Allatheena yuminoona bialghaybi wayuqeemoona alssalata wamimma razaqnahum yunfiqoona",
      wordByWord: [
        { arabic: "الَّذِينَ", translation: "Those who" },
        { arabic: "يُؤْمِنُونَ", translation: "believe" },
        { arabic: "بِالْغَيْبِ", translation: "in the unseen" },
        { arabic: "وَيُقِيمُونَ", translation: "and establish" },
        { arabic: "الصَّلَاةَ", translation: "prayer" },
        { arabic: "وَمِمَّا", translation: "and out of what" },
        { arabic: "رَزَقْنَاهُمْ", translation: "We have provided them" },
        { arabic: "يُنفِقُونَ", translation: "they spend" },
      ],
    },
  ],
}

export const surahIkhlas = {
  id: 112,
  name: "الإخلاص",
  nameEn: "Al-Ikhlas",
  verses: 4,
  type: "مكية",
  text: [
    {
      id: 1,
      text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      translation: 'Say, "He is Allah, [who is] One,"',
      transliteration: "Qul huwa Allahu ahadun",
      wordByWord: [
        { arabic: "قُلْ", translation: "Say" },
        { arabic: "هُوَ", translation: "He is" },
        { arabic: "اللَّهُ", translation: "Allah" },
        { arabic: "أَحَدٌ", translation: "the One" },
      ],
    },
    {
      id: 2,
      text: "اللَّهُ الصَّمَدُ",
      translation: "Allah, the Eternal Refuge.",
      transliteration: "Allahu alssamadu",
      wordByWord: [
        { arabic: "اللَّهُ", translation: "Allah" },
        { arabic: "الصَّمَدُ", translation: "the Eternal, the Absolute" },
      ],
    },
    {
      id: 3,
      text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      translation: "He neither begets nor is born,",
      transliteration: "Lam yalid walam yooladu",
      wordByWord: [
        { arabic: "لَمْ", translation: "Not" },
        { arabic: "يَلِدْ", translation: "He begets" },
        { arabic: "وَلَمْ", translation: "and not" },
        { arabic: "يُولَدْ", translation: "He is begotten" },
      ],
    },
    {
      id: 4,
      text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      translation: 'Nor is there to Him any equivalent."',
      transliteration: "Walam yakun lahu kufuwan ahadun",
      wordByWord: [
        { arabic: "وَلَمْ", translation: "And not" },
        { arabic: "يَكُن", translation: "is" },
        { arabic: "لَّهُ", translation: "for Him" },
        { arabic: "كُفُوًا", translation: "equivalent" },
        { arabic: "أَحَدٌ", translation: "any one" },
      ],
    },
  ],
}

export const surahNas = {
  id: 114,
  name: "الناس",
  nameEn: "An-Nas",
  verses: 6,
  type: "مكية",
  text: [
    {
      id: 1,
      text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      translation: 'Say, "I seek refuge in the Lord of mankind,"',
      transliteration: "Qul aAAoothu birabbi alnnasi",
      wordByWord: [
        { arabic: "قُلْ", translation: "Say" },
        { arabic: "أَعُوذُ", translation: "I seek refuge" },
        { arabic: "بِرَبِّ", translation: "with the Lord" },
        { arabic: "النَّاسِ", translation: "of mankind" },
      ],
    },
    {
      id: 2,
      text: "مَلِكِ النَّاسِ",
      translation: "The Sovereign of mankind,",
      transliteration: "Maliki alnnasi",
      wordByWord: [
        { arabic: "مَلِكِ", translation: "The King" },
        { arabic: "النَّاسِ", translation: "of mankind" },
      ],
    },
    {
      id: 3,
      text: "إِلَٰهِ النَّاسِ",
      translation: "The God of mankind,",
      transliteration: "Ilahi alnnasi",
      wordByWord: [
        { arabic: "إِلَٰهِ", translation: "The God" },
        { arabic: "النَّاسِ", translation: "of mankind" },
      ],
    },
    {
      id: 4,
      text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      translation: "From the evil of the retreating whisperer -",
      transliteration: "Min sharri alwaswasi alkhannasi",
      wordByWord: [
        { arabic: "مِن", translation: "From" },
        { arabic: "شَرِّ", translation: "the evil" },
        { arabic: "الْوَسْوَاسِ", translation: "of the whisperer" },
        { arabic: "الْخَنَّاسِ", translation: "the one who withdraws" },
      ],
    },
    {
      id: 5,
      text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      translation: "Who whispers [evil] into the breasts of mankind -",
      transliteration: "Allathee yuwaswisu fee sudoori alnnasi",
      wordByWord: [
        { arabic: "الَّذِي", translation: "The one who" },
        { arabic: "يُوَسْوِسُ", translation: "whispers" },
        { arabic: "فِي", translation: "in" },
        { arabic: "صُدُورِ", translation: "the breasts" },
        { arabic: "النَّاسِ", translation: "of mankind" },
      ],
    },
    {
      id: 6,
      text: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      translation: 'From among the jinn and mankind."',
      transliteration: "Mina aljinnati waalnnasi",
      wordByWord: [
        { arabic: "مِنَ", translation: "From" },
        { arabic: "الْجِنَّةِ", translation: "the jinn" },
        { arabic: "وَالنَّاسِ", translation: "and mankind" },
      ],
    },
  ],
}

