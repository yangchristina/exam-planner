import { Button } from '@components/common';
import { Label } from '@components/common/Label'
import * as Collapsible from '@radix-ui/react-collapsible';
import { Control, UseFormSetValue } from 'react-hook-form';
import { styled } from 'src/stitches.config';
import { OptionGroup } from '../../Category';
import AddButton from './AddButton';

const Flex = styled('div', {
    display: 'flex',
    gap: 15,
    flexDirection: 'column'
})

const Options = ({ control, options, setValue }: { control: Control<any>, options: OptionGroup[], setValue: UseFormSetValue<any> }) => {
    return (
        <Flex>
            <Label>Options</Label>
            {options.map(group => {
                return <Collapsible.Root key={group.name}>
                    <Collapsible.Trigger asChild>
                        <Button color={'primary'} >{group.name}</Button>
                    </Collapsible.Trigger>
                    <Collapsible.Content style={{ display: 'flex' }}>
                        {
                            group.options.map((o, i) => <AddButton key={o.name + i} setValue={setValue} option={o} control={control} />)
                        }
                    </Collapsible.Content>
                </Collapsible.Root>
            })}
        </Flex>
    )
}

export default Options