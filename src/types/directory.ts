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

export interface UpdateFolderPositionRequest {
  beforeId: number
  afterId: number
}

export interface UpdateFilePositionRequest {
  beforeId: number
  afterId: number
  folderId: number
}

export interface FilePostRequest {
  folderId: number
  name: string
  description: string
  imageUrl?: string
}

export interface FilePutRequest {
  name: string
  description: string
  imageUrl?: string
}
