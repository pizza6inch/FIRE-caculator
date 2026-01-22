import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Calculator, ArrowRight } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              計算原理說明
            </h1>
            <p className="text-lg text-muted-foreground">
              了解我們如何計算你的財富自由之路
            </p>
          </div>

          <div className="space-y-8">
            {/* 核心概念 */}
            <Card>
              <CardHeader>
                <CardTitle>核心概念：4% 法則</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  4% 法則源自於美國三一大學（Trinity
                  Study）的研究，這項研究分析了1926年至1995年間的歷史數據，
                  發現如果退休者每年從投資組合中提領不超過
                  4%，則有非常高的機率可以維持 30
                  年以上的退休生活而不會把錢花完。
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    核心公式
                  </p>
                  <p className="font-mono text-lg text-foreground">
                    財富自由數字 = 年支出 ÷ 提領率
                  </p>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  簡單來說，如果你每年需要 60 萬的生活費，以 4% 提領率計算，
                  你需要累積 1,500 萬的資產（60 萬 ÷ 4% = 1,500 萬）。
                </p>
              </CardContent>
            </Card>

            {/* 年支出計算 */}
            <Card>
              <CardHeader>
                <CardTitle>年支出計算</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    公式
                  </p>
                  <p className="font-mono text-lg text-foreground">
                    年支出 = 每月生活費 × 12
                  </p>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  你的每月生活費應該包含所有必要支出：房租/房貸、飲食、交通、
                  保險、娛樂、醫療、以及其他雜支。建議在計算時稍微保守一些，
                  預留一些緩衝空間。
                </p>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 font-medium text-foreground">
                    建議納入的支出項目：
                  </h4>
                  <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                    <li>• 房租或房貸</li>
                    <li>• 水電瓦斯網路</li>
                    <li>• 飲食費用</li>
                    <li>• 交通費用</li>
                    <li>• 保險（健康、壽險等）</li>
                    <li>• 娛樂休閒</li>
                    <li>• 醫療保健</li>
                    <li>• 年度支出（旅遊、稅金等）÷ 12</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 複利計算 */}
            <Card>
              <CardHeader>
                <CardTitle>複利與定期投入計算</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  我們使用複利公式結合每月定期投入來計算資產成長。
                  這反映了實際投資情境：你每個月投入固定金額，而這些資金會隨時間產生複利效果。
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    計算方式
                  </p>
                  <p className="font-mono text-foreground">
                    每月末資產 = 上月末資產 × (1 + 月利率) + 本月投入
                  </p>
                  <p className="mt-2 font-mono text-sm text-muted-foreground">
                    其中：月利率 = 年化報酬率 ÷ 12
                  </p>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  這種計算方式考慮了每月投入的時間價值，讓計算結果更貼近實際情況。
                </p>
              </CardContent>
            </Card>

            {/* 預設參數 */}
            <Card>
              <CardHeader>
                <CardTitle>預設參數說明</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-medium text-foreground">
                          參數
                        </th>
                        <th className="pb-3 text-left font-medium text-foreground">
                          預設值
                        </th>
                        <th className="pb-3 text-left font-medium text-foreground">
                          說明
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="py-3 font-medium text-foreground">
                          年化報酬率
                        </td>
                        <td className="py-3">7%</td>
                        <td className="py-3">
                          保守估計的長期股市報酬率。歷史上全球股市長期平均約
                          7-10%， 但考慮通膨後實質報酬率約 7%。
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 font-medium text-foreground">
                          提領率
                        </td>
                        <td className="py-3">4%</td>
                        <td className="py-3">
                          基於三一大學研究的建議提領率。較保守的投資者可使用
                          3.5%， 較積極者可使用 4.5%。
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-foreground">
                          投資年數
                        </td>
                        <td className="py-3">20 年</td>
                        <td className="py-3">
                          一般建議的長期投資時間框架。時間越長，複利效果越明顯。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 重要提醒 */}
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle>重要提醒</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <strong className="text-foreground">這只是預估：</strong>
                      實際投資報酬會因市場波動而有所不同，過去績效不代表未來表現。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <strong className="text-foreground">考慮通膨：</strong>
                      7% 的報酬率已經是考慮通膨後的實質報酬率估計。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <strong className="text-foreground">非投資建議：</strong>
                      本工具僅供參考，不構成任何投資建議。請根據自身情況諮詢專業理財顧問。
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <strong className="text-foreground">預留緩衝：</strong>
                      建議在計算支出時保守估計，並考慮醫療、家庭等未來可能增加的支出。
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                了解原理後，開始規劃你的財富自由之路
              </p>
              <Button size="lg" asChild>
                <Link href="/calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  前往計算器
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
