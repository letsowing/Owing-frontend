import React, { useEffect, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'
import { useThemeStore } from '@stores/themeStore'

import EmptyTrash from './EmptyTrash'
import InputField from './InputField'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'
import { getTrashcanContent } from '@services/trashService'
import { Cast, TrashContentProps } from '@types'

const CastTrashContent: React.FC<TrashContentProps> = ({ selection }) => {
  const currentProject = useProjectStore((state) => state.currentProject)
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const imageUrl =
    selection.selectedFile?.imageUrl || isDarkMode ? DarkAlertOwing : AlertOwing

  const [cast, setCast] = useState<Cast>({
    id: '',
    name: '',
    age: 0,
    gender: '',
    role: '',
    description: '',
    position: { x: 0, y: 0 },
    imageUrl: '',
  })

  useEffect(() => {
    const fetchCast = async () => {
      if (!selection.selectedFile || !selection.selectedFolder) {
        return
      }
      try {
        const data = await getTrashcanContent(
          selection.selectedFile!.id,
          'cast', // contentType
        )
        setCast(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCast()
  }, [currentProject.id, selection.selectedFile, selection.selectedFolder])

  if (!selection.selectedFile?.id || !selection.selectedFolder) {
    return <EmptyTrash />
  }

  return (
    <div className="mx-[3%] flex w-[94%] flex-col items-center justify-center gap-2 p-4">
      <div className="flex-start w-full">
        <h1 className="mb-4 text-2xl font-bold dark:text-coldbeige">
          {selection.selectedFolder?.name}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="flex h-80 w-80 rounded-xl bg-coldbeige text-center">
          <img
            src={imageUrl}
            alt="Cast"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full flex-1">
          <div className="w-full flex-col">
            <div className="mt-3">
              <InputField
                value={cast.name || ''}
                labelValue="이름"
                isTextArea={false}
              />
            </div>
            <div className="mt-3 flex justify-evenly gap-4">
              <div className="w-full">
                <InputField
                  value={cast.age?.toString() || '0'}
                  labelValue="나이"
                  isTextArea={false}
                />
              </div>
              <div className="w-full">
                <InputField
                  value={cast.gender || ''}
                  labelValue="성별"
                  isTextArea={false}
                />
              </div>
            </div>
            <div className="mt-3">
              <InputField
                value={cast.role || ''}
                labelValue="역할"
                isTextArea={false}
              />
            </div>
            <div className="mt-3">
              <InputField
                value={cast.description || ''}
                labelValue="상세 정보"
                isTextArea={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CastTrashContent
