import Tag from '@components/common/Tag'

import { Work } from '@/types'

interface ProjectTagFieldProps {
  labelValue: string
  tagList: readonly {
    value: string
    name: string
  }[]
  isEditable: boolean
  work: Work
  onTagClick?: (value: string) => void
}

const ProjectTagField = ({
  labelValue,
  tagList,
  isEditable,
  work,
  onTagClick,
}: ProjectTagFieldProps) => {
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
            onClick={onTagClick}
            isSelected={
              work.category === tag.value ||
              (work.genres || []).includes(tag.value)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectTagField
