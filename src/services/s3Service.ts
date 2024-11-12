import { base64ToBlob } from '@utils/base64'

import axios from 'axios'

export const putUploadImageToS3 = async (
  presignedUrl: string,
  base64Image: string,
) => {
  try {
    const imageBlob = base64ToBlob(base64Image)
    await axios.put(presignedUrl, imageBlob, {
      headers: {
        'Content-Type': imageBlob.type,
      },
    })
  } catch (error) {
    console.error('S3 이미지 업로드 실패')
    throw error
  }
}
