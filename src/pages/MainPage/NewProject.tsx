interface NewProjectProps {
  handleAddProject: () => void
}

const NewProject = ({ handleAddProject }: NewProjectProps) => {
  return (
    <div
      onClick={handleAddProject}
      className="my-1 flex h-48 w-36 cursor-pointer items-center justify-center rounded-2xl border border-dashed dark:border-gray dark:bg-coldbeige"
    >
      <label className="cursor-pointer text-sm font-semibold dark:text-gray">
        새 작품 생성
      </label>
    </div>
  )
}

export default NewProject
