import DemoProfile from '@assets/profile/DemoProfile.png'

interface ProfileProps {
  member: {
    imageUrl: string
    name: string
  }
}

const Profile = ({ member }: ProfileProps) => {
  return (
    <div className="flex h-[14rem] flex-col items-center rounded-3xl bg-beige dark:bg-coldbeige xl:w-[15rem] 2xl:w-[20rem]">
      <div className="m-auto h-[8rem] w-[8rem] overflow-hidden rounded-2xl bg-gray">
        {/* 시연용 데이터 추가 */}
        <img src={DemoProfile} alt="DemoProfile" />
        {/* <img src={member.imageUrl} /> */}
      </div>
      <label className="mb-5 text-2xl font-semibold dark:text-darkblack">
        {member.name}
      </label>
    </div>
  )
}

export default Profile
