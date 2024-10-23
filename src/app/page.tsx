import DisplayPages from '@/components/ui/display-pages'
import UploadPdf from '@/components/ui/upload-pdf'
import Image from 'next/image'
import Embedded from './embedded'
import ChatBot from '@/components/ui/chat-bot'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChatBot />
    </main>
  )
}
