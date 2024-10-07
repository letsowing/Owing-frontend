import NewProject from './NewProject'
import Project from './Project'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ProjectCarouselProps {
  projects: {
    id: number
    name: string
    createdAt: Date
    image: string
  }[]
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const totalSlides = projects.length + 1
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: totalSlides < 5 ? totalSlides : 5,
    slidesToScroll: 1,
    arrows: false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  }

  return (
    <div className="slider-container">
      {totalSlides > 1 ? (
        <Slider {...settings}>
          <NewProject />
          {projects.map((project) => (
            <Project
              key={project.id}
              name={project.name}
              createdAt={project.createdAt}
              image={project.image}
            />
          ))}
        </Slider>
      ) : (
        <NewProject />
      )}
    </div>
  )
}

export default ProjectCarousel
