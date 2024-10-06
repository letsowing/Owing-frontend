interface ProfileProps {
  image: string
  name: string
}

const Profile = ({ image, name }: ProfileProps) => {
  return (
    <div className="flex h-[320px] w-[320px] flex-col items-center justify-center rounded-3xl bg-beige">
      <div className="h-[130px] w-[130px] overflow-hidden rounded-xl bg-gray">
        <img src={image} />
      </div>
      <label className="mt-8 text-xl font-semibold">{name}</label>
    </div>
  )
}

export default Profile
