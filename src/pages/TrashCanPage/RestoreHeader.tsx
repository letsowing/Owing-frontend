import { TrashContentProps } from '@types'

const RestoreHeader: React.FC<TrashContentProps> = ({ selection, actions }) => {
  if (!selection.selectedFile || !selection.selectedFolder) {
    return null
  }

  const { id } = selection.selectedFile

  const handleRestore = async () => {
    try {
      actions.onRestore(id)
    } catch (error) {
      console.error('복구 실패:', error)
      alert('복구 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = async () => {
    try {
      actions.onDelete(id)
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mb-8 w-full bg-blush p-2 text-center text-xs text-white dark:bg-cornflowerblue">
      <div className="flex items-center justify-center">
        <p className="me-6">편집이 필요하시면 버튼을 눌러 복원하세요.</p>
        <button
          className="me-2 rounded-lg border border-white px-3 py-1 hover:bg-white hover:text-blush dark:hover:bg-white dark:hover:text-cornflowerblue"
          onClick={handleRestore}
        >
          복원하기
        </button>
        <button
          className="rounded-lg border border-white px-3 py-1 hover:bg-white hover:text-blush dark:hover:bg-white dark:hover:text-cornflowerblue"
          onClick={handleDelete}
        >
          영구 삭제
        </button>
      </div>
    </div>
  )
}

export default RestoreHeader
