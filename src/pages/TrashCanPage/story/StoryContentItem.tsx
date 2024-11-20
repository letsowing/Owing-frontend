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
      className="m-2 flex h-56 flex-col rounded-md bg-white p-2 shadow-lg dark:bg-darkblack dark:text-white dark:shadow-black"
    >
      <h3 className="mb-1 font-semibold">{name}</h3>
      <p>{description}</p>
    </div>
  )
}
export default StoryContentItem
