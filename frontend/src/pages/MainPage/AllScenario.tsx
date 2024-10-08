import ProjectList from './ProjectList'

interface AllScenarioProps {
  projects: {
    id: string
    name: string
    updatedAt: Date
    createdAt: Date
  }[]
}

const AllScenario = ({ projects }: AllScenarioProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          All Scenarios
        </label>
        {/* <select className="text-redorange"></select> */}
      </div>
      <div className="mt-1">
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}

export default AllScenario
