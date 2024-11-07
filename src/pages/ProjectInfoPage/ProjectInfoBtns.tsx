import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

interface ProjectInfoBtnsProps {
  isEditable: boolean
  isDisabled: boolean
  onCancel: () => void
  onSave: () => void
  onEdit: () => void
  onDelete: () => void
}

const ProjectInfoBtns = ({
  isEditable,
  isDisabled,
  onCancel,
  onSave,
  onEdit,
  onDelete,
}: ProjectInfoBtnsProps) => {
  return (
    <div className="my-10 flex justify-between">
      <div className="flex w-1/6 gap-4">
        {!isEditable && <SubButton value="삭제" onClick={onDelete} />}
      </div>
      <div className="flex w-1/4 gap-4">
        {isEditable && <SubButton value="취소" onClick={onCancel} />}
        <MainButton
          value={isEditable ? '저장' : '편집'}
          onClick={isEditable ? onSave : onEdit}
          disabled={isEditable ? isDisabled : false}
        />
      </div>
    </div>
  )
}

export default ProjectInfoBtns
