import { Control, Controller, FieldValues } from 'react-hook-form'

import { cn } from '@/utils'

import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { SelectOption } from './select'

type RadioGroupfieldProps = {
  control: Control<FieldValues>
  name: string
  options: SelectOption[]
  label?: string
  hint?: string
} & React.ComponentProps<typeof RadioGroup>

export const RadioGroupField = ({ control, name, label, hint, options, ...props }: RadioGroupfieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('grid grow items-center gap-1.5')}>
          {label ? <Label htmlFor={field.name}>{label}</Label> : null}

          <RadioGroup
            {...props}
            ref={field.ref}
            id={field.name}
            name={field.name}
            onBlur={field.onBlur}
            className="w-full"
            onValueChange={(val) => {
              isNaN(Number(val)) ? field.onChange(val) : field.onChange(Number(val))
            }}
            value={String(field.value)}
          >
            <div className="mt-2 flex items-center gap-5">
              {options.map((o) => {
                const id = `radio-${name ? name : ''}-${o.value}`
                return (
                  <div key={o.value} className="flex items-center gap-3">
                    <RadioGroupItem id={id} value={o.value} />
                    <Label htmlFor={id}>{o.label}</Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>

          {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
          {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
        </div>
      )}
    />
  )
}
