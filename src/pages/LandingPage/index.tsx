import { SlArrowDown } from 'react-icons/sl'

import GetStartedIcon from '@assets/landing/getStarted.png'
import LogoIcon from '@assets/landing/logo.png'
import useMemberStore from '@stores/memberStore'
import useNavigation from '@hooks/useNavigation'

import WorkloadStatistics from '@pages/LandingPage/Features/WorkloadStatistics'
import RelationshipChart from '@pages/LandingPage/Features/RelationshipChart'
import StoryManuscript from '@pages/LandingPage/Features/StoryManuscript'
import WorldBuilding from '@pages/LandingPage/Features/WorldBuilding'
import Introduction from '@pages/LandingPage/Introduction'
import Footer from '@pages/LandingPage/Footer'

const Landing = () => {
  const { goToMain, goToLogin } = useNavigation()
  const isLoggedIn = useMemberStore((state) => state.isLoggedIn)

  const handleStartClick = () => {
    if (isLoggedIn) {
      goToMain()
    } else {
      goToLogin()
    }
  }

  return (
    <div className="w-full" style={{ minHeight: '1080px' }}>
      <div className="mx-auto mt-48 py-8 dark:bg-verydarkblack">

        {/* main image */}
        <img
          src={LogoIcon}
          alt="OwingLogo"
          className="mx-auto mb-12 mt-4 h-auto w-96"
        />

        {/* get started */}
        <div className="flex flex-col items-center justify-center dark:bg-verydarkblack">
          <img
            src={GetStartedIcon}
            alt="getStarted"
            className="mb-16 mt-52 h-auto w-96"
            onClick={handleStartClick}
          />
          <div className="mb-12 animate-bounce text-4xl text-lightgray">
            <SlArrowDown />
          </div>
        </div>

        <Introduction />

        <StoryManuscript />

        <RelationshipChart />

        <WorldBuilding />
        
        <WorkloadStatistics />

      </div>

      <Footer />

    </div>
  )
}

export default Landing
