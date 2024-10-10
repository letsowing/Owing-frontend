import useNavigation from '@hooks/useNavigation'

interface ProjectItemProps {
  id: number
  title: string
  updatedAt: Date
  createdAt: Date
  imageUrl: string
}

const ProjectItem = ({ id, title, updatedAt, createdAt }: ProjectItemProps) => {
  const { goToProject } = useNavigation()

  return (
    <tr
      className="cursor-pointer border-t border-lightgray hover:bg-beige dark:hover:bg-coldbeige"
      onClick={() => goToProject(id)}
    >
      <td className="text-normal py-4 pl-4 pr-3 font-medium text-gray dark:hover:text-darkgray">
        {title}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:hover:text-darkgray">
      {new Date(updatedAt).toLocaleDateString()}  {new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray dark:hover:text-darkgray">
      {new Date(createdAt).toLocaleDateString()}  {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </td>
    </tr>
  )
}

export default ProjectItem
