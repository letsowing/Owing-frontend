import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

interface UseMenuTabProps {
  defaultWidth?: number
  collapsedWidth?: number
  autoOpenPaths?: string[]
  isNotTabPage?: boolean
}

export const useMenuTab = ({
  defaultWidth = 256,
  collapsedWidth = 41,
  autoOpenPaths = ['storyManagement', 'projectInfo', 'story', 'universe'],
  isNotTabPage = false,
}: UseMenuTabProps = {}) => {
  const [isTabOpen, setIsTabOpen] = useState(!isNotTabPage)
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

  useEffect(() => {
    if (isNotTabPage) {
      setIsTabOpen(false)
    }
  }, [isNotTabPage])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

  return {
    isTabOpen,
    tabWidth,
    setIsTabOpen,
    toggleTab,
  }
}
