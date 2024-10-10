import MemberInfo from '@pages/ContactUsPage/memberInfo'
import ToggleMenu from '@pages/ContactUsPage/toggleMenu'

import { MEMBER_INFO_LIST } from '@constants/memberInfoList'
import { QNA_LIST } from '@constants/qnaList'

export default function ContactUs() {
  return (
    <div className="bg-gradient-to-b from-white to-[#FFF4E7]">
      {/* 자주하는 질문 */}
      <div>
        <div className="my-20 flex justify-center text-[30px] font-semibold">
          Frequently Asked Questions
        </div>
        {QNA_LIST.map((qna, index) => (
          <div key={index}>
            <ToggleMenu question={qna.question} answer={qna.answer} />
          </div>
        ))}
      </div>

      {/* 팀 소개 */}
      <div className="mt-40">
        <div className="mb-4 flex justify-center text-[30px] font-semibold">
          Didn’t find an answer?
        </div>
        <div className="mb-20 flex justify-center text-[20px] text-gray">
          ~팀 이메일로 문의해주시면 도와드릴게용ㅇㅇ 서비스 피드백도 좋아요
          느낌~
        </div>
        <div className="flex flex-row justify-center">
          {MEMBER_INFO_LIST.map((info, index) => (
            <div key={index} className="mr-8">
              <MemberInfo name={info.name} role={info.role} />
            </div>
          ))}
        </div>
      </div>

      {/* 컨택트 정보 */}
      <div className="mx-40 my-28 flex h-72 items-center justify-center rounded-2xl bg-white bg-opacity-60 shadow-lg">
        <div className="mx-10 flex flex-col items-center">
          <h4 className="mb-4 text-[25px] font-semibold text-redorange">
            Email Address
          </h4>
          <div className="text-[20px] text-gray">letsowing@gmail.com</div>
        </div>
        <div className="mx-10 flex flex-col items-center">
          <h4 className="mb-4 text-[25px] font-semibold text-redorange">
            Phone Number
          </h4>
          <div className="text-[20px] text-gray">010-xxxx-xxxx</div>
        </div>
        <div className="mx-10 flex flex-col items-center">
          <h4 className="mb-4 text-[25px] font-semibold text-redorange">
            Work Day
          </h4>
          <div className="text-[20px] text-gray">Mon-Fri 09:00-18:00</div>
        </div>
      </div>
    </div>
  )
}
