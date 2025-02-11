import { CARD_LIST } from '@constants/cardList'
import Ribbon from '@pages/LandingPage/Ribbon'
import Card from '@pages/LandingPage/Card'

const UserReview = () => {
  return (
    <div className="h-[45rem] bg-gradient-to-b from-white to-[#FDF8F4]">
      <div className="relative w-full pb-40 overflow-x-hidden overflow-y-visible">
        <div className="absolute inset-x-0 top-0 z-0 w-full">
          <Ribbon />
        </div>

        <div className="container relative z-20 mx-auto px-4 pt-60">
          <div className="mb-10 flex animate-slider flex-row gap-x-[2rem] w-full">
            {[...CARD_LIST, ...CARD_LIST, ...CARD_LIST].map(
              (card, index) => (
                <div key={index} className="inline-block p-2">
                  <Card text={card.text} name={card.name} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserReview;