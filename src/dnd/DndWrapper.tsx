import React, { useState } from 'react'
import {
    DndContext,
    useSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    DragEndEvent,
    DragOverlay,
    useSensors,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import {
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';

const DndWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    //#region sensors
    const mouseSensor = useSensor(MouseSensor, {});
    const touchSensor = useSensor(TouchSensor, {});
    const keyboardSensor = useSensor(KeyboardSensor, {});
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
    //#endregion sensors

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    function handleDragStart() { // 

    }


    return (
        <DndContext
            sensors={sensors}
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]} //2rem, calc((100% - 3.25rem) / 7)
        >
            {children}
        </DndContext>
    )

}

export default DndWrapper