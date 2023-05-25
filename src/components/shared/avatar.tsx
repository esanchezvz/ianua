'use client'

import { UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Avatar() {
  const { data } = useSession()

  return (
    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-light-blue">
      {data?.user.image ? (
        <Image className="object-cover" fill src={data.user.image} alt={data?.user.name || ''} />
      ) : data?.user.name ? (
        <span className="capitalize text-white">{data.user.name.substring(0, 2)}</span>
      ) : (
        <UserIcon className="h-5 w-5 text-white" />
      )}
    </div>
  )
}
