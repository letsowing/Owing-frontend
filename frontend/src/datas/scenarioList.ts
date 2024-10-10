export const SCENARIO_LIST = [
  {
    id: 0,
    name: '발단',
    description: '발단입니다',
    files: [
      { id: 1, name: '파일1', description: 'This is item 1' },
      { id: 2, name: '파일2', description: 'This is item 2' },
      { id: 3, name: '파일3', description: 'This is item 3' },
      { id: 4, name: '파일4', description: 'This is item 4' },
      { id: 5, name: '파일5', description: 'This is item 5' },
      { id: 6, name: '파일6', description: 'This is item 6' },
      { id: 7, name: '파일7', description: 'This is item 7' },
      { id: 8, name: '파일8', description: 'This is item 8' },
    ],
  },
  {
    id: 1,
    name: '전개',
    description: '전개입니다',
    files: [
      { id: 9, name: '파일9', description: 'This is item 9' },
      { id: 10, name: '파일10', description: 'This is item 10' },
      { id: 11, name: '파일11', description: 'This is item 11' },
    ],
  },
  { id: 2, name: '위기', description: '위기입니다', files: [] },
] as const
