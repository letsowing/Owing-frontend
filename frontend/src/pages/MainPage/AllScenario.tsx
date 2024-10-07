import ProjectList from './ProjectList'

interface AllScenarioProps {
  projects: {
    name: string
    updatedAt: Date
    createdAt: Date
    onClick: () => null
  }[]
}

const AllScenario = ({ projects }: AllScenarioProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-redorange">
          All Scenarios
        </label>
        {/* <select className="text-redorange"></select> */}
      </div>
      <div>
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}

export default AllScenario
