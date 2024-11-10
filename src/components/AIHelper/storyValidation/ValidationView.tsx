import React from 'react'

import { ValidationChat } from './ValidationChat'

import { Header } from '@/components/aiHelper/Header'

export const ValidationView: React.FC = () => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <ValidationChat />
    </div>
  )
}
