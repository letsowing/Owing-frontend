interface MainButtonProps {
  value: string
  onClick?: () => void
}

const MainButton = ({ value, onClick }: MainButtonProps) => {
  return (
    <button
      className="h-[50px] w-full rounded-xl bg-gradient-to-r from-redorange to-orange px-6 py-2 font-medium text-white dark:from-blue dark:to-skyblue dark:text-darkblack"
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default MainButton
