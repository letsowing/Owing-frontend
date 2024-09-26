import Card from '@/components/landing/Card'
import CharacterRelationshipGrid from '@/components/landing/CharacterRelationshipGrid'
import Footer from '@/components/landing/Footer'
import Ribbon from '@/components/landing/Ribbon'
import Title from '@/components/landing/Title'
import { CARD_LIST } from '@/constants/cardList'
import { INFO_LIST } from '@/constants/characterRelationshipInfoList'
import { motion } from 'framer-motion'

const Landing = () => {
  return (
    <div className="w-full" style={{ minHeight: '1080px' }}>
      <div className="mx-auto mt-48 px-4 py-8">
        <img
          src="src/assets/landing/logo.png"
          alt="OwingLogo"
          className="mx-auto mb-12 mt-4 h-auto w-96"
        />

        <img
          src="src/assets/landing/getStarted.png"
          alt="getStarted"
          className="mx-auto mb-40 mt-48 h-auto w-96"
        />

        <div className="bg-gradient-to-b from-white to-[#FDF8F4]">
          <h1 className="mb-20 text-center text-[50px] font-bold text-darkgray">
            이야기 관리를 편하게.
            <br />
            창작의 본질에 집중할 수 있는
            <br />
            온라인 집필 플랫폼
          </h1>

          <div className="relative w-full pb-40">
            <div className="absolute inset-x-0 top-0 z-0 w-full">
              <Ribbon />
            </div>

            <div className="container relative z-20 mx-auto px-4 pt-72">
              <div className="flex flex-wrap justify-center gap-2">
                {CARD_LIST.map((card, index) => (
                  <div key={index} className="p-2">
                    <Card text={card.text} name={card.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="my-48 text-center text-[30px] font-bold text-darkgray">
          이야기의 아이디어부터 완성까지 한 곳에서,
          <br />
          복잡한 설정을 걱정하지 않고 창작에만 집중할 수 있는 새로운 경험.
          <br />
          글로 그리는 세상, Owing과 함께 그 여정을 시작하세요.
        </h2>

        <div className="bg-gradient-to-b from-[#F9FAFB] to-white py-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="ml-80"
          >
            <h2 className="mb-5 text-[30px] font-bold text-redorange">
              스토리 원고
            </h2>
            <div className="font-bold">
              <span className="text-[50px]">오류는 </span>
              <span className="text-[40px]">줄이고</span>
            </div>
            <div className="mb-32 font-bold">
              <span className="text-[50px]">상상력은 </span>
              <span className="text-[60px]">키우고</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mb-24 ml-80 flex flex-row items-center"
          >
            <div className="flex-1 pr-8">
              <h2 className="text-1xl mb-5 font-bold text-redorange">
                설정 오류 체크
              </h2>
              <h2 className="mb-10 text-[40px] font-bold">
                당신의 이야기에
                <br />
                일관성을 더하다
              </h2>
              <h2 className="mb-20 text-[25px] font-bold text-[#999999]">
                " 새로 추가되는 이야기와 설정에 <br />
                오류가 있지 않을까? "<br />
                <br />
                작성한 내용을 기반으로 설정 오류를 감지합니다. <br />
                더불어 맞춤법 검사도 지원합니다.
              </h2>
            </div>
            <div className="mr-40 flex-1">
              <img
                src="src/assets/landing/aiHelper.png"
                alt="aiHelper"
                className="mx-auto mb-12 mt-4 h-auto w-96"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mb-40 mr-80 flex flex-row items-center text-right"
          >
            <div className="ml-48 flex-1">
              <img
                src="src/assets/landing/template.png"
                alt="kanban"
                className="mx-auto mb-12 mt-4 h-auto w-96"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-1xl mb-5 font-bold text-redorange">
                시나리오 서식
              </h2>
              <h2 className="mb-10 text-[40px] font-bold">클릭으로 편리하게</h2>
              <h2 className="mb-20 text-[25px] font-bold text-[#999999]">
                시나리오 작성에 필요한 서식을 <br />
                제공하여 효율적인 작업을 지원합니다.
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mb-40 ml-80 flex flex-row items-center"
          >
            <div className="flex-1 pr-8">
              <h2 className="text-1xl mb-5 font-bold text-redorange">
                칸반보드
              </h2>
              <h2 className="mb-10 text-[40px] font-bold">
                내 이야기는
                <br />
                내가 원하는 위치에
              </h2>
              <h2 className="mb-20 text-[25px] font-bold text-[#999999]">
                각 보드를 자유롭게 이동할 수 있어, <br />
                유연한 수정과 구성이 가능합니다.
                <br />
                원고의 글자 수도 확인할 수 있습니다.
              </h2>
            </div>
            <div className="mr-40 flex-1">
              <img
                src="src/assets/landing/kanban.png"
                alt="kanban"
                className="mx-auto mb-12 mt-4 h-auto w-96"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mr-80 flex flex-row items-center text-right"
          >
            <div className="ml-48 flex-1">
              <img
                src="src/assets/landing/memo.png"
                alt="kanban"
                className="mx-auto mb-12 mt-4 h-auto w-96"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-1xl mb-5 font-bold text-redorange">메모장</h2>
              <h2 className="mb-10 text-[40px] font-bold">
                기억하고 싶은 내용을
                <br />
                간편하게
              </h2>
              <h2 className="mb-20 text-[25px] font-bold text-[#999999]">
                작업 중 필요한 용어나 아이디어를 <br />
                기록할 수 있습니다.
              </h2>
            </div>
          </motion.div>
        </div>

        <div className="bg-[#F9FAFB] py-40">
          <Title
            title={'인물관계도'}
            desc={`복잡한 관계 설정도\nOwing과 함께라면 쉽게`}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mx-80 mt-32"
          >
            <CharacterRelationshipGrid infoList={INFO_LIST} />
          </motion.div>
        </div>

        <div className="bg-[#FDF8F3] py-40">
          <div className="py-40">
            <Title
              title={'세계관'}
              desc={`글 속에 숨은 세계,\nOwing이 그려냅니다`}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mx-80"
          >
            <img
              src="src/assets/landing/universe.png"
              alt="Universe"
              className="shadow-gray-300/50 mx-auto mb-12 mt-4 rounded-[25px] shadow-lg"
            />
            <p className="mt-20 text-[25px] font-semibold text-[#999999]">
              DALL·E를 활용해 세계관 이미지를 생성할 수 있어요. <br />
              이를 통해 복잡한 설정이나 세계관을 보다 쉽게 이해할 수 있어요.
            </p>
          </motion.div>
        </div>

        <div className="pt-40">
          <Title
            title={'작업량 통계'}
            desc={`오늘 하루 얼마나\n작업하셨나요?`}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ ease: 'easeInOut', duration: 0.6 }}
            className="mx-80"
          >
            <div className="mb-20 flex flex-col items-center justify-between md:flex-row">
              <p className="mt-32 text-right text-[25px] font-semibold text-darkgray">
                작업량이 기록되어
                <br />
                그래프로 간편하게 확인할 수 있어요
              </p>
              <img
                src="src/assets/landing/dashboard.png"
                alt="Dashboard"
                className="mx-auto mb-12 mt-4 h-auto w-96 rounded-[25px]"
              />
              <p className="mb-52 text-[25px] font-semibold text-darkgray">
                작업을 분석해 자동으로
                <br />
                글자 수를 계산할 수 있어요
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
