interface ProjectProps {
  id: string
  name: string
  createdAt: Date
  image: string
}

const Project = ({ name, createdAt, image }: ProjectProps) => {
  return (
    <div className="my-1 flex h-[15rem] w-[12rem] flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="flex flex-1 bg-gray">
        <img className="h-full w-full object-cover" src={image} />
      </div>
      <div className="flex flex-col items-center">
        <label className="w-36 truncate px-2 text-sm font-medium dark:text-gray">
          {name}
        </label>
        <label className="mb-2 text-[11px] font-normal dark:text-gray">
          {createdAt.toLocaleString()}
        </label>
      </div>
    </div>
  )
}

export default Project
