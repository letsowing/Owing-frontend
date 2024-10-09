import ProjectCarousel from './ProjectCarousel'

interface QuickAccessProps {
  handleAddWork: () => void
  projects: {
    id: number
    name: string
    createdAt: Date
    image: string
  }[]
}

const QuickAccess = ({ handleAddWork, projects }: QuickAccessProps) => {
  return (
    <div className="flex flex-col">
      <label className="gap-1 text-sm font-semibold text-redorange dark:text-blue">
        Quick Access
      </label>
      <div className="mt-6">
        <ProjectCarousel handleAddWork={handleAddWork} projects={projects} />
      </div>
    </div>
  )
}

export default QuickAccess
