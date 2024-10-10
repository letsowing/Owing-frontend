import useNavigation from '@hooks/useNavigation'

interface ProjectItemProps {
  id: number
  name: string
  updatedAt: Date
  createdAt: Date
}

const ProjectItem = ({ id, name, updatedAt, createdAt }: ProjectItemProps) => {
  const { goToProject } = useNavigation()

  return (
    <tr
      className="cursor-pointer border-t border-lightgray hover:bg-beige dark:hover:bg-coldbeige"
      onClick={() => goToProject(id)}
    >
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
