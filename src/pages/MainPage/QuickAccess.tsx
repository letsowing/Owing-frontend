import ProjectCarousel from './ProjectCarousel'

import { Project, ProjectProps } from '@types'

interface QuickAccessProps {
  handleAddProject: () => void
  projects: ProjectProps[]
  onProjectClick: (project: Project) => void
}

const QuickAccess = ({
  handleAddProject,
  projects,
  onProjectClick,
}: QuickAccessProps) => {
  return (
    <div className="w-full">
      <label className="text-sm font-semibold text-redorange dark:text-blue">
        Quick Access
      </label>
      <div className="mt-6">
        <ProjectCarousel
          handleAddProject={handleAddProject}
          onProjectClick={onProjectClick}
          projects={projects || []}
        />
      </div>
    </div>
  )
}

export default QuickAccess
