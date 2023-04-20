import * as radixScales from '@radix-ui/colors';
import { createStitches, PropertyValue } from '@stitches/react';
import { blackOverlay, createThemeColors, mapColor } from '@/utils/radixColors';
// { blackA, blue, blueDark, crimson, crimsonA, crimsonDark, crimsonDarkA, gray, grayDark, green, greenDark, mauve, mauveDark, pink, pinkDark, red, redDark, sage, sageDark, teal, tealDark, whiteA, yellow, yellowDark }
// to understand color scale: https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale

export interface Theme {
  taskbg: string,
  tasktxt: string, // maybe could replace tasktxt+eventtxt with overlay
  eventbg: string,
  eventtxt: string,

  categorybg1: string,
  categorytxt1: string,

  categorybg2: string,
  categorytxt2: string,

  categorybg3: string,
  categorytxt3: string,

  categorybg4: string,
  categorytxt4: string,

  categorybg5: string,
  categorytxt5: string,

  categorybg6: string,
  categorytxt6: string,

  categorybg7: string,
  categorytxt7: string,

  categorybg8: string,
  categorytxt8: string,

  calviewbg?: string,
  calviewborder?: string,
  calviewcolor?: string,

  // onto Pages

  // list
  listbg?: string,
  listBgBack?: string,
  listBgFront?: string,

  eventcardbg?: string,
  eventcardtxt?: string,
  eventcardoutline?: string,

  // month
  daygridToday?: string
  daygridBg?: string,

  // week/time
  timegridbg?: string,
  timegridCellHover?: string,

  // week/list

}

