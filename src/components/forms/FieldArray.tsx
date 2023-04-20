import { styled } from '@/stitches.config'
import InputLabel from '@/components/InputLabel';
import { Control, FieldErrorsImpl, FieldValues, useFieldArray, UseFormRegister, UseFormWatch, useWatch } from 'react-hook-form';
import { BulletInputsLineWrapper, FloatableInput } from '../InputList';
import { ErrorMessage } from '@hookform/error-message';
import { isArray } from 'lodash';

export const ErrorText = styled('sub', {
    color: '$error11',
})

export interface Input {
    field: string,
    type: string,
    placeholder: string,
}

export interface FieldArrayProps {
    name: string, property?: string,
    errors: Partial<FieldErrorsImpl<FieldValues>>,
    properties?: string[],
    title?: string,
    register: UseFormRegister<any>,
    css?: any,
    labelAlign?: 'center' | 'left' | 'leftcenter',
    showWhenEmpty?: boolean,
}

const FieldArray = ({ errors, name, properties, title, register, disabled = false, showWhenEmpty = false, css = {}, fields, remove, hideLabel = false, labelAlign = 'leftcenter' }:
    { remove: any, fields: any, hideLabel?: boolean, disabled?: boolean } & FieldArrayProps) => {

    const labelMarginLeft = labelAlign === 'leftcenter' ? '-50%' : labelAlign === 'center' ? 0 : '-75%'

    if (!showWhenEmpty && (!fields || fields.length <= 0)) return <></>
    return (
        <Area css={css} >
            {!hideLabel && <InputLabel css={{ marginLeft: labelMarginLeft, marginBottom: -5, marginTop: 5 }} >{title}</InputLabel>}
            <ul>
                {fields.map((item: any, index: number) => {
                    return (
                        <BulletInputsLineWrapper key={item.id + name + index} handleDelete={disabled ? undefined : (() => remove(index))}>
                            {
                                !disabled ? properties?.map(property => {
                                    const lineName = (name + `.${index}` + (property ? `.${property}` : ``))

                                    return <FloatableInput disabled={disabled} key={'inputline-' + property} placeholder={property}  {...register(lineName)}>
                                        <ErrorMessage
                                            errors={errors}
                                            name={lineName}
                                            render={({ message }) => <ErrorText>{message}</ErrorText>}
                                        />
                                    </FloatableInput>
                                }) : <a className='underline text-blue-500	' target='_blank' href={item.url} >{item.text}</a>
                            }
                        </BulletInputsLineWrapper>)
                })}
            </ul>
        </Area>
    )
}

export default FieldArray

const Area = styled('div', {
    position: 'relative',
    gridArea: 'subtasks',
    flexGeneral: 'column',
    gap: 12,
    fontSize: '0.95em'
})