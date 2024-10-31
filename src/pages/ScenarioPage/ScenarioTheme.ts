import { Theme, darkDefaultTheme, lightDefaultTheme } from '@blocknote/mantine'

export const customLightTheme = {
  colors: {
    editor: {
      text: '#333333', // darkgray
      background: '#FFFFFF', // white
    },
    menu: {
      text: '#333333', // darkgray
      background: '#FFFFFF', // white
    },
    tooltip: {
      text: '#F8F8F8', // verylightgray
      background: '#FF9060', // lightredorange
    },
    hovered: {
      text: '#333333', // darkgray
      background: '#FDF8F3', // beige
    },
    selected: {
      text: '#FFFFFF', // white
      background: '#FF9060', // lightredorange
    },
    disabled: {
      text: '#676767', // gray
      background: '#F8F8F8', // verylightgray
    },
    shadow: '#CFCDCD', // lightgray
    border: '#CFCDCD', // lightgray
    sideMenu: '#FF9060', // lightredorange
    highlights: {
      ...lightDefaultTheme.colors!.highlights,
      gray: { background: '#F8F8F8' }, // verylightgray
      orange: { background: '#FF9060' }, // lightredorange
      purple: { background: '#A49AFF' }, // violet
    },
  },
  borderRadius: 4,
  fontFamily: 'Helvetica Neue, sans-serif',
} satisfies Theme

export const customDarkTheme = {
  colors: {
    editor: {
      text: '#F5F7FF', // coldbeige
      background: '#262627', // darkblack
    },
    menu: {
      text: '#F5F7FF', // coldbeige
      background: '#262627', // darkblack
    },
    tooltip: {
      text: '#F5F7FF', // coldbeige
      background: '#3082F6', // blue
    },
    hovered: {
      text: '#F5F7FF', // coldbeige
      background: '#161616', // verydarkblack
    },
    selected: {
      text: '#F5F7FF', // coldbeige
      background: '#3082F6', // blue
    },
    disabled: {
      text: '#676767', // gray
      background: '#262627', // darkblack
    },
    shadow: '#161616', // verydarkblack
    border: '#464646', // lightdarkgray
    sideMenu: '#C3DCFE', // skyblue
    highlights: {
      ...darkDefaultTheme.colors!.highlights,
      gray: { background: '#464646' }, // lightdarkgray
      blue: { background: '#C3DCFE' }, // skyblue
      purple: { background: '#A49AFF' }, // violet
    },
  },

  borderRadius: 4,
  fontFamily: 'Helvetica Neue, sans-serif',
} satisfies Theme
