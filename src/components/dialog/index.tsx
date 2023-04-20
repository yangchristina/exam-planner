import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled } from '@/stitches.config';
import { contentStyle, overlayStyle, titleStyle, descriptionStyle, animateTransition } from './styles';
import { animated, useTransition } from '@react-spring/web';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@/components/IconButton'
import { useInternalExternalState } from '@/hooks/useInternalExternalState';

const DialogRoot = styled(DialogPrimitive.Root, {});
const DialogTrigger = DialogPrimitive.Trigger;
const DialogOverlay = styled(animated(DialogPrimitive.Overlay), overlayStyle);
const DialogContent = styled(animated(DialogPrimitive.Content), contentStyle);
const DialogTitle = styled(DialogPrimitive.Title, titleStyle);
const DialogDescription = styled(DialogPrimitive.Description, descriptionStyle);
const DialogClose = DialogPrimitive.Close;

const Dialog = ({ trigger, title, description, children, hasPadding = true, open, setOpen }:
    {
        trigger?: JSX.Element, title?: string, description?: string,
        children?: ReactNode, hasPadding?: boolean,
        open?: boolean,
        setOpen?: Dispatch<SetStateAction<boolean>>
    }
) => {
    const { internalState: openInternal, setInternalState: setInternalOpen } = useInternalExternalState<boolean>(false, open, setOpen)
    const transition = useTransition(openInternal, animateTransition)

    return (
        <DialogRoot open={openInternal} onOpenChange={(x) => setInternalOpen(x)} >
            {trigger && <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>}
            <DialogPrimitive.Portal forceMount>
                {transition((style, isOpen) => {
                    return (
                        <>
                            {isOpen ? (
                                <DialogOverlay style={{ opacity: style.opacity }} ><DialogContent hasPadding={hasPadding} style={{
                                    ...style,
                                }} forceMount>
                                    {title && <DialogTitle>{title}</DialogTitle>}
                                    {description && <DialogDescription>{description}</DialogDescription>}
                                    {children}
                                    <DialogClose asChild>
                                        <IconButton aria-label="Close">
                                            <Cross2Icon />
                                        </IconButton>
                                    </DialogClose>
                                </DialogContent></DialogOverlay>
                            ) : null}
                        </>
                    )
                })}
            </DialogPrimitive.Portal>
        </DialogRoot>
    )
}

export default Dialog


