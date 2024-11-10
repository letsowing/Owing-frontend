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
      className="hover:bg-gray-50 flex w-full items-center rounded-lg border p-4 text-left transition-colors"
    >
      <span className="mr-4 flex-shrink-0 text-2xl">{icon}</span>
      <div>
        <h3 className="text-gray-900 font-medium">{title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
      </div>
    </button>
  )
}
