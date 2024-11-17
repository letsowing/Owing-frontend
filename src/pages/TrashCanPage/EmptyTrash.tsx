import EmptyTrashImg from '@assets/common/EmptyTrash.png'

const EmptyTrash = () => {
  return (
    <div className="flex h-1/2 w-full flex-col items-center justify-center">
      <img src={EmptyTrashImg} alt="텅" />
      <p className="dark:text-whitegray mt-12 text-gray">
        이 폴더는 비어 있습니다.
      </p>
    </div>
  )
}
export default EmptyTrash
