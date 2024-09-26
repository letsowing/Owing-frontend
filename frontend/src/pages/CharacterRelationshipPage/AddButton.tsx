import React from 'react'

interface AddButtonProps {
  onClick: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue px-4 py-2 font-bold text-white hover:bg-skyblue"
    >
      캐릭터 생성
    </button>
  )
}

export default AddButton
