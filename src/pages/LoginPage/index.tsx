import { useThemeStore } from '@stores/themeStore'

import GoogleOAuth from './GoogleOAuth'
import Logo from '/logo.svg'
import NightLogo from '/logo_night.svg'

const Login = () => {
  const { isDarkMode } = useThemeStore()

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige dark:bg-darkblack">
      <div className="w-full max-w-6xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-coldbeige">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="flex w-full flex-col items-center justify-center space-y-6 lg:w-1/2">
            <div className="relative flex w-full justify-center">
              <img
                className="w-64 object-contain"
                src={isDarkMode ? NightLogo : Logo}
                alt="로고"
              />
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold dark:text-darkblack">
                환영합니다!
              </h1>
              <p className="text-sm text-gray">
                로그인하여 창작의 여정을 시작하세요
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center space-y-8 lg:w-1/2">
            <div className="w-full max-w-md space-y-6 rounded-xl p-8">
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-semibold text-darkblack">
                  로그인
                </h2>
                <p className="text-sm text-gray">
                  Google 계정으로 간편하게 로그인하세요
                </p>
              </div>
              <div className="flex justify-center">
                <GoogleOAuth />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 text-center text-sm text-gray dark:text-coldbeige">
        © 2024. (주)_상류사회 Co, Ltd. All rights reserved.
      </div>
    </div>
  )
}

export default Login
