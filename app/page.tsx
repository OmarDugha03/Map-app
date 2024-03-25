'use client'
import dynamic from 'next/dynamic'

export default function Home() {
  const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <p>loading...</p>,
    ssr: false
  })
  return (
    <>
      <nav>
        <h1>Hello World !</h1>
      </nav>
      <main className='container  flex h-full w-full items-center justify-center'>
        <Map />
      </main>
    </>
  )
}
