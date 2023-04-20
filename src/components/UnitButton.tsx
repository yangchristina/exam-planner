import { styled } from '@/stitches.config'
import React, { ReactNode } from 'react'

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

const UnitButton = ({ children, color, onClick }: { children: ReactNode, color: 0 | 1, onClick: ()=>any }) => {
  return (
    <Button type={color} onClick={onClick} className={`h-10`} >{children}</Button>
  )
}

export default UnitButton