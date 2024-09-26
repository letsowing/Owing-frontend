import React from 'react'

import { motion } from 'framer-motion'

interface TitleProps {
  title: string
  desc: string
}

const Title: React.FC<TitleProps> = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} 
      transition={{ ease: 'easeOut', duration: 0.6 }} 
      className="ml-80"
    >
      {/* <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ ease: 'easeInOut', duration: 1 }}
      className="ml-80"
    > */}
      <h2 className="mb-5 text-[30px] font-bold text-redorange">{title}</h2>
      <div
        className="mb-2 text-[50px] font-bold"
        style={{ whiteSpace: 'pre-line' }}
      >
        {desc}
      </div>
    </motion.div>
  )
}

export default Title
