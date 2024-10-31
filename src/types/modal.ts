import { Character, Project } from '@types'

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

export interface CharacterRelationshipModalProps extends ModalProps<Character> {
  type: ModalType.CHARACTER_RELATIONSHIP
  isEditable: boolean
  character: Character | null
  onSave: ActionFunction<Character>
  onEdit: () => void
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
  | CharacterRelationshipModalProps
  | WorldSettingModalProps
  | ProjectModalProps
  | ImageModalProps
