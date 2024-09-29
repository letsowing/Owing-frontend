import { CATEGORY_LIST } from '../../../constants/categoryList'
import { GENRE_LIST } from '../../../constants/genreList'
import TagField from './TagField'

import InputField from '@/components/common/InputField'
import MainButton from '@/components/common/MainButton'
import Modal from '@/components/common/Modal'
import SubButton from '@/components/common/SubButton'
import TextAreaField from '@/components/common/TextAreaField'

interface CreateProjectModalProps {
  isOpen: boolean
  onRequestClose: () => void
  setIsOpen: (state: boolean) => void
  isEditable: boolean
}

const CreateProjectModal = ({
  isOpen,
  setIsOpen,
  isEditable,
}: CreateProjectModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={() => null} setIsOpen={setIsOpen}>
        <div className="mx-20 mt-20 flex flex-col gap-5">
          <InputField
            type={'text'}
            labelValue={'작품명'}
            isRequired={isEditable}
            maxLength={50}
            initialValue=""
            isEditable={isEditable}
          />
          <TagField labelValue={'분류'} tagList={CATEGORY_LIST} />
          <div className="w-3/4">
            <TagField labelValue={'장르'} tagList={GENRE_LIST} />
          </div>
          <TextAreaField
            labelValue="작품 설명"
            isRequired={isEditable}
            maxLength={1000}
            initialValue=""
            isEditable={isEditable}
          />
          <div className="my-20 flex justify-end gap-3">
            <div className="w-1/5">
              <SubButton value={'Back'} />
            </div>
            <div className="w-1/5">
              <MainButton value={'Next'} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateProjectModal
