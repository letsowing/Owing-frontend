import NewProject from './NewProject'
import ProjectCarouselItem from './ProjectCarouselItem'

import { Project, ProjectProps } from '@types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ProjectCarouselProps {
  handleAddProject: () => void
  onProjectClick: (project: Project) => void
  projects: ProjectProps[]
}

const ProjectCarousel = ({
  handleAddProject,
  onProjectClick,
  projects = [],
}: ProjectCarouselProps) => {
  const totalSlides = projects.length + 1
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: totalSlides < 5 ? totalSlides : 5,
    slidesToScroll: 1,
    arrows: false,
  }

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
    <>
      {totalSlides > 1 ? (
        <Slider {...settings}>
          <NewProject handleAddProject={handleAddProject} />
          {projects.map((project) => (
            <ProjectCarouselItem
              key={project.id}
              id={project.id}
              title={project.title}
              createdAt={project.createdAt}
              imageUrl={project.imageUrl}
              onProjectClick={() => handleProjectClick(project)}
            />
          ))}
        </Slider>
      ) : (
        <NewProject handleAddProject={handleAddProject} />
      )}
    </>
  )
}

export default ProjectCarousel
