import React from 'react'

import { MdOutlinePersonAddAlt1 } from 'react-icons/md'

interface AddButtonProps {
  onClick: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-beige px-3 py-1 text-gray hover:bg-lightredorange hover:font-semibold hover:text-white dark:bg-coldbeige hover:dark:bg-skyblue hover:dark:text-darkgray"
    >
      <MdOutlinePersonAddAlt1 />
    </button>
  )
}

export default AddButton
