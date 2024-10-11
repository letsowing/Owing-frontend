import ProjectCarousel from './ProjectCarousel'

import { ProjectProps, Work } from '@types'

interface QuickAccessProps {
  handleAddWork: () => void
  projects: ProjectProps[]
  onProjectClick: (work: Work) => void
}

const QuickAccess = ({
  handleAddWork,
  projects,
  onProjectClick,
}: QuickAccessProps) => {
  return (
    <div className="flex flex-col">
      <label className="gap-1 text-sm font-semibold text-redorange dark:text-blue">
        Quick Access
      </label>
      <div className="mt-6">
        <ProjectCarousel
          handleAddWork={handleAddWork}
          onProjectClick={onProjectClick}
          projects={projects || []}
        />
      </div>
    </div>
  )
}

export default QuickAccess
