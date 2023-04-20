import { styled } from '@/stitches.config'
import React, { ReactNode } from 'react'

const Button = styled("button", {
  background: '',
  variants: {
    type: {
      0: {
        background: '$gray1'
      },
      1: {
        background: '$gray4'
      }
    }
  }
})

const UnitButton = ({ children, color }: { children: ReactNode, color: 0 | 1 }) => {
  return (
    <Button type={color} className={`h-10`} >{children}</Button>
  )
}

export default UnitButton