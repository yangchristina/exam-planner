import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@/stitches.config'
import AutoInputArray from './forms/AutoInputArray'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, LinkListFormSchema, LinkListSchema, LinkSchema, isLink, isLinkList } from '@/types/Link'
import { fitMinSize } from './forms/utils'
import useForageItem from '@/hooks/useForageItem'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { Pencil1Icon } from '@radix-ui/react-icons'
import CheckList from './CheckList'
import { IconBar } from './Course'
import { Checkable, Progress } from '@/types/Course'

export const MIN_LINKS = 1
export const EMPTY_LINK = { url: '', text: '', checked: false } as const

const Links = ({ links, set }: { 
    set: (value: {
        url: string;
        checked: boolean;
        text?: string | undefined;
    }[]) => Promise<void>,
    links: Link[]
 }) => {

    const [isEditing, setIsEditing] = useState(false)

    const { control, register, watch, formState: { errors, isSubmitting }, reset, handleSubmit } = useForm({
        defaultValues: {
            links: fitMinSize([...links], 1, EMPTY_LINK, 'url')
        },
        resolver: zodResolver(LinkListFormSchema)
    })

    console.log("links", links.filter(x => x.checked).length / links.length)

    async function editChecked(index: number, checked: boolean) {
        console.log('checked o', checked, index)
        if (index < 0 || index >= links.length) return
        const newLinks = links.map((x, i) => i === index ? { ...x, checked } : x)
        await set(newLinks)
    }

    // useEffect(() => {
    //     const newLinks = fitMinSize([...links], 1, EMPTY_LINK, 'url')
    //     reset({ links: newLinks })
    // }, [isLoading])

    return (
        <div className='relative p-2 flex-1'>
            <form onSubmit={handleSubmit(async (values, e) => { setIsEditing(false); await set(values.links) })}>
                <LinkArea css={{ fontSize: '0.95em' }} >
                    <IconBar>
                        <Pencil1Icon className='h-5 w-5 z-10' onClick={() => setIsEditing(p => !p)} />
                    </IconBar>
                    <div />
                    {isEditing ? <><AutoInputArray name={'links'} register={register} control={control} watch={watch}
                        empty={EMPTY_LINK} minLength={MIN_LINKS}
                        removeCond={(x) => !x?.text && !x?.url} appendCond={(x) => x?.url}
                        properties={['text', 'url']}
                        errors={errors}
                        disabled={!isEditing}
                    />
                        <button type='submit' className='bg-blue-200 h-8 w-20 bottom-0 rounded-md mt-3 mx-auto' >Save</button></>
                        :
                        <div className='px-6' >
                            <CheckList items={links.map(({ text, url, checked }, i) => ({
                                html: <a key={url}
                                    className='underline text-blue-500' target='_blank'
                                    href={url}
                                >{text}</a>,
                                checked,
                            }))}
                                handleChecked={editChecked}
                            />
                        </div>
                    }
                </LinkArea>
            </form >
        </div>
    )
}

export default Links

const LinkArea = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: 10
    // marginInline: 'auto',
})
