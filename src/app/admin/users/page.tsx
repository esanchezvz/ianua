'use client'
import { useState } from 'react'

import { CreateUserForm } from '@/components/admin/create-user-form'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-body text-2xl font-bold">Usuarios</h1>

      <Button onClick={() => setModalOpen(true)} size="sm">
        Crear Usuario
      </Button>

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
