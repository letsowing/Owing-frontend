import { FeatureSelection } from './main/FeatureSelection'

import { Feature } from '@types'

interface AIHelperProps {
  onFeatureSelect: (id: Feature['id']) => void
}

export const AIHelper = ({ onFeatureSelect }: AIHelperProps) => {
  return (
    <div className="flex flex-1 flex-col bg-white p-6">
      <FeatureSelection onSelectFeature={onFeatureSelect} />
    </div>
  )
}
