import useNavigation from '@hooks/useNavigation'

interface ProjectProps {
  id: number
  name: string
  createdAt: Date
  image: string
}

const Project = ({ id, name, createdAt, image }: ProjectProps) => {
  const { goToProject } = useNavigation()

  return (
    <div
      className="my-1 flex h-[15rem] w-[12rem] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-coldbeige"
      onClick={() => goToProject(id)}
    >
      <div className="flex flex-1 bg-gray">
        <img className="h-full w-full object-cover" src={image} />
      </div>
      <div className="flex flex-col items-center">
        <label className="w-36 cursor-pointer truncate px-2 text-sm font-medium dark:text-gray">
          {name}
        </label>
        <label className="mb-2 cursor-pointer text-[11px] font-normal dark:text-gray">
          {createdAt.toLocaleString()}
        </label>
      </div>
    </div>
  )
}

export default Project
