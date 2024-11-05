import { useProjectStore } from '@/stores/projectStore'
import { FileItem, TrashActions, TrashSelection } from '@types'
import { PiTrashSimpleLight } from 'react-icons/pi'
import { TbArrowBackUp } from 'react-icons/tb'

interface FolderListItemProps {
  file: FileItem
  selection: TrashSelection
  actions: TrashActions
  toggleFile: () => void
}

export default function FolderListItem({
  file,
  actions,
  toggleFile,
}: FolderListItemProps) {
  const currentProject = useProjectStore((state) => state.currentProject)

  const handleRestoreFile = async () => {
    try {
      await actions.onRestore(file.id, currentProject.id)
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  const handleDeleteFile = async () => {
    try {
      await actions.onDeleteFile(file.id, currentProject.id)
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  return (
    <li
      className="group my-2 flex h-10 w-full items-center justify-between rounded-md hover:bg-white"
      onClick={toggleFile}
    >
      <div className="flex items-center">
        <div className="ms-2 h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>
        <p className="mx-4 max-w-32 truncate text-[15px] text-darkgray">
          {file.name}
        </p>
      </div>

      <div className="me-1 flex hidden w-10 items-center justify-between group-hover:flex">
        <TbArrowBackUp
          className="cursor-pointer text-darkgray"
          onClick={handleRestoreFile}
        />
        <PiTrashSimpleLight
          onClick={handleDeleteFile}
          className="cursor-pointer text-darkgray"
        />
      </div>
    </li>
  )
}
