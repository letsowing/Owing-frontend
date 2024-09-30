// persist를 이용해 로컬 스토리지에 저장되고, 페이지 새로고침 시에도 유지
import { SCENARIO_LIST } from '@constants/scenarioList'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// items 하나의 타입 정의
interface DndItem {
  id: string
  name: string
  description: string
}
// interface DndItem {
//   id?: string;
//   name?: string;
//   description?: string;
//   folderId?: number;
// }

// zustand store의 타입 정의
interface DndState {
  items: DndItem[]
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

// store 생성 (create 함수 사용)
export const useDndStore = create(
  // persist는 로컬스토리지에 저장하기 위해 사용
  persist<DndState>(
    (set) => ({
      // items는 초기값 설정

      // 파일리스트 예시
      items: SCENARIO_LIST.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      })),

      // 폴더리스트 예시
      // items: [
      //   {
      //     folderId: 0,
      //     name: '폴더명1',
      //     files: [
      //       { fileId: 0, fileName: '파일명1', fileDescription: 'aaa' },
      //       { fileId: 1, fileName: '파일명2', fileDescription: 'aaa' },
      //     ],
      //   },
      //   { folderId: 1, name: '폴더명2', files: [] },
      // ],

      // moveItem 드래그앤드롭시 발동되는 함수
      moveItem: (dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updateItems = [...state.items]
          const [draggedItem] = updateItems.splice(dragIndex, 1) // 드래그한 아이템 제거
          updateItems.splice(hoverIndex, 0, draggedItem) // 드래그한 위치로 이동
          return { items: updateItems }
        }),
    }),
    {
      name: 'dnd-items', // 로컬 스토리지에 저장할 키
    },
  ),
)
