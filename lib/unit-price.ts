export type UnitId = 'g' | 'kg' | 'ml' | 'L' | '個' | '枚' | '本' | 'ロール' | 'm'

type UnitDef = { label: string; base: string; factor: number; displayAmount: number }

export const UNITS: Record<UnitId, UnitDef> = {
  g: { label: 'g', base: 'g', factor: 1, displayAmount: 100 },
  kg: { label: 'kg', base: 'g', factor: 1000, displayAmount: 100 },
  ml: { label: 'ml', base: 'ml', factor: 1, displayAmount: 100 },
  L: { label: 'L', base: 'ml', factor: 1000, displayAmount: 100 },
  個: { label: '個', base: '個', factor: 1, displayAmount: 1 },
  枚: { label: '枚', base: '枚', factor: 1, displayAmount: 1 },
  本: { label: '本', base: '本', factor: 1, displayAmount: 1 },
  ロール: { label: 'ロール', base: 'ロール', factor: 1, displayAmount: 1 },
  m: { label: 'm', base: 'm', factor: 1, displayAmount: 1 },
}

export const UNIT_IDS = Object.keys(UNITS) as UnitId[]

export type ProductInput = { price: string; quantity: string; unit: UnitId }

export type ProductResult = {
  perBase: number
  perDisplay: number
}

export type CompareResult =
  | { ok: false; errors: string[] }
  | {
      ok: true
      base: string
      displayAmount: number
      a: ProductResult
      b: ProductResult
      winner: 'a' | 'b' | 'even'
      percent: number
      savingPerDisplay: number
    }

export function parseNumber(raw: string): number {
  const normalized = raw
    .replace(/[０-９．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[,，\s円]/g, '')
  if (normalized === '') return Number.NaN
  return Number(normalized)
}

function validate(label: string, input: ProductInput, errors: string[]) {
  const price = parseNumber(input.price)
  const quantity = parseNumber(input.quantity)
  if (!Number.isFinite(price) || price <= 0) errors.push(`${label}の価格を正しく入力してください`)
  if (!Number.isFinite(quantity) || quantity <= 0) errors.push(`${label}の容量・数量を正しく入力してください`)
  return { price, quantity }
}

export function compareProducts(a: ProductInput, b: ProductInput): CompareResult {
  const errors: string[] = []
  const pa = validate('商品A', a, errors)
  const pb = validate('商品B', b, errors)
  const ua = UNITS[a.unit]
  const ub = UNITS[b.unit]
  if (ua.base !== ub.base) {
    errors.push(`単位の種類が異なるため比較できません（${ua.label} と ${ub.label}）`)
  }
  if (errors.length > 0) return { ok: false, errors }

  const toResult = (price: number, quantity: number, unit: UnitDef): ProductResult => {
    const perBase = price / (quantity * unit.factor)
    return { perBase, perDisplay: perBase * unit.displayAmount }
  }

  const ra = toResult(pa.price, pa.quantity, ua)
  const rb = toResult(pb.price, pb.quantity, ub)

  const isEven = Math.abs(ra.perBase - rb.perBase) < 1e-9 * Math.max(ra.perBase, rb.perBase)
  const winner = isEven ? 'even' : ra.perBase < rb.perBase ? 'a' : 'b'
  const cheap = Math.min(ra.perDisplay, rb.perDisplay)
  const expensive = Math.max(ra.perDisplay, rb.perDisplay)

  return {
    ok: true,
    base: ua.base,
    displayAmount: ua.displayAmount,
    a: ra,
    b: rb,
    winner,
    percent: isEven ? 0 : ((expensive - cheap) / expensive) * 100,
    savingPerDisplay: isEven ? 0 : expensive - cheap,
  }
}

export function formatYen(value: number) {
  const digits = value >= 100 ? 1 : 2
  return value.toLocaleString('ja-JP', { minimumFractionDigits: 0, maximumFractionDigits: digits })
}
