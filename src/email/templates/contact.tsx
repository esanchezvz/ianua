import { PlainEmail } from './plain'

interface ContactEmailProps {
  name: string
  phone: string
  email: string
  message: string
}

export function ContactEmail({ email, message, name, phone }: ContactEmailProps) {
  return (
    <PlainEmail
      preview={`Contacto IANUA - ${name}`}
      title="Contacto"
      blocks={[
        { type: 'text', text: `Nombre: ${name}` },
        { type: 'text', text: `Teléfono: ${phone}` },
        { type: 'text', text: `Email: ${email}` },
        { type: 'text', text: message },
      ]}
    />
  )
}
