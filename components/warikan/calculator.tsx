'use client'

import { useId, useRef, useState } from 'react'
import { Calculator, Minus, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  calculateSettlement,
  formatYen,
  parseAmount,
  type RoundingUnit,
  type SettlementResult,
} from '@/lib/settlement'
import { ResultView } from './result-view'

const MIN_PEOPLE = 2
const MAX_PEOPLE = 30

const ROUNDING_OPTIONS: { value: RoundingUnit; label: string; sub: string }[] = [
  { value: 1, label: '1円単位', sub: 'そのまま' },
  { value: 10, label: '10円単位', sub: '切り下げ' },
  { value: 100, label: '100円単位', sub: '切り下げ' },
]

type MemberDraft = { id: string; name: string; paid: string }

let memberSeq = 0
function createMember(): MemberDraft {
  memberSeq += 1
  return { id: `m-${memberSeq}`, name: '', paid: '' }
}

function createMembers(count: number): MemberDraft[] {
  return Array.from({ length: count }, createMember)
}

const inputClass =
  'h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20'

export function WarikanCalculator() {
  const totalId = useId()
  const peopleId = useId()
  const resultRef = useRef<HTMLDivElement>(null)

  const [total, setTotal] = useState('')
  const [people, setPeople] = useState(3)
  const [unit, setUnit] = useState<RoundingUnit>(1)
  const [members, setMembers] = useState<MemberDraft[]>(() => createMembers(3))
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SettlementResult | null>(null)

  const totalAmount = parseAmount(total)
  const paidSum = members.reduce((sum, m) => sum + parseAmount(m.paid), 0)

  function invalidate() {
    setResult(null)
    setError(null)
  }

  function changePeople(next: number) {
    const clamped = Math.min(MAX_PEOPLE, Math.max(MIN_PEOPLE, next))
    setPeople(clamped)
    setMembers((prev) =>
      clamped > prev.length
        ? [...prev, ...createMembers(clamped - prev.length)]
        : prev.slice(0, clamped),
    )
    invalidate()
  }

  function updateMember(id: string, field: 'name' | 'paid', value: string) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
    invalidate()
  }

  function setAllPaidByFirst() {
    if (totalAmount <= 0) return
    setMembers((prev) =>
      prev.map((m, i) => ({ ...m, paid: i === 0 ? String(totalAmount) : '' })),
    )
    invalidate()
  }

  function syncTotalToPaid() {
    setTotal(String(paidSum))
    invalidate()
  }

  function handleReset() {
    setTotal('')
    setPeople(3)
    setUnit(1)
    setMembers(createMembers(3))
    invalidate()
  }

  function handleCalculate() {
    if (totalAmount <= 0) {
      setError('合計金額を入力してください。')
      setResult(null)
      return
    }
    if (paidSum !== totalAmount) {
      setError(
        `立替金額の合計（${formatYen(paidSum)}）が合計金額（${formatYen(totalAmount)}）と一致しません。`,
      )
      setResult(null)
      return
    }
    setError(null)
    setResult(
      calculateSettlement(
        totalAmount,
        members.map((m) => ({ id: m.id, name: m.name, paid: parseAmount(m.paid) })),
        unit,
      ),
    )
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const diff = totalAmount - paidSum

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleCalculate()
        }}
      >
        <section className="flex flex-col gap-5 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-2">
            <label htmlFor={totalId} className="text-sm font-bold">
              合計金額
            </label>
            <div className="relative">
              <input
                id={totalId}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="例：12000"
                value={total ? Number(parseAmount(total)).toLocaleString('ja-JP') : ''}
                onChange={(e) => {
                  setTotal(String(parseAmount(e.target.value) || ''))
                  invalidate()
                }}
                className={cn(inputClass, 'pr-10 text-right text-lg font-semibold tabular-nums')}
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
                円
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={peopleId} className="text-sm font-bold">
              参加人数
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="size-12 shrink-0 rounded-xl"
                onClick={() => changePeople(people - 1)}
                disabled={people <= MIN_PEOPLE}
                aria-label="1人減らす"
              >
                <Minus className="size-5" aria-hidden="true" />
              </Button>
              <div className="relative flex-1">
                <input
                  id={peopleId}
                  type="text"
                  inputMode="numeric"
                  value={people}
                  onChange={(e) => {
                    const n = parseAmount(e.target.value)
                    if (n) changePeople(n)
                  }}
                  className={cn(inputClass, 'text-center text-lg font-semibold tabular-nums')}
                  aria-describedby={`${peopleId}-hint`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
                  人
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="size-12 shrink-0 rounded-xl"
                onClick={() => changePeople(people + 1)}
                disabled={people >= MAX_PEOPLE}
                aria-label="1人増やす"
              >
                <Plus className="size-5" aria-hidden="true" />
              </Button>
            </div>
            <p id={`${peopleId}-hint`} className="text-xs text-muted-foreground">
              {MIN_PEOPLE}〜{MAX_PEOPLE}人まで設定できます
            </p>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-bold">1人あたりの丸め方</legend>
            <div className="grid grid-cols-3 gap-2" role="radiogroup">
              {ROUNDING_OPTIONS.map((opt) => {
                const selected = unit === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setUnit(opt.value)
                      invalidate()
                    }}
                    className={cn(
                      'flex h-14 flex-col items-center justify-center rounded-xl border text-sm font-bold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-primary/30',
                      selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input bg-background text-foreground hover:bg-accent',
                    )}
                  >
                    {opt.label}
                    <span
                      className={cn(
                        'text-[11px] font-normal',
                        selected ? 'text-primary-foreground/85' : 'text-muted-foreground',
                      )}
                    >
                      {opt.sub}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              切り下げで生じた端数は、メンバー1（幹事）が負担します。
            </p>
          </fieldset>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold">各メンバーの立替金額</h2>
            <button
              type="button"
              onClick={setAllPaidByFirst}
              disabled={totalAmount <= 0}
              className="text-xs font-medium text-primary underline-offset-2 hover:underline disabled:text-muted-foreground disabled:no-underline"
            >
              幹事が全額立替
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {members.map((m, i) => (
              <li key={m.id} className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                  aria-hidden="true"
                >
                  {i === 0 ? '幹' : i + 1}
                </span>
                <input
                  type="text"
                  value={m.name}
                  onChange={(e) => updateMember(m.id, 'name', e.target.value)}
                  placeholder={i === 0 ? `メンバー1（幹事）` : `メンバー${i + 1}`}
                  aria-label={`メンバー${i + 1}の名前`}
                  maxLength={20}
                  className={cn(inputClass, 'h-11 min-w-0 flex-1 px-3 text-sm')}
                />
                <div className="relative w-[42%] shrink-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={m.paid ? parseAmount(m.paid).toLocaleString('ja-JP') : ''}
                    onChange={(e) =>
                      updateMember(m.id, 'paid', String(parseAmount(e.target.value) || ''))
                    }
                    placeholder="0"
                    aria-label={`メンバー${i + 1}の立替金額`}
                    className={cn(inputClass, 'h-11 pr-8 pl-3 text-right text-sm tabular-nums')}
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                    円
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm',
              totalAmount > 0 && diff === 0
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground',
            )}
            aria-live="polite"
          >
            <span>立替合計</span>
            <span className="font-semibold tabular-nums">
              {formatYen(paidSum)}
              {totalAmount > 0 && diff !== 0 && (
                <span className="ml-1 text-xs font-normal">
                  （{diff > 0 ? `残り${formatYen(diff)}` : `${formatYen(-diff)}超過`}）
                </span>
              )}
            </span>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            <p>{error}</p>
            {paidSum > 0 && totalAmount !== paidSum && (
              <button
                type="button"
                onClick={syncTotalToPaid}
                className="self-start text-xs font-semibold underline underline-offset-2"
              >
                合計金額を立替合計（{formatYen(paidSum)}）に合わせる
              </button>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-14 w-14 shrink-0 rounded-xl"
            onClick={handleReset}
            aria-label="入力をリセット"
          >
            <RotateCcw className="size-5" aria-hidden="true" />
          </Button>
          <Button type="submit" className="h-14 flex-1 rounded-xl text-base font-bold shadow-sm">
            <Calculator className="size-5" aria-hidden="true" />
            計算する
          </Button>
        </div>
      </form>

      <div ref={resultRef} className="scroll-mt-4" aria-live="polite">
        {result && (
          <>
            <ResultView result={result} />
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              ※本ツールの計算結果は目安です。実際の精算時には丸め誤差等をご確認の上ご利用ください。当サイトの利用により生じたトラブルや損害について、運営者は一切の責任を負いかねます。
            </p>
          </>
        )}
      </div>
    </div>
  )
}
