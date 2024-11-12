import { getImageExtensionFromBase64 } from '@utils/base64'
import axiosInstance from '@utils/httpCommons'

import { putUploadImageToS3 } from './s3Service'

export const putUniverseDescription = async (
  fileId: number,
  data: { name: string; description: string; imageUrl: string },
): Promise<void> => {
  try {
    if (data.imageUrl.startsWith('data:')) {
      const presignedUrlData = await getUniversePresignedUrl(
        getImageExtensionFromBase64(data.imageUrl),
      )
      await putUploadImageToS3(presignedUrlData.presignedUrl, data.imageUrl)
      data.imageUrl = presignedUrlData.fileUrl
    }
    await axiosInstance.put(`universes/${fileId}`, data)
    console.log('파일이 성공적으로 저장되었습니다.')
  } catch (error) {
    console.error('파일 저장 실패:', error)
    throw error
  }
}

export const postUniverseGenerateAiImage = async (data: {
  name: string
  description: string
}): Promise<{ imageUrl: string }> => {
  try {
    const response = await axiosInstance.post('/universes/images', data)
    return response.data
  } catch (error) {
    console.error('세계관 AI 이미지 생성 실패', error)
    throw error
  }
}

export const getUniversePresignedUrl = async (
  fileExtension: string,
): Promise<{
  presignedUrl: string
  fileUrl: string
}> => {
  try {
    const response = await axiosInstance.get(
      `/universes/files/${fileExtension}`,
    )
    return response.data
  } catch (error) {
    console.error('세계관 Presigned Url 생성 실패:', error)
    throw error
  }
}
