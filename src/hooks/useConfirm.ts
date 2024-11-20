import { useThemeStore } from '@stores/themeStore'

import Swal from 'sweetalert2'

interface ConfirmOptions {
  title?: string
  text?: string
  confirmButtonText?: string
  cancelButtonText?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
}

export const useConfirm = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

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
      cancelButtonText: '취소',
    })

    return result.isConfirmed
  }

  const showSuccessDialog = (message: string) => {
    return Swal.fire({
      icon: 'success',
      title: '성공',
      text: message,
      timer: 1500,
      confirmButtonColor: isDarkMode ? '#3082F6' : '#FB5D2B',
      iconColor: isDarkMode ? '#3082F6' : '#FB5D2B',
    })
  }

  const showErrorDialog = (message: string) => {
    return Swal.fire({
      icon: 'error',
      title: '오류',
      text: message,
      confirmButtonColor: '#FB5D2B', // 확인 버튼 색상
      iconColor: '#FB5D2B', // 아이콘 색상
    })
  }

  const promptFolderName = async (): Promise<string | null> => {
    const result = await Swal.fire({
      title: '새 폴더 생성',
      input: 'text',
      inputLabel: '폴더 이름을 입력하세요',
      inputPlaceholder: '새 폴더',
      showCancelButton: true,
      confirmButtonColor: '#FB5D2B',
      cancelButtonColor: '#3082F6',
      confirmButtonText: '생성',
      cancelButtonText: '취소',
      inputValidator: (value) => {
        if (!value) {
          return '폴더 이름을 입력해주세요'
        }
        if (value.length > 50) {
          return '폴더 이름은 50자를 넘을 수 없습니다'
        }
        return null
      },
    })

    if (result.isConfirmed) {
      return result.value
    }
    return null
  }

  return {
    confirmDelete,
    confirmAIImageGeneration,
    showSuccessDialog,
    showErrorDialog,
    promptFolderName,
  }
}
