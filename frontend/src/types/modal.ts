import { Character, Work } from '@types'

export enum ModalType {
  CHARACTER_RELATIONSHIP = 'CHARACTER_RELATIONSHIP',
  WORLD_SETTING = 'WORLD_SETTING',
  WORK = 'WORK',
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

export interface WorkModalProps extends ModalProps<Work> {
  type: ModalType.WORK
  isEditable: boolean
  work?: Work | null
  onSave: ActionFunction<Work>
  onClose: () => void
}

export interface WorldSettingModalProps extends ModalProps<Work> {
  type: ModalType.WORLD_SETTING
  onAction: (work: Work) => void
}

export interface ImageModalProps extends ModalProps<string> {
  type: ModalType.IMAGE
  onAction: ActionFunction<string>
}

export type AnyModalProps =
  | CharacterRelationshipModalProps
  | WorldSettingModalProps
  | WorkModalProps
  | ImageModalProps
