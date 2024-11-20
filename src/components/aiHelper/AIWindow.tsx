import { TabItem } from './TabItem'

import { Feature } from '@types'
import { BiMessageError } from 'react-icons/bi'
import { ImMenu } from 'react-icons/im'
import { LiaSearchSolid } from 'react-icons/lia'
import { MdOutlineThumbUp } from 'react-icons/md'
import { RiCloseLine } from 'react-icons/ri'

interface AIWindowProps {
  isOpen: boolean
  selectedFeature: Feature['id'] | null
  onClose: () => void
  onHomeClick: () => void
  onSelectFeature: (featureId: Feature['id']) => void
  children: React.ReactNode
}

export const AIWindow = ({
  isOpen,
  selectedFeature,
  onClose,
  onHomeClick,
  onSelectFeature,
  children,
}: AIWindowProps) => {
  return (
    <div
      className={`z-999 absolute right-10 top-20 flex h-4/5 w-1/3 rounded-lg border border-lightgray bg-white pl-1 text-darkgray transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'} `}
    >
      <div className="h-full flex-1">{children}</div>
      {selectedFeature ? (
        <div className="flex flex-col rounded-r-lg bg-beige dark:bg-coldbeige">
          <button onClick={onClose} className="absolute end-0 top-0 p-2">
            <RiCloseLine className="h-4 w-4 hover:rounded-full hover:bg-darkbeige hover:dark:bg-coldbeige" />
          </button>
          <div className="mt-7">
            <TabItem label="홈" icon={ImMenu} onClick={onHomeClick} />
            <TabItem
              label="설정 검사"
              icon={BiMessageError}
              isActive={selectedFeature === 'validation'}
              onClick={() => onSelectFeature('validation')}
            />
            <TabItem
              label="맞춤법 검사"
              icon={MdOutlineThumbUp}
              isActive={selectedFeature === 'spelling'}
              onClick={() => onSelectFeature('spelling')}
            />
            <TabItem
              label="검색어 추천"
              icon={LiaSearchSolid}
              isActive={selectedFeature === 'search'}
              // onClick={() => onSelectFeature('search')}
              onClick={() => {}}
            />
          </div>
        </div>
      ) : (
        <button onClick={onClose} className="absolute end-0 top-0 p-2">
          <RiCloseLine className="h-4 w-4 self-start hover:rounded-full hover:bg-darkbeige hover:dark:bg-coldbeige" />
        </button>
      )}
    </div>
  )
}
