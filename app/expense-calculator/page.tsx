import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExpenseCalculator } from "@/components/expense-calculator";

export const metadata: Metadata = {
  title: "支出計算器 | 財富自由計算器",
  description:
    "系統性盤點你的各項支出，計算年度總支出，並依據提領率計算你的財富自由目標金額。",
};

export default function ExpenseCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-card py-12">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              支出盤點計算器
            </h1>
            <p className="text-lg text-muted-foreground">
              系統性盤點你的支出，計算財富自由需要多少錢
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4">
            <ExpenseCalculator />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
