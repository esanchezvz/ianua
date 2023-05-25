'use client'

// This is a workaround to be able to use session provider in server layouts

import { SessionProvider as _SessionProvider } from 'next-auth/react'

export const SessionProvider = _SessionProvider
