import { TabItem } from './TabItem'

import { ValidationTabType } from '@types'

interface ValidationTabsProps {
  activeTab: ValidationTabType
  onTabChange: (tab: ValidationTabType) => void
}

export const ValidationTabs = ({
  activeTab,
  onTabChange,
}: ValidationTabsProps) => {
  const tabList = [
    { id: '설정검토' as const, label: '설정검토' },
    { id: '성장검토' as const, label: '성장검토' },
  ]

  return (
    <div className="flex border-b bg-white">
      {tabList.map((tab) => (
        <TabItem
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  )
}
