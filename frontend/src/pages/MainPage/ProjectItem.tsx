interface ProjectItemProps {
  key: number
  name: string
  updatedAt: Date
  createdAt: Date
}

const ProjectItem = ({ name, updatedAt, createdAt }: ProjectItemProps) => {
  return (
    <tr className="cursor-pointer border-t border-lightgray hover:bg-beige dark:hover:bg-coldbeige">
      <td className="text-normal py-4 pl-4 pr-3 font-medium text-gray dark:hover:text-darkgray">
        {name}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:hover:text-darkgray">
        {updatedAt.toLocaleString()}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:hover:text-darkgray">
        {createdAt.toLocaleString()}
      </td>
    </tr>
  )
}

export default ProjectItem
