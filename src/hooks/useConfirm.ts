import Swal from 'sweetalert2'

interface ConfirmOptions {
  title?: string
  text?: string
  confirmButtonText?: string
  cancelButtonText?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
}

export const useConfirm = () => {
  const confirmDelete = async (options: ConfirmOptions = {}) => {
    const {
      title = '정말 삭제하시겠습니까?',
      text = '이 작업은 되돌릴 수 없습니다.',
      confirmButtonText = '삭제',
      cancelButtonText = '취소',
      icon = 'warning',
    } = options

    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#FB5D2B',
      cancelButtonColor: '#3082F6',
      confirmButtonText,
      cancelButtonText,
    })

    return result.isConfirmed
  }

  const confirmAIImageGeneration = async () => {
    const result = await Swal.fire({
      title: 'AI 이미지 생성',
      html:
        '이미지의 특징을 자세히 설명할수록<br>더 멋진 이미지가 생성됩니다!<br><br>' +
        '세부 설명을 더 추가하시겠습니까?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#FB5D2B',
      cancelButtonColor: '#3082F6',
      confirmButtonText: '이미지 생성하기',
      cancelButtonText: '돌아가기',
    })

    return result.isConfirmed
  }

  const showSuccessDialog = (message: string) => {
    return Swal.fire({
      icon: 'success',
      title: '성공',
      text: message,
      timer: 1500,
    })
  }

  const showErrorDialog = (message: string) => {
    return Swal.fire({
      icon: 'error',
      title: '오류',
      text: message,
    })
  }

  return {
    confirmDelete,
    confirmAIImageGeneration,
    showSuccessDialog,
    showErrorDialog,
  }
}
