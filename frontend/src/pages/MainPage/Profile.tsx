interface ProfileProps {
  member: {
    image: string
    name: string
  }
}

const Profile = ({ member }: ProfileProps) => {
  return (
    <div className="flex h-[14rem] flex-col items-center rounded-3xl bg-beige dark:bg-coldbeige xl:w-[15rem] 2xl:w-[20rem]">
      <div className="m-auto h-[8rem] w-[8rem] overflow-hidden rounded-xl bg-gray">
        <img src={member.image} />
      </div>
      <label className="mb-5 text-2xl font-semibold dark:text-darkblack">
        {member.name}
      </label>
    </div>
  )
}

export default Profile
