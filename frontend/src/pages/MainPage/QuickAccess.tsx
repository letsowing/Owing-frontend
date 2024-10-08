import ProjectCarousel from './ProjectCarousel'

interface QuickAccessProps {
  projects: {
    id: string
    name: string
    createdAt: Date
    image: string
  }[]
}

const QuickAccess = ({ projects }: QuickAccessProps) => {
  return (
    <div className="flex flex-col">
      <label className="gap-1 text-sm font-semibold text-redorange dark:text-blue">
        Quick Access
      </label>
      <div className="mt-6">
        <ProjectCarousel projects={projects} />
      </div>
    </div>
  )
}

export default QuickAccess
