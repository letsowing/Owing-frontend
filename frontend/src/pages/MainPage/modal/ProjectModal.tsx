import { useEffect, useState } from 'react'

import InputField from '@components/common/InputField'
import Modal from '@components/common/Modal'
import TagField from '@components/common/TagField'
import TextAreaField from '@components/common/TextAreaField'

import { CATEGORY_LIST } from '@constants/categoryList'
import { GENRE_LIST } from '@constants/genreList'
import { ModalType, Work, WorkModalProps } from '@types'

const initialWork: Work = {
  id: 0,
  title: '',
  genre: '',
  category: '',
  description: '',
  imageUrl: '',
}

const WorkModal = ({ isEditable, work, onSave, onClose }: WorkModalProps) => {
  const [currentWork, setCurrentWork] = useState<Work>(initialWork)

  useEffect(() => {
    if (work) {
      setCurrentWork(work)
    } else {
      setCurrentWork(initialWork)
    }
  }, [work])

  const handleInputChange = (field: keyof Work, value: string) => {
    setCurrentWork((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(currentWork)
    onClose()
  }

  return (
    <Modal
      modalType={ModalType.WORK}
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onPrimaryAction={handleSave}
      onSecondaryAction={onClose}
    >
      <div className="mx-20 mt-8 flex flex-col gap-5">
        <InputField
          type="text"
          labelValue="작품명"
          isRequired={isEditable}
          maxLength={50}
          isEditable={isEditable}
          value={currentWork.title}
          onChange={(value) => handleInputChange('title', value)}
        />
        <TagField
          labelValue="분류"
          tagList={CATEGORY_LIST}
          isEditable={isEditable}
        />
        <div className="w-3/4">
          <TagField
            labelValue="장르"
            tagList={GENRE_LIST}
            isEditable={isEditable}
          />
        </div>
        <TextAreaField
          labelValue="작품 설명"
          isRequired={isEditable}
          maxLength={1000}
          isEditable={isEditable}
          value={currentWork.description}
          onChange={(value) => handleInputChange('description', value)}
        />
        {/* imageUrl은 별도의 이미지 업로드 컴포넌트가 필요할 수 있습니다 */}
      </div>
    </Modal>
  )
}

export default WorkModal
