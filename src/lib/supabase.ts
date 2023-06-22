import { createClient } from '@supabase/supabase-js'

import { env } from '@/core/env'

const apiUrl = `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT}.supabase.co`

export const supabase = createClient(apiUrl, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

type UploadListingImageOptions = {
  path: string
}

export const uploadListingImage = async (imageFile: Blob, { path }: UploadListingImageOptions) => {
  // TODO - compress image

  return await supabase.storage.from('listings').upload(path, imageFile, { contentType: imageFile.type })
}
