import { render } from '@react-email/components'
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

import { env } from '@/core/env'
import { LoginEmail, WelcomeEmail } from '@/email/templates/auth'

const client = new MailerSend({
  apiKey: env.MAILERSEND_API_KEY,
})

type SendEmailOptions = {
  from?: { email: string; name?: string }
  to: { email: string; name?: string }
  subject: string
  html: string
}

const sendEmail = ({
  from = { email: env.NO_REPLY_EMAIL, name: 'IANUA - No Reply' },
  to,
  html,
  subject,
}: SendEmailOptions) => {
  const sentFrom = new Sender(from.email, from.name)
  const recipients = [new Recipient(to.email)]

  const params = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(subject).setHtml(html)

  return client.email.send(params)
}

export const sendLoginEmail = (to: { email: string; name?: string }, options: { url: string }) => {
  const html = render(LoginEmail(options))

  return sendEmail({
    to,
    html,
    subject: 'Inicia Sesión',
  })
}

export const sendWelcomeEmail = (to: { email: string; name?: string }, options: { url: string }) => {
  const html = render(WelcomeEmail(options))

  return sendEmail({
    to,
    html,
    subject: '¡Bienvenido! Ya puedes crear tu cuenta',
  })
}
