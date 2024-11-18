import { useEffect, useState } from 'react'

import Loader from '@components/common/Loader'

import { getTrashcanContent } from '@services/trashService'
import { TrashContentProps } from '@types'

const StoryTrashDetail = ({ selection }: TrashContentProps) => {
  const [trashContent, setTrashContent] = useState<string>('')
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
        console.log(data.content)
        setTrashContent(data.content)
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
    <div className="mx-2 rounded-lg border border-gray">{trashContent}</div>
  )
}

export default StoryTrashDetail
