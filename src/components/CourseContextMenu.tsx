import React from 'react'
import ContextMenu from './ContextMenu'
import { TrashIcon } from '@radix-ui/react-icons'

const CourseContextMenu = ({ children, removeExam }: { children: JSX.Element, removeExam: ()=>void }) => {
    return (
        <ContextMenu
            units={[{
                label: 'Delete',
                rightSlot: <TrashIcon />,
                onSelect: () => window.confirm("Are you sure you want to delete this exam?") && removeExam()
            }]}
        >
            {children}
        </ContextMenu>
    )
}

export default CourseContextMenu