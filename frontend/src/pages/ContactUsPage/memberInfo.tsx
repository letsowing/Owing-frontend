import ProfileImageIcon from '@/assets/landing/profileImage.png'

interface MemberProps {
  name: string
  role: string
}

const ToggleMenu: React.FC<MemberProps> = ({ name, role }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={ProfileImageIcon}
        alt="ProfileImageIcon"
        className="h-22 w-22 mb-4 rounded-full border border-lightgray"
      />
      <div className="mb-1 text-[20px] text-darkgray">{name}</div>
      <div className="text-[12px] text-lightgray">{role}</div>
    </div>
  )
}

export default ToggleMenu
