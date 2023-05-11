'use client'

import { Fragment, useEffect, useRef, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

import { arrayEquals, cn } from '@/utils'

export type SelectOption = {
  id: string
  label: string
}

type SelectProps = {
  options: SelectOption[]
  defaultSelected?: SelectOption
  label?: string
  multiple?: boolean
  fullWidth?: boolean
  onChange?: (value: SelectOption[]) => void | ((value: SelectOption) => void)
  name?: string
}

export default function Select({
  options,
  defaultSelected,
  label,
  multiple,
  fullWidth,
  onChange,
  name,
}: SelectProps) {
  const [selected, setSelected] = useState<SelectOption | SelectOption[] | null>(
    defaultSelected ?? multiple ? [] : { id: '', label: 'Selecciona una opción.' }
  )
  const selectedRef = useRef(selected)

  useEffect(() => {
    if (multiple && !arrayEquals(selected as SelectOption[], selectedRef.current as SelectOption[])) {
      onChange?.(selected as SelectOption[])
      selectedRef.current = selected
    }

    if (!multiple && (selectedRef.current as SelectOption).id !== (selected as SelectOption).id) {
      onChange?.(selected as SelectOption[])
      selectedRef.current = selected
    }
  }, [selected, onChange, multiple])

  return (
    <Listbox value={selected} onChange={setSelected} multiple={multiple} name={name}>
      {({ open }) => (
        <>
          {label ? (
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </Listbox.Label>
          ) : null}
          <div className="relative">
            <Listbox.Button
              className={cn(
                'focus:ring-brandGreen relative h-[36px] w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6',
                fullWidth ? 'max-w-full' : 'max-w-md'
              )}
            >
              <span className="block truncate">
                {Array.isArray(selected) ? selected.map((o) => o.label).join(', ') : selected?.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={cn(
                  'absolute z-10 my-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                  fullWidth ? 'max-w-full' : 'max-w-md'
                )}
              >
                {options.map((o) => (
                  <Listbox.Option
                    key={o.id}
                    className={({ active }) =>
                      cn(
                        active ? 'bg-brandGreen text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={o}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={cn(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {o?.label}
                        </span>

                        {selected ? (
                          <span
                            className={cn(
                              active ? 'text-white' : 'text-brandGreen',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
