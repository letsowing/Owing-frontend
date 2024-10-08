import ProjectItem from './ProjectItem'

interface ProjectListProps {
  projects: {
    id: string
    name: string
    updatedAt: Date
    createdAt: Date
  }[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="max-h-[25rem] overflow-x-auto overflow-y-auto">
      <table className="divide-y-lightgray min-w-full">
        <thead>
          <tr>
            <th
              scope="col"
              className="w-3/5 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Last Modified
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-lightgray bg-white dark:bg-darkblack">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectList
