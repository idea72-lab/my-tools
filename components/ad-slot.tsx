import { cn } from '@/lib/utils'

type AdSlotProps = {
  position: 'top' | 'bottom'
  className?: string
}

export function AdSlot({ position, className }: AdSlotProps) {
  return (
    <aside
      aria-label="広告"
      data-ad-position={position}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 bg-neutral-100 text-neutral-400',
        position === 'top' ? 'min-h-[100px]' : 'min-h-[250px]',
        className,
      )}
    >
      <span className="text-[10px] font-medium tracking-widest">スポンサーリンク</span>
      <span className="text-xs">
        {position === 'top' ? '広告枠（320×100）' : '広告枠（300×250）'}
      </span>
    </aside>
  )
}
