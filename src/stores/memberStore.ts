import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Member {
  id: number
  email: string
  name: string
  nickname: string
  profileUrl: string
}

interface MemberState {
  member: Member | null
  isLoggedIn: boolean
  setMember: (member: Member) => void
  updateMember: (memberData: Partial<Member>) => void
  deleteMember: () => void
  login: (member: Member, accessToken: string) => void
  logout: () => void
}

const useMemberStore = create<MemberState>()(
  persist(
    (set) => ({
      member: null,
      isLoggedIn: false,

      setMember: (member: Member) => set(() => ({ member })),

      updateMember: (memberData: Partial<Member>) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...memberData } : null,
        })),

      deleteMember: () => set(() => ({ member: null, isLoggedIn: false })),

      login: (member: Member, accessToken: string) => {
        sessionStorage.setItem('accessToken', accessToken)
        set(() => ({ member, isLoggedIn: true }))
      },

      logout: () => {
        sessionStorage.removeItem('accessToken')
        set(() => ({ member: null, isLoggedIn: false }))
      },
    }),
    {
      name: 'member-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useMemberStore
