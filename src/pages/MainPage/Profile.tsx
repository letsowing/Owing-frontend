interface ProfileProps {
  member: {
    profileUrl: string
    nickname: string
  }
}

const Profile = ({ member }: ProfileProps) => {
  return (
    <div className="flex h-60 w-64 flex-col items-center justify-center rounded-3xl bg-beige dark:bg-coldbeige">
      <img
        src={member.profileUrl}
        alt="DemoProfile"
        className="w-36 rounded-2xl"
      />
      <label className="mt-5 text-2xl font-semibold dark:text-darkblack">
        {member.nickname}
      </label>
    </div>
  )
}

export default Profile
