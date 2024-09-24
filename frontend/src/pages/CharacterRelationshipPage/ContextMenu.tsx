import React, { useEffect, useRef } from 'react'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onDelete: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="absolute z-10 rounded-md bg-white shadow-lg"
      style={{ top: y, left: x }}
    >
      <button
        className="hover:bg-gray-100 block w-full px-4 py-2 text-left text-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default ContextMenu
