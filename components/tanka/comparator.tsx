'use client'

import { useState } from 'react'
import { AlertCircle, Calculator, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  type CompareResult,
  type ProductInput,
  type UnitId,
  UNIT_IDS,
  compareProducts,
} from '@/lib/unit-price'
import { ComparisonResult } from './comparison-result'

const EMPTY: ProductInput = { price: '', quantity: '', unit: 'g' }

const fieldClass =
  'w-full min-w-0 rounded-xl border bg-background px-3 py-3 text-base tabular-nums outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30'

type ProductCardProps = {
  id: 'a' | 'b'
  value: ProductInput
  onChange: (next: ProductInput) => void
}

function ProductCard({ id, value, onChange }: ProductCardProps) {
  const label = id === 'a' ? 'A' : 'B'
  return (
    <fieldset className="flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm">
      <legend className="sr-only">商品{label}</legend>
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
          {label}
        </span>
        <span className="text-sm font-bold">商品{label}</span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`price-${id}`} className="text-xs font-semibold text-muted-foreground">
          価格（円）
        </label>
        <div className="relative">
          <input
            id={`price-${id}`}
            inputMode="decimal"
            autoComplete="off"
            placeholder="298"
            value={value.price}
            onChange={(e) => onChange({ ...value, price: e.target.value })}
            className={`${fieldClass} pr-8`}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            円
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`qty-${id}`} className="text-xs font-semibold text-muted-foreground">
          容量・数量
        </label>
        <input
          id={`qty-${id}`}
          inputMode="decimal"
          autoComplete="off"
          placeholder={id === 'a' ? '500' : '1'}
          value={value.quantity}
          onChange={(e) => onChange({ ...value, quantity: e.target.value })}
          className={fieldClass}
        />
        <label htmlFor={`unit-${id}`} className="sr-only">
          商品{label}の単位
        </label>
        <select
          id={`unit-${id}`}
          value={value.unit}
          onChange={(e) => onChange({ ...value, unit: e.target.value as UnitId })}
          className={`${fieldClass} py-2.5`}
        >
          {UNIT_IDS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  )
}

export function UnitPriceComparator() {
  const [a, setA] = useState<ProductInput>(EMPTY)
  const [b, setB] = useState<ProductInput>(EMPTY)
  const [result, setResult] = useState<CompareResult | null>(null)

  function update(setter: (v: ProductInput) => void) {
    return (next: ProductInput) => {
      setter(next)
      setResult(null)
    }
  }

  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResult(compareProducts(a, b))
  }

  function handleClear() {
    setA(EMPTY)
    setB(EMPTY)
    setResult(null)
  }

  return (
    <section aria-label="単価比較" className="flex flex-col gap-4">
      <form onSubmit={handleCalculate} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <ProductCard id="a" value={a} onChange={update(setA)} />
          <ProductCard id="b" value={b} onChange={update(setB)} />
        </div>
        <p className="text-xs text-muted-foreground">
          {'※ g と kg、ml と L は自動で換算して比較します。'}
        </p>
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
          <div role="alert" className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <ul className="flex flex-col gap-1">
              {result.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {result?.ok && <ComparisonResult result={result} />}
        {result?.ok && (
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            ※本ツールの計算結果は目安です。実際の価格や内容量は店頭の表示をご確認の上ご利用ください。当サイトの利用により生じたトラブルや損害について、運営者は一切の責任を負いかねます。
          </p>
        )}
      </div>
    </section>
  )
}
