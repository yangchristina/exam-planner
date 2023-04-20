import React, { useEffect } from 'react'
import { Control, FieldErrorsImpl, FieldValues, useFieldArray, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { handleAutoFieldArray } from './utils';
import FieldArray, { FieldArrayProps } from './FieldArray';

const AutoInputArray = ({ minLength, empty, removeCond, appendCond, watch, name, control, hideLabel, disabled=false, ...props }: {
    control: Control<any>, 
    watch: UseFormWatch<any>, property?: string,
    minLength: number,
    empty: any, removeCond: (x: any) => boolean, appendCond: (x: any) => boolean,
    hideLabel?: boolean,
    disabled?: boolean,
} & FieldArrayProps) => {
    const { append, remove, fields } = useFieldArray({
        control,
        name,
        rules: { minLength }
    });

    useEffect(() => {
        const subscription = watch((value, { name: watchName, type }) => {
            if (watchName?.startsWith(name) && value[name] !== undefined) {
                handleAutoFieldArray(value[name], type, minLength, empty, append, remove, removeCond, appendCond)
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <FieldArray disabled={disabled} hideLabel={hideLabel} showWhenEmpty name={name} fields={fields} remove={remove} {...props} />
    )
}

export default AutoInputArray