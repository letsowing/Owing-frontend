import { Cast, FolderSummary, Project } from '@types'

export enum ModalType {
  CHARACTER_RELATIONSHIP = 'CHARACTER_RELATIONSHIP',
  WORLD_SETTING = 'WORLD_SETTING',
  PROJECT = 'PROJECT',
  IMAGE = 'IMAGE',
}

export type ActionFunction<T> = (data: T) => void

export interface ModalProps<T> {
  type: ModalType
  onAction?: (t: T) => void
}

export interface CastRelationshipModalProps extends ModalProps<Cast> {
  type: ModalType.CHARACTER_RELATIONSHIP
  isEditable: boolean
  cast: Cast | null
  folderId: number | undefined
  folderList: FolderSummary[]
  onSave: (data: Cast, folderId: number | undefined) => Promise<void>
  onEdit: () => void
  onSelect: (folderId: number) => void
  onClose: () => void
}

export interface ProjectModalProps extends ModalProps<Project> {
  type: ModalType.PROJECT
  isEditable: boolean
  project?: Project | null
  onSave: ActionFunction<Project>
  onClose: () => void
}

export interface WorldSettingModalProps extends ModalProps<Project> {
  type: ModalType.WORLD_SETTING
  onAction: (project: Project) => void
}

export interface ImageModalProps extends ModalProps<string> {
  type: ModalType.IMAGE
  onAction: ActionFunction<string>
}

export type AnyModalProps =
  | CastRelationshipModalProps
  | WorldSettingModalProps
  | ProjectModalProps
  | ImageModalProps
