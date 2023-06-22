import { render } from '@react-email/components'
import { type MailDataRequired } from '@sendgrid/mail'

import { env } from '@/core/env'
import { LoginEmail, CreateAccountEmail } from '@/email/templates/auth'

import sendgrid from './sendgrid'
import { ContactEmail } from '../templates/contact'
import { WelcomeEmail } from '../templates/welcome'

type SendEmailOptions = {
  from?: { email: string; name: string }
  to: string
  subject: string
  html: string
} & Omit<MailDataRequired, 'from'>

export const sendEmail = ({
  from = { name: 'Ianua', email: env.NO_REPLY_EMAIL },
  ...rest
}: SendEmailOptions) => {
  const defaultHeaders = {
    // Set this to prevent Gmail from threading emails.
    // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
    'X-Entity-Ref-ID': new Date().getTime() + '',
  }

  return sendgrid.send({
    from,
    headers: {
      ...defaultHeaders,
      ...(rest.headers || {}),
    },
    ...rest,
  })
}

type SendLoginEmailOptions = {
  loginUrl: string
  to: string
}

export const sendLoginEmail = ({ loginUrl, to }: SendLoginEmailOptions) => {
  const html = render(LoginEmail({ url: loginUrl }))

  return sendEmail({
    html,
    subject: 'Inicia Sesión',
    to,
  })
}

type SendCreateAccountEmailOptions = {
  registerUrl: string
  to: string
}

export const sendCreateAccountEmail = ({ registerUrl, to }: SendCreateAccountEmailOptions) => {
  const html = render(CreateAccountEmail({ url: registerUrl }))

  return sendEmail({
    html,
    subject: 'Ya puedes crear tu cuenta',
    to,
  })
}

type SendWelcomeEmailOptions = {
  name: string
  to: string
}

export const sendWelcomeEmail = ({ name, to }: SendWelcomeEmailOptions) => {
  const html = render(WelcomeEmail({ name }))

  return sendEmail({
    html,
    subject: '¡Bienvenido(a)!',
    to,
  })
}

type SendContactEmailOptions = {
  name: string
  surnames: string
  phone: string
  email: string
  message: string
}

export const sendContactEmail = ({ email, message, name, phone, surnames }: SendContactEmailOptions) => {
  const html = render(ContactEmail({ name: `${name} ${surnames}`, email, message, phone }))

  return sendEmail({
    html,
    subject: 'Contacto',
    to: 'resolvemos@ianua.mx',
  })
}
