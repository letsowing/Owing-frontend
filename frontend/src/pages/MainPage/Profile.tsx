interface ProfileProps {
  member: {
    image: string
    name: string
  }
}

const Profile = ({ member }: ProfileProps) => {
  return (
    <div className="flex h-[320px] w-[320px] flex-col items-center justify-center rounded-3xl bg-beige">
      <div className="h-[130px] w-[130px] overflow-hidden rounded-xl bg-gray">
        <img src={member.image} />
      </div>
      <label className="mt-8 text-xl font-semibold">{member.name}</label>
    </div>
  )
}

export default Profile
