/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileItem } from '@types'

export interface DraggableBoxProps {
  index: number
  files: FileItem[]
  folderId: number
  currentService: any
  onSelectFile?: (id: number) => void
}
