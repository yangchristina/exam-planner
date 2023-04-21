import React from 'react'
import UnitButton, { AddUnitButton, NonUnitButton } from './UnitButton'
import useForageArray from '@/hooks/useForageArray'
import { isNumber } from 'lodash'
import { Unit, isUnit } from '@/types/Unit'
import { styled } from '@/stitches.config'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

function getColorNum(i: number) {
    return (i % 4 === 0 || (i - 3) % 4 === 0) ? 1 : 0
}

const Grid = styled('div', {})
// TODO: Allow Delete Unit
const CourseUnitNav = ({ setMode, units: items, addUnit, removeUnit, renameUnit }: {
    units: Unit[],
    setMode: React.Dispatch<React.SetStateAction<number>>,
    addUnit: (x: Unit) => void,
    removeUnit: (id: any) => void,
    renameUnit: (id: any, name: string) => void
}) => {
    return (
        <div className="flex-1" >
            <Grid className="grid grid-cols-2" css={{ background: '$gray4' }} >
                {
                    items.map(({ id, name }, i) => <UnitButton renameUnit={(name: string)=>renameUnit(id, name)} removeUnit={() => removeUnit(id)} key={id} onClick={() => setMode(id)}
                        color={getColorNum(i)}>
                        {name}
                    </UnitButton>)
                }
                <AddUnitButton color={getColorNum(items.length)} add={addUnit} />
                {items.length % 2 === 0 && <NonUnitButton disableHover type={getColorNum(items.length + 1)}>{items.length === 0 && <span className='flex items-center justify-center text-sm' ><ArrowLeftIcon />&nbsp;Click to add</span>}</NonUnitButton>}
                <button onClick={() => setMode(1)} className={`hover:opacity-75 h-10 bg-blue-300 col-span-2`} >Practice exams</button>
            </Grid>
        </div>
    )
}

export default CourseUnitNav