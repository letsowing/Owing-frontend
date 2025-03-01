import { motion } from "framer-motion";

import DashboardIcon from '@assets/landing/dashboard.png'
import Title from "@pages/LandingPage/Title";

const WorkloadStatistics = () => {
  return (
    <div className="pt-40 dark:bg-verydarkblack">
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
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mt-32 text-right text-[25px] font-semibold text-darkgray dark:text-[#999999]">
            작업량이 기록되어
            <br />
            그래프로 간편하게 확인할 수 있어요
          </p>
          <img
            src={DashboardIcon}
            alt="Dashboard"
            className="mx-auto mb-12 mt-4 h-auto w-96 rounded-[25px]"
          />
          <p className="mb-52 text-[25px] font-semibold text-darkgray dark:text-[#999999]">
            작업을 분석해 자동으로
            <br />
            글자 수를 계산할 수 있어요
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default WorkloadStatistics;