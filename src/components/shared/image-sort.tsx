import { useCallback, useEffect, useRef, useState } from 'react'

import update from 'immutability-helper'
import Image from 'next/image'
import { useDrag, useDrop } from 'react-dnd'

import type { Identifier, XYCoord } from 'dnd-core'

type Card = {
  url: string
  key: string
}

type Props = {
  images: Card[]
  onChange: (keys: string[]) => void
}

export const ImageSort = ({ images, onChange }: Props) => {
  const [cards, setCards] = useState<Card[]>(images)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

  useEffect(() => {
    onChange(cards.map((c) => c.key))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  return (
    <div className="mt-5 flex gap-5 overflow-hidden overflow-x-auto">
      {cards.map((card, i) => {
        return <ImageCard key={card.key} id={card.key} previewUrl={card.url} moveCard={moveCard} index={i} />
      })}
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
    <div
      ref={ref}
      className="relative h-28 w-28 min-w-max cursor-move"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <Image src={previewUrl} alt="" className="object-contain" width={112} height={112} />
    </div>
  )
}
