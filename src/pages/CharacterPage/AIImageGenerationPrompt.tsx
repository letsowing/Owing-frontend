import { MdLightbulbOutline } from 'react-icons/md'

const AIImageGenerationPrompt: React.FC = () => {
  return (
    <div className="my-3 flex w-80 cursor-pointer items-center justify-between rounded-full border border-lightgray p-3 px-4 dark:border-lightdarkgray">
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
  )
}

export default AIImageGenerationPrompt
