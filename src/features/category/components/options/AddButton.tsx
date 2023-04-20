import { Button } from '@components/common'
import React from 'react'
import { Control, useFieldArray, UseFormSetValue, useWatch } from 'react-hook-form';
import ItemForm from 'src/features/forms/item';
import { InputOption, ItemOption } from '../../Category';

const AddButton = ({ control, option, setValue }: { control: Control<any>, option: InputOption | ItemOption, setValue: UseFormSetValue<any> }) => {
    const values = useWatch({ control, name: option.name })

    if (option.type === 'input')
        return (
            <Button color={'gray'} type='button' onClick={() => setValue(option.name, [...values, { ...option.empty }])} >
                add {option.title}
            </Button >
        )
    // onClick should open a form
    return (
        <ItemForm submitCallback={(data)=>console.log(data.id)} defaultTab={['event', 'templateRecur']} >
            <Button color={'gray'} type='button' >
                add {option.title}
            </Button >
        </ItemForm>
    )
}

export default AddButton


{/* <button onClick={() => setValue('array.0.test1', '1'); formikProps.setFieldValue('profs', [...formikProps.values.profs, {name: '' }])} >
add Prof
</button>

<button onClick={() => formikProps.setFieldValue('tas', [...formikProps.values.tas, { name: '' }])}>
add TA
</button>

<button onClick={() => formikProps.setFieldValue('officeHours', [...formikProps.values.officeHours, { time: '', location: '' }])}>
add office hour
</button> */}