import axios from 'axios'

export const putUploadImageToS3 = async (presignedUrl: string, file: File) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
  } catch (error) {
    console.error('S3 이미지 업로드 실패')
    throw error
  }
}
