import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

interface CharacterActionButtonsProps {
  isEditing: boolean
  hasId: boolean
  onSave: () => void
  onEdit: () => void
  onCancel: () => void
  onDelete: () => void
}

const CharacterActionButtons: React.FC<CharacterActionButtonsProps> = ({
  isEditing,
  hasId,
  onSave,
  onEdit,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="mt-4 flex justify-end gap-2">
      {isEditing ? (
        <>
          <div className="w-[12rem]">
            <SubButton value="취소" onClick={onCancel} />
          </div>
          <div className="w-[12rem]">
            <MainButton value="저장" onClick={onSave} />
          </div>
        </>
      ) : (
        <>
          {hasId && (
            <div className="w-[12rem]">
              <SubButton value="삭제" onClick={onDelete} />
            </div>
          )}
          <div className="w-[12rem]">
            <MainButton value="수정" onClick={onEdit} />
          </div>
        </>
      )}
    </div>
  )
}

export default CharacterActionButtons
