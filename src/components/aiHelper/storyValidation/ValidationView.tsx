import { Header } from '@components/aiHelper/Header'

import { ValidationChat } from './ValidationChat'

export const ValidationView = () => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <ValidationChat />
    </div>
  )
}
