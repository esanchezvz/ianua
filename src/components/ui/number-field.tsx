import { Label } from '@radix-ui/react-label'
import { Control, Controller, FieldValues } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

import { cn } from '@/utils'

import { Input } from './input'

type NumberFieldProps = {
  control: Control<FieldValues>
  name: string
  label: string
  id: string
  hint?: string
} & React.ComponentProps<typeof Input>

export const NumberField = ({ control, name, hint, id, label, ...props }: NumberFieldProps) => {
  const mask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    allowNegative: false,
    allowLeadingZeroes: false,
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => {
        return (
          <div className={cn('grid grow items-center gap-1.5')}>
            {label ? <Label htmlFor={id}>{label}</Label> : null}

            <MaskedInput
              {...props}
              {...field}
              value={value as string}
              mask={mask}
              render={(inputRef: (inputElement: HTMLInputElement) => void, inputProps) => {
                const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                  inputProps.onChange(e)
                  field.onChange(e)
                }

                return (
                  <Input ref={inputRef} {...inputProps} onChange={onChange} inputMode="numeric" type="text" />
                )
              }}
            />

            {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
            {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
          </div>
        )
      }}
    />
  )
}
