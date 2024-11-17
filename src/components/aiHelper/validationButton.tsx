import { HiSparkles } from 'react-icons/hi'

interface ValidationButtonProps {
  title: string
  onClickValidation: () => void
}

export const ValidationButton = ({
  title,
  onClickValidation,
}: ValidationButtonProps) => {
  return (
    <button
      onClick={onClickValidation}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-darkbeige py-2 text-sm font-medium text-darkgray dark:bg-skyblue dark:text-white"
    >
      <HiSparkles />
      {title}
    </button>
  )
}
