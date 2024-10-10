interface NewProjectProps {
  handleAddWork: () => void
}

const NewProject = ({ handleAddWork }: NewProjectProps) => {
  return (
    <div
      onClick={handleAddWork}
      className="my-1 flex h-[15rem] w-[12rem] cursor-pointer items-center justify-center rounded-3xl border border-dashed dark:border-gray dark:bg-coldbeige"
    >
      <label className="cursor-pointer text-sm font-semibold dark:text-gray">
        새 작품 생성
      </label>
    </div>
  )
}

export default NewProject
