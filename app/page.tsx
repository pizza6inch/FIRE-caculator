import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LifeWeeksGrid } from "@/components/life-weeks-grid";
import {
  Calculator,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <span className="mr-2 h-2 w-2 rounded-full bg-accent" />
                免費工具，無需註冊
              </p>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                計算你的財富自由之路
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                財富自由不是遙不可及的夢想，而是一道可以計算的數學題。
                用科學的方法規劃你的財務獨立之路。
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="h-12 px-8">
                  <Link href="/calculator">
                    開始計算
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-12 px-8 bg-transparent"
                >
                  <Link href="/methodology">了解計算原理</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is FI Section */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                什麼是財富自由？
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                一個簡單的公式，決定你何時能擁有人生的選擇權
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-8 rounded-lg bg-muted p-6 text-center">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      財富自由的定義
                    </p>
                    <p className="text-2xl font-bold text-foreground md:text-3xl">
                      被動收入 ≥ 生活支出
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          不再為錢工作
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          當投資收益足以支付生活費用，工作成為選擇而非必須
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          時間的主人
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          你可以自由決定如何使用自己的時間與精力
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why 65 is Risky Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  為什麼把人生綁在 65 歲退休，是一個高風險選擇
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  時間一去不回。這不是心靈雞湯，而是物理事實。
                </p>

                <p className="leading-relaxed">
                  當你選擇「65 歲再說」，你其實是在做一個決定：
                  把人生中最有精力、最有可能性的歲月，換成薪水。
                </p>

                <div className="rounded-lg bg-muted p-6">
                  <p className="mb-4 font-medium text-foreground">你本可以：</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">-</span>
                      <span>享受你真正想要的人生</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">-</span>
                      <span>學習那些一直想學的事物</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">-</span>
                      <span>追求你真正有熱情的事情</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">-</span>
                      <span>陪伴你在乎的人：家人、朋友、愛人</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="mb-4 font-medium text-foreground">
                    但你卻被迫：
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/40">-</span>
                      <span>日復一日上班</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/40">-</span>
                      <span>把最有精力的歲月換成薪水</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-foreground/40">-</span>
                      <span>等到 65 歲，才開始「真正的生活」</span>
                    </li>
                  </ul>
                </div>

                <p className="leading-relaxed">
                  這裡沒有人要賣你課程，也沒有人要你焦慮。
                  只是想讓你停下來，想一想。
                </p>

                <div className="rounded-lg bg-accent/5 p-6">
                  <p className="font-medium text-foreground">
                    財富自由不是不工作。
                  </p>
                  <p className="mt-2">
                    而是讓工作
                    <span className="font-medium text-foreground">
                      回到選擇，而非生存
                    </span>
                    。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Life Weeks Visualization Section */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                你的人生，還剩多少週？
              </h2>
              <p className="text-lg text-muted-foreground">
                輸入你的年齡，看看你的人生時間分布
              </p>
            </div>

            <LifeWeeksGrid />
          </div>
        </section>

        {/* Why FI Matters Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                財富自由的真正意義
              </h2>
              <p className="text-lg text-muted-foreground">
                這不只是關於錢，而是關於你想要的人生
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    時間自由
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    不再被朝九晚五綁住，你可以選擇何時工作、何時休息，把時間花在真正重要的事情上。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    選擇自由
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    可以拒絕不喜歡的工作，追求真正有熱情的事業，或者單純享受生活中的每一天。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    安全感
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    即使遇到經濟波動或職涯變化，你的生活品質也不會受到太大影響。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Math Problem Section */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                  達成財富自由並不困難
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  這是一道純粹的數學問題。只要你知道自己的支出、
                  設定合理的投資報酬率，計算機就能告訴你需要多少錢、多少時間。
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">
                      根據 4% 法則，你需要年支出的 25 倍資產
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">
                      複利是你最好的朋友，時間會放大每一筆投資
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">
                      從今天開始，用數字規劃你的未來
                    </span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/calculator">
                    <Calculator className="mr-2 h-4 w-4" />
                    立即計算
                  </Link>
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-background p-8">
                <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
                  財富自由公式
                </h3>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      財富自由數字
                    </p>
                    <p className="font-mono text-foreground">
                      FI Number = 年支出 ÷ 提領率
                    </p>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      舉例
                    </p>
                    <p className="font-mono text-foreground">
                      {"月支出 5 萬 → 年支出 60 萬"}
                    </p>
                    <p className="font-mono text-foreground">
                      {"60 萬 ÷ 4% = 1,500 萬"}
                    </p>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    達成 1,500 萬資產，你就財富自由了
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                準備好計算你的財富自由之路了嗎？
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                輸入你的財務數據，讓我們幫你算出達成財務獨立需要的時間與金額。
              </p>
              <Button size="lg" asChild className="h-12 px-8">
                <Link href="/calculator">
                  開始計算
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
