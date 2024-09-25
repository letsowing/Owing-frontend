import React from 'react'

const Ribbon: React.FC = () => {
  return (
    <div className="h-full w-full">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 Q31.67,-3.33 50,18.33 T100,23.33"
          fill="none"
          stroke="currentColor"
          strokeWidth="60"
          vectorEffect="non-scaling-stroke"
          className="text-[#DBBCAD]"
        />

        <path
          id="curve"
          d="M0,30 Q31.67,-3.33 50,18.33 T100,23.33"
          fill="none"
          stroke="none"
        />

        <text className="text-[#110D1C]">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            <tspan
              fontSize="1.5"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
              dominantBaseline="middle"
            >
              Strategy aligned with business needs and robust data analysis are
              Strategy aligned with business needs and robust data analysis are
            </tspan>
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default Ribbon
