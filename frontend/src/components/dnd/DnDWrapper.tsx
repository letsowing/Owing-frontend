/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import WorldViewDraggableBox from '@pages/WorldViewPage/WorldViewDraggableBox'

import { useDnd } from '@hooks/useDnd'

import DraggableBox from './DraggableBox'

import AlertOwing from '@assets/common/AlertOwing.png'
import { useLocation, useParams } from 'react-router-dom'

interface DnDWrapperProps {
  selectedFolderId: number | null
  currentService: any
}

export default function DnDWrapper({
  selectedFolderId,
  currentService,
}: DnDWrapperProps) {
  const { items, setItems } = useDnd()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const { projectId } = useParams()

  const getServiceAndComponent = () => {
    return {
      service: currentService,
      Component: location.pathname.includes('/worldview')
        ? WorldViewDraggableBox
        : DraggableBox,
    }
  }

  const { service, Component } = getServiceAndComponent()

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setIsLoading(true)
        if (projectId) {
          const folders = await service.getFolders(parseInt(projectId))
          setItems(folders)
          setError(null)
        }
      } catch (err) {
        console.error('폴더 목록 조회 실패:', err)
        setError('폴더 목록을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFolders()
  }, [setItems, service, projectId])

  const selectedFolder = items.find((folder) => folder.id === selectedFolderId)

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-5">
      {selectedFolder ? (
        !selectedFolder.files ? (
          <div className="mt-[200px] text-center">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto mb-4 h-auto w-24"
            />
            <div className="text-redorange">파일을 생성해 주세요!</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4">
            {selectedFolder &&
              selectedFolder.files.map((file, index) => (
                <Component
                  key={file.id}
                  id={file.id}
                  index={index}
                  name={file.name}
                  description={file.description}
                  folderId={selectedFolder.id}
                  imageUrl={file.imageUrl}
                />
              ))}
          </div>
        )
      ) : (
        <div className="mt-[200px] text-center">
          <img
            src={AlertOwing}
            alt="AlertOwing"
            className="mx-auto mb-4 h-auto w-24"
          />
          <div className="text-redorange">폴더를 생성해 주세요!</div>
        </div>
      )}
    </div>
  )
}
