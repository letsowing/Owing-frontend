import { BsPlusCircle } from 'react-icons/bs'
import { MdLightbulbOutline } from 'react-icons/md'

const ImageForm = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="font-semibold dark:text-coldbeige">이미지</label>
        <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
      </div>
      <div className="dark:bg-verydarkblack dark:border-lightdarkgray my-3 flex h-[270px] w-[100%] justify-center rounded-xl border border-lightgray">
        <img src="" className=""></img>
      </div>
      <div
        // onClick={onClick}
        className="dark:border-lightdarkgray my-3 flex cursor-pointer items-center justify-between rounded-full border border-lightgray p-3 px-4"
      >
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-medium text-redorange dark:text-blue">
            <MdLightbulbOutline />
          </div>
          <span className="text-sm text-darkgray dark:text-coldbeige">
            AI를 활용하여 이미지를 생성할 수 있어요!
          </span>
        </div>
        <span className="mx-2 rounded-full bg-orange bg-opacity-20 px-2 text-sm text-redorange dark:bg-coldbeige dark:text-blue">
          Click
        </span>
      </div>
    </div>
  )
}

export default ImageForm
