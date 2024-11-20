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
        <label className="mb-1 font-semibold text-darkgray dark:text-white">
          {labelValue}
        </label>
      </div>
      {isTextArea ? (
        <textarea
          value={value}
          readOnly
          className="mt-1 h-32 w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-darkblack dark:text-white dark:ring-blue"
        />
      ) : (
        <input
          value={value}
          readOnly
          className="mt-1 h-12 w-full rounded-lg border border-lightgray px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-redorange dark:border-lightdarkgray dark:bg-darkblack dark:text-white dark:ring-blue"
        />
      )}
    </div>
  )
}

export default InputField
