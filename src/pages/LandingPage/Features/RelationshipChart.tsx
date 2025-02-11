import { motion } from "framer-motion";

import { INFO_LIST } from "@/constants/castRelationshipInfoList";
import CastRelationshipGrid from "@pages/LandingPage/CastRelationshipGrid";
import Title from "@pages/LandingPage/Title";

const RelationshipChart = () => {
  return (
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
        <CastRelationshipGrid infoList={INFO_LIST} />
      </motion.div>
    </div>
  )
}

export default RelationshipChart;