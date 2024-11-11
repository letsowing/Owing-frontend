import { Header } from '@components/aiHelper/Header'

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
      title: '검증하기',
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
    <div className="flex h-full flex-col">
      <Header />
      <main className="flex flex-col gap-4 bg-white p-6">
        {features.map((feature) => (
          <FeatureButton
            key={feature.id}
            {...feature}
            onClick={() => onSelectFeature(feature.id)}
          />
        ))}
      </main>
    </div>
  )
}
