import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import Typewriter from './components/typewriter'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white text-center">
      <div className="w-full max-w-[600px] mx-auto">
        <Typewriter
          options={{
            strings: ['Welcome to your Journal'],
            autoStart: true,
            loop: true,
          }}
        />
        <p className="text-2xl text-white/60 mb-4">
          Track your mood throughout your life and gain insights into your
          feelings, behaviors and happiness!
        </p>
        <div>
          <Link href={href}>
            <button
              type="button"
              className="bg-pink-300 rounded-lg px-4 py-2 text-xl"
            >
              GET STARTED
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
