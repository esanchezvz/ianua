'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { AppCheck, getToken } from 'firebase/app-check'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import { useCookies } from 'react-cookie'

import { env } from '@/core/env'
import { firebaseApp } from '@/lib/firebase'

type CaptchaContext = {
  captchaToken: string
  getCaptchaToken: () => Promise<string>
}

const Context = createContext<CaptchaContext | null>(null)

type CaptchaProviderProps = {
  children: React.ReactNode
}

export function CapthaProvider({ children }: CaptchaProviderProps) {
  const [_, setCookie] = useCookies(['captcha'])
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [appCheck, setAppCheck] = useState<AppCheck | null>(null)

  const getCaptchaToken = useCallback(async () => {
    if (!appCheck) return ''

    const { token } = await getToken(appCheck)

    setCookie('captcha', token)

    setCaptchaToken(token)
    return token
  }, [appCheck, setCookie])

  useEffect(() => {
    const firebaseAppCheck = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(env.NEXT_PUBLIC_CAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    })

    setAppCheck(firebaseAppCheck)
  }, [])

  useEffect(() => {
    if (appCheck) getCaptchaToken()
  }, [appCheck, getCaptchaToken])

  return <Context.Provider value={{ captchaToken, getCaptchaToken }}>{children}</Context.Provider>
}

export const useCaptcha = () => useContext(Context) as CaptchaContext
