interface MainButtonProps {
  value: string
  disabled?: boolean
  onClick?: () => void
}

const MainButton = ({ value, disabled, onClick }: MainButtonProps) => {
  return (
    <button
      className={`h-[50px] w-full rounded-xl px-6 py-2 font-medium text-white ${
        !disabled
          ? 'cursor-not-allowed bg-lightgray dark:bg-gray'
          : 'bg-gradient-to-r from-redorange to-orange dark:from-skyblue dark:to-blue'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default MainButton
