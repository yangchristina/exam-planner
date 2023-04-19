import React, { ReactNode } from 'react'

const UnitButton = ({children}: {children: ReactNode}) => {
  return (
    <button style={{all: 'unset'}} className='' >{children}</button>
  )
}

export default UnitButton