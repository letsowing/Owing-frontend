import useNavigation from '@hooks/useNavigation'

import MenuTabItem from './MenuTabItem'

import { MENU_LIST, MenuPath } from '@constants/menu'

interface MenuTabListProps {
  onItemClick?: () => void // FolderTab 열기
}

const MenuTabList: React.FC<MenuTabListProps> = ({ onItemClick }) => {
  const { activePath, setActivePath, goTo } = useNavigation()

  const handleClickMenu = (path: MenuPath) => {
    setActivePath(path)
    goTo(path)
  }

  return (
    <div className="w-64">
      {MENU_LIST.map((item) => (
        <MenuTabItem
          key={item.path}
          text={item.text}
          isActive={activePath === item.path}
          onClickMenu={() => {
            handleClickMenu(item.path)
            if (onItemClick) {
              onItemClick()
            }
          }}
        />
      ))}
    </div>
  )
}

export default MenuTabList
