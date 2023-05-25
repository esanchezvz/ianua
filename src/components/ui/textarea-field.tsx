import { forwardRef } from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/utils'

import { Textarea } from './textarea'

type WithLabelProps = { label: string; id: string } | { label?: undefined; id?: undefined }

type TextareaFieldProps = WithLabelProps & {
  hint?: string
  error?: string
} & React.ComponentProps<typeof Textarea>

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, hint, error, id, className, ...props }, ref) => {
    return (
      <div className={cn('grid grow items-center gap-1.5', className)}>
        {label ? <Label htmlFor={id}>{label}</Label> : null}
        <Textarea id={id} {...props} ref={ref} />
        {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
        {error ? <small className="text-sm text-red-400">{error}</small> : null}
      </div>
    )
  }
)

TextareaField.displayName = 'TextAreaField'
