import { useWorkStore } from '@stores/workStore'

import useNavigation from '@hooks/useNavigation'

import MenuTabItem from './MenuTabItem'

import { MENU_LIST, MenuPath } from '@constants/menu'

interface MenuTabListProps {
  onItemClick?: () => void // FolderTab 열기
}

const MenuTabList: React.FC<MenuTabListProps> = ({ onItemClick }) => {
  const { activePath, setActivePath, goTo } = useNavigation()
  const currentWork = useWorkStore((state) => state.currentWork)

  const handleClickMenu = (path: MenuPath) => {
    setActivePath(path)
    if (['character', 'scenarioManagement', 'worldView'].includes(path)) {
      const projectId: number = currentWork?.id ?? 0
      goTo(path, projectId)
    } else {
      goTo(path)
    }

    if (onItemClick) {
      onItemClick()
    }
  }

  return (
    <div className="w-64">
      {MENU_LIST.map((item) => (
        <MenuTabItem
          icon={item.icon}
          key={item.path}
          text={item.text}
          isActive={activePath === item.path}
          onClickMenu={() => {
            handleClickMenu(item.path)
          }}
        />
      ))}
    </div>
  )
}

export default MenuTabList
