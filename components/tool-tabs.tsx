'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Percent, Scale, Wallet, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const TOOLS = [
  { href: '/', label: '割り勘', icon: Wallet },
  { href: '/tanka', label: '単価比較', icon: Scale },
  { href: '/waribiki', label: '割引計算', icon: Percent },
  { href: '/jikyuhanzan', label: '時給換算', icon: Clock },
]

export function ToolTabs() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="ツール切り替え"
      className="sticky top-0 z-20 -mx-4 bg-muted/80 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-muted/60"
    >
      <ul className="grid grid-cols-4 gap-1 rounded-2xl border bg-card p-1 shadow-sm">
        {TOOLS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}