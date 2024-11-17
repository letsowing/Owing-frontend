import React from 'react'

import { Feature } from '@types'

interface FeatureButtonProps extends Feature {
  onClick: () => void
}

export const FeatureButton: React.FC<FeatureButtonProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center rounded-lg border border-lightgray p-4 text-left hover:bg-beige dark:hover:bg-coldbeige"
    >
      <span className="mr-4 flex-shrink-0 text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-gray">{description}</p>
        <h3 className="font-medium">{title}</h3>
      </div>
    </button>
  )
}
