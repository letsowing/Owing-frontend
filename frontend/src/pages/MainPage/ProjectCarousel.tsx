import NewProject from './NewProject'
import Project from './Project'

import { ProjectProps, Work } from '@types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ProjectCarouselProps {
  handleAddWork: () => void
  onProjectClick: (work: Work) => void
  projects: ProjectProps[]
}

const ProjectCarousel = ({
  handleAddWork,
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
    <div className="slider-container">
      {totalSlides > 1 ? (
        <Slider {...settings}>
          <NewProject handleAddWork={handleAddWork} />
          {projects.map((project) => (
            <Project
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
        <NewProject handleAddWork={handleAddWork} />
      )}
    </div>
  )
}

export default ProjectCarousel
