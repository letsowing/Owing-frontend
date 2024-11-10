interface TabItemProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export const TabItem = ({ label, isActive, onClick }: TabItemProps) => {
  return (
    <button
      type="button"
      className={`focus:ring-blue-200 w-full px-4 py-3 text-left font-medium outline-none focus:ring-2 ${
        isActive
          ? 'border-blue-500 text-blue-500 bg-blue-50 border-r-2'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
