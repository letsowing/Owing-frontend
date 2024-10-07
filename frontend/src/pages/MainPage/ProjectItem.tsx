interface ProjectItemProps {
  key: number
  name: string
  updatedAt: Date
  createdAt: Date
  onClick: () => null
}

const ProjectItem = ({
  name,
  updatedAt,
  createdAt,
  onClick,
}: ProjectItemProps) => {
  return (
    <tr
      className="cursor-pointer border-t border-lightgray hover:bg-beige"
      onClick={onClick}
    >
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray">{name}</td>
      <td className="px-3 py-4 text-center text-sm text-gray">
        {updatedAt.toLocaleString()}
      </td>
      <td className="px-3 py-4 text-center text-sm text-gray">
        {createdAt.toLocaleString()}
      </td>
    </tr>
  )
}

export default ProjectItem
