interface TagProps {
  value: string
  name: string
  isSelected?: boolean
  onClick?: () => void
}

const Tag = ({ value, name, isSelected, onClick }: TagProps) => {
  return (
    <button
      className={`rounded-full px-4 py-1 font-normal ${
        !isSelected
          ? 'bg-gradient-to-r from-orange/75 to-redorange/75 text-white dark:from-skyblue/80 dark:to-blue/80 dark:text-coldbeige'
          : 'bg-beige text-gray dark:bg-coldbeige'
      }`}
      data-value={value}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Tag
