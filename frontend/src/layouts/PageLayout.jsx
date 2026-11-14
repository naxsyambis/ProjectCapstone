import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function PageLayout({
  children,
  tagline = 'Kejelasan yang Mendukung untuk Setiap Orang Tua.',
  width = 'max-w-2xl',
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Navbar />
      <main className={`mx-auto w-full flex-1 px-5 py-8 ${width}`}>{children}</main>
      <Footer tagline={tagline} />
    </div>
  )
}