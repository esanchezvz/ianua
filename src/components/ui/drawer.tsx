import { Fragment, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { cn } from '@/utils'

type ModalProps = {
  opened: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  initialFocus?: React.MutableRefObject<HTMLElement | null>
  closeOnEscape?: boolean
}

export default function Drawer({
  onClose,
  opened,
  title,
  children,
  className,
  initialFocus,
  closeOnEscape = true,
}: ModalProps) {
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
            <div className={cn('fixed inset-0 z-50 bg-blue/25 backdrop-blur-sm')} aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex h-screen items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel
                  className={cn(
                    'absolute right-0 top-0 h-full w-96 max-w-3xl overflow-auto bg-white p-6 text-left align-middle shadow-xl transition-all',
                    className
                  )}
                >
                  <button
                    type="button"
                    ref={closeRef}
                    className="absolute right-0 top-0 rounded-md p-2.5 text-gray-900"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar Panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Dialog.Title
                    as="h3"
                    className="mb-5 w-full pt-3 text-xl font-medium leading-6 text-gray-900"
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {title}
                  </Dialog.Title>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
