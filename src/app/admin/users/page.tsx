'use client'
import { useEffect, useState } from 'react'

import { Role } from '@prisma/client'

import { CreateUserForm } from '@/components/admin/create-user-form'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { roleOptions } from '@/utils/auth'

type TempUser = {
  id: string
  name: string
  surname_1: string
  surname_2: string
  role: Role
}

export default function UsersPage() {
  const [users, setUsers] = useState<TempUser[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users', {
        method: 'get',
      })

      const result: { data: TempUser[] } = await res.json()

      setUsers(result.data)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-body text-2xl font-bold">Usuarios</h1>

        <Button onClick={() => setModalOpen(true)} size="sm">
          Crear Usuario
        </Button>
      </div>

      <ul className="mt-10">
        {users.map((l) => (
          <li key={l.id}>
            <b>{`${l.name} ${l.surname_1} ${l.surname_2}`}</b> -{' '}
            {roleOptions.find((ro) => ro.value === l.role)?.label ?? null}
          </li>
        ))}
      </ul>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Usuario"
        className="max-w-md"
      >
        <CreateUserForm />
      </Modal>
    </div>
  )
}
