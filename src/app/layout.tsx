import './../styles/global.scss'
import { Toaster } from "react-hot-toast";
import { PT_Sans as ptsans } from "next/font/google";
import { createMetadata } from '@/utils/metadata';

const ptSans = ptsans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL??""),
  ...createMetadata({
    title: "Nextjs LLM starter project with Drizzle and Astra",
    description:
      "This is a starter project for creating a simple llm project with stuff straight forward",

    keywords: ["template", "drizzle", "nextjs", "typescript", "astra", "openai"],
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${ptSans.className} min-h-screen`}>
        {children}
        <Toaster />
        </body>
    </html>
  )
}
