'use client'

import { useState } from 'react'
import { AlertCircle, ArrowDown, Calculator, RotateCcw, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type DiscountInput, type DiscountResult, calculateDiscount, formatYen } from '@/lib/discount'

const EMPTY: DiscountInput = { price: '', rate: '', extraRate: '' }
const RATE_PRESETS = [10, 20, 30, 40, 50]
const EXTRA_PRESETS = [5, 10, 20]

const fieldClass =
  'w-full min-w-0 rounded-xl border bg-background px-3 py-3 text-base tabular-nums outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30'

type RateFieldProps = {
  id: string
  label: string
  hint?: string
  value: string
  presets: number[]
  onChange: (value: string) => void
}

function RateField({ id, label, hint, value, presets, onChange }: RateFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {hint && <span className="ml-1 text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} pr-16`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
          ％OFF
        </span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={`${label}のワンタップ入力`}>
        {presets.map((p) => {
          const selected = value === String(p)
          return (
            <button
              key={p}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? '' : String(p))}
              className={cn(
                'h-10 min-w-14 flex-1 rounded-full border px-3 text-sm font-bold tabular-nums transition-colors',
                selected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card hover:border-primary/50 hover:bg-primary/5',
              )}
            >
              {p}%
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResultCard({ result }: { result: Extract<DiscountResult, { ok: true }> }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col items-center gap-1 bg-primary px-4 py-5 text-primary-foreground">
        <span className="text-xs font-semibold opacity-90">割引後の価格</span>
        <p className="text-4xl font-extrabold tabular-nums">
          {formatYen(result.finalPrice)}
          <span className="ml-1 text-lg font-bold">円</span>
        </p>
        <p className="text-xs opacity-90 tabular-nums">
          元の価格 <span className="line-through">{formatYen(result.originalPrice)}円</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-b px-4 py-4">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Tag className="size-4 text-primary" aria-hidden="true" />
          お得になった金額
        </span>
        <span className="text-right">
          <span className="block text-2xl font-extrabold text-primary tabular-nums">
            {formatYen(result.savedAmount)}円
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            実質 {result.effectiveRate}％OFF
          </span>
        </span>
      </div>

      <ol className="flex flex-col gap-1 px-4 py-4 text-sm" aria-label="計算の内訳">
        <li className="flex justify-between tabular-nums">
          <span className="text-muted-foreground">元の価格</span>
          <span>{formatYen(result.originalPrice)}円</span>
        </li>
        {result.rate > 0 && (
          <>
            <li className="flex justify-center text-muted-foreground" aria-hidden="true">
              <ArrowDown className="size-4" />
            </li>
            <li className="flex justify-between tabular-nums">
              <span className="text-muted-foreground">{result.rate}％OFF後</span>
              <span>{formatYen(result.afterFirst)}円</span>
            </li>
          </>
        )}
        {result.extraRate > 0 && (
          <>
            <li className="flex justify-center text-muted-foreground" aria-hidden="true">
              <ArrowDown className="size-4" />
            </li>
            <li className="flex justify-between font-bold tabular-nums">
              <span>さらに{result.extraRate}％OFF後</span>
              <span>{formatYen(result.finalPrice)}円</span>
            </li>
          </>
        )}
      </ol>
    </div>
  )
}

export function DiscountCalculator() {
  const [input, setInput] = useState<DiscountInput>(EMPTY)
  const [result, setResult] = useState<DiscountResult | null>(null)

  function update(patch: Partial<DiscountInput>) {
    setInput((prev) => ({ ...prev, ...patch }))
    setResult(null)
  }

  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResult(calculateDiscount(input))
  }

  function handleClear() {
    setInput(EMPTY)
    setResult(null)
  }

  return (
    <section aria-label="割引・セール価格計算" className="flex flex-col gap-4">
      <form onSubmit={handleCalculate} className="flex flex-col gap-5 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <label htmlFor="original-price" className="text-sm font-semibold">
            元の価格（円）
          </label>
          <div className="relative">
            <input
              id="original-price"
              inputMode="decimal"
              autoComplete="off"
              placeholder="5,980"
              value={input.price}
              onChange={(e) => update({ price: e.target.value })}
              className={`${fieldClass} pr-8 text-lg font-bold`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
              円
            </span>
          </div>
        </div>

        <RateField
          id="discount-rate"
          label="割引率"
          value={input.rate}
          presets={RATE_PRESETS}
          onChange={(rate) => update({ rate })}
        />

        <RateField
          id="extra-rate"
          label="さらに追加割引"
          hint="（任意）"
          value={input.extraRate}
          presets={EXTRA_PRESETS}
          onChange={(extraRate) => update({ extraRate })}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="h-14 flex-1 rounded-xl text-base font-bold"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            クリア
          </Button>
          <Button type="submit" className="h-14 flex-[2] rounded-xl text-base font-bold">
            <Calculator className="size-5" aria-hidden="true" />
            計算する
          </Button>
        </div>
      </form>

      <div aria-live="polite" className="flex flex-col gap-3">
        {result && !result.ok && (
          <div
            role="alert"
            className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <ul className="flex flex-col gap-1">
              {result.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {result?.ok && <ResultCard result={result} />}
        {result?.ok && (
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            ※本ツールの計算結果は目安です。実際の販売価格は店頭・販売サイトの表示をご確認の上ご利用ください。当サイトの利用により生じたトラブルや損害について、運営者は一切の責任を負いかねます。
          </p>
        )}
      </div>
    </section>
  )
}
