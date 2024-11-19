import { useConfirm } from './useConfirm'

import {
  deleteAllTrashes,
  deleteTrashcanFile,
  deleteTrashcanFolder,
  postRestoreTrashcanFile,
  postRestoreTrashcanFolder,
} from '@services/trashService'

export const useTrashActions = () => {
  const { confirmDelete, showSuccessDialog } = useConfirm()

  // 삭제 및 복원 공통 처리 로직
  const handleAction = async (
    elementId: number,
    isFolder: boolean,
    action: 'delete' | 'restore',
  ) => {
    const isDelete = action === 'delete'
    const shouldProceed = isDelete
      ? await confirmDelete({
          title: `${isFolder ? '폴더' : '파일'}를 영구 삭제하시겠습니까?`,
          text: '이 작업은 되돌릴 수 없습니다.',
        })
      : true

    if (shouldProceed) {
      try {
        const apiCall = isFolder
          ? isDelete
            ? deleteTrashcanFolder
            : postRestoreTrashcanFolder
          : isDelete
            ? deleteTrashcanFile
            : postRestoreTrashcanFile

        await apiCall(elementId)

        if (!isDelete) {
          showSuccessDialog('성공적으로 복원되었습니다.')
        }
      } catch (error) {
        console.error(
          `${isFolder ? '폴더' : '파일'} ${isDelete ? '삭제' : '복원'} 실패:`,
          error,
        )
        throw error
      }
    }
  }

  const handleEmptyTrash = async (projectId: number) => {
    const isConfirmed = await confirmDelete({
      title: '휴지통을 비우시겠습니까?',
      text: '이 작업은 되돌릴 수 없습니다.',
    })

    if (isConfirmed) {
      try {
        await deleteAllTrashes(projectId)
      } catch (error) {
        console.error('휴지통 비우기 실패:', error)
        throw error
      }
    }
  }

  return {
    onDelete: (elementId: number, isFolder = false) =>
      handleAction(elementId, isFolder, 'delete'),
    onRestore: (elementId: number, isFolder = false) =>
      handleAction(elementId, isFolder, 'restore'),
    onEmptyTrash: handleEmptyTrash,
  }
}
