import { ReactNode } from "react";
import { styled } from "@/stitches.config";
import { forwardRef } from "react";
import type * as Stitches from '@stitches/react';

const generalButtonStyles = {
  all: 'unset',
  borderRadius: 4,
  padding: '0.4em 0.8em',
  // border: '$border',

  backgroundColor: '$primary2',
  color: '$primary11',

  buttonStyle: 'primary',
}

export const StaticButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  color: '$text',
  background: '$gray1',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 8%',
  fontSize: 'inherit',
  fontWeight: 500,
  minHeight: '2.2rem',
  gap: '0.15rem',
  wordBreak: 'break-word',
  position: 'relative',
  boxShadow: `0 2px 10px $overlay7`,
  cursor: 'pointer',

  '&:focus': {
      boxShadow: '$focus'
  },

  variants: {
      size: {
          small: {
              fontSize: 12,
              padding: '0 10px',
              lineHeight: '25px',
              height: 25,
          },
      },
      hover: {
          shine: {
              '&::after': {
                  content: "''",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "0",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  WebkitTransition: "none",
                  MozTransition: "none",
                  transition: "none"
              },

              '&:hover': {
                  '&::after': {
                      width: "120%",
                      backgroundColor: "rgba(255,255,255,0)",
                      WebkitTransition: "all 0.4s ease-in-out",
                      MozTransition: "all 0.4s ease-in-out",
                      transition: "all 0.4s ease-in-out"
                  }
              },
          }
      },
      variant: {
          transparent: {
              background: 'transparent',
              boxShadow: 'none',
              minHeight: 'max-content',
          },
          rectangle: {
              border: '$border',
              boxShadow: '$boxShadow',
              borderRadius: 0,
              textAlign: "center",
              background: "$gray1",
              flexGeneral: 'row',
              padding: '0 0.8rem',
              justifyContent: 'space-between',
              '&:hover': {
                  borderColor: '$outlineHover'
              }
          }
      },
  },

  defaultVariants: {
      variant: 'violet',
  },
});

export const BlockButton = styled('button', {
  ...generalButtonStyles,
  borderRadius: 0,
  background: '$gray1',
  color: '$gray12',
  boxShadow: `inset 0 0 0 2px $colors$gray12`,
  '&:hover': { background: '$gray2', boxShadow: `inset 0 0 0 2px $colors$gray12` },
  '&:focus': { boxShadow: '$focus' },

  variants: {
    isColored: {
      true: {
        borderRadius: 0,
        background: '$primary3',
        color: '$primary11',
        boxShadow: `inset 0 0 0 2px $colors$primary9`,
        '&:hover': { background: '$primary4', boxShadow: `inset 0 0 0 2px $colors$primary9`, },
        '&:focus': { boxShadow: '$focus' },
      }
    }
  }
})

type ButtonProps = Stitches.VariantProps<typeof ButtonLabel> & { children: ReactNode, css?: Record<string, any> } & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, forwardedRef) => {
  return (
    <ButtonWrapper>
      <ButtonShadow />
      <ButtonEdge />
      <ButtonLabel {...props} ref={forwardedRef} >{children}</ButtonLabel>
    </ButtonWrapper>
  )
})
Button.displayName = 'Button';


