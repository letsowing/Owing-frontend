import React from 'react'

import { Header } from '@components/AIHelper/Header'
import { ValidationTabs } from '@components/AIHelper/tab/ValidationTabs'

import { ValidationChat } from './ValidationChat'

import { ValidationTabType } from '@types'

export const ValidationView: React.FC = () => {
  const [activeTab, setActiveTab] =
    React.useState<ValidationTabType>('설정검토')

  return (
    <div className="flex h-full flex-col">
      <Header />
      <ValidationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div
        role="tabpanel"
        id={`panel-tab-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1"
      >
        <ValidationChat />
      </div>
    </div>
  )
}
