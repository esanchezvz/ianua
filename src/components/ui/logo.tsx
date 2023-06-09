import clsx from 'clsx'
import Image from 'next/image'

import { cn } from '@/utils'

type Props = {
  variant?: 'light' | 'default'
  letters?: boolean
  className?: string
}

export default function Logo({ className, letters, variant = 'default' }: Props) {
  const height = letters ? 264 : 515
  const width = 834

  const name = `logo${letters ? '_letters' : ''}${variant === 'light' ? '_light' : ''}.png`

  return (
    <Image
      src={`/${name}`}
      width={width}
      height={height}
      className={cn('h-8 w-auto', className)}
      alt="Ianua"
      priority
    />
  )
}
