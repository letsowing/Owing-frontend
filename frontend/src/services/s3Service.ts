import axios from 'axios';

export const putUploadImageToS3 = async (
  presignedUrl: string,
  base64Image: string,
) => {
  try {
    let base64Data = base64Image;
    let contentType = 'application/octet-stream';

    if (base64Image.startsWith('data:')) {
      const parts = base64Image.split(',');
      contentType = parts[0].split(':')[1].split(';')[0];
      base64Data = parts[1];
    }

    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const response = await axios.put(presignedUrl, bytes, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
      },
    });
    return response;
  } catch (error) {
    console.error('S3 이미지 업로드 실패:', error);
    throw error;
  }
};