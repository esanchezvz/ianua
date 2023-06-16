type Props = {
  message: string
  variant?: 'light' | 'dark'
}

import Image from 'next/image'

import { cn } from '@/utils'

export const PachonMessage = ({ message, variant = 'dark' }: Props) => {
  const src = variant === 'dark' ? '/pachon.png' : '/pachon_light.png'

  return (
    <div className="m-auto flex w-full max-w-[max-content] flex-col pr-[140px]">
      <MessageBubble
        message={message}
        className={cn('w-64 translate-x-[140px]', {
          'bg-blue text-white': variant === 'dark',
          'bg-white text-blue before:border-white before:border-b-transparent before:border-r-transparent':
            variant === 'light',
        })}
      />
      <Image src={src} alt="Pachon" width={240} height={250} />
    </div>
  )
}

const MessageBubble = ({ message, className }: { message: string; className?: string }) => {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-white p-5 text-center before:absolute before:bottom-[-24px] before:left-[32px] before:border-b-[20px] before:border-l-[24px]  before:border-r-[12px]  before:border-t-[12px] before:border-b-transparent before:border-l-blue before:border-r-transparent  before:border-t-blue before:content-['']",
        className
      )}
    >
      <h3>{message}</h3>
    </div>
  )
}
