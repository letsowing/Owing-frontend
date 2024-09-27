import useMenuStore from '@stores/menuStore'

import MenuTabItem from './MenuTabItem'

import { MENU_LIST } from '@constants/menu'

const MenuTabList: React.FC = () => {
  const { activePath, setActivePath } = useMenuStore()

  return (
    <div className="w-64">
      {MENU_LIST.map((item) => (
        <MenuTabItem
          key={item.path}
          text={item.text}
          isActive={activePath === item.path}
          onClick={() => setActivePath(item.path)}
        />
      ))}
    </div>
  )
}

export default MenuTabList
