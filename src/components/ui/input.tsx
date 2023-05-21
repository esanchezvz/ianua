import { forwardRef } from 'react'

import { cn } from '@/utils'

type InputIcon = React.FC<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>

export type InputProps = {
  leadingIcon?: InputIcon
  trailingIcon?: InputIcon
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leadingIcon: LeadingIcon, trailingIcon: TrailingIcon, ...props }, ref) => {
    return (
      <div className="relative rounded-md">
        {LeadingIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LeadingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        ) : null}
        <input
          className={cn(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
            className,
            {
              'pl-10': !!LeadingIcon,
              'pr-10': !!TrailingIcon,
            }
          )}
          ref={ref}
          {...props}
        />

        {TrailingIcon ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <TrailingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
