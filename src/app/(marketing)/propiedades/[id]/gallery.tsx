/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { Fragment, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import Carousel from '@/components/ui/carousel'
import { cn } from '@/utils'

export const Gallery = ({ images }: { images: string[] }) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div className="flex w-full gap-5 overflow-hidden rounded-xl">
        <div className="w-3/4">
          <img
            onClick={() => setModalOpen(true)}
            src={images[0]}
            alt="Imagen 1"
            className="h-full cursor-pointer object-cover object-center"
          />
        </div>

        <div className="relative flex w-1/4 flex-col gap-5">
          <img
            onClick={() => setModalOpen(true)}
            src={images[1]}
            alt="Imagen 2"
            className="grow cursor-pointer object-cover"
          />
          <img
            onClick={() => setModalOpen(true)}
            src={images[2]}
            alt="Imagen 3"
            className="grow cursor-pointer object-cover"
          />
        </div>
      </div>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} images={images} />
    </>
  )
}

type ModalProps = {
  opened: boolean
  onClose: () => void
  className?: string
  initialFocus?: React.MutableRefObject<HTMLElement | null>
  closeOnEscape?: boolean
  images: string[]
}

function Modal({ onClose, opened, className, initialFocus, closeOnEscape = true, images }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Transition appear show={opened} as={Fragment}>
        <Dialog
          static
          as="div"
          className="relative z-50"
          onClose={closeOnEscape ? onClose : () => {}}
          initialFocus={initialFocus || closeRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={cn('fixed inset-0 z-50 bg-blue/80 backdrop-blur-sm')} aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <button
                type="button"
                ref={closeRef}
                className="absolute right-0 top-0 rounded-md p-2.5 text-white"
                onClick={onClose}
              >
                <span className="sr-only">Cerrar modal</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cn('relative max-h-[85%] w-full overflow-auto transition-all', className)}
                >
                  <div>
                    <Carousel>
                      {images.map((src) => (
                        <Slide src={src} key={src} />
                      ))}
                    </Carousel>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function Slide({ src }: { src: string }) {
  return (
    <div className="relative my-4 mr-4 h-[80vh] w-full max-w-[1200px] flex-[0_0_100%] overflow-hidden">
      <Image
        src={`${src}?width=1200&resize=contain&quality=60`}
        fill
        className="object-contain object-center"
        alt=""
        loading="eager"
      />
    </div>
  )
}
