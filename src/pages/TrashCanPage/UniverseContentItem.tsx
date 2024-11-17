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
    <div className="shadow-gray-300/50 m-4 flex items-center rounded-[6px] bg-white p-6 shadow-lg">
      <div className="flex w-full items-center">
        {imageUrl ? (
          <div
            className="h-[240px] w-[240px] min-w-[240px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <div className="flex h-[240px] w-[240px] min-w-[240px] flex-col items-center justify-center rounded-[6px] border border-[#CFCDCD]">
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
          <p className="mt-4 h-[11rem] overflow-y-auto text-darkgray">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UniverseContentItem
