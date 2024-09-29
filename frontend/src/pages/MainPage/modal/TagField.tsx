import Tag from './Tag'

interface TagFieldProps {
  labelValue: string
  tagList: readonly { value: string }[]
}

const TagField = ({ labelValue, tagList }: TagFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-darkgray">
        {labelValue}
        <span className="ml-1 text-redorange">*</span>
      </label>
      <div className="mt-2 flex gap-3">
        {tagList.map((tag) => (
          <Tag value={tag.value} />
        ))}
      </div>
    </div>
  )
}

export default TagField
