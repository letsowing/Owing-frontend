export interface Member {
  id: number
  email: string
  name: string
  nickname: string
  profileUrl: string
}

export interface Token {
  accessToken: string
  grantType: string
}
