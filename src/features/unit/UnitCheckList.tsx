import React from 'react'
import Subtasks from './components/Subtasks'
import useChecklist from './useChecklist'

const UnitCheckList = () => {
  const { items } = useChecklist()
  return (
    <Subtasks subtasks={items} />
  )
}

export default UnitCheckList