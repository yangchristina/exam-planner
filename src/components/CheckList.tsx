import React from 'react'
import Checkbox from './Checkbox'

function CheckList({ items, handleChecked }: {
    handleChecked: (i: number, checked: boolean) => void,
    items: { html: JSX.Element, checked: boolean }[]
}) {
    return (
        <ul>
            {items.map(({ html, checked }, index) => <li
                key={index + checked.toString()}
                style={checked ? { textDecoration: 'line-through', opacity: 0.7, color: "gray" } : {}}
            >
                <Checkbox
                    onCheckedChange={async (checked: boolean) => {
                        handleChecked(index, !!checked)
                    }}
                    defaultChecked={!!checked} icon={'clear'} >
                    {html}
                </Checkbox>
            </li>)}
        </ul>
    )
}

export default CheckList