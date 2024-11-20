import AlertOwing from '@assets/common/AlertOwing.png'

interface ContentItemProps {
  name: string
  description: string
  imageUrl: string
}

const UniverseContentItem = ({
  name,
  description,
  imageUrl,
}: ContentItemProps) => {
  return (
    <div className="mx-8 mb-6 flex items-center rounded-md bg-white p-6 text-darkgray shadow-lg dark:bg-darkblack dark:text-white dark:shadow-black">
      <div className="flex w-full items-center">
        {imageUrl ? (
          <div
            className="h-60 w-60 min-w-60 rounded-md border border-lightgray bg-cover bg-center bg-no-repeat dark:border-lightdarkgray"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <div className="flex h-60 w-60 min-w-60 flex-col items-center justify-center rounded-md border border-lightgray dark:border-lightdarkgray">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto h-auto w-12"
            />
            <div className="mt-4 text-redorange">이미지를 추가해 주세요!</div>
          </div>
        )}
        <div className="m-4 mb-auto flex w-3/4 flex-grow flex-col">
          <strong className="text-2xl font-semibold">{name}</strong>
          <p className="mt-4 h-12 overflow-y-auto text-darkgray">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UniverseContentItem
