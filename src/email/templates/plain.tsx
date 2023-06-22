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

interface PlainEmail {
  preview: string
  title: string
  blocks: Block[]
}

type Block = { type: 'text'; text: string; hero?: boolean } | { type: 'link'; text: string; href: string }

const baseUrl = env.NEXT_PUBLIC_APP_URL

export function PlainEmail({ blocks, preview, title }: PlainEmail) {
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
                {/* <Row>
                  <Column>
                    <Text>Links a redes sociales ¿?</Text>
                  </Column>
                </Row> */}
              </Column>
            </Row>
          </Section>

          <Section>
            <Link style={footerLink} href={`${baseUrl}/faq`} target="_blank" rel="noopener noreferrer">
              FAQ
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link style={footerLink} href={`${baseUrl}/privacidad`} target="_blank" rel="noopener noreferrer">
              Aviso de Privacidad
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href={`${baseUrl}/terminos-y-condiciones`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos y Condiciones
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

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
}
