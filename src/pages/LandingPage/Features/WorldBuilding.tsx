import { motion } from "framer-motion";

import UniverseIcon from '@assets/landing/universe.png'
import Title from "@pages/LandingPage/Title"

const WorldBuilding = () => {
  return (
    <div className="bg-[#FDF8F3] py-40 dark:bg-verydarkblack">
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
          src={UniverseIcon}
          alt="Universe"
          className="shadow-gray-300/50 mx-auto mb-12 mt-4 rounded-[25px] shadow-lg"
        />
        <p className="mt-20 text-[25px] font-semibold text-[#999999]">
          DALL·E를 활용해 세계관 이미지를 생성할 수 있어요. <br />
          이를 통해 복잡한 설정이나 세계관을 보다 쉽게 이해할 수 있어요.
        </p>
      </motion.div>
    </div>
  )
}

export default WorldBuilding;