import { get } from 'lodash'
import { Control, Controller, FieldValues } from 'react-hook-form'

import { cn } from '@/utils'

import { Select, SelectOption } from './select'

type SelectFieldProps = {
  control: Control<FieldValues>
  name: string
  hint?: string
} & React.ComponentProps<typeof Select>

const booleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Sí' },
]

const getSelectDefaultValue = (options: SelectOption[], multiple: boolean, value?: string | string[]) => {
  if (multiple) {
    return options.filter((o) => value?.includes(o.value)) ?? undefined
  }

  if (typeof value === 'boolean') {
    if (!value) return booleanOptions.find((o) => o.value === '0')
    return booleanOptions.find((o) => o.value === '1')
  }

  return options.find((o) => value?.includes(o.value)) ?? undefined
}

export const SelectField = ({ control, name, hint, fullWidth = true, ...props }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { defaultValues }, fieldState: { error } }) => {
        return (
          <div className={cn('grid grow items-center gap-1.5')}>
            <Select
              fullWidth={fullWidth}
              {...props}
              {...field}
              defaultSelected={getSelectDefaultValue(
                props.options,
                props.multiple ?? false,
                get(defaultValues, name) as any
              )}
            />

            {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
            {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
          </div>
        )
      }}
    />
  )
}
