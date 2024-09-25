import React from 'react'

interface CardProps {
  text: string
  name: string
  bgColor?: string
}

const Card: React.FC<CardProps> = ({ text, name, bgColor = '#f4f4f4' }) => {
  return (
    <div
      className="flex h-72 w-64 flex-col justify-between rounded-3xl p-6 shadow-lg"
      style={{ backgroundColor: bgColor }}
    >
      <p className="mt-5 text-sm text-darkgray">{text}</p>
      <div className="flex items-center">
        <img
          src="src/assets/react.svg"
          alt="Card"
          className="mr-3 h-10 w-10 rounded-full"
        />
        <span className="text-darkgrey text-sm font-semibold">{name}</span>
      </div>
    </div>
  )
}

export default Card
