import InputField from '@components/common/InputField'
import TextAreaField from '@components/common/TextAreaField'

interface InputFormProps {
  isEditable: boolean
}

const InputForm = ({ isEditable }: InputFormProps) => {
  return (
    <div className="flex flex-col space-y-9 pe-1">
      <InputField
        type={'text'}
        labelValue={'이름'}
        isRequired={isEditable}
        maxLength={50}
        initialValue=""
        isEditable={isEditable}
      />
      <div className="flex justify-evenly gap-4">
        <div className="w-full">
          <InputField
            type={'number'}
            labelValue={'나이'}
            isRequired={isEditable}
            maxLength={50}
            initialValue=""
            isEditable={isEditable}
          />
        </div>
        <div className="w-full">
          <InputField
            type={'text'}
            labelValue={'성별'}
            isRequired={isEditable}
            maxLength={50}
            initialValue=""
            isEditable={isEditable}
          />
        </div>
      </div>
      <InputField
        type={'text'}
        labelValue={'역할/직업'}
        isRequired={false}
        maxLength={200}
        initialValue=""
        isEditable={isEditable}
      />
      <TextAreaField
        labelValue={'세부사항'}
        isRequired={isEditable}
        maxLength={1000}
        initialValue=""
        isEditable={isEditable}
      />
    </div>
  )
}

export default InputForm
