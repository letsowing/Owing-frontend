import { FileItem, FolderItem } from '@types'

export type TrashContentType = 'story' | 'cast' | 'universe'

export interface TrashFolderData {
  story: FolderItem[]
  cast: FolderItem[]
  universe: FolderItem[]
}

export interface TrashActions {
  onFolderSelect: (folder: FolderItem | null) => void
  onFileSelect: (file: FileItem | null) => void
  onDelete: (elementId: number, isFolder?: boolean) => Promise<void>
  onRestore: (elementId: number, isFolder?: boolean) => Promise<void>
  onEmptyTrash: (projectId: number) => Promise<void>
  setSelectedType: (type: TrashContentType) => void
  setIsStoryDetail: (check: boolean) => void
}

export interface TrashSelection {
  selectedType: TrashContentType
  selectedFolder: FolderItem | null
  selectedFile: FileItem | null
  isStoryDetail: boolean
}

export interface TrashContentProps {
  selection: TrashSelection
  actions: TrashActions
}

export interface TrashState {
  selectedType: TrashContentType
  items: TrashFolderData
  selectedFolder: FolderItem | null
  selectedFile: FileItem | null
  isStoryDetail: boolean
}

export interface TrashSetters {
  setSelectedType: (type: TrashContentType) => void
  setItems: (items: TrashFolderData) => void
  setSelectedFolder: (folder: FolderItem | null) => void
  setSelectedFile: (file: FileItem | null) => void
  setIsStoryDetail: (check: boolean) => void
}

export interface TrashActionsProps {
  state: TrashState
  setters: TrashSetters
}
