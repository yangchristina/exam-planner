import React from 'react'
import UnitButton, { AddUnitButton, NonUnitButton } from './UnitButton'
import useForageArray from '@/hooks/useForageArray'
import { isNumber } from 'lodash'
import { Unit, isUnit } from '@/types/Unit'
import { styled } from '@/stitches.config'

function getColorNum(i: number) {
    return (i % 4 === 0 || (i - 3) % 4 === 0) ? 1 : 0
}

const Grid = styled('div', {})
// TODO: Allow Delete Unit
const CourseUnitNav = ({ setMode, units: items, addUnit, removeUnit }: {
    units: Unit[],
    setMode: React.Dispatch<React.SetStateAction<number>>,
    addUnit: (x: Unit)=>void,
    removeUnit: (id: any)=>void
}) => {
    return (
        <div className="flex-1" >
            <Grid className="grid grid-cols-2" css={{background: '$gray4'}} >
                {
                    items.map(({ id, name }, i) => <UnitButton removeUnit={()=>removeUnit(id)} key={id} onClick={() => setMode(id)}
                        color={getColorNum(i)}>
                        {name}
                    </UnitButton>)
                }
                <AddUnitButton color={getColorNum(items.length)} add={addUnit} />
                {items.length % 2 === 0 && <NonUnitButton type={getColorNum(items.length + 1)} />}
                <button onClick={() => setMode(1)} className={`h-10 bg-blue-300 col-span-2`} >Practice exams</button>
            </Grid>
        </div>
    )
}

export default CourseUnitNav