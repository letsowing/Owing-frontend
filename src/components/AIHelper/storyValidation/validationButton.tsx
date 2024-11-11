import { HiSparkles } from 'react-icons/hi'

interface ValidationButtonProps {
  onClickValidation: () => void
}

export const ValidationButton = ({
  onClickValidation,
}: ValidationButtonProps) => {
  return (
    <button
      onClick={onClickValidation}
      className="bg-darkbeige flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-darkgray dark:bg-skyblue dark:text-white"
    >
      <HiSparkles />
      설정 충돌 검사
    </button>
  )
}
