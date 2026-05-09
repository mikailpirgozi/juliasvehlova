import { Heart } from '@untitledui/icons'
import {
  applyDiscountToPrice,
  getActiveMothersDayPromo,
  MOTHERS_DAY_DISCOUNT_PERCENT,
} from '@/lib/promotions'

type Variant = 'inline' | 'card' | 'hero'

interface ServicePriceDisplayProps {
  serviceId: string
  price: string
  variant?: Variant
  className?: string
}

/**
 * Zobrazí cenu služby. Ak je aktívna akcia (Deň matiek) a služba je zaradená,
 * zobrazí preškrtnutú pôvodnú cenu, novú zľavnenú cenu a badge s percentom.
 *
 * Variants:
 *  - `inline`  → kompaktné horizontálne usporiadanie (v cenníkových kartách)
 *  - `card`    → väčšia veľkosť, zachová text-right zarovnanie
 *  - `hero`    → veľká cena pre detail page
 */
export function ServicePriceDisplay({
  serviceId,
  price,
  variant = 'inline',
  className = '',
}: ServicePriceDisplayProps) {
  const promo = getActiveMothersDayPromo(serviceId)
  const discount = promo
    ? applyDiscountToPrice(price, MOTHERS_DAY_DISCOUNT_PERCENT)
    : null

  if (!discount) {
    return (
      <p
        className={`font-bold text-gray-900 ${
          variant === 'hero'
            ? 'text-3xl'
            : variant === 'card'
              ? 'text-xl sm:text-2xl'
              : 'text-xl sm:text-2xl'
        } ${className}`}
      >
        {price}
      </p>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold tracking-[0.18em] text-brand-700 uppercase">
          <Heart className="h-3 w-3 fill-brand-600 text-brand-600" />
          Deň matiek · −{discount.discountPercent}%
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-brand-700">
            {discount.discounted}
          </span>
          <span className="text-lg font-medium text-gray-400 line-through">
            {discount.original}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-brand-700 uppercase">
        <Heart className="h-2.5 w-2.5 fill-brand-600 text-brand-600" />
        −{discount.discountPercent}%
      </span>
      <div className="flex items-baseline gap-2">
        <span
          className={`font-bold text-brand-700 ${
            variant === 'card' ? 'text-xl sm:text-2xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {discount.discounted}
        </span>
        <span className="text-sm font-medium text-gray-400 line-through">
          {discount.original}
        </span>
      </div>
    </div>
  )
}
