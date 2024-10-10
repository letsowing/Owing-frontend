import { BsFeather } from 'react-icons/bs'
import { GoPerson } from 'react-icons/go'
import { HiOutlineTrash } from 'react-icons/hi'
import { LuSettings } from 'react-icons/lu'
import { LuHelpCircle } from 'react-icons/lu'
import { RiEarthFill } from 'react-icons/ri'
import { TbCirclesRelation } from 'react-icons/tb'

export const MENU_LIST = [
  {
    icon: BsFeather,
    text: '스토리 원고',
    path: 'scenarioManagement',
  },
  {
    icon: TbCirclesRelation,
    text: '인물관계도',
    path: 'characterRelationship',
  },
  {
    icon: GoPerson,
    text: '캐릭터',
    path: 'character',
  },
  {
    icon: RiEarthFill,
    text: '세계관',
    path: 'worldView',
  },
  {
    icon: HiOutlineTrash,
    text: '휴지통',
    path: 'trash',
  },
  {
    icon: LuHelpCircle,
    text: '도움말',
    path: 'help',
  },
  {
    icon: LuSettings,
    text: '설정',
    path: 'setting',
  },
] as const

export type MenuText = (typeof MENU_LIST)[number]['text']
export type MenuPath = (typeof MENU_LIST)[number]['path']
