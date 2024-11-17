import Tag from '@components/common/Tag'

import { Project } from '@types'

interface ProjectTagFieldProps {
  labelValue: string
  tagList: readonly {
    value: string
    name: string
  }[]
  isEditable: boolean
  project: Project
  onTagClick: (value: string) => void
  type: 'category' | 'genres'
}

const ProjectTagField = ({
  labelValue,
  tagList,
  isEditable,
  project,
  onTagClick,
  type,
}: ProjectTagFieldProps) => {
  const isTagSelected = (tagValue: string) => {
    if (type === 'category') {
      return project.category === tagValue
    }
    return project.genres.includes(tagValue)
  }

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
            isSelected={isTagSelected(tag.value)}
            isEditable={isEditable}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectTagField
