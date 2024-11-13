import { postRefreshToken } from '@services/authService'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.letsowing.com/v1',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 포함하여 요청
})

// 요청 인터셉터 - Access Token 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false
// 토큰 갱신 중에 대기 중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = []

// 토큰 갱신 후 대기 중인 요청들을 처리하는 함수
const processQueuedRequests = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

// 응답 인터셉터 - 토큰 갱신 처리
const onResponseError = async (error: AxiosError | Error) => {
  if (!axios.isAxiosError(error) || !error.config) {
    return Promise.reject(error)
  }

  const originalRequest = error.config
  const status = error.response?.status

  // 토큰 만료 에러 (401) 처리
  if (status === 401) {
    if (isRefreshing) {
      // 토큰 갱신 중이면 요청을 대기열에 추가
      try {
        const token = await new Promise<string>((resolve) => {
          refreshSubscribers.push((token: string) => {
            resolve(token)
          })
        })
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axiosInstance(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    isRefreshing = true

    try {
      // 토큰 갱신 요청
      const response = await postRefreshToken()
      const newAccessToken = response.accessToken

      // 새 토큰 저장
      sessionStorage.setItem('accessToken', newAccessToken)

      // 헤더 업데이트
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      // 대기 중인 요청들 처리
      processQueuedRequests(newAccessToken)

      return axiosInstance(originalRequest)
    } catch (refreshError) {
      // 토큰 갱신 실패 시 로그아웃
      console.error('Token refresh failed. Logging out...')
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }

  // 기타 에러 처리
  console.error(`API Error: ${error.message}`)
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use((response) => response, onResponseError)

export default axiosInstance
