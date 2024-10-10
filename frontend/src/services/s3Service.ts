import axios from 'axios'

export const putUploadImageToS3 = async (
  presignedUrl: string,
  imageUrl: string,
) => {
  try {
    const base64Data = imageUrl.split(',')[1]

    const binaryData = atob(base64Data)
    const bytes = new Uint8Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: 'image/png' })

    const response = await axios.put(presignedUrl, blob, {
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
