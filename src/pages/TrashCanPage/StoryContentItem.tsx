interface ContentItemProps {
  name: string
  description: string
  onClickStoryTrash?: () => void
}

const StoryContentItem = ({
  name,
  description,
  onClickStoryTrash,
}: ContentItemProps) => {
  return (
    <div
      onClick={onClickStoryTrash}
      className="shadow-gray-300/50 hover:bg-gray-50 dark:hover:bg-gray-900 m-2 flex h-56 cursor-pointer flex-col rounded-md bg-white p-2 shadow-lg transition-colors dark:bg-verydarkblack dark:text-coldbeige"
    >
      <h3 className="mb-1 font-semibold">{name}</h3>
      <p>{description}</p>
    </div>
  )
}
export default StoryContentItem
