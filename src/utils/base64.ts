export const getImageExtensionFromBase64 = (base64String: string): string => {
  // base64 문자열이 비어있는지 확인
  if (!base64String) {
    throw new Error('Base64 문자열이 비어있습니다.')
  }

  // data:image/확장자;base64, 형식에서 확장자 추출
  try {
    // base64 헤더 매칭을 위한 정규식
    const matches = base64String.match(/^data:image\/([a-zA-Z+]+);base64,/)

    if (!matches || matches.length < 2) {
      throw new Error('올바른 base64 이미지 형식이 아닙니다.')
    }

    // 확장자 정규화
    let extension = matches[1].toLowerCase()

    // jpeg/jpg 처리
    if (extension === 'jpeg') {
      extension = 'jpg'
    }

    return extension
  } catch (error) {
    console.error('Base64 문자열 파싱 중 오류가 발생했습니다:', error)
    throw error
  }
}

export const base64ToBlob = (base64: string): Blob => {
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
