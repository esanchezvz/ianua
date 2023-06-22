import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAppCheck } from 'firebase-admin/app-check'

import { env } from '@/core/env'

const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT)),
      })
    : getApps()[0]

export const adminAppCheck = getAppCheck(adminApp)

export const verifyCaptcha = async (captcha: string) => {
  return adminAppCheck.verifyToken(captcha)
}
