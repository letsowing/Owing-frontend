import UserReview from "@pages/LandingPage/UserReviews"

const Introduction = () => {
  return (
    <div>
      <h1 className="mb-18 text-center text-[50px] font-bold text-darkgray">
          이야기 관리를 편하게.
          <br />
          창작의 본질에 집중할 수 있는
          <br />
          온라인 집필 플랫폼
        </h1>

        <UserReview />
        
        <h2 className="my-48 text-center text-[30px] font-bold text-darkgray">
          이야기의 아이디어부터 완성까지 한 곳에서,
          <br />
          복잡한 설정을 걱정하지 않고 창작에만 집중할 수 있는 새로운 경험.
          <br />
          글로 그리는 세상, Owing과 함께 그 여정을 시작하세요.
        </h2>
    </div>
  )
}

export default Introduction;