import { logEvent as _logEvent, EventParams } from 'firebase/analytics'

import { firebaseAnalytics } from './firebase'

export const logEvent = (eventName: string, params?: EventParams) =>
  firebaseAnalytics ? _logEvent(firebaseAnalytics, eventName, params) : console.log({ eventName, params })
