import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { routing } from "@/i18n/routing"
import { GoogleTagManager } from "@next/third-parties/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import Script from "next/script"
import NotFound from "./not-found"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "O'BAO",
  description: "O'BAO",
}

interface Locale {
  locale?: string | undefined
}

const avenir = localFont({
  src: "./fonts/AvenirLTStd.otf",
  variable: "--font-avenir",
  weight: "100 900",
})

const avenirBlack = localFont({
  src: "./fonts/AvenirLTStdBlack.otf",
  variable: "--font-avenir-black",
  weight: "100 900",
})

const avenirBook = localFont({
  src: "./fonts/AvenirLTStdBook.otf",
  variable: "--font-avenir-book",
  weight: "100 900",
})

const avenirHeavy = localFont({
  src: "./fonts/AvenirLTStdHeavy.otf",
  variable: "--font-avenir-heavy",
  weight: "100 900",
})

const avenirMedium = localFont({
  src: "./fonts/AvenirLTStdMedium.otf",
  variable: "--font-avenir-medium",
  weight: "100 900",
})

const avenirRoman = localFont({
  src: "./fonts/AvenirLTStdRoman.otf",
  variable: "--font-avenir-roman",
  weight: "100 900",
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages()
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  if (!routing.locales.includes(locale as any)) {
    NotFound()
  }
  return (
    <html lang={locale}>
      <body
        className={`
        ${avenir.variable} 
        ${avenirMedium.variable} 
        ${avenirRoman.variable} 
        ${avenirBook.variable} 
        ${avenirHeavy.variable} 
        ${avenirBlack.variable} 
        antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          {children}
          <Toaster />
          <div className="zc-widget-config" data-restaurant="384398" />
          <Script
            src="https://sdk.zenchef.com/v1/sdk.min.js"
            strategy="lazyOnload"
            id="zenchef-sdk"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
