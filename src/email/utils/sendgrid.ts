import sendgrid from '@sendgrid/mail'

import { env } from '@/core/env'

sendgrid.setApiKey(env.SENDGRID_API_KEY)

export default sendgrid
