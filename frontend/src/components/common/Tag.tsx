interface TagProps {
  value: string
}

const Tag = ({ value }: TagProps) => {
  return (
    <button className="rounded-full bg-beige px-4 py-1 font-normal text-gray dark:bg-coldbeige">
      {value}
    </button>
  )
}

export default Tag
