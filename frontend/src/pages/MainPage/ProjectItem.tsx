interface ProjectItemProps {
  key: number
  name: string
  updatedAt: Date
  createdAt: Date
}

const ProjectItem = ({ name, updatedAt, createdAt }: ProjectItemProps) => {
  return (
    <tr className="cursor-pointer border-t border-lightgray hover:bg-beige">
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray dark:text-lightgray">
        {name}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:text-lightgray">
        {updatedAt.toLocaleString()}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:text-lightgray">
        {createdAt.toLocaleString()}
      </td>
    </tr>
  )
}

export default ProjectItem
