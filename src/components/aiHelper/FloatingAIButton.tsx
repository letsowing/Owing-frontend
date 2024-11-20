import { Bot } from 'lucide-react'

interface FloatingAIButtonProps {
  isOpen: boolean
  onClick: () => void
}

export const FloatingAIButton = ({
  isOpen,
  onClick,
}: FloatingAIButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`z-999 fixed bottom-3 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-redorange text-white shadow-lg transition-all dark:bg-blue ${isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'} `}
    >
      <Bot className="h-6 w-6" />
    </button>
  )
}
