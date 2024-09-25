import Card from '@/components/landing/Card'
import Ribbon from '@/components/landing/Ribbon'
import { motion } from 'framer-motion'

const Landing = () => {
  const cards = [
    {
      text: '스토리 원고 기능은 시나리오 작성에 필요한 템플릿을 제공하여 효율적인 작업을 지원합니다.',
      name: 'Name 1',
    },
    {
      text: '스토리 원고 기능은 시나리오 작성에 필요한 템플릿을 제공하여 효율적인 작업을 지원합니다.',
      name: 'Name 2',
    },
    {
      text: '스토리 원고 기능은 시나리오 작성에 필요한 템플릿을 제공하여 효율적인 작업을 지원합니다.',
      name: 'Name 3',
    },
    {
      text: '스토리 원고 기능은 시나리오 작성에 필요한 템플릿을 제공하여 효율적인 작업을 지원합니다.',
      name: 'Name 4',
    },
    {
      text: '스토리 원고 기능은 시나리오 작성에 필요한 템플릿을 제공하여 효율적인 작업을 지원합니다.',
      name: 'Name 5',
    },
  ]

  return (
    <div className="w-full" style={{ minHeight: '1080px' }}>
      <div className="mx-auto px-4 py-8">
        <img
          src="src/assets/logo.png"
          alt="OwingLogo"
          className="mx-auto mb-12 mt-4 h-auto w-96"
        />

        <img
          src="src/assets/getStarted.png"
          alt="getStarted"
          className="mx-auto mb-12 mt-4 h-auto w-96"
        />

        <div className="bg-gradient-to-b from-white to-[#FDF8F4]">
          <h1 className="mb-20 text-center text-4xl font-bold text-darkgray">
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
                {cards.map((card, index) => (
                  <div key={index} className="p-2">
                    <Card text={card.text} name={card.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-32 mt-32 text-center text-2xl font-bold text-darkgray">
          이야기의 아이디어부터 완성까지 한 곳에서,
          <br />
          복잡한 설정을 걱정하지 않고 창작에만 집중할 수 있는 새로운 경험.
          <br />
          글로 그리는 세상, Owing과 함께 그 여정을 시작하세요.
        </h2>

        <div className="bg-[#FAFBFC]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <h2 className="mb-10 ml-20 text-3xl font-bold">
              당신의 이야기에
              <br />
              일관성을 더하다
            </h2>
            <h2 className="mb-20 ml-20 text-xl font-bold text-[#999999]">
              " 새로 추가되는 이야기와 설정에 <br />
              오류가 있지 않을까? "<br />
              <br />
              작성한 내용을 기반으로 설정 오류를 감지합니다. <br />
              더불어 맞춤법 검사도 지원합니다.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <section className="mb-10 h-60 w-full bg-black py-12"></section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing
