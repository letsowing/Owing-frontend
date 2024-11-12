export interface FileItem {
  id: number
  name: string
  description: string
  imageUrl?: string
}

// 폴더 하나의 타입 정의 (하위 폴더와 파일을 가질 수 있음)
export interface FolderItem {
  id: number
  name: string
  description: string
  files: FileItem[]
}

export interface PatchFolderPositionRequest {
  beforeId: number | null
  afterId: number | null
  projectId: number
}

export interface PostFileRequest {
  folderId: number
  name: string
  imageUrl?: string
}

export interface PatchFilePositionRequest {
  beforeId: number | null
  afterId: number | null
  folderId: number
}
