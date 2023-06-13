import { useCallback, useRef, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import Image from 'next/image'
import { useDrag, useDrop } from 'react-dnd'
import { v4 as uuidV4 } from 'uuid'

import { toast } from '@/hooks/use-toast'
import { uploadListingImage } from '@/lib/supabase'

import { Button } from '../ui/button'
import type { Identifier, XYCoord } from 'dnd-core'

type PreviewFile = {
  file: File
  previewUrl: string
  key: string
}

export default function ListingFileUploader({
  listingId,
  onCreate,
}: {
  listingId: string
  onCreate?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<PreviewFile[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const files: typeof images = []
    Array.from(event.target.files).forEach((file) => {
      const key = uuidV4() + '.' + file.name.split('.')[1]

      files.push({
        file,
        previewUrl: URL.createObjectURL(file),
        key,
      })
    })

    setImages((prev) => prev.concat(files))
  }

  const handleSave = async () => {
    const formData = new FormData()
    const data = {
      data: {
        gallery_keys: images.map((i) => i.key),
      },
    }
    formData.append('data', JSON.stringify(data))
    setLoading(true)

    try {
      await Promise.all(images.map((i) => uploadListingImage(i.file, { path: `${listingId}/${i.key}` })))
      const res = await fetch(`/api/listings/${listingId}`, {
        method: 'put',
        body: formData,
      })
      await res.json()
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

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevCards: PreviewFile[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

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
        {images.map((f, i) => {
          return <ImageCard key={f.key} id={f.key} previewUrl={f.previewUrl} moveCard={moveCard} index={i} />
        })}
      </div>
      <Button disabled={loading} onClick={handleSave} className="mt-5 w-full">
        {loading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
        Guardar
      </Button>
    </div>
  )
}

type DragItem = {
  index: number
  id: string
  type: string
}

const ItemTypes = {
  CARD: 'card',
}

const ImageCard = ({
  previewUrl,
  moveCard,
  index,
  id,
}: {
  previewUrl: string
  id: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div ref={ref} className="h-16 w-16 cursor-move" style={{ opacity }} data-handler-id={handlerId}>
      <Image src={previewUrl} alt="" className="object-contain" width={64} height={64} />
    </div>
  )
}
