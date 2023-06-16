import Modal from '@/components/ui/modal'

import { CreateListingForm } from './create-update-form'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: () => void
}

export const CreateListingModal = ({ onClose, open, onCreate }: Props) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Crear Propiedad"
      className="max-w-5xl"
      closeOnEscape={false}
    >
      <CreateListingForm onSuccess={onCreate} />
    </Modal>
  )
}
