import axios from 'axios'

export const putUploadImageToS3 = async (
  imageUrl: string,
  presignedUrl: string,
) => {
  try {
    const response = await axios.put(presignedUrl, imageUrl, {
      headers: {
        'Content-Type': 'image/png',
      },
    })
    return response
  } catch (error) {
    console.error('S3 이미지 업로드 실패:', error)
    throw error
  }
}
