import {
  Body,
  Container,
  Column,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

import { env } from '@/core/env'
import { Head } from '@/email/components'

interface LoginEmailProps {
  url: string
}

export function LoginEmail({ url }: LoginEmailProps) {
  return (
    <AuthEmail
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

export function WelcomeEmail({ url }: LoginEmailProps) {
  return (
    <AuthEmail
      preview="Gracias por confiar en nosotros. ¡Inicia por crear tu cuenta!"
      title="Inicia Sesión"
      blocks={[
        { type: 'text', text: 'Haz click en el siguiente link para iniciar sesión en IANUA', hero: true },
        { type: 'link', text: url, href: url },
        { type: 'text', text: 'Si no solicitaste este correo, no te preocupes - puedes ignorarlo.' },
      ]}
    />
  )
}

type Block = { type: 'text'; text: string; hero?: boolean } | { type: 'link'; text: string; href: string }

interface AuthEmailProps {
  preview: string
  blocks: Block[]
  title: string
}

const baseUrl = env.NEXT_PUBLIC_APP_URL

function AuthEmail({ blocks, preview, title }: AuthEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={`${baseUrl}/logo_letters.png`} width="120" alt="IANUA" />
          </Section>
          <Heading style={h1}>{title}</Heading>

          {blocks.map((block, i) => {
            if (block.type === 'link') {
              return (
                <Link href={block.href} key={`block-${block.type}-${i}`}>
                  {block.text}
                </Link>
              )
            }

            return (
              <Text style={block.hero ? heroText : text} key={`block-${block.type}-${i}`}>
                {block.text}
              </Text>
            )
          })}
          <Section>
            <Row style={footerLogos}>
              <Column style={{ width: '66%' }}>
                <Img src={`${baseUrl}/logo_letters.png`} width="120" alt="IANUA" />
              </Column>
              <Column>
                <Row>
                  <Column>
                    <Text>Links a redes sociales ¿?</Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>

          <Section>
            <Link style={footerLink} href={baseUrl} target="_blank" rel="noopener noreferrer">
              FAQ
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link style={footerLink} href={baseUrl} target="_blank" rel="noopener noreferrer">
              Privacidad
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link style={footerLink} href={baseUrl} target="_blank" rel="noopener noreferrer">
              Términos
            </Link>
            <Text style={footerText}>
              ©{new Date().getFullYear()} IANUA. <br />
              <br />
              Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
}

const footerLink = {
  color: '#db566a',
  textDecoration: 'underline',
}

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%',
}

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily: 'Roboto, sans-serif',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
}

const logoContainer = {
  marginTop: '32px',
}

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
}

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
}

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginRight: '50px',
  marginBottom: '30px',
  padding: '43px 23px',
}

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
}

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
}
