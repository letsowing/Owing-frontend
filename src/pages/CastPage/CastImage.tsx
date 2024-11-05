import React from 'react'

interface CastImageProps {
  imageUrl: string
}

const CastImage: React.FC<CastImageProps> = ({ imageUrl }) => {
  return (
    <div className="mb-4 w-full md:mb-0 md:w-1/3">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Cast"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-500 flex h-full items-center justify-center">
            No Image
          </div>
        )}
      </div>
    </div>
  )
}

export default CastImage
