import { createClient } from '@supabase/supabase-js'

import { env } from '@/core/env'

const apiUrl = `https://${env.SUPABASE_PROJECT}.supabase.co`

export const supabase = createClient(apiUrl, env.SUPABASE_SERVICE_ROLE)

type UploadListingImageOptions = {
  path: string
}

export const uploadListingImage = async (imageFile: Blob, { path }: UploadListingImageOptions) => {
  // TODO - compress image

  return await supabase.storage.from('listings').upload(path, imageFile, { contentType: imageFile.type })
}
