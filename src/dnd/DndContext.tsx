import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { Announcements, closestCenter, DndContext as Context, DragCancelEvent, DragEndEvent, DragMoveEvent, DragOverEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors, MeasuringStrategy, MeasuringConfiguration, CollisionDetection, DragStartEvent, ScreenReaderInstructions, KeyboardCoordinateGetter, PointerActivationConstraint } from '@dnd-kit/core'

// TODO: drag overlay
const DndContext = ({
    children,
    handleDragStart,
    handleDragMove,
    handleDragOver = () => void 0,
    handleDragEnd,
    handleDragCancel,
    measuring, // {droppable: {strategy: MeasuringStrategy.Always}}
    accessibility,
    coordinateGetter,
    activationConstraint,
}: {
    children: ReactNode,
    handleDragStart?: (event: DragStartEvent) => void,
    handleDragMove?: (event: DragMoveEvent) => void,
    handleDragOver?: (event: DragOverEvent) => void,
    handleDragEnd: (event: DragEndEvent) => void,
    handleDragCancel?: (event: DragCancelEvent) => void,
    measuring?: MeasuringConfiguration,
    collisionDetection?: CollisionDetection,
    accessibility?: { announcements?: Announcements, screenReaderInstructions?: ScreenReaderInstructions },
    coordinateGetter?: KeyboardCoordinateGetter,
    activationConstraint?: PointerActivationConstraint,
}) => {

    const mouseSensor = useSensor(MouseSensor, { activationConstraint });
    const touchSensor = useSensor(TouchSensor, { activationConstraint });
    const keyboardSensor = useSensor(KeyboardSensor, { coordinateGetter });
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    return (
        <Context
            accessibility={accessibility}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            {children}
        </Context>
    )
}

export default DndContext

