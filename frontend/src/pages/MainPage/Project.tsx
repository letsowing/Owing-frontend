interface ProjectProps {
  onClickProject: React.MouseEventHandler<HTMLDivElement>
  projectName: string
  createdAt: Date
}

const Project = ({ onClickProject, projectName, createdAt }: ProjectProps) => {
  return (
    <div
      className="flex h-[200px] w-[150px] flex-col justify-between overflow-hidden rounded-3xl shadow-md"
      onClick={onClickProject}
    >
      <div className="flex flex-1 bg-gray">
        <img className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col items-center">
        <label className="w-36 truncate px-2 text-sm font-semibold">
          {projectName}
        </label>
        <label className="mb-2 text-[11px] font-medium">
          {createdAt.toLocaleString()}
        </label>
      </div>
    </div>
  )
}

export default Project
