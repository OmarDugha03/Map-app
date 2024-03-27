'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  city: z
    .string()
    .min(2, { message: 'Too small ... ' })
    .max(50, { message: 'too much words ...' })
})

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mb-2 w-full space-y-2 lg:w-[53%]'
        >
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter a city' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' size='lg'>
            Hit !
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Search
