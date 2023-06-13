'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Props = {
  children: React.ReactNode
}

export function DragAndDropProvider({ children }: Props) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
}
