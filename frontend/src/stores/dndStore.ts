import { generateUUID } from '@utils/uuid'

import { SCENARIO_LIST } from '@datas/scenarioList'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// 파일 하나의 타입 정의
interface FileItem {
  fileId: string
  name: string
  description: string
}

// 폴더 하나의 타입 정의 (하위 폴더와 파일을 가질 수 있음)
interface FolderItem {
  folderId: string
  name: string
  files: FileItem[]
  subfolders?: FolderItem[] // 폴더 안에 폴더가 있을 수 있으므로 optional 설정
}

// zustand store의 타입 정의
interface DndState {
  items: FolderItem[]
  moveFolder: (dragIndex: number, hoverIndex: number) => void
  moveFileItem: (
    folderId: string,
    dragIndex: number,
    hoverIndex: number,
  ) => void // 파일 이동
  addFolder: (name: string) => void
  addFile: (folderId: string, fileName: string) => void // 새로운 파일 추가
  updateFolderName: (folderId: string, newFolderName: string) => void // 폴더 이름 변경
  updateFileName: (
    folderId: string,
    fileId: string,
    newFileName: string,
  ) => void // 파일 이름 변경
  deleteFolder: (folderId: string) => void
  deleteFile: (folderId: string, fileId: string) => void
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
      moveFolder: (dragIndex: number, hoverIndex: number) =>
        set((state) => {
          const updatedItems = [...state.items]
          const [movedFolder] = updatedItems.splice(dragIndex, 1) // 드래그한 폴더를 삭제
          updatedItems.splice(hoverIndex, 0, movedFolder) // 새로운 위치에 폴더 삽입
          return { items: updatedItems }
        }),
      // 파일을 폴더 내에서 드래그하여 이동시키는 함수
      moveFileItem: (folderId: string, dragIndex: number, hoverIndex: number) =>
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
      addFolder: (name: string) =>
        set((state) => {
          const newFolder: FolderItem = {
            folderId: generateUUID(), // getUUID로 새로운 id 생성
            name,
            files: [],
          }
          return { items: [...state.items, newFolder] }
        }),
      addFile: (folderId: string, fileName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            const newFile: FileItem = {
              fileId: generateUUID(), // getUUID로 새로운 id 생성
              name: fileName,
              description: '새로운 파일 설명',
            }
            folder.files.push(newFile) // 폴더에 파일 추가
          }
          return { items: updatedItems }
        }),
      updateFolderName: (folderId: string, newFolderName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            folder.name = newFolderName
          }
          return { items: updatedItems }
        }),
      updateFileName: (folderId: string, fileId: string, newFileName: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find((f) => f.folderId === folderId)
          if (folder) {
            const file = folder.files.find((f) => f.fileId === fileId)
            if (file) {
              file.name = newFileName
            }
          }
          return { items: updatedItems }
        }),
      deleteFolder: (folderId: string) =>
        set((state) => {
          // 기존 상태에서 삭제할 폴더를 제외하고 업데이트
          const updatedItems = state.items.filter(
            (folder) => folder.folderId !== folderId,
          )

          return { items: updatedItems }
        }),
      deleteFile: (folderId: string, fileId: string) =>
        set((state) => {
          const updatedItems = [...state.items]
          const folder = updatedItems.find(
            (folder) => folder.folderId === folderId,
          ) // 삭제할 파일의 폴더 찾기

          if (folder) {
            folder.files = folder.files.filter((file) => file.fileId !== fileId) // 삭제할 파일을 제외하고 업데이트
          }

          return { items: updatedItems }
        }),
    }),
    {
      name: 'dnd-items', // 로컬 스토리지에 저장할 키
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
