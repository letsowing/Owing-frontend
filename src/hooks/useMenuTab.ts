import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

interface UseMenuTabProps {
  defaultWidth?: number
  collapsedWidth?: number
  autoOpenPaths?: string[]
}

export const useMenuTab = ({
  defaultWidth = 256,
  collapsedWidth = 41,
  autoOpenPaths = ['storyManagement'],
}: UseMenuTabProps = {}) => {
  const [isTabOpen, setIsTabOpen] = useState(true)
  const [tabWidth, setTabWidth] = useState(defaultWidth)
  const location = useLocation()

  useEffect(() => {
    setTabWidth(isTabOpen ? defaultWidth : collapsedWidth)
    if (autoOpenPaths.includes(location.pathname)) {
      setIsTabOpen(true)
    }
  }, [
    isTabOpen,
    location.pathname,
    defaultWidth,
    collapsedWidth,
    autoOpenPaths,
  ])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

  return {
    isTabOpen,
    tabWidth,
    toggleTab,
  }
}
