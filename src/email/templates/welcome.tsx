import { PlainEmail } from './plain'

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <PlainEmail
      preview="¿Estas listo(a) para encontrar tu hogar ideal?"
      title="¡Bienvenido(a)!"
      blocks={[
        { type: 'text', text: `Hola, ${name}. ¡Qué gusto tenerte aquí!` },
        {
          type: 'text',
          text: `En Ianua trabajamos con mucha pasión para poder acercarte más a tu hogar ideal. Seguimos mejorando y gracias a ti podemos hacerlo mejor.`,
        },
        { type: 'text', text: `Si tienes dudas, quejas o sugerencias, ¡Háznoslo saber!` },
        { type: 'text', text: `Bienvenido a este grupo.` },
      ]}
    />
  )
}
