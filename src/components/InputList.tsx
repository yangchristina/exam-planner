import { styled } from '@/stitches.config';
import { Cross1Icon, DotFilledIcon } from "@radix-ui/react-icons";
import { inputLayoutStyle, InputWrapper } from './Input';
import type { VariantProps } from '@stitches/react';
import { forwardRef, ReactNode, useEffect, useId, useState } from "react";

export const BareFlexCol = styled('div', {
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: 'column'
})

/**
 * For dynamic inputs in list format, options for bullet point or checkbox list (uses checkbox radix)
 */
const BulletIcon = styled(DotFilledIcon, {
    size: 22,
})

const CrossIcon = styled(Cross1Icon, {
    color: '$gray8',
    size: 10,
    '&:hover': {
        color: '$gray10',
        scale: 1.02
    }
})

const FloatingLabel = styled('label', {
    position: "absolute",
    flexGeneral: 'row',
    size: 'max-content',
    left: 7,
    top: 'auto',
    color: '$gray10',
    fontSize: '0.85em',
    pointerEvents: "none",
    marginLeft: -2,
    opacity: 1,
    zIndex: 10,

    animation: 'top 3s ease-out, flex 3s ease-out, margin-left 2s', // doesn't work

    variants: {
        float: {
            true: {
                fontSize: '0.65em',
                alignItems: 'flex-start',
                top: '-1em',
                marginLeft: 0,
                background: 'inherit',
            }
        }
    }
})

export const ListInput = styled('input', {
    all: 'unset',
    // padding: 1,
    ...inputLayoutStyle,
    fontSize: '0.9em',
    width: 130,
    padding: 5,
    paddingBlock: 3,
    background: 'transparent',
    borderRadius: 0,
    // border: `$borderWidths$thin solid $colors$overlay3`,
    borderBottom: '$border',
    borderBottomColor: '$gray7',
    '&:hover': { borderBottomColor: '$primary6' },
    '&:focus': { borderBottomColor: '$primary8' },
    '&::placeholder': {
        opacity: 0.6
    },
    variants: {
        error: {
            true: { borderBottomColor: '$error9' }
        }
    }
});

const Flex = styled('div', {
    position: 'relative',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    background: 'inherit',
    gap: 10
})

interface ListInput {
    placeholder?: string,

}

export const BulletInputsLineWrapper = ({ handleDelete, children }: { handleDelete?: () => void, children: ReactNode }) => {
    return (
        <InputWrapper css={{ gap: 2 }} >
            <BulletIcon />
            <Flex>
                {
                    children
                }
            </Flex>
            {handleDelete && <CrossIcon onClick={handleDelete} />}
        </InputWrapper>
    )
}
BulletInputsLineWrapper.displayName = 'BulletInputsLineWrapper'

type ListInputProps = VariantProps<typeof ListInput> & React.InputHTMLAttributes<HTMLInputElement> & { floatLabel?: boolean, error?: boolean }
export const FloatableInput = forwardRef<HTMLInputElement, ListInputProps>(({ children, floatLabel = false, type = 'text', placeholder = '', onChange, error = false, ...props }, forwardedRef) => {
    const id = useId()
    const [hasValue, setHasValue] = useState(!!props.defaultValue || !!props.value)

    return (
        <BareFlexCol>
            {floatLabel && <FloatingLabel float={hasValue} >{placeholder}</FloatingLabel>}
            <ListInput error={error} ref={forwardedRef} id={id} placeholder={floatLabel ? undefined : placeholder} onChange={(e) => { onChange && onChange(e); setHasValue(!!e.target.value) }} type={type} {...props} />
            {children}
        </BareFlexCol>
    )
})
FloatableInput.displayName = 'FloatableInput'


type BulletSingleInputProps = VariantProps<typeof ListInput> & React.InputHTMLAttributes<HTMLInputElement> & { handleDelete?: () => void, error?: boolean } & ListInputProps
export const BulletSingleInput = forwardRef<HTMLInputElement, BulletSingleInputProps>(({ handleDelete, ...props }, forwardedRef) => {
    return (
        <InputWrapper css={{ gap: 2 }} >
            <BulletIcon />
            <Flex>
                <FloatableInput {...props} ref={forwardedRef} />
            </Flex>
            {handleDelete && <CrossIcon onClick={handleDelete} />}
        </InputWrapper>
    )
})
BulletSingleInput.displayName = 'BulletSingleInput'


const InputList = () => {
    return (
        <div>InputList</div>
    )
}

export default InputList