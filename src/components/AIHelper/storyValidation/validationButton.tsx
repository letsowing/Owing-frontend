interface ValidationButtonProps {
  onClickValidation: () => void
}

export const ValidationButton = ({
  onClickValidation,
}: ValidationButtonProps) => {
  return (
    <div className="bg-orange-50/50 rounded-lg border p-4">
      <button
        onClick={onClickValidation}
        className="bg-orange-100 text-orange-950 hover:bg-orange-200 w-full rounded-lg px-4 py-3"
      >
        설정 종류 체크
        <span className="bg-orange-200 ml-1 rounded px-1 text-xs">beta</span>
      </button>
    </div>
  )
}
