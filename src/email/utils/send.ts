import { render } from '@react-email/components'
import { type MailDataRequired } from '@sendgrid/mail'

import { env } from '@/core/env'
import { LoginEmail, WelcomeEmail } from '@/email/templates/auth'

import sendgrid from './sendgrid'

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
  return sendgrid.send({
    from,
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
    headers: {
      // Set this to prevent Gmail from threading emails.
      // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
      'X-Entity-Ref-ID': new Date().getTime() + '',
    },
  })
}

type SendWelcomeEmailOptions = {
  registerUrl: string
  to: string
}

export const sendWelcomeEmail = ({ registerUrl, to }: SendWelcomeEmailOptions) => {
  const html = render(WelcomeEmail({ url: registerUrl }))

  return sendEmail({
    html,
    subject: '¡Bienvenido! Ya puedes crear tu cuenta',
    to,
    headers: {
      // Set this to prevent Gmail from threading emails.
      // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
      'X-Entity-Ref-ID': new Date().getTime() + '',
    },
  })
}
