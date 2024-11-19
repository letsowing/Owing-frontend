import Header from '@components/common/Header'
import MenuTab from '@components/menuTab/MenuTab'

import { useMenuTab } from '@hooks/useMenuTab'
import { useTrashState } from '@hooks/useTrashState'

import TrashContent from './TrashContent'
import FolderTab from './folderTab/FolderTab'

const TrashCanPage = () => {
  const { isTabOpen, tabWidth, toggleTab } = useMenuTab()
  const { selection, actions, items } = useTrashState()

  return (
    <div className="flex h-screen">
      <MenuTab
        style={{ width: `${tabWidth}px` }}
        isTabOpen={isTabOpen}
        onToggle={toggleTab}
      />
      <div className="flex h-full w-full flex-row">
        <FolderTab items={items} selection={selection} actions={actions} />
        <main className="w-full overflow-y-auto scrollbar-hide dark:bg-darkblack">
          <Header isTabOpen={isTabOpen} />
          <TrashContent selection={selection} actions={actions} />
        </main>
      </div>
    </div>
  )
}

export default TrashCanPage
