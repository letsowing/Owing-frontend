const Footer = () => {
  return (
    <div>
      <div className="relative h-[700px] w-full overflow-hidden">
        <svg
          className="absolute bottom-0 h-full w-full"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FB5D2B" />
              <stop offset="100%" stopColor="#EF931A" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            fillOpacity="0.1"
            d="M0,280L48,266.7C96,253,192,227,288,227.5C384,228,480,255,576,288.2C672,321,768,361,864,361.7C960,362,1056,321,1152,306.8C1248,292,1344,306,1392,313.8L1440,322L1440,700L1392,700C1344,700,1248,700,1152,700C1056,700,960,700,864,700C768,700,672,700,576,700C480,700,384,700,288,700C192,700,96,700,48,700L0,700Z"
          ></path>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <div className="text-gray-600 text-sm font-semibold">
            © 2077 Untitled UI. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
