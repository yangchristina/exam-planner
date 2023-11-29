
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { styled } from '@/stitches.config';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Button } from '../Button';
import { ButtonBar, overlayStyle, contentStyle, titleStyle, descriptionStyle, animateTransition } from './styles';
import { animated, useTransition } from '@react-spring/web';
import { useInternalExternalState } from '@/hooks/useInternalExternalState';

// BUG: button not submitting when clicked:(
// Exports
export const AlertDialogOverlay = styled(animated(AlertDialogPrimitive.Overlay), { ...overlayStyle, backgroundColor: '$overlay9', });
export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = styled(animated(AlertDialogPrimitive.Content), { ...contentStyle, width: '25%' });
export const AlertDialogTitle = styled(AlertDialogPrimitive.Title, titleStyle);
export const AlertDialogDescription = styled(AlertDialogPrimitive.Description, descriptionStyle);
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

interface OpenProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
export const EmptyAlertDialog = ({ trigger, children, open, setOpen }: {
    trigger?: JSX.Element,
    children: ReactNode,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
} & OpenProps) => {
    const transition = useTransition(open, animateTransition)

    return (
        <AlertDialogRoot open={open} onOpenChange={setOpen} >
            <AlertDialogTrigger asChild>
                {trigger || <Button >Confirm</Button>}
            </AlertDialogTrigger>
            <AlertDialogPrimitive.Portal forceMount>
                {transition((style, isOpen) => {
                    // console.log('transitioin open', isOpen)
                    return (
                        <>
                            {isOpen ? (
                                <AlertDialogOverlay style={{ opacity: style.opacity }} />
                            ) : null}
                            {isOpen ? (
                                <AlertDialogContent style={style} >
                                    {children}
                                </AlertDialogContent>
                            ) : null}
                        </>
                    )
                })}
            </AlertDialogPrimitive.Portal>
        </AlertDialogRoot>
    )
}

export const AlertDialogButtons = () => {
    return (
        <ButtonBar>
            <AlertDialogCancel asChild>
                <Button color={'gray'}>
                    Cancel
                </Button>
            </AlertDialogCancel>
            {/* <AlertDialogAction onClick={(e) => e.preventDefault()} asChild> */}
            <Button type='submit' color={'success'} >Confirm</Button>
            {/* </AlertDialogAction> */}
        </ButtonBar>
    )
}

const FlexForm = styled('form', {
    all: 'unset',
    display: 'flex',
    justifyContent: 'flex-end', flexWrap: 'nowrap', gap: 20,
    flexDirection: 'column',
    ...contentStyle,
})

export const ConfirmAlertDialog = ({ children, ...props }: { title: string, description?: string, children: JSX.Element, handleSubmit: () => void } & AlertDialogProps) => {

    return (
        <BasicAlertDialogForm trigger={children} {...props} />
    )
}

interface AlertDialogProps extends Partial<OpenProps> {
    trigger?: JSX.Element, title: string, description?: string, children?: JSX.Element, handleSubmit: () => void,
}

export const BasicAlertDialogForm = ({ title, description, children, handleSubmit, trigger, open, setOpen, ...props }: AlertDialogProps) => {
    const { internalState: openInternal, setInternalState: setOpenInternal } = useInternalExternalState<boolean>(false, open, setOpen)
    return (
        <EmptyAlertDialog {...props} open={openInternal} setOpen={setOpenInternal} trigger={trigger} >
            <FlexForm onSubmit={(e) => {e.preventDefault(); handleSubmit(); setOpenInternal(false)}} >
                <AlertDialogTitle>{title}</AlertDialogTitle>

                {description && <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>}

                {children}

                <AlertDialogButtons />
            </FlexForm>
        </EmptyAlertDialog>
    )
}
// export const ConfirmAlertDialog = ({ regex, setDialogIsOpen, initialName = '', children: child, triggerOpen = 0, onSubmit, question, placeholder = '', description }: { regex?: string, initialName?: string, setDialogIsOpen?: Dispatch<SetStateAction<boolean>>, children?: JSX.Element, triggerOpen?: number, onSubmit: () => void, question: string, placeholder?: string, description?: string }) => {
//     const [open, setOpen] = useState(false)

//     useEffect(() => {
//         if (triggerOpen)
//             setOpen(true)
//     }, [triggerOpen])

//     useEffect(() => {
//         if (setDialogIsOpen)
//             setDialogIsOpen(open)
//     }, [open])

//     return (
//         <AlertDialog open={open} onOpenChange={setOpen} >
//             {child && <AlertDialogTrigger asChild>
//                 {child}
//             </AlertDialogTrigger>}
//             <AlertDialogContent css={{ width: '25%' }} >

//                 <AlertDialogTitle>{question}</AlertDialogTitle>

//                 {description && <AlertDialogDescription>
//                     {description}
//                 </AlertDialogDescription>}



//                 <Group css={{ justifyContent: 'flex-end', flexWrap: 'nowrap', gap: 25 }}>
//                     <AlertDialogCancel asChild>
//                         <Button type='button'>
//                             Cancel
//                         </Button>
//                     </AlertDialogCancel>
//                     <AlertDialogAction asChild>
//                         <Button onClick={onSubmit} >Confirm</Button>
//                     </AlertDialogAction>
//                 </Group>

//             </AlertDialogContent>
//         </AlertDialog>
//     )
// };
