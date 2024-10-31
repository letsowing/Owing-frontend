import DemoProfile from '@assets/profile/DemoProfile.png'

interface ProfileProps {
  member: {
    imageUrl: string
    name: string
  }
}

const Profile = ({ member }: ProfileProps) => {
  return (
    <div className="flex h-60 w-64 flex-col items-center justify-center rounded-3xl bg-beige dark:bg-coldbeige">
      {/* 시연용 데이터 추가 */}
      <img src={DemoProfile} alt="DemoProfile" className="w-36 rounded-2xl" />
      {/* <img src={member.imageUrl} /> */}
      <label className="mt-5 text-2xl font-semibold dark:text-darkblack">
        {member.name}
      </label>
    </div>
  )
}

export default Profile
