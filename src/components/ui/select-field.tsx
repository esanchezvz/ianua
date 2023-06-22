import { Control, Controller, FieldValues } from 'react-hook-form'

import { cn } from '@/utils'

import { Select } from './select'

type SelectFieldProps = {
  control: Control<FieldValues>
  name: string
  hint?: string
} & React.ComponentProps<typeof Select>

export const SelectField = ({ control, name, hint, fullWidth = true, ...props }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={cn('grid grow items-center gap-1.5')}>
            <Select fullWidth={fullWidth} {...props} {...field} />

            {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
            {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
          </div>
        )
      }}
    />
  )
}
