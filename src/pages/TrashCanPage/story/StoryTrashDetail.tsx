import { useEffect, useState } from 'react'

import Loader from '@components/common/Loader'

import { getTrashcanContent } from '@services/trashService'
import { TrashContentProps, TrashDetail } from '@types'

const StoryTrashDetail = ({ selection }: TrashContentProps) => {
  const [trashContent, setTrashContent] = useState<TrashDetail>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTrashContent = async () => {
      if (!selection.selectedFile || !selection.selectedFolder) {
        return
      }

      setIsLoading(true)

      try {
        const data = await getTrashcanContent(
          selection.selectedFile.id,
          'story',
        )
        setTrashContent(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrashContent()
  }, [selection.selectedFile, selection.selectedFolder])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="mx-5 h-full text-darkgray dark:border-lightgray dark:text-white">
      <div className="mb-5 text-2xl font-semibold">
        {trashContent?.name || '원고 제목'}
      </div>
      <div className="min-h-32 rounded-lg border p-4 text-sm">
        {trashContent?.content || '원고 내용이 없습니다.'}
      </div>
    </div>
  )
}

export default StoryTrashDetail
