import Tag from './Tag'

interface TagFieldProps {
  labelValue: string
  tagList: readonly {
    value: string
    name: string
  }[]
  isEditable: boolean
  onClick?: () => void
}

const TagField = ({
  labelValue,
  tagList,
  isEditable,
  onClick,
}: TagFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-darkgray dark:text-coldbeige">
        {labelValue}
        {isEditable && (
          <span className="ml-1 text-redorange dark:text-blue">*</span>
        )}
      </label>
      <div className="mt-2 flex flex-wrap gap-3">
        {tagList.map((tag) => (
          <Tag
            name={tag.name}
            value={tag.value}
            key={tag.name}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default TagField
