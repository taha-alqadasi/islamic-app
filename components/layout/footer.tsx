import Link from "next/link"
import { Compass, Calendar, BookOpen, MessageSquareQuote, FileText, Moon } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const mainLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "اتجاه القبلة", path: "/qibla" },
    { name: "التقويم الهجري", path: "/hijri-calendar" },
    { name: "القرآن الكريم", path: "/quran" },
    { name: "الأحاديث النبوية", path: "/hadith" },
  ]

  const secondaryLinks = [
    { name: "الأدعية", path: "/duas" },
    { name: "تتبع رمضان", path: "/ramadan" },
    { name: "حاسبة الزكاة", path: "/zakat" },
    { name: "الثيمات", path: "/themes" },
    { name: "منبه الصلاة", path: "/prayer-alarm" },
  ]

  const featureIcons = [
    { icon: Compass, path: "/qibla" },
    { icon: Calendar, path: "/hijri-calendar" },
    { icon: BookOpen, path: "/quran" },
    { icon: MessageSquareQuote, path: "/hadith" },
    { icon: FileText, path: "/duas" },
    { icon: Moon, path: "/ramadan" },
  ]

  return (
    <footer className="bg-background border-t py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">شنين</h3>
            <p className="text-sm text-muted-foreground">
              تطبيق إسلامي شامل يحتوي على العديد من الميزات المفيدة للمسلمين في حياتهم اليومية.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {featureIcons.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">رابط سريع</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2">
              {mainLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ميزات أخرى</h3>
            <ul className="space-y-2">
              {secondaryLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} تطبيق شنين الإسلامي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}

