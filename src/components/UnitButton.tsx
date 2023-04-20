import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { styled } from '@/stitches.config'
import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { Input } from './Input'
import { generateNumberId } from './forms/utils'
import { useForm } from 'react-hook-form'
import { Unit, UnitSchema, isUnit } from '@/types/Unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { editForageObjectArray } from '@/utils/forage'
import { CheckIcon } from '@radix-ui/react-icons'

const Button = styled("button", {
  background: '',
  variants: {
    type: {
      0: {
        // background: '$gray1'
      },
      1: {
        background: '$gray4'
      }
    }
  }
})

const NonButton = styled("div", {
  background: '',
  variants: {
    type: {
      0: {
        // background: '$gray1'
      },
      1: {
        background: '$gray4'
      }
    }
  }
})

const UnitButton = ({ children, color, onClick }: { children: ReactNode, color: 0 | 1, onClick: () => any }) => {
  return (
    <Button type={color} onClick={onClick} className={`h-10`} >{children}</Button>
  )
}

export default UnitButton

export const AddUnitButton = ({ examId, color }: { examId: string, color: 0 | 1 }) => {
  const [isEditing, setIsEditing] = useState(false)
  const outsideAlertRef = useRef(null);
  useOutsideAlerter(outsideAlertRef, () => setIsEditing(false));

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      id: generateNumberId()
    },
    resolver: zodResolver(UnitSchema)
  });

  console.log({errors})

  // const debouncedEdit = useCallback(debounce(async (name: string) => {
  //   // localforage.setItem(`${examId}-units`, { name, id: generateNumberId() })
  // }, 500), [])

  return <NonButton className={`h-10 flex items-center justify-center`} type={color}
    onClick={() => setIsEditing(true)}
  >
    {isEditing ? <form className='flex p-1' ref={outsideAlertRef} onSubmit={handleSubmit(async (newItem) => {
      editForageObjectArray<Unit>(`${examId}-units`, newItem, isUnit, 'id')
      setIsEditing(false)
    })}>
      <input className='p-1 text-xs border' {...register("name")} />
      <button type="submit"><CheckIcon /></button>
    </form> : "+"}
  </NonButton>
}