export const {
  styled,
  getCssText,
  createTheme,
  keyframes,
  globalCss
} = createStitches({
  theme: {
    // fonts: {
    //   system: 'system-ui',
    //   // !!! read somewhere that you might use different fonts for like headers and stuff
    // },
    fonts: {
      system: `"Monaco", "Lucida Console", monospace`
    },
    colors: {
      ...radixScales.blue,
      ...radixScales.slate,
      ...blackOverlay,
      border: '$borderWidths$medium solid $primary12',
      borderThin: '$borderWidths$thin solid $primary12',
      borderThick: '$borderWidths$thick solid $primary12',
      borderFocus: `0 0 0 2px $colors$focus`,
      timegridbg: '$primary2',

      text: '$primary12',

      ...mapColor('blue', 'primary'),
      ...mapColor('slate', 'gray'),
    },
    borderWidths: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    },
    borderStyles: {
    },
    fontSizes: {
      0: '0.5rem',
      1: '0.75rem',
      2: '1rem',
      3: '1.2rem',
      4: '1.4rem',
      5: '1.6rem',
      6: '1.8rem',
      7: '2rem',
      8: '3rem',
      9: '4rem',
    },
    borders: {
    },
    letterSpacings: {
    },
    space: {
    },
    shadows: {
      border: '0 0 0 calc(1px / var(--scale-x, 1)) $colors$overlay6',
      common: `0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15)`,
      boxShadow: `$border, $common`,
      error: `0px 0px 3px $colors$error11`,
      focus: `0 0 0 2px $colors$primary7`, // or if want gray focus: `0 0 0 2px $colors$gray7`
      focusBottom: `0 2px 0px 0px $colors$primary7`,
      // light: '0 0 0 2px $colors$gray1',
      strong: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
    bpdashboard: '(min-width: 900px)',
    bpdashboardsmall: '(min-width: 550px)',
    bpweeklist: '(min-width: 1105px)',
    bpdaysched1: '(min-width: 750px)',
    bpdayschedsmall: '(min-width: 500px)',
    bplist: '(min-width: 1080px)',
    bplistsmall: '(min-width: 650px)',
    bpdaylist: '(min-width: 1000px)',
    bpheaderday: '(min-width: 750px)',
    bpabout: '(min-width: 770px)',
  },
  utils: {
    // A property for applying width/height together
    size: (value: number | string) => ({
      width: value,
      height: value,
    }),
    minSize: (value: number | string) => ({
      minWidth: value,
      minHeight: value,
    }),
    // A property to apply linear gradient
    linearGradient: (value: PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    flexGeneral: (dir: PropertyValue<'flexDirection'>) => ({
      display: 'flex',
      flexDirection: dir,
      alignItems: 'center',
    }),

    center: (dir: PropertyValue<'flexDirection'>) => ({
      display: 'flex',
      flexDirection: dir,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    highlight: (highlightKeyframe: any) => ({
      WebkitAnimation: `1.5s ${highlightKeyframe} 1.5s 1 normal forwards`,
      animation: `1.5s ${highlightKeyframe} 1.5s 1 normal forwards`,
      backgroundColor: "transparent",
      background: `linear-gradient(90deg, $highlight 50%, rgba(255, 255, 255, 0) 50%)`,
      backgroundSize: "200% 100%",
      backgroundPosition: "100% 0",
    }),
    buttonStyle: (color: any) => ({
      backgroundColor: '$' + color + '2',
      color: '$' + color + '11',

      boxShadow: `inset 0 0 0 1px $colors$${color}7`,
      // '&:hover': { boxShadow: `inset 0 0 0 1px $colors$${color}8` },
      // '&:focus': { boxShadow: '$focus' },
    }),
    textStyle: (style: 'important' | 'unimportant') => (style === 'important' ? {
      fontSize: '1.5rem', // TODO: not sure what fontSize to do yet
      color: '$important',
    } : {
      fontSize: '0.75rem',
      color: '$unimportant'
    }),
    categoryColor: (typeAndNum: string | number) => { // should be either 'task' or 1 // 1-indexed
      if (!typeAndNum) return ({})
      if (typeof typeAndNum === 'number') return ({
        color: '$categorytxt' + typeAndNum,
        backgroundColor: '$categorybg' + typeAndNum,
      })
      const vals = typeAndNum.split(' ')
      for (let val of vals) {
        const num = parseInt(val)
        if (!Number.isNaN(num))
          return ({
            color: '$categorytxt' + num,
            backgroundColor: '$categorybg' + num,
          })
      }
      if (vals.includes('task'))
        return {
          color: '$tasktxt',
          backgroundColor: '$taskbg',
        }
      if (vals.includes('event'))
        return {
          color: '$eventtxt',
          backgroundColor: '$eventbg',
        }
      return {}
    }
  },
});

// define the dark theme using the de-constructed function
const CATEGORIES1 = {
  categorybg1: '#dccef2',
  categorytxt1: 'black',

  categorybg2: '#729ea1',
  categorytxt2: 'white',

  categorybg3: '#b5bd89',
  categorytxt3: 'white',

  categorybg4: '#ebceab',
  categorytxt4: 'black',

  categorybg5: '#adcad6',
  categorytxt5: 'white',

  categorybg6: '#e0b0D5',
  categorytxt6: 'white',

  categorybg7: '#ad7a99',
  categorytxt7: 'white',

  categorybg8: '#6dc0d5',
  categorytxt8: 'white',
}
// crimson
const crimsonTheme: Theme = {
  taskbg: '$primary9',
  tasktxt: '$gray1', // maybe could replace tasktxt+eventtxt with overlay
  eventbg: '$pink9',
  eventtxt: '$gray1',

  ...CATEGORIES1
}

const lavendarBlushTheme: Theme = {
  taskbg: '$primary9',
  tasktxt: '$gray1', // maybe could replace tasktxt+eventtxt with overlay
  eventbg: '$crimson9',
  eventtxt: '$gray1',

  ...CATEGORIES1
}


const avocadoVariables = {
  tan2v: '#d2b48c',
  gray1v: '#d1d1d1',
  brown1v: '#917d63',
  brown2v: '#7a6850',
  lightbrownv: '#ab977d',

  // ltan3: '#ede7da',
  // ltan: '#f0e2c5',
  // ltan2: '#faeccf',
  lbrownv: '#c9bea7',
  tanv: '#d6c9b6',
  // text: 'black',
  // lightgreen: '#edf5e6',
  // green1: '#bdccaf',
  // lightgreen2: '#dfebd5',
  lightgreen3v: '#d2e0c5',
  // darkgreen: '#547556',
}
const avocadoTheme: Theme = {
  // outline: '$darkgreen',
  tasktxt: '$gray12',
  taskbg: '$primary9',
  // tasktxt: '$gray1v', // maybe could replace tasktxt+eventtxt with overlay
  eventbg: '$brown1v',
  eventtxt: 'white',

  listbg: 'linear-gradient(to top left, white, $tan2v)',

  // timegridbg: radixScales.brown.brown2, //'$tan2v',
  // timegridbg: radixScales.gold.gold2, //'$tan2v',
  timegridbg: '$primary2',
  timegridCellHover: '$primary4',

  // primary: '$lightgreen2',
  // primaryLight: '$lightgreen2',
  // primaryDark: '$black',

  // important: '#ff96a6', // '#ffbcc6',
  // unimportant: '#404040',

  // sectionHeadertxt: '$outline',
  // sectionHeaderbg: 'white',
  // sectionHeaderborder: '$outline',

  eventcardoutline: '$brown2v',
  eventcardbg: '$lightbrownv',
  eventcardtxt: 'black',

  categorybg1: '#ddead1',
  categorytxt1: 'black',

  categorybg2: '#c7ddb5',
  categorytxt2: 'black',

  categorybg3: '#b3cf99',
  categorytxt3: 'black',

  categorybg4: '#a3c585',
  categorytxt4: 'black',

  categorybg5: '#95bb72',
  categorytxt5: 'black',

  categorybg6: '#87ab69',
  categorytxt6: 'black',

  categorybg7: '#75975e',
  categorytxt7: 'black',

  categorybg8: '#658354',
  categorytxt8: 'black',

  // daygridBg: radixScales.brown.brown5, // '#EADDCA', // dark , !!
  daygridBg: '$secondary4', // '#EADDCA', // dark , !!
  // daygridToday: '$tan',
  daygridToday: '$secondary6', // '$lbrownv', // dark
  // daygridToday: '$primary5',
  // daygridBg: '$primary2',

  // timegridbgToday: '$daygridToday',

  // timegridCellHover: '$green1',
  // timegridbg: '$lightgreen',

  // weekboxesbg: 'white',
  // weekbg: '$lightgreen',
  // weektimebg: '$secondary',

  calviewbg: '$lightgreen3v',
  calviewborder: '$primary9',
  calviewcolor: '$primary11',

  // calviewbg: '$primary7',
  // calviewborder: '$primary10',
  // calviewcolor: '$primary10',

  // dashboardbg: '$lightgreen3',
  // notebook: '$lightgreen',
  // stickynote: '$lightbrown',
}

// teal
const tealTheme: Theme = {
  taskbg: '$primary9',
  tasktxt: '$gray1', // maybe could replace tasktxt+eventtxt with overlay
  eventbg: '$pink9',
  eventtxt: '$gray1',
  ...CATEGORIES1
}

const blueTheme: Theme = {
  taskbg: '$primary9',
  tasktxt: '$gray1', // maybe could replace tasktxt+eventtxt with overlay
  eventbg: '$blue9',
  eventtxt: '$gray1',
  ...CATEGORIES1
}

export const themes = {
  crimson: createTheme({
    colors: {
      ...radixScales.pink,
      ...createThemeColors(crimsonTheme, true, 'crimson', 'mauve', 'red', 'green', 'blue', 'yellow')
    },
  }),
  crimsonDark: createTheme({
    colors: {
      ...radixScales.pinkDark,
      ...createThemeColors(crimsonTheme, false, 'crimson', 'mauve', 'red', 'green', 'blue', 'yellow')
    },
  }),
  teal: createTheme({
    colors: {
      ...radixScales.pink,
      ...createThemeColors(tealTheme, true, 'teal', 'sage', 'red', 'green', 'blue', 'yellow')
      // ...pink,
      // ...createThemeColors(tealTheme, true, teal, sage, red, green, blue, yellow)
    },
  }),
  tealDark: createTheme({
    colors: {
      ...radixScales.pinkDark,
      ...createThemeColors(tealTheme, false, 'teal', 'sage', 'red', 'green', 'blue', 'yellow')
    },
    // fonts: {
    //   system: "Arial, Helvetica, sans-serif"
    // },
  }),
  avocado: createTheme({
    colors: {
      ...radixScales.pinkDark,
      ...createThemeColors(avocadoTheme, true, 'grass', 'olive', 'red', 'green', 'blue', 'yellow', avocadoVariables, 'gold')
    },
  }),
  blueberry: createTheme({
    colors: {
      ...radixScales.blue,
      ...createThemeColors(blueTheme, true, 'indigo', 'slate', 'red', 'green', 'blue', 'yellow')
      // ...pink,
      // ...createThemeColors(tealTheme, true, teal, sage, red, green, blue, yellow)
    },
  }),
  violet: createTheme({
    colors: {
      ...radixScales.blue,
      ...createThemeColors(blueTheme, true, 'violet', 'mauve', 'red', 'green', 'blue', 'yellow')
      // ...pink,
      // ...createThemeColors(tealTheme, true, teal, sage, red, green, blue, yellow)
    },
  }),
  ['lavendar blush']: createTheme({
    colors: {
      ...radixScales.crimson,
      ...createThemeColors(lavendarBlushTheme, true, 'pink', 'mauve', 'red', 'green', 'blue', 'yellow')
      // ...pink,
      // ...createThemeColors(tealTheme, true, teal, sage, red, green, blue, yellow)
    },
  }),
}

const GlobalStyles = globalCss({
  ':root': {
    margin: 0,
    fontFamily: '$system',
    height: "100%",
    color: "$primary12",
    boxSizing: "border-box",
    '-moz-box-sizing': "border-box",
    '-webkit-box-sizing': "border-box",
    scrollBehavior: 'smooth',
    scrollbarColor: 'auto transparent',
    background: '$primary1',
    fontSize: "1em",
  },
  body: {
    minHeight: "100vh",
    minWidth: "100vw",
    fontSize: '1em',
    margin: 0,
    padding: 0,
    // display: 'flex',
    // alignItems: 'stretch',
  },
  'h1, h2, h3, h4, h5, h6': {
    color: '$primary11',
    margin: 0,
    display: "block",
    fontWeight: "bold"
  },
  sub: {
    verticalAlign: 'bottom',
    position: 'relative',
    bottom: '-0.5em',
    color: '$unimportant',
    fontSize: '0.65em',
  },
  textarea: {
    fontFamily: '$system',
    padding: 5,
    letterSpacing: 0.8,
    boxSizing: 'border-box',
    background: '$overlayB11',
    '&:focus': {
      // border: '$focus',
      outline: 'none !important',
      // border: '1px solid red',. .
      boxShadow: '$focus'
    }
  },
  a: {
    textDecoration: 'none'
  }
})

//we can declare the styles here or in pages/_app.tsx
GlobalStyles();