import { TrashFolderData } from '@types'

export const trashFolder: TrashFolderData = {
  story: [
    {
      id: 1,
      name: '프로젝트 문서',
      description: '주요 프로젝트 관련 문서 모음',
      files: [
        {
          id: 101,
          name: '기획서.pdf',
          description: '2024년 프로젝트 기획서',
          imageUrl: 'https://example.com/planning.jpg',
        },
        {
          id: 102,
          name: '회의록.docx',
          description: '팀 미팅 회의록',
          imageUrl: 'https://example.com/meeting.jpg',
        },
      ],
    },
  ],
  cast: [
    {
      id: 2,
      name: '마케팅 자료',
      description: '마케팅 캠페인 관련 자료',
      files: [],
    },
  ],
  universe: [
    {
      id: 3,
      name: '리소스',
      description: '디자인 리소스 및 에셋',
      files: [
        {
          id: 101,
          name: 'universe 기획서.pdf',
          description: '2024년 프로젝트 기획서',
          imageUrl: 'https://example.com/planning.jpg',
        },
        {
          id: 102,
          name: 'universe 회의록.docx',
          description: '팀 미팅 회의록',
          imageUrl: 'https://example.com/meeting.jpg',
        },
      ],
    },
  ],
}
