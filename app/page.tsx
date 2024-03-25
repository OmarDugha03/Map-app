'use client'
import dynamic from 'next/dynamic'
import { ImStarFull } from 'react-icons/im'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Home() {
  const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <p>loading...</p>,
    ssr: false
  })
  const categories = [
    'War',
    'Art',
    'Science',
    'Politics',
    'Religion',
    'Sports',
    'Other'
  ]
  return (
    <main className='container flex flex-col space-y-4 lg:mt-6 lg:flex-row lg:gap-x-12'>
      {/* Wrapper div */}
      <div>
        <nav className=' z-50 flex items-center justify-between lg:justify-start lg:gap-x-16'>
          <h1 className='text-3xl font-bold '>Hello World !</h1>
          <Select>
            <SelectTrigger className='z-40 w-[120px] md:w-[180px]'>
              <SelectValue placeholder='choose event ' />
            </SelectTrigger>
            <SelectContent style={{ zIndex: 9999 }}>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>
        <section className='  -z-10 flex h-full w-full items-center justify-center lg:justify-start'>
          <Map />
        </section>
      </div>

      {/* Local Storage section */}
      <section className='h-full w-full space-y-7'>
        <p className='flex items-center justify-start gap-x-3'>
          <ImStarFull className='text-3xl font-bold text-yellow-400' /> My
          Favorite
        </p>
        <div className='h-full min-h-[79vh] w-full bg-slate-950'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          impedit rerum nulla corrupti quia sint aliquid. Quos saepe temporibus
          eaque voluptatibus minima nulla, eum veritatis ab omnis pariatur
          consequuntur ratione?
        </div>
      </section>
    </main>
  )
}
