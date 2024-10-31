import React, { useState } from 'react'

import { useModalManagement } from '@hooks/useModal'

import MainButton from './MainButton'
import Modal from './Modal'
import SubButton from './SubButton'

import { ImageModalProps, ModalType } from '@types'

const ImageModal: React.FC<ImageModalProps> = ({ onAction }) => {
  const { closeModal } = useModalManagement()
  const [imageDescription, setImageDescription] = useState('')

  const handleGenerate = () => {
    console.log('이미지 생성 요청:', imageDescription)
  }

  const handleImageSelect = (imageUrl: string) => {
    if (onAction) {
      onAction(imageUrl) // 이미지 URL 전달
    }
    closeModal() // 모달 닫기
  }

  return (
    <Modal modalType={ModalType.IMAGE}>
      <div className="mx-20 my-20 flex flex-col gap-10">
        <div className="flex justify-between gap-10">
          <div className="flex w-1/2 flex-col gap-7">
            <textarea
              placeholder="원하는 이미지를 설명해주세요."
              className="h-[460px] w-[450px] rounded-xl border border-lightgray p-5"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
            ></textarea>
            <div className="w-[450px]">
              <MainButton value="생성" onClick={handleGenerate} />
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-10">
            <div className="flex justify-between gap-10">
              <div
                className="h-[250px] w-[250px] cursor-pointer rounded-2xl bg-[#F7F7F7]"
                onClick={() => handleImageSelect('/api/placeholder/250/250')}
              >
                <img src="/api/placeholder/250/250" alt="생성된 이미지 1" />
              </div>
              <div
                className="h-[250px] w-[250px] cursor-pointer rounded-2xl bg-[#F7F7F7]"
                onClick={() => handleImageSelect('/api/placeholder/250/250')}
              >
                <img src="/api/placeholder/250/250" alt="생성된 이미지 2" />
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div
                className="h-[250px] w-[250px] cursor-pointer rounded-2xl bg-[#F7F7F7]"
                onClick={() => handleImageSelect('/api/placeholder/250/250')}
              >
                <img src="/api/placeholder/250/250" alt="생성된 이미지 3" />
              </div>
              <div
                className="h-[250px] w-[250px] cursor-pointer rounded-2xl bg-[#F7F7F7]"
                onClick={() => handleImageSelect('/api/placeholder/250/250')}
              >
                <img src="/api/placeholder/250/250" alt="생성된 이미지 4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <SubButton value="취소" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  )
}

export default ImageModal
