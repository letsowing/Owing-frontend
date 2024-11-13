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
    showSuccessDialog,
    showErrorDialog,
  }
}
