import { motion } from "framer-motion";

import TemplateIcon from '@assets/landing/template.png'
import AiHelperIcon from '@assets/landing/aiHelper.png'
import KanbanIcon from '@assets/landing/kanban.png'
import MemoIcon from '@assets/landing/memo.png'

const StoryManuscript = () => {
  return (
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
          src={AiHelperIcon}
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
          src={TemplateIcon}
          alt="template"
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
          src={KanbanIcon}
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
          src={MemoIcon}
          alt="memo"
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
  )
}

export default StoryManuscript;