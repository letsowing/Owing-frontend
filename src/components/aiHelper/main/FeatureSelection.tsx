import { FeatureButton } from './FeatureButton'

import { Feature } from '@types'

interface FeatureSelectionProps {
  onSelectFeature: (featureId: Feature['id']) => void
}

export const FeatureSelection = ({
  onSelectFeature,
}: FeatureSelectionProps) => {
  const features: Feature[] = [
    {
      id: 'validation',
      title: '설정 검사',
      icon: '💡',
      description: '오늘은 무엇을 도와드릴까요?',
    },
    {
      id: 'spelling',
      title: '맞춤법 검사',
      icon: '✍️',
      description: '문장의 맞춤법을 검사해드립니다',
    },
    {
      id: 'search',
      title: '검색어 추천',
      icon: '🔍',
      description: '효과적인 검색어를 추천해드립니다',
    },
  ]
  return (
    <main className="flex flex-col gap-3 px-6 pb-5">
      {features.map((feature) => (
        <FeatureButton
          key={feature.id}
          {...feature}
          onClick={() => {
            if (feature.id !== 'search') {
              onSelectFeature(feature.id)
            }
          }}
        />
      ))}
    </main>
  )
}
