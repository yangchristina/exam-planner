import React, { ReactNode } from 'react'

const UnitButton = ({ children, color }: { children: ReactNode, color: 0 | 1 }) => {
  return (
    <button className={`h-10 bg-slate-${color ? 200: 100}`} >{children}</button>
  )
}

export default UnitButton