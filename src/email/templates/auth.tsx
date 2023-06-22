import { PlainEmail } from './plain'

interface LoginEmailProps {
  url: string
}

export function LoginEmail({ url }: LoginEmailProps) {
  return (
    <PlainEmail
      preview="Haz click en el link para iniciar sesión."
      title="Inicia Sesión"
      blocks={[
        { type: 'text', text: 'Haz click en el siguiente link para iniciar sesión en IANUA', hero: true },
        { type: 'link', text: url, href: url },
        { type: 'text', text: 'Si no solicitaste este correo, no te preocupes - puedes ignorarlo.' },
      ]}
    />
  )
}

interface CreateAccountEmailProps {
  url: string
}

export function CreateAccountEmail({ url }: CreateAccountEmailProps) {
  return (
    <PlainEmail
      preview="Gracias por confiar en nosotros. ¡Inicia por crear tu cuenta!"
      title="Crea tu cuenta"
      blocks={[
        { type: 'text', text: 'Haz click en el siguiente link para iniciar sesión en Ianua.', hero: true },
        { type: 'link', text: url, href: url },
        { type: 'text', text: 'Si no solicitaste este correo, no te preocupes - puedes ignorarlo.' },
      ]}
    />
  )
}
