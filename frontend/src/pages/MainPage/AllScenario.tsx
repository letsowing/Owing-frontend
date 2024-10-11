import ProjectList from './ProjectList'

import { ProjectProps, Work } from '@types'

interface AllScenarioProps {
  projects: ProjectProps[]
  onProjectClick: (work: Work) => void
}

const AllScenario = ({ projects, onProjectClick }: AllScenarioProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          All Scenarios
        </label>
        {/* <select className="text-redorange"></select> */}
      </div>
      <div className="mt-3">
        <ProjectList projects={projects} onProjectClick={onProjectClick} />
      </div>
    </div>
  )
}

export default AllScenario
