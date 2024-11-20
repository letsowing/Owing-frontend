interface SubButtonProps {
  value: string
  disabled?: boolean
  onClick?: () => void
}

const SubButton = ({ value, disabled, onClick }: SubButtonProps) => {
  return (
    <button
      className="h-[50px] w-full rounded-xl bg-verylightgray px-6 py-2 font-medium text-redorange dark:bg-darkblack dark:text-blue"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default SubButton
