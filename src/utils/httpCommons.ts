import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.letsowing.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 포함하여 요청
})

// 응답 오류 처리
const onResponseError = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 401) {
      // 인증 오류 - 로그인 페이지로 리다이렉트
      console.error('Authentication error. Redirecting to login page...')
      // 세션 만료 오류 - logout(); // Zustand store의 logout 함수 호출
    } else {
      // 기타 오류
      console.error(`API Error: ${error.message}`)
    }
  } else {
    console.error(`Unexpected error: ${error.message}`)
  }

  return Promise.reject(error)
}

axiosInstance.interceptors.response.use((response) => response, onResponseError)

export default axiosInstance
