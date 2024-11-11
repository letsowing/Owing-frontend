import useMemberStore from '@stores/memberStore'

import axiosInstance from '@utils/httpCommons'

import { Token } from '@types'

export const postOauthLogin = async (
  idToken: string,
  provider: string,
): Promise<Token> => {
  try {
    const payload = {
      idToken,
      provider,
    }
    const response = await axiosInstance.post('/auth/oauth', payload)
    return response.data
  } catch (error) {
    console.error('소셜 로그인 실패:', error)
    throw error
  }
}

export const postRefreshToken = async (): Promise<Token> => {
  try {
    const response = await axiosInstance.post('/auth/refresh')
    return response.data
  } catch (error) {
    console.error('토큰 재발급 실패:', error)
    useMemberStore.getState().logout()
    window.location.href = '/login'
    throw error
  }
}

export const postLogout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout')
  } catch (error) {
    console.error('로그아웃 실패', error)
    throw error
  } finally {
    useMemberStore.getState().logout()
    window.location.href = '/'
  }
}
