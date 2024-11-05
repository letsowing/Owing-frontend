interface InputFieldProps {
  value: string
  labelValue: string
  isTextArea: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  labelValue,
  isTextArea,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="font-semibold text-darkgray dark:text-white">
          {labelValue}
        </label>
      </div>
      {isTextArea ? (
        <textarea
          value={value}
          readOnly
          className="mt-1 h-[100px] w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-verydarkblack dark:text-coldbeige dark:ring-blue"
        />
      ) : (
        <input
          value={value}
          readOnly
          className="mt-1 h-[50px] w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-verydarkblack dark:text-coldbeige dark:ring-blue"
        />
      )}
    </div>
  )
}

export default InputField
