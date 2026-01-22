import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              財富自由計算器
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              用數學規劃你的財務自由之路。
              讓複利的力量幫助你實現人生的選擇權。
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">快速連結</h4>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                首頁
              </Link>
              <Link 
                href="/calculator" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                計算器
              </Link>
              <Link 
                href="/methodology" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                計算原理
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">關於</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              本工具僅供參考，不構成任何投資建議。
              投資有風險，請謹慎評估自身狀況。
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 財富自由計算器. 保留所有權利.</p>
        </div>
      </div>
    </footer>
  )
}