const ButtonPart = styled('span', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

const ButtonShadow = styled(ButtonPart, {
  opacity: 0.1,
  background: 'hsl(0deg 0% 0% / 0.1)',
  transform: 'translateY(1px)',
  transition: 'transform 250ms ease-out',
})

const ButtonEdge = styled(ButtonPart, {
  background: `linear-gradient(
    to left,
    $gray8 0%,
    $gray7 8%,
    $gray7 92%,
    $gray8 100%
  )`,
})

const ButtonLabel = styled('button', {
  ...generalButtonStyles,
  // display: 'block',
  display: 'inline-flex',
    alignItems: 'center',
  boxSizing: 'border-box',
  position: 'relative',
  justifyContent: 'center',

  fontSize: '14px',
  padding: '12px 20px',
  background: '$primary2',
  transform: 'translateY(-1.5px)',
  width: '100%',
  userSelect: 'none',
  transition: 'transform 250ms ease-out',
  height: '100%',
  variants: {
    color: {
      gray: {
        buttonStyle: 'gray',
      },
      error: {
        buttonStyle: 'error',
      },
      primary: {
        buttonStyle: 'primary',
      },
      primary4: {
        buttonStyle: 'primary',
        backgroundColor: '$primary4',
      },
      primary5: {
        buttonStyle: 'primary',
        backgroundColor: '$primary5',
      },
      primary6: {
        buttonStyle: 'primary',
        backgroundColor: '$primary6',
      },
      secondary: {
        buttonStyle: 'secondary',
      },
      secondary4: {
        buttonStyle: 'secondary',
        backgroundColor: '$secondary4',
      },
      secondary5: {
        buttonStyle: 'secondary',
        backgroundColor: '$secondary5',
      },
      secondary6: {
        buttonStyle: 'secondary',
        backgroundColor: '$secondary6',
      },
      success: {
        buttonStyle: 'success',
      },
      blackAndWhite: {
        backgroundColor: '$gray1',
        color: '$gray12',
        boxShadow: `inset 0 0 0 1px $colors$gray12`,
        '&:hover': { boxShadow: `inset 0 0 0 1px $colors$primary12` },
        '&:focus': { boxShadow: '$focus' },
      },
      white: {
        backgroundColor: '$gray1',
        color: '$gray12',
        boxShadow: `0 2px 10px $overlay7`,
      },
      transparent: {
        background: 'transparent',
        boxShadow: 'none',
        minHeight: 'max-content',
        [`& ${ButtonEdge}`]: {
          backgroundColor: 'transparent'
        }
      },
    },
    size: {
      // TODO
    },
    shape: {
      rectangle: {
        borderRadius: 0, // TODO: style incomplete, untested + view rectangle variant in button in plandav2 for reference
      }
    }

    // position: {
    //   center: {
    //     left: 0,
    //     right: 0,
    //     margin: 'auto',
    //     alignSelf: 'center',
    //   }
    // }
  },
})

const ButtonWrapper = styled('div', {
  position: 'relative',
  borderRadius: 6,
  border: 'none',
  fontWeight: 600,
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  transition: 'filter 250ms ease-out',
  // width: 'max-content',
  minHeight: 'max-content',
  // height: 'auto',
  // height: 'max-content',

  '&:focus-within': {
    boxShadow: '$focus'
  },

  '&:hover': {
    filter: 'brightness(100%)',

    [`& ${ButtonLabel}`]: {
      transform: 'translateY(-2.5px)',
    },

    [`& ${ButtonShadow}`]: {
      transform: 'translateY(2px)',
    },
  },

  '&:active': {
    [`& ${ButtonLabel}`]: {
      transform: 'translateY(-1px)',
      transition: 'transform 34ms',
    },

    [`& ${ButtonShadow}`]: {
      transform: 'translateY(0.5px)',
      transition: 'transform 34ms',
    },
  },
})



// export const Button = styled('button', {
//   borderRadius: 4,
//   borderColor: '$borderColor',
//   wordBreak: 'break-word',
//   position: 'relative',

//   '&:hover': {
//     transform: 'translateY(-1px)',
//   },

//   '&:active': {
//     transform: 'translateY(0.5px)',
//     transition: 'transform 34ms',
//   },

//   '&:after': {
//     height: 2,
//     width: '100%',
//     bottom: -2,
//     background: '$gray7',
//     opacity: 0.1,
//     transform: 'translateY(1px)',
//     transition: 'transform 250ms ease-out',
//   },

//   variants: {
//     color: {
//       gray: {
//         buttonStyle: 'gray',
//       },
//       primary: {
//         buttonStyle: 'primary',
//       },
//       success: {
//         buttonStyle: 'success',
//       },
//       blackAndWhite: {
//         backgroundColor: '$gray1',
//         color: '$gray12',
//         boxShadow: `inset 0 0 0 1px $colors$gray12`,
//         '&:hover': { boxShadow: `inset 0 0 0 1px $colors$primary12` },
//         '&:focus': { boxShadow: '$focus' },
//       }
//     },
//     size: {
//       // TODO
//     },
//   },

//   defaultVariants: {
//     color: 'primary'
//   }
// })