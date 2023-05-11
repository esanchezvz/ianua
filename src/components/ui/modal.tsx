import { Fragment, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

type ModalProps = {
  opened: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  size?: ModalSize
  initialFocus?: React.MutableRefObject<HTMLElement | null>
}

export default function Modal({ onClose, opened, title, children, size = 'lg', initialFocus }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Transition appear show={opened} as={Fragment}>
        <Dialog
          static
          as="div"
          className="relative z-50"
          onClose={onClose}
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
            <div className="fixed inset-0 z-50 bg-blue/25 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  className={`relative max-h-[85%] w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <button
                    type="button"
                    ref={closeRef}
                    className="absolute right-0 top-0 rounded-md p-2.5 text-gray-900"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar modal</span>
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
