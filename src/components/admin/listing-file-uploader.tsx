import { useRef, useState } from 'react'

import Image from 'next/image'
import { v4 as uuidV4 } from 'uuid'

import { toast } from '@/hooks/use-toast'
import { uploadListingImage } from '@/lib/supabase'

import { Button } from '../ui/button'

export default function ListingFileUploader({
  listingId,
  onCreate,
}: {
  listingId: string
  onCreate?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<
    {
      file: File
      previewUrl: string
      key: string
    }[]
  >([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const files: typeof images = []
    Array.from(event.target.files).forEach((file) => {
      files.push({
        file,
        previewUrl: URL.createObjectURL(file),
        key: uuidV4() + '.' + file.name.split('.')[1],
      })
    })

    setImages((prev) => prev.concat(files))
  }

  const handleSave = async () => {
    const formData = new FormData()
    const gallery = {
      gallery_keys: images.map((i) => i.key),
    }
    formData.append('data', JSON.stringify(gallery))

    try {
      await Promise.all(images.map((i) => uploadListingImage(i.file, { path: `${listingId}/${i.key}` })))
      const res = await fetch(`/api/listings/${listingId}`, {
        method: 'put',
        body: formData,
      })
      await res.json()
      setLoading(true)
      onCreate?.()
    } catch (err) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    setLoading(false)
  }

  return (
    <div className="mt-5 w-full">
      <Button disabled={loading} onClick={() => fileInputRef.current?.click()} variant="outline">
        Agregar Imagenes
      </Button>

      <input
        id="gallery"
        type="file"
        name="gallery"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={onFileInputChange}
      />

      <div className="mt-5 flex gap-5">
        {images.map((f) => {
          return (
            <Image
              key={f.key}
              src={f.previewUrl}
              alt=""
              className="h-16 w-16 object-contain"
              width={64}
              height={64}
            />
          )
        })}
      </div>
      <Button disabled={loading} onClick={handleSave} className="mt-5 w-full">
        Guardar
      </Button>
    </div>
  )
}
