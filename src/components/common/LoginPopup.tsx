import React from "react";
import useNavigation from "@/hooks/useNavigation";

type LoginPopupProps = {
  onClose?: () => void
};

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const {goToLogin} = useNavigation()

  const handleLoginRedirect = () => {
    goToLogin()
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
        <p className="text-lg text-gray-800">서비스를 이용하기 위해서는 로그인이 필요합니다.</p>
        <button
          onClick={handleLoginRedirect}
          className="mt-4 bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition border-2 hover:border-orange-500"
        >
          로그인 페이지로
        </button>
      </div>
    </div>
  )
}

export default LoginPopup;
