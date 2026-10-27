'use client'

import { useState } from 'react'
import { ArrowRight, Check, Copy, PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildShareText, formatYen, type SettlementResult } from '@/lib/settlement'

export function ResultView({ result }: { result: SettlementResult }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildShareText(result))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-labelledby="result-heading" className="flex flex-col gap-4">
      <h2 id="result-heading" className="sr-only">
        計算結果
      </h2>

      <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-sm">
        <p className="text-sm opacity-90">1人あたりの負担額</p>
        <p className="mt-1 text-4xl font-bold tracking-tight tabular-nums">
          {formatYen(result.share)}
        </p>
        <p className="mt-2 text-xs opacity-90">
          合計 {formatYen(result.total)} ÷ {result.members.length}人
          {result.unit > 1 && `（${result.unit}円単位で切り下げ）`}
        </p>
        {result.remainder > 0 && (
          <p className="mt-3 rounded-lg bg-primary-foreground/15 px-3 py-2 text-xs leading-relaxed">
            端数 <span className="font-bold">{formatYen(result.remainder)}</span> は幹事の
            <span className="font-bold"> {result.organizerName} </span>
            さんが負担します（負担額 {formatYen(result.share + result.remainder)}）
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-base font-bold">精算方法</h3>
        {result.transfers.length === 0 ? (
          <p className="flex items-center gap-2 rounded-xl bg-accent px-4 py-4 text-sm font-medium text-accent-foreground">
            <PartyPopper className="size-5" aria-hidden="true" />
            精算は不要です
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {result.transfers.map((t, i) => (
              <li
                key={`${t.from}-${t.to}-${i}`}
                className="flex items-center gap-2 rounded-xl bg-accent px-3 py-3"
              >
                <span className="min-w-0 flex-1 truncate text-right text-sm font-semibold">
                  {t.from}
                </span>
                <span className="flex shrink-0 flex-col items-center px-1">
                  <span className="text-base font-bold text-primary tabular-nums">
                    {formatYen(t.amount)}
                  </span>
                  <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold">{t.to}</span>
                <span className="sr-only">
                  {`${t.from}さんが${t.to}さんへ${formatYen(t.amount)}支払う`}
                </span>
              </li>
            ))}
          </ol>
        )}
        <Button
          type="button"
          variant="outline"
          className="mt-4 h-11 w-full"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? 'コピーしました' : '結果をコピー（LINE等で共有）'}
        </Button>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-base font-bold">メンバー別の内訳</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th scope="col" className="py-2 text-left font-medium">
                  名前
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  立替
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  負担
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  差額
                </th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m) => (
                <tr key={m.id} className="border-b last:border-0">
                  <th scope="row" className="max-w-[6rem] truncate py-2.5 text-left font-medium">
                    {m.name}
                  </th>
                  <td className="py-2.5 text-right tabular-nums">{formatYen(m.paid)}</td>
                  <td className="py-2.5 text-right tabular-nums">{formatYen(m.burden)}</td>
                  <td
                    className={
                      m.balance > 0
                        ? 'py-2.5 text-right font-semibold text-primary tabular-nums'
                        : m.balance < 0
                          ? 'py-2.5 text-right font-semibold text-destructive tabular-nums'
                          : 'py-2.5 text-right text-muted-foreground tabular-nums'
                    }
                  >
                    {m.balance > 0 ? '+' : ''}
                    {formatYen(m.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          差額がプラスの人は受け取り、マイナスの人は支払いになります。
        </p>
      </div>
    </section>
  )
}
