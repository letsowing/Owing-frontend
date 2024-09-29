interface SubButtonProps {
  value: string
  onClick?: () => void
}

const SubButton = ({ value, onClick }: SubButtonProps) => {
  return (
    <button
      className="bg-verylightgray h-[50px] w-full rounded-xl px-6 py-2 font-medium text-redorange"
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default SubButton
