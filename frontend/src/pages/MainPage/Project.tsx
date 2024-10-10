import useNavigation from '@hooks/useNavigation'

interface ProjectProps {
  id: number
  title: string
  createdAt: Date
  imageUrl: string
}

const Project = ({ id, title, createdAt, imageUrl }: ProjectProps) => {
  const { goToProject } = useNavigation()

  return (
    <div
      className="my-1 flex h-[15rem] w-[12rem] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-coldbeige"
      onClick={() => goToProject(id)}
    >
      <div className="flex flex-1 bg-gray">
        <img className="h-full w-full object-cover" src={`data:image/jpeg;base64,${imageUrl}`} />
      </div>
      <div className="flex flex-col items-center">
        <label className="w-36 cursor-pointer truncate px-2 text-sm font-medium dark:text-gray">
          {title}
        </label>
        <label className="mb-2 cursor-pointer text-[11px] font-normal dark:text-gray">
        {new Date(createdAt).toLocaleDateString()}  {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </label>
      </div>
    </div>
  )
}

export default Project
