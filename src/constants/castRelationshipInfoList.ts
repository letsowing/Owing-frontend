export interface InfoItem {
  text: string
  desc: string
}

export const INFO_LIST: InfoItem[] = [
  {
    text: '인물 간 관계 추가',
    desc: '스토리 속 등장인물들의 관계를 시각적으로 표현할 수 있습니다.',
  },
  {
    text: '인물 등장 회차',
    desc: '각 인물이 어느 회차에 등장하는지 표시됩니다.',
  },
  {
    text: 'AI 이미지 생성',
    desc: '인물의 특징을 기반으로 DALL·E를 활용해 인물 이미지를 생성할 수 있습니다.',
  },
  {
    text: 'AI 관계 설정',
    desc: '이미 작업중인 내용도 걱정마세요. 플롯이나 시놉시스를 통해 손쉽게 인물 및 관계 추가가 가능합니다.',
  },
]
