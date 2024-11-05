import { useProjectStore } from '@stores/projectStore'

import { TrashContentProps } from '@types'

const RestoreHeader: React.FC<TrashContentProps> = ({ selection, actions }) => {
  const currentProject = useProjectStore((state) => state.currentProject)

  const handleRestore = async () => {
    try {
      actions.onRestore(selection.selectedFile!.id, currentProject.id)
    } catch (error) {
      console.error('복구 실패:', error)
      alert('복구 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = async () => {
    try {
      actions.onDeleteFile(selection.selectedFile!.id, currentProject.id)
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="bg-blush dark:bg-cornflowerblue mb-12 w-full p-2 text-center text-xs text-white">
      <div className="flex items-center justify-center">
        <p className="me-6">편집이 필요하시면 버튼을 눌러 복원하세요.</p>
        <button
          className="hover:text-blush dark:hover:text-cornflowerblue me-2 rounded-lg border border-white px-3 py-1 hover:bg-white dark:hover:bg-white"
          onClick={handleRestore}
        >
          복원하기
        </button>
        <button
          className="hover:text-blush dark:hover:text-cornflowerblue rounded-lg border border-white px-3 py-1 hover:bg-white dark:hover:bg-white"
          onClick={handleDelete}
        >
          영구 삭제
        </button>
      </div>
    </div>
  )
}

export default RestoreHeader
