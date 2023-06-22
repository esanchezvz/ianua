'use client'

import { Children, Fragment, type PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import ClassNames from 'embla-carousel-class-names'
import useEmblaCarousel, { EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel-react'

type Props = PropsWithChildren &
  EmblaOptionsType & {
    dots?: boolean
    controls?: boolean
    getCarouselApi?(embla: EmblaCarouselType | undefined): void
  }

export default function Carousel({
  controls = true,
  dots = true,
  children,
  getCarouselApi,
  ...options
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ClassNames({
      draggable: 'cursor-grab',
      dragging: 'cursor-grabbing',
    }),
  ])
  const [hovered, setHovered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const canScrollPrev = !!emblaApi?.canScrollPrev()
  const canScrollNext = !!emblaApi?.canScrollNext()

  const selectHandler = useCallback(() => {
    const index = emblaApi?.selectedScrollSnap()
    setSelectedIndex(index || 0)
    getCarouselApi?.(emblaApi)
  }, [emblaApi, getCarouselApi])

  useEffect(() => {
    emblaApi?.on('select', selectHandler)

    return () => {
      emblaApi?.off('select', selectHandler)
    }
  }, [emblaApi, selectHandler])

  return (
    <div
      className="relative overflow-hidden"
      ref={emblaRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="flex">{children}</div>

      {dots ? <Dots length={Children.count(children)} selectedIndex={selectedIndex} /> : null}

      <Controls
        canScrollNext={canScrollNext}
        canScrollPrev={canScrollPrev}
        onNext={emblaApi?.scrollNext}
        onPrev={emblaApi?.scrollPrev}
        visible={controls && hovered}
      />
    </div>
  )
}

type DotsProps = {
  length: number
  selectedIndex: number
}

function Dots({ length, selectedIndex }: DotsProps) {
  const arr = new Array(length).fill(0)

  return (
    <div className="my-2 flex -translate-y-5 justify-center gap-1">
      {arr.map((_, index) => {
        const selected = index === selectedIndex
        return (
          <span
            className={clsx({
              'h-1 rounded-full bg-white transition-all duration-200': true,
              'w-1 opacity-50': !selected,
              'w-6': selected,
            })}
            key={index}
          />
        )
      })}
    </div>
  )
}

type ControlsProps = {
  canScrollPrev: boolean
  canScrollNext: boolean
  onPrev?: () => void
  onNext?: () => void
  visible: boolean
}

function Controls({ canScrollNext, canScrollPrev, onNext, onPrev, visible }: ControlsProps) {
  return (
    <Transition show={visible}>
      <>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            type="button"
            onClick={onPrev}
            disabled={!canScrollPrev}
            className={clsx(
              'text-brandOrange hover:bg-textWhite disabled:bg-textWhite/25 disabled:hover:bg-textWhite/50 absolute left-2 top-1/2 flex -translate-y-1/2 items-center  rounded-full bg-white p-2 transition-all disabled:cursor-not-allowed',
              {
                invisible: !visible,
                visible: !!visible,
              }
            )}
          >
            <span className="sr-only">Imagen anterior</span>
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            type="button"
            onClick={onNext}
            disabled={!canScrollNext}
            className={clsx(
              'text-brandOrange hover:bg-textWhite disabled:bg-textWhite/25 disabled:hover:bg-textWhite/50 absolute right-2 top-1/2 flex -translate-y-1/2 items-center  rounded-full bg-white p-2 transition-all disabled:cursor-not-allowed',
              {
                invisible: !visible,
                visible: !!visible,
              }
            )}
          >
            <span className="sr-only">Siguiente imagen</span>
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </Transition.Child>
      </>
    </Transition>
  )
}
