import ProjectItem from './ProjectItem'

import { Project, ProjectProps } from '@types'

interface ProjectListProps {
  projects: ProjectProps[]
  onProjectClick: (project: Project) => void
}

const ProjectList = ({ projects = [], onProjectClick }: ProjectListProps) => {
  const handleProjectClick = (project: ProjectProps) => {
    const projectData: Project = {
      ...project,
      genres: [], // 기본값으로 빈 배열 제공
      category: '', // 선택적 필드이지만 빈 문자열로 초기화
      description: '', // 선택적 필드이지만 빈 문자열로 초기화
      updatedAt: project.createdAt, // updatedAt이 없으면 createdAt으로 초기화
    }
    onProjectClick(projectData)
  }
  return (
    <div className="scrollbar-thin scrollbar-thumb-lightredorange scrollbar-track-white dark:scrollbar-thumb-skyblue dark:scrollbar-track-darkblack mt-2 max-h-72 overflow-x-auto overflow-y-auto">
      <table className="divide-y-lightgray w-full">
        <thead className="text-lightgray dark:text-skyblue">
          <tr>
            <th
              scope="col"
              className="w-1/2 py-1 pl-4 pr-3 text-left text-sm font-semibold"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 text-center text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Last Modified
            </th>
            <th
              scope="col"
              className="text-center text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-lightgray bg-white dark:bg-darkblack">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectItem
                key={project.id}
                onProjectClick={() => handleProjectClick(project)}
                {...project}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectList
