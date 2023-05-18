import { render } from '@react-email/components'
import sendgrid from '@sendgrid/mail'

import { env } from '@/core/env'
import LoginEmail from '@/email/templates/login'

sendgrid.setApiKey(env.SENDGRID_API_KEY)

type SendEmailOptions = {
  from?: string
  to: string
  subject: string
  html: string
}

export const sendEmail = ({ from = env.NO_REPLY_EMAIL, ...rest }: SendEmailOptions) => {
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

  return sendEmail({ html, subject: 'Bienvenido (a)!', to })
}
