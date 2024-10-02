export const SCENARIO_LIST = [
  {
    folderId: 0,
    name: '발단',
    files: [
      { fileId: 1, name: '파일1', description: 'This is item 1' },
      { fileId: 2, name: '파일2', description: 'This is item 2' },
      { fileId: 3, name: '파일3', description: 'This is item 3' },
      { fileId: 4, name: '파일4', description: 'This is item 4' },
      { fileId: 5, name: '파일5', description: 'This is item 5' },
      { fileId: 6, name: '파일6', description: 'This is item 6' },
      { fileId: 7, name: '파일7', description: 'This is item 7' },
      { fileId: 8, name: '파일8', description: 'This is item 8' },
    ],
  },
  {
    folderId: 1,
    name: '전개',
    files: [
      { fileId: 9, name: '파일9', description: 'This is item 9' },
      { fileId: 10, name: '파일10', description: 'This is item 10' },
      { fileId: 11, name: '파일11', description: 'This is item 11' },
    ],
  },
  { folderId: 2, name: '위기', files: [] },
] as const
