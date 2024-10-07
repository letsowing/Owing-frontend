export const MENU_LIST = [
  {
    text: '스토리 원고',
    path: 'scenarioManagement',
  },
  {
    text: '인물관계도',
    path: 'characterRelationship',
  },
  {
    text: '캐릭터',
    path: 'character',
  },
  {
    text: '세계관',
    path: 'worldView',
  },
  {
    text: '휴지통',
    path: 'trash',
  },
  {
    text: '도움말',
    path: 'help',
  },
  {
    text: '설정',
    path: 'setting',
  },
] as const

export type MenuText = (typeof MENU_LIST)[number]['text']
export type MenuPath = (typeof MENU_LIST)[number]['path']
