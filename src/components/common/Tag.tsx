interface TagProps {
  value: string
  name: string
  isSelected?: boolean
  isEditable?: boolean
  onClick?: (value: string) => void
}

const Tag = ({ value, name, isSelected, isEditable, onClick }: TagProps) => {
  return (
    <button
      disabled={!isEditable}
      className={`rounded-full px-4 py-1 font-normal ${
        isSelected
          ? 'bg-gradient-to-r from-orange/75 to-redorange/75 text-white dark:from-skyblue/80 dark:to-blue/80 dark:text-coldbeige'
          : 'bg-beige text-gray dark:bg-coldbeige'
      }`}
      data-value={value}
      onClick={() => onClick?.(value)}
    >
      {name}
    </button>
  )
}

export default Tag
