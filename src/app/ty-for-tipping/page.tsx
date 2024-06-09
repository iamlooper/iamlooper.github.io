import { FaHeart } from 'react-icons/fa';

export default function TYForTipping() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-8 px-4 md:px-6">
      <div className="max-w-md space-y-4 text-center">
        <FaHeart className="mx-auto h-12 w-12 text-rose-500" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Thank You for Tipping!</h1>
      </div>
    </div>
  )
}