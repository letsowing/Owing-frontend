import { Header } from '@components/aiHelper/Header'

import { FeatureSelection } from './main/FeatureSelection'

import { Feature } from '@types'
import { FcIdea } from 'react-icons/fc'
import { MdErrorOutline } from 'react-icons/md'

interface AIHelperProps {
  onSelectFeature: (id: Feature['id']) => void
}

export const AIHelper = ({ onSelectFeature }: AIHelperProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="ml-5 mt-3 flex text-redorange">
        <MdErrorOutline />
        <p className="ml-1 text-xs">추천</p>
      </div>
      <div className="mx-5 mb-9 mt-2 flex flex-col items-center justify-center">
        <FcIdea className="h-16 w-16" />
        <p className="mt-6 text-sm font-medium">
          설정이 충돌된 부분이 있지 않을까?
        </p>
        <p className="text-xs text-gray">
          <strong>AI</strong>를 활용해 체크해 보세요!
        </p>
      </div>
      <FeatureSelection onSelectFeature={onSelectFeature} />
    </div>
  )
}
