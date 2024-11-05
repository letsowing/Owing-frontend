interface ContentItemProps {
  name: string
  description: string
}

const StoryContentItem = ({ name, description }: ContentItemProps) => {
  return (
    <div className="shadow-gray-300/50 m-2 flex h-56 flex-col rounded-md bg-white p-2 shadow-lg dark:bg-verydarkblack dark:text-coldbeige">
      <h3 className="mb-1 font-semibold">{name}</h3>
      <p>{description}</p>
    </div>
  )
}

export default StoryContentItem
