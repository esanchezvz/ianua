'use client'

import { Fragment, forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

import { Label } from '@/components/ui/label'
import { arrayEquals, cn } from '@/utils'

export type SelectOption = {
  value: string
  label: string
}

// TODO - create a better select. this one kinde sucks but works

type SelectProps = {
  options: SelectOption[]
  defaultSelected?: SelectOption
  label?: string
  multiple?: boolean
  fullWidth?: boolean
  name?: string
  disabled?: boolean
} & (
  | { multiple?: true; onChange?: (value: string[]) => void }
  | { multiple?: false; onChange?: (value: string) => void }
)
export const Select = forwardRef<HTMLElement, SelectProps>(
  ({ options, defaultSelected, label, multiple, fullWidth, onChange, name, disabled }, ref) => {
    const defaultValue = useMemo<SelectOption | SelectOption[]>(() => {
      return multiple
        ? [{ value: '', label: 'Selecciona una o más opciones' }]
        : { value: '', label: 'Selecciona una opción' }
    }, [multiple])
    const [selected, setSelected] = useState<SelectOption | SelectOption[]>(defaultSelected ?? defaultValue)
    const selectedRef = useRef(selected)

    useEffect(() => {
      if (multiple && !arrayEquals(selected as SelectOption[], selectedRef.current as SelectOption[])) {
        const includesDefault = Array.isArray(selected) && !!selected.find((s) => s.value === '')
        let copy: SelectOption[] = []
        copy = copy.concat(selected)

        if (Array.isArray(selected) && (includesDefault || !selected.length)) {
          if (includesDefault && copy.length > 1) {
            copy.splice(0, 1)
          }
          if (!copy.length) copy = defaultValue as SelectOption[]

          setSelected(copy)
        }

        onChange?.(copy.map((c) => c.value))
        selectedRef.current = selected
      }

      if (
        !multiple &&
        !Array.isArray(selected) &&
        (selectedRef.current as SelectOption).value !== (selected as SelectOption).value
      ) {
        onChange?.((selected as SelectOption).value as any)
        selectedRef.current = selected
      }
    }, [selected, onChange, multiple, defaultValue])

    return (
      <Listbox
        ref={ref}
        value={selected}
        onChange={setSelected}
        multiple={multiple}
        name={name}
        disabled={disabled}
      >
        {({ open }) => (
          <>
            {label ? <Label>{label}</Label> : null}
            <div className="relative">
              <Listbox.Button
                className={cn(
                  'relative h-[36px] w-full cursor-default rounded-md bg-[#fff] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
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
                    'absolute z-10 my-1 max-h-60 w-full overflow-auto rounded-md bg-[#fff] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                    fullWidth ? 'max-w-full' : 'max-w-md'
                  )}
                >
                  {options.map((o) => (
                    <Listbox.Option
                      key={o.value}
                      className={({ active }) =>
                        cn(
                          active ? 'bg-light-blue/30 text-blue' : 'text-gray-900',
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
                                active ? 'text-blue' : 'text-light-blue',
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
)

Select.displayName = 'Select'
