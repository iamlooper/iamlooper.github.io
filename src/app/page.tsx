import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { FaGithub, FaTelegramPlane, FaLinkedinIn, FaMastodon } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage alt="Developer Profile" src="/profile-picture.jpg" />
            <AvatarFallback>Looper</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/iamlooper" target="_blank">
              <FaGithub className="w-6 h-6 hover:text-gray-900 dark:hover:text-gray-50" />
            </Link>
            <Link href="https://t.me/iamlooper" target="_blank">
              <FaTelegramPlane className="w-6 h-6 hover:text-gray-900 dark:hover:text-gray-50" />
            </Link>
            <Link href="https://linkedin.com/in/iamlooper" target="_blank">
              <FaLinkedinIn className="w-6 h-6 hover:text-gray-900 dark:hover:text-gray-50" />
            </Link>
            <Link href="https://mastodon.social/@iamlooper" target="_blank">
              <FaMastodon className="w-6 h-6 hover:text-gray-900 dark:hover:text-gray-50" />
            </Link>
          </div>
        </div>
      </main>
      <div className="w-full h-0.5 bg-gray-700"></div>
      <footer className="py-4 w-full">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Looper</p>
          <div className="flex items-center gap-4">
            <Link className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="/tos">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}