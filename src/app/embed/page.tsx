import DisplayPages from '@/components/ui/display-pages'
import UploadPdf from '@/components/ui/upload-pdf'
import Embedded from './../embedded'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Embedded />
            <UploadPdf />
            <DisplayPages />
        </main>
    )
}
