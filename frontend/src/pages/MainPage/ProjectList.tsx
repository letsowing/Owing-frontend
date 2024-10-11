import ProjectItem from './ProjectItem'

import { ProjectProps, Work } from '@types'

interface ProjectListProps {
  projects: ProjectProps[]
  onProjectClick: (work: Work) => void
}

const ProjectList = ({ projects = [], onProjectClick }: ProjectListProps) => {
  const handleProjectClick = (project: ProjectProps) => {
    const work: Work = {
      ...project,
      genres: [], // 기본값으로 빈 배열 제공
      category: '', // 선택적 필드이지만 빈 문자열로 초기화
      description: '', // 선택적 필드이지만 빈 문자열로 초기화
      updatedAt: project.createdAt, // updatedAt이 없으면 createdAt으로 초기화
    }
    onProjectClick(work)
  }
  return (
    <div className="max-h-[25rem] overflow-x-auto overflow-y-auto">
      <table className="divide-y-lightgray min-w-full">
        <thead>
          <tr>
            <th
              scope="col"
              className="w-3/5 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-lightgray dark:text-skyblue"
            >
              Last Modified
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-lightgray dark:text-skyblue"
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
