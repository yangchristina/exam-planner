import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { styled } from '@/stitches.config'
import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { Input } from './Input'
import { generateNumberId } from './forms/utils'
import { useForm } from 'react-hook-form'
import { Unit, UnitSchema, isUnit } from '@/types/Unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { editForageObjectArray } from '@/utils/forage'
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons'
import ContextMenu from './ContextMenu'

const Button = styled("button", {
  background: '',
  variants: {
    type: {
      0: {
        background: 'white'
      },
      1: {
        background: '$gray4'
      }
    }
  }
})

export const NonUnitButton = styled("div", {
  background: '',
  variants: {
    type: {
      0: {
        background: 'white'
      },
      1: {
        background: '$gray4'
      }
    }
  }
})
// interface Option {
//   label: string,
//   rightSlot?: JSX.Element,
//   onSelect?: () => void
// }

// interface Item extends Option {
//   onSelect: () => void,
// }
const UnitButton = ({ children, color, onClick, removeUnit }: { children: ReactNode, color: 0 | 1, onClick: () => any, removeUnit: () => void }) => {
  return (
    <ContextMenu units={[{ label: "Delete", rightSlot: <Pencil1Icon />, onSelect: () => window.confirm("Are you sure you want to delete?") && removeUnit() }]} >
      <Button type={color} onClick={onClick} className={`h-10`} >{children}</Button>
    </ContextMenu>
  )
}

export default UnitButton

export const AddUnitButton = ({ color, add }: { color: 0 | 1, add: (x: Unit) => void }) => {
  const [isEditing, setIsEditing] = useState(false)
  const outsideAlertRef = useRef(null);
  useOutsideAlerter(outsideAlertRef, () => setIsEditing(false));

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      id: generateNumberId()
    },
    resolver: zodResolver(UnitSchema)
  });

  // const debouncedEdit = useCallback(debounce(async (name: string) => {
  //   // localforage.setItem(`${examId}-units`, { name, id: generateNumberId() })
  // }, 500), [])

  return <NonUnitButton className={`h-10 flex items-center justify-center`} type={color}
    onClick={() => setIsEditing(true)}
  >
    {isEditing ? <form className='flex p-1' ref={outsideAlertRef} onSubmit={handleSubmit(async (newItem) => {
      // editForageObjectArray<Unit>(`${examId}-units`, newItem, isUnit, 'id')
      add(newItem)
      reset({
        name: '',
        id: generateNumberId()
      })
      setIsEditing(false)
    })}>
      <input className='p-1 text-xs border' {...register("name")} />
      <button type="submit"><CheckIcon /></button>
    </form> : "+"}
  </NonUnitButton>
}