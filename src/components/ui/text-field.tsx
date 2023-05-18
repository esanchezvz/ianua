import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type WithLabelProps = { label: string; id: string } | { label?: undefined; id?: undefined }

type TextFieldProps = WithLabelProps & {
  hint?: string
  error?: string
} & React.ComponentProps<typeof Input>

export function TextField({ label, hint, error, id, ...props }: TextFieldProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input id={id} {...props} />
      <input type="" />
      {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
      {error ? <small className="text-sm text-red-400">{error}</small> : null}
    </div>
  )
}
