"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  expenseTemplate,
  calculateCategorySubtotal,
  calculateTotalAnnualExpenses,
  calculateFITargetFromExpenses,
  formatCurrency,
  type ExpenseCategory,
  type ExpenseItem,
} from "@/lib/calculator"
import { ChevronDown, ChevronRight, Calculator, Target } from "lucide-react"

export function ExpenseCalculator() {
  const [categories, setCategories] = useState<ExpenseCategory[]>(() =>
    expenseTemplate.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({ ...item })),
      yearlySubtotal: 0,
    }))
  )
  const [targetYears, setTargetYears] = useState(25)
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(expenseTemplate.map((c) => c.id))
  )

  const totalAnnualExpenses = useMemo(() => {
    return calculateTotalAnnualExpenses(categories)
  }, [categories])

  const fiTarget = useMemo(() => {
    return calculateFITargetFromExpenses(totalAnnualExpenses, targetYears)
  }, [totalAnnualExpenses, targetYears])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-TW').format(num)
  }

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  const updateItemAmount = (
    categoryId: string,
    itemId: string,
    field: 'monthly' | 'yearly',
    value: string
  ) => {
    const num = Number.parseInt(value.replace(/,/g, ''), 10)
    const amount = Number.isNaN(num) ? 0 : num

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat

        const updatedItems = cat.items.map((item) => {
          if (item.id !== itemId) return item

          if (field === 'monthly') {
            return {
              ...item,
              monthlyAmount: amount,
              yearlyAmount: amount * 12,
            }
          }
          return {
            ...item,
            yearlyAmount: amount,
            monthlyAmount: Math.round(amount / 12),
          }
        })

        return {
          ...cat,
          items: updatedItems,
          yearlySubtotal: calculateCategorySubtotal(updatedItems),
        }
      })
    )
  }

  const resetAll = () => {
    setCategories(
      expenseTemplate.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, monthlyAmount: 0, yearlyAmount: 0 })),
        yearlySubtotal: 0,
      }))
    )
  }

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            支出盤點計算器
          </CardTitle>
          <CardDescription>
            系統性盤點你的各項支出，計算年度總支出與財富自由目標金額。
            你可以輸入「月花費」或「年花費」，系統會自動換算。
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Expense Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <Collapsible
              open={openCategories.has(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {openCategories.has(category.id) ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{category.nameZh}</CardTitle>
                        <CardDescription>{category.name}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">年度小計</p>
                      <p className="text-lg font-semibold text-foreground">
                        {formatCurrency(category.yearlySubtotal)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 gap-4 border-b border-border pb-4 last:border-0 last:pb-0 md:grid-cols-[1fr,150px,150px]"
                      >
                        <div className="flex flex-col justify-center">
                          <p className="font-medium text-foreground">{item.nameZh}</p>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">月花費</Label>
                          <Input
                            type="text"
                            value={item.monthlyAmount === 0 ? '' : formatNumber(item.monthlyAmount)}
                            onChange={(e) =>
                              updateItemAmount(category.id, item.id, 'monthly', e.target.value)
                            }
                            placeholder="0"
                            className="text-right font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">年花費</Label>
                          <Input
                            type="text"
                            value={item.yearlyAmount === 0 ? '' : formatNumber(item.yearlyAmount)}
                            onChange={(e) =>
                              updateItemAmount(category.id, item.id, 'yearly', e.target.value)
                            }
                            placeholder="0"
                            className="text-right font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Target Years Slider */}
      <Card>
        <CardHeader>
          <CardTitle>財富自由年數設定</CardTitle>
          <CardDescription>
            設定你希望用多少年的支出作為財富自由目標
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>目標年數</Label>
              <span className="text-lg font-medium text-accent">{targetYears} 年</span>
            </div>
            <Slider
              value={[targetYears]}
              onValueChange={(value) => setTargetYears(value[0])}
              min={1}
              max={40}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              4% 提領率相當於 25 年支出，3% 提領率相當於 33 年支出
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            計算結果
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">各分類年度支出</p>
              <div className="grid gap-2">
                {categories
                  .filter((cat) => cat.yearlySubtotal > 0)
                  .map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{cat.nameZh}</span>
                      <span className="font-mono text-muted-foreground">
                        {formatCurrency(cat.yearlySubtotal)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Totals */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-background p-4">
                <p className="text-sm text-muted-foreground">年度總支出</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalAnnualExpenses)}
                </p>
                <p className="text-xs text-muted-foreground">
                  每月約 {formatCurrency(Math.round(totalAnnualExpenses / 12))}
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  財富自由目標（{targetYears} 年支出）
                </p>
                <p className="text-2xl font-bold text-accent">
                  {formatCurrency(fiTarget)}
                </p>
                <p className="text-xs text-muted-foreground">
                  相當於 {(100 / targetYears).toFixed(1)}% 提領率
                </p>
              </div>
            </div>

            {/* Assumptions */}
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium text-foreground">計算假設</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- 財富自由目標 = 年支出 × {targetYears} 年</li>
                <li>- 此金額可提供 {targetYears} 年的生活費用</li>
                <li>- 若有投資報酬，實際可維持的時間會更長</li>
              </ul>
            </div>

            {/* Reset Button */}
            <Button variant="outline" onClick={resetAll} className="w-full bg-transparent">
              重置所有數值
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
