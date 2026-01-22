import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SavingsCalculator } from "@/components/savings-calculator";

export const metadata: Metadata = {
  title: "儲蓄計算器 | 財富自由計算器",
  description:
    "給定財富自由目標金額，反推在不同年數內每年、每月、每週、每天需要存多少錢。使用複利模型計算你的儲蓄計劃。",
};

export default function SavingsCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              儲蓄計算器
            </h1>
            <p className="text-lg text-muted-foreground">
              設定你的財富自由目標，看看需要存多少錢才能達成
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4">
            <SavingsCalculator />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
