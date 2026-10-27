import { Crown, Equal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type CompareResult, formatYen } from '@/lib/unit-price'

type OkResult = Extract<CompareResult, { ok: true }>

export function ComparisonResult({ result }: { result: OkResult }) {
  const unitLabel = `${result.displayAmount === 1 ? '1' : result.displayAmount}${result.base}あたり`
  const winnerLabel = result.winner === 'a' ? 'A' : 'B'

  return (
    <div className="flex flex-col gap-3" id="result">
      <h2 className="sr-only">比較結果</h2>
      {result.winner === 'even' ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-foreground p-5 text-background">
          <Equal className="size-6" aria-hidden="true" />
          <p className="text-lg font-bold">どちらも同じ単価です</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-primary p-5 text-center text-primary-foreground shadow-md">
          <p className="text-sm font-semibold opacity-90">お買い得なのは</p>
          <p className="text-3xl font-bold">商品{winnerLabel}</p>
          <p className="mt-1 text-lg font-bold">
            <span className="text-4xl tabular-nums">{result.percent.toFixed(1)}</span>% お得
          </p>
          <p className="text-sm opacity-90">
            {unitLabel} <span className="font-bold tabular-nums">{formatYen(result.savingPerDisplay)}</span> 円安い
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {(['a', 'b'] as const).map((key) => {
          const item = result[key]
          const isWinner = result.winner === key
          return (
            <div
              key={key}
              className={cn(
                'relative flex flex-col gap-1 rounded-2xl border-2 bg-card p-3',
                isWinner ? 'border-primary bg-primary/5' : 'border-border',
              )}
            >
              {isWinner && (
                <span className="absolute -top-2.5 right-2 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                  <Crown className="size-3" aria-hidden="true" />
                  お得
                </span>
              )}
              <p className="text-sm font-bold">商品{key.toUpperCase()}</p>
              <p className="text-xs text-muted-foreground">{unitLabel}</p>
              <p className={cn('text-2xl font-bold tabular-nums', isWinner && 'text-primary')}>
                {formatYen(item.perDisplay)}
                <span className="ml-0.5 text-sm font-semibold">円</span>
              </p>
              {result.displayAmount !== 1 && (
                <p className="text-xs text-muted-foreground tabular-nums">
                  1{result.base}あたり {formatYen(item.perBase)}円
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
