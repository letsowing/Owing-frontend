import { SCENARIO_LIST } from '@constants/scenarioList'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 파일 하나의 타입 정의
interface FileItem {
  fileId: number
  name: string
  description: string
}

// 폴더 하나의 타입 정의 (하위 폴더와 파일을 가질 수 있음)
interface FolderItem {
  folderId: number
  name: string
  files: FileItem[]
  subfolders?: FolderItem[] // 폴더 안에 폴더가 있을 수 있으므로 optional 설정
}

// zustand store의 타입 정의
interface DndState {
  items: FolderItem[]
  moveFileItem: (
    folderId: number,
    dragIndex: number,
    hoverIndex: number,
  ) => void // 파일 이동
}

// store 생성 (create 함수 사용)
export const useDndStore = create(
  // persist는 로컬 스토리지에 저장하기 위해 사용
  persist<DndState>(
    (set) => ({
      // 폴더리스트 예시
      items: SCENARIO_LIST.map((item) => ({
        ...item, // item 자체는 수정 가능해야 하므로 복사
        files: item.files.map((file) => ({ ...file })), // 각 파일도 복사
      })),

      // 파일을 폴더 내에서 드래그하여 이동시키는 함수
      moveFileItem: (folderId: number, dragIndex: number, hoverIndex: number) =>
        set((state) => {
          // 해당 폴더를 찾기
          const folder = state.items.find((f) => f.folderId === folderId)
          if (!folder) return state

          const updatedFiles = [...folder.files]
          const [draggedFile] = updatedFiles.splice(dragIndex, 1) // 드래그한 파일 제거
          updatedFiles.splice(hoverIndex, 0, draggedFile) // 드래그한 위치로 파일 이동

          // 해당 폴더의 파일들을 업데이트
          const updatedItems = state.items.map((f) =>
            f.folderId === folderId ? { ...f, files: updatedFiles } : f,
          )

          return { items: updatedItems }
        }),
    }),
    {
      name: 'dnd-items', // 로컬 스토리지에 저장할 키
    },
  ),
)
