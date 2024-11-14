import ProjectList from './ProjectList'

import { Project, ProjectProps } from '@types'

interface AllProjectsProps {
  projects: ProjectProps[]
  onProjectClick: (project: Project) => void
}

const AllProjects = ({ projects, onProjectClick }: AllProjectsProps) => {
  return (
    <div className="mt-9 flex flex-col">
      <div className="flex justify-between">
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          전체 작품
        </label>
        {/* <select className="text-redorange"></select> */}
      </div>
      <ProjectList projects={projects} onProjectClick={onProjectClick} />
    </div>
  )
}

export default AllProjects
