import { IconType } from 'react-icons/lib'

interface TabItemProps {
  label: string
  icon: IconType
  isActive?: boolean
  onClick: () => void
}

export const TabItem = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: TabItemProps) => {
  return (
    <div
      className={`mx-3 my-3 flex cursor-pointer flex-col items-center text-center ${
        isActive ? 'text-redorange dark:text-blue' : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`mb-1 p-3 ${
          isActive ? 'rounded-full bg-darkbeige dark:bg-coldbeige' : ''
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <button type="button" className="text-xs font-medium">
        {label}
      </button>
    </div>
  )
}
