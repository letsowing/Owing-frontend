import { BsPlusCircle } from 'react-icons/bs'
import { MdLightbulbOutline } from 'react-icons/md'

interface ImageFormProps {
  isEditable: boolean
}

const ImageForm = ({ isEditable }: ImageFormProps) => {
  return (
    <div className="flex flex-col ps-1">
      <div className="flex w-[300px] justify-between">
        <label className="font-semibold dark:text-coldbeige">이미지</label>
        {isEditable && (
          <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
        )}
      </div>
      <div className="dark:bg-verydarkblack dark:border-lightdarkgray my-1 flex h-[300px] w-[300px] justify-center rounded-xl border border-lightgray">
        <img src="" className=""></img>
      </div>
      {isEditable && (
        <div
          // onClick={onClick}
          className="dark:border-lightdarkgray my-3 flex w-[300px] cursor-pointer items-center justify-between rounded-full border border-lightgray p-3 px-4"
        >
          <div className="flex items-center space-x-2">
            <div className="text-xl font-medium text-redorange dark:text-blue">
              <MdLightbulbOutline />
            </div>
            <span className="text-[10px] text-darkgray dark:text-coldbeige">
              AI를 활용하여 이미지를 생성할 수 있어요!
            </span>
          </div>
          <span className="mx-2 rounded-full bg-orange bg-opacity-20 px-2 text-sm text-redorange dark:bg-coldbeige dark:text-blue">
            Click
          </span>
        </div>
      )}
    </div>
  )
}

export default ImageForm
