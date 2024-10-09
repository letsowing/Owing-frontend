interface TagProps {
  value: string
  name: string
  isActive?: boolean
}

// const Tag = ({ value, isActive }: TagProps) => {
const Tag = ({ value, name }: TagProps) => {
  return (
    <button
      className="rounded-full bg-beige px-4 py-1 font-normal text-gray dark:bg-coldbeige"
      data-value={value}
    >
      {name}
    </button>
  )
}

export default Tag
