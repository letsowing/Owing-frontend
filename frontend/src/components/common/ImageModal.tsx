import MainButton from './MainButton'
import Modal from './Modal'

interface ImageModalProps {
  isOpen: boolean
  onRequestClose: () => void
  setIsOpen: (state: boolean) => void
  isEditable: boolean
}

const ImageModal = ({ isOpen, setIsOpen }: ImageModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={() => null} setIsOpen={setIsOpen}>
        <div className="mx-20 my-20 flex justify-between gap-10">
          <div className="flex w-1/2 flex-col gap-7">
            <textarea
              placeholder="원하는 이미지를 묘사해주세요."
              className="h-[460px] w-[450px] rounded-xl border border-lightgray p-5"
            ></textarea>
            <div className="w-[450px]">
              <MainButton value="Generate" />
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-10">
            <div className="flex justify-between gap-10">
              <div className="h-[250px] w-[250px] rounded-2xl bg-[#F7F7F7]">
                <img src="" alt=""></img>
              </div>
              <div className="h-[250px] w-[250px] rounded-2xl bg-[#F7F7F7]">
                <img src="" alt=""></img>
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="h-[250px] w-[250px] rounded-2xl bg-[#F7F7F7]">
                <img src="" alt="" />
              </div>
              <div className="h-[250px] w-[250px] rounded-2xl bg-[#F7F7F7]">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ImageModal
