interface PageTitleProps {
  id: number
  isEditing: boolean
}

const PageTitle: React.FC<PageTitleProps> = ({ id, isEditing }) => {
  return (
    <div className="flex-start w-full">
      <h1 className="mb-4 text-2xl font-bold dark:text-coldbeige">
        캐릭터 {id ? (isEditing ? '수정' : '상세') : '생성'}
      </h1>
    </div>
  )
}

export default PageTitle
