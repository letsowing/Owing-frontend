import React from 'react'

import ProfileImageIcon from '@/assets/landing/profileImage.png'

interface CardProps {
  text: string
  name: string
  bgColor?: string
}

const Card: React.FC<CardProps> = ({ text, name, bgColor = '#f4f4f4' }) => {
  return (
    <div
      className="flex h-80 w-64 flex-col justify-between rounded-3xl p-6 shadow-lg"
      style={{ backgroundColor: bgColor }}
    >
      <p className="mt-5 text-[18px] text-darkgray">{text}</p>
      <div className="flex items-center">
        <img
          src={ProfileImageIcon}
          alt="Card"
          className="mr-3 h-20 w-20 rounded-full"
        />
        <span className="text-darkgrey text-[18px] font-semibold">{name}</span>
      </div>
    </div>
  )
}

export default Card
