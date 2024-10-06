interface NewProjectProps {
  onClickNewProject: React.MouseEventHandler<HTMLDivElement>
}

const NewProject = ({ onClickNewProject }: NewProjectProps) => {
  return (
    <div
      className="flex h-[200px] w-[150px] items-center justify-center rounded-3xl border border-dashed"
      onClick={onClickNewProject}
    >
      <label className="text-sm font-semibold">새 작품 생성</label>
    </div>
  )
}

export default NewProject
