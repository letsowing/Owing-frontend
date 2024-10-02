import useMenuStore from '@stores/menuStore'

import MenuTabItem from './MenuTabItem'

import { MENU_LIST } from '@constants/menu'

interface MenuTabListProps {
  onItemClick: () => void // 항목 클릭 시 호출할 함수
}

const MenuTabList: React.FC<MenuTabListProps> = ({ onItemClick }) => {
  const { activePath, setActivePath } = useMenuStore()

  return (
    <div className="w-64">
      {MENU_LIST.map((item) => (
        <MenuTabItem
          key={item.path}
          text={item.text}
          isActive={activePath === item.path}
          onClick={() => {
            setActivePath(item.path)
            onItemClick() // FolderTab 열기
          }}
        />
      ))}
    </div>
  )
}

export default MenuTabList
