'use client'

import { useMemo } from 'react'

import clsx from 'clsx'

import { StarIcon } from '@/components/ui/icons'

type ReviewProps = {
  title: string
  body: string
  author: string
  rating: number
  className?: string
} & React.HTMLAttributes<HTMLElement>

export default function Review({ title, body, author, rating, className, ...props }: ReviewProps) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[Math.floor(Math.random() * possibleAnimationDelays.length)]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">{author}</figcaption>
    </figure>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 1, 1, 1, 1].map((index) => (
        <StarIcon
          key={index}
          className={clsx('h-5 w-5', rating > index ? 'fill-cyan-500' : 'fill-gray-300')}
        />
      ))}
    </div>
  )
}
