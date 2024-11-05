/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DraggableBoxProps {
  id: number
  index: number
  name: string
  description: string
  folderId: number
  imageUrl?: string
  currentService: any
  onSelectFile?: (id: number) => void
}
