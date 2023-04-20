import { Control, FieldErrorsImpl, FieldValues, useFieldArray, UseFormRegister, UseFormWatch, useWatch } from 'react-hook-form';
import FieldArray, { FieldArrayProps } from './FieldArray';

const ManualInputArray = ({ control, name, ...props }: {
    control: Control<any>, 
} & FieldArrayProps) => {

    const { remove, fields } = useFieldArray({
        control,
        name,
    });

    return (
        <FieldArray fields={fields} remove={remove} name={name} {...props} />
    )
}

export default ManualInputArray