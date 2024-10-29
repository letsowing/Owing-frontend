import ProjectList from './ProjectList'

import { Project, ProjectProps } from '@types'

interface AllProjectsProps {
  projects: ProjectProps[]
  onProjectClick: (project: Project) => void
}

const AllProjects = ({ projects, onProjectClick }: AllProjectsProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          All Projects
        </label>
        {/* <select className="text-redorange"></select> */}
      </div>
      <div className="mt-3">
        <ProjectList projects={projects} onProjectClick={onProjectClick} />
      </div>
    </div>
  )
}

export default AllProjects
