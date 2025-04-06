"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Info } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ZakatPage() {
  // State for money zakat
  const [moneyAmount, setMoneyAmount] = useState<number>(0)
  const [moneyZakat, setMoneyZakat] = useState<number | null>(null)

  // State for gold zakat
  const [goldWeight, setGoldWeight] = useState<number>(0)
  const [goldPrice, setGoldPrice] = useState<number>(0)
  const [goldZakat, setGoldZakat] = useState<number | null>(null)

  // State for silver zakat
  const [silverWeight, setSilverWeight] = useState<number>(0)
  const [silverPrice, setSilverPrice] = useState<number>(0)
  const [silverZakat, setSilverZakat] = useState<number | null>(null)

  // Nisab thresholds (minimum amounts for zakat to be obligatory)
  const GOLD_NISAB_WEIGHT = 85 // 85 grams of gold
  const SILVER_NISAB_WEIGHT = 595 // 595 grams of silver

  // Calculate money zakat
  const calculateMoneyZakat = () => {
    if (moneyAmount >= goldPrice * GOLD_NISAB_WEIGHT) {
      const zakatAmount = moneyAmount * 0.025 // 2.5% of wealth
      setMoneyZakat(zakatAmount)
    } else {
      setMoneyZakat(0)
    }
  }

  // Calculate gold zakat
  const calculateGoldZakat = () => {
    if (goldWeight >= GOLD_NISAB_WEIGHT) {
      const goldValue = goldWeight * goldPrice
      const zakatAmount = goldValue * 0.025 // 2.5% of wealth
      setGoldZakat(zakatAmount)
    } else {
      setGoldZakat(0)
    }
  }

  // Calculate silver zakat
  const calculateSilverZakat = () => {
    if (silverWeight >= SILVER_NISAB_WEIGHT) {
      const silverValue = silverWeight * silverPrice
      const zakatAmount = silverValue * 0.025 // 2.5% of wealth
      setSilverZakat(zakatAmount)
    } else {
      setSilverZakat(0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">حاسبة الزكاة</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            حاسبة الزكاة
          </CardTitle>
          <CardDescription>حساب زكاة المال والذهب والفضة وفقًا للشريعة الإسلامية</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="money">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="money">زكاة المال</TabsTrigger>
              <TabsTrigger value="gold">زكاة الذهب</TabsTrigger>
              <TabsTrigger value="silver">زكاة الفضة</TabsTrigger>
            </TabsList>

            <TabsContent value="money" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">قيمة المال (بالعملة المحلية)</label>
                  <Input
                    type="number"
                    min="0"
                    value={moneyAmount || ""}
                    onChange={(e) => setMoneyAmount(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل قيمة المال"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">سعر جرام الذهب (لحساب النصاب)</label>
                  <Input
                    type="number"
                    min="0"
                    value={goldPrice || ""}
                    onChange={(e) => setGoldPrice(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل سعر جرام الذهب"
                  />
                </div>

                <Button onClick={calculateMoneyZakat} className="w-full">
                  حساب الزكاة
                </Button>

                {moneyZakat !== null && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-md">
                    <h3 className="font-semibold mb-2">نتيجة حساب الزكاة:</h3>
                    {moneyAmount >= goldPrice * GOLD_NISAB_WEIGHT ? (
                      <div>
                        <p>
                          قيمة الزكاة الواجبة: <span className="font-bold">{moneyZakat.toFixed(2)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">(2.5% من إجمالي المال)</p>
                      </div>
                    ) : (
                      <p>المال لم يبلغ النصاب، لا تجب فيه الزكاة</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gold" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">وزن الذهب (بالجرام)</label>
                  <Input
                    type="number"
                    min="0"
                    value={goldWeight || ""}
                    onChange={(e) => setGoldWeight(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل وزن الذهب"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">سعر جرام الذهب (بالعملة المحلية)</label>
                  <Input
                    type="number"
                    min="0"
                    value={goldPrice || ""}
                    onChange={(e) => setGoldPrice(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل سعر جرام الذهب"
                  />
                </div>

                <Button onClick={calculateGoldZakat} className="w-full">
                  حساب الزكاة
                </Button>

                {goldZakat !== null && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-md">
                    <h3 className="font-semibold mb-2">نتيجة حساب الزكاة:</h3>
                    {goldWeight >= GOLD_NISAB_WEIGHT ? (
                      <div>
                        <p>
                          قيمة الزكاة الواجبة: <span className="font-bold">{goldZakat.toFixed(2)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">(2.5% من قيمة الذهب)</p>
                      </div>
                    ) : (
                      <p>الذهب لم يبلغ النصاب ({GOLD_NISAB_WEIGHT} جرام)، لا تجب فيه الزكاة</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="silver" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">وزن الفضة (بالجرام)</label>
                  <Input
                    type="number"
                    min="0"
                    value={silverWeight || ""}
                    onChange={(e) => setSilverWeight(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل وزن الفضة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">سعر جرام الفضة (بالعملة المحلية)</label>
                  <Input
                    type="number"
                    min="0"
                    value={silverPrice || ""}
                    onChange={(e) => setSilverPrice(Number.parseFloat(e.target.value) || 0)}
                    placeholder="أدخل سعر جرام الفضة"
                  />
                </div>

                <Button onClick={calculateSilverZakat} className="w-full">
                  حساب الزكاة
                </Button>

                {silverZakat !== null && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-md">
                    <h3 className="font-semibold mb-2">نتيجة حساب الزكاة:</h3>
                    {silverWeight >= SILVER_NISAB_WEIGHT ? (
                      <div>
                        <p>
                          قيمة الزكاة الواجبة: <span className="font-bold">{silverZakat.toFixed(2)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">(2.5% من قيمة الفضة)</p>
                      </div>
                    ) : (
                      <p>الفضة لم تبلغ النصاب ({SILVER_NISAB_WEIGHT} جرام)، لا تجب فيها الزكاة</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            معلومات عن الزكاة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>ما هي الزكاة؟</AccordionTrigger>
              <AccordionContent>
                الزكاة هي الركن الثالث من أركان الإسلام، وهي فريضة مالية مفروضة على المسلمين الذين يملكون نصابًا من المال
                أو ما يعادله من الذهب أو الفضة. وتُدفع للفقراء والمساكين وغيرهم من المستحقين.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>ما هو النصاب؟</AccordionTrigger>
              <AccordionContent>
                النصاب هو الحد الأدنى من المال الذي تجب فيه الزكاة. ويُقدر بـ 85 جرامًا من الذهب أو 595 جرامًا من الفضة أو
                ما يعادل قيمتهما من النقود.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>كم نسبة الزكاة؟</AccordionTrigger>
              <AccordionContent>
                نسبة الزكاة في المال والذهب والفضة هي 2.5% من إجمالي المال الذي حال عليه الحول (مر عليه عام هجري كامل).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>من هم مستحقو الزكاة؟</AccordionTrigger>
              <AccordionContent>
                مستحقو الزكاة ثمانية أصناف ذكرهم الله تعالى في القرآن الكريم: الفقراء، المساكين، العاملين عليها، المؤلفة
                قلوبهم، في الرقاب، الغارمين، في سبيل الله، وابن السبيل.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          ملاحظة: هذه الحاسبة تقدم تقديرًا تقريبيًا للزكاة. للحصول على فتوى دقيقة، يرجى استشارة عالم مختص.
        </CardFooter>
      </Card>
    </div>
  )
}

