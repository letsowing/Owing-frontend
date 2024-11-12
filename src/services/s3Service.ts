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

const base64ToBlob = (base64: string): Blob => {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
