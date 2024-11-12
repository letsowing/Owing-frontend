import useMemberStore from '@stores/memberStore'

import useNavigation from '@hooks/useNavigation'

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { postOauthLogin } from 'services/authService'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
interface JwtPayload {
  sub: number
  email: string
  name: string
  nickname: string
  profileUrl: string
}

const GoogleOAuth = () => {
  const { goToMain } = useNavigation()
  const { login } = useMemberStore()

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const data = await postOauthLogin(
        credentialResponse.credential || '',
        'GOOGLE',
      )

      const decodedToken = jwtDecode<JwtPayload>(data.accessToken)

      const member = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        nickname: decodedToken.nickname,
        profileUrl: decodedToken.profileUrl,
      }

      login(member, data.accessToken)

      goToMain()
    } catch (error) {
      console.error('구글 로그인 실패', error)
    }
  }

  const handleLoginError = () => {
    console.log('구글 로그인 실패')
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </GoogleOAuthProvider>
  )
}

export default GoogleOAuth
