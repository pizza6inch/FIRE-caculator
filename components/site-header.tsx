"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            財富自由計算器
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            href="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            首頁
          </Link>
          <Link 
            href="/calculator" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FI 計算器
          </Link>
          <Link 
            href="/savings-calculator" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            儲蓄計算器
          </Link>
          <Link 
            href="/expense-calculator" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            支出計算器
          </Link>
          <Link 
            href="/methodology" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            計算原理
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href="/calculator">開始計算</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            <Link 
              href="/" 
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              首頁
            </Link>
            <Link 
              href="/calculator" 
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              FI 計算器
            </Link>
            <Link 
              href="/savings-calculator" 
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              儲蓄計算器
            </Link>
            <Link 
              href="/expense-calculator" 
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              支出計算器
            </Link>
            <Link 
              href="/methodology" 
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              計算原理
            </Link>
            <Button asChild className="mt-2">
              <Link href="/calculator" onClick={() => setMobileMenuOpen(false)}>
                開始計算
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
