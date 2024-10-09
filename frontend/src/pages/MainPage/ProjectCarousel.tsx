import NewProject from './NewProject'
import Project from './Project'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ProjectCarouselProps {
  handleAddWork: () => void
  projects: {
    id: number
    name: string
    createdAt: Date
    image: string
  }[]
}

const ProjectCarousel = ({ handleAddWork, projects }: ProjectCarouselProps) => {
  const totalSlides = projects.length + 1
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: totalSlides < 5 ? totalSlides : 5,
    slidesToScroll: 1,
    arrows: false,
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
              name={project.name}
              createdAt={project.createdAt}
              image={project.image}
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
