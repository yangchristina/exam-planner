import { styled } from "@/stitches.config";

export const FORM_PADDING = 25
export const FORM_GAP = 20

export const ErrorText = styled('sub', {
    color: '$error11',
})

export const Form = styled('form', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: FORM_PADDING,
    paddingTop: 5,
    gap: FORM_GAP,

    background: '$primary2',

    transition: 'background-color 500ms linear, color 750ms linear',
})

export const ButtonsBar = styled('div', {
    center: 'row',
    gap: 15,
    gridArea: 'submit',
    flexDirection: 'row-reverse',
})

export const Field = styled('fieldset', {
    all: 'unset',
    display: 'flex',
    gap: 15,
    gridArea: 'due'
})

export const ColorDiv = styled('div', {
    size: 50,
    background: '$primary3',

    variants: {
        num: {
            0: {
                background: '$primary3'
            },
            1: {
                background: '$primary4'
            },
            2: {
                background: '$primary5',
            },
            3: {
                background: '$primary6',
            }
        },
        size: {
            large: {
                size: 500,
            }
        }
    }
})