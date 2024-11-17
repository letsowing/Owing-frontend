import MainButton from '@components/common/MainButton'
import SubButton from '@components/common/SubButton'

interface CastActionButtonsProps {
  isEditing: boolean
  isValid: boolean
  hasId: boolean
  onSave: () => void
  onEdit: () => void
  onCancel: () => void
  onDelete: () => void
}

const CastActionButtons: React.FC<CastActionButtonsProps> = ({
  isEditing,
  isValid,
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
            <MainButton value="저장" onClick={onSave} disabled={!isValid} />
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

export default CastActionButtons
