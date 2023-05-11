import clsx from 'clsx'

type Props = { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>

export function Container({ className, children, ...props }: Props) {
  return (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
}